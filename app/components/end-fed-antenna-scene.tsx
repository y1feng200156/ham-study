import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  LineCurve3,
  MeshBasicMaterial,
  Object3D,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { ElectricFieldInstanced } from "./electric-field-instanced";

const wireLength = 8;
const wireHeight = 2;

function EndFedAntenna({ speed = 1.0 }: { speed?: number }) {
  const ununBox = useMemo(() => new BoxGeometry(0.4, 0.4, 0.2), []);
  const connectorGeo = useMemo(
    () => new CylinderGeometry(0.05, 0.05, 0.2, 16),
    [],
  );
  const insulatorBox = useMemo(
    () => new CylinderGeometry(0.05, 0.05, 0.2, 16),
    [],
  );

  // Antenna wire points: Unun at origin (ish), wire extending in -X
  const startPoint = useMemo(() => new Vector3(0, 0, 0), []);
  const endPoint = useMemo(() => new Vector3(-wireLength, wireHeight, 0), []); // Sloper configuration

  const wireCurve = useMemo(() => {
    return new LineCurve3(startPoint, endPoint);
  }, [startPoint, endPoint]);

  const wireGeo = useMemo(() => {
    const points = wireCurve.getPoints(20);
    return new BufferGeometry().setFromPoints(points);
  }, [wireCurve]);

  // E-Field and H-Field visualization
  // E-Field: Perpendicular to wire (let's say Y axis relative to wire)
  // H-Field: Circles around wire

  // Create many instances for fields
  const segmentCount = 30;
  const eFieldInstances = useMemo(() => {
    const tempObj = new Object3D();
    const mesh = new InstancedMesh(
      new CylinderGeometry(0.02, 0.02, 1, 8),
      new MeshBasicMaterial({
        color: "#ea580c",
        transparent: true,
        opacity: 0.8,
      }),
      segmentCount,
    );

    // Position them along the wire
    for (let i = 0; i < segmentCount; i++) {
      const t = i / segmentCount;
      const pos = wireCurve.getPoint(t);
      const tangent = wireCurve.getTangent(t);

      // Calculate an up vector perpendicular to tangent
      // Tangent is roughly (-1, ~0.2, 0).
      // We want something perpendicular. Let's pick (0, 0, 1) x Tangent -> Y-ish
      const normal = new Vector3(0, 0, 1).cross(tangent).normalize();

      tempObj.position.copy(pos);
      tempObj.lookAt(pos.clone().add(normal)); // Orient cylinder along 'normal'
      tempObj.rotateX(Math.PI / 2); // Cylinder default is Y-axis, so we need to align it

      tempObj.updateMatrix();
      mesh.setMatrixAt(i, tempObj.matrix);
    }
    return mesh;
  }, [wireCurve]);

  const hFieldInstances = useMemo(() => {
    const tempObj = new Object3D();
    const geometry = new TorusGeometry(0.3, 0.02, 8, 24);
    const material = new MeshBasicMaterial({
      color: "#3b82f6",
      transparent: true,
      opacity: 0.8,
    });
    const mesh = new InstancedMesh(geometry, material, segmentCount);

    for (let i = 0; i < segmentCount; i++) {
      const t = i / segmentCount;
      const pos = wireCurve.getPoint(t);
      const tangent = wireCurve.getTangent(t);

      tempObj.position.copy(pos);
      tempObj.lookAt(pos.clone().add(tangent)); // Orient torus to face along wire

      tempObj.updateMatrix();
      mesh.setMatrixAt(i, tempObj.matrix);
    }
    return mesh;
  }, [wireCurve]);

  // Ref for animating fields
  const eRef = useRef<InstancedMesh>(null);
  const hRef = useRef<InstancedMesh>(null);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta * 3 * speed;
    const time = timeRef.current;
    const tempObj = new Object3D();

    if (eRef.current) {
      for (let i = 0; i < segmentCount; i++) {
        const t = i / (segmentCount - 1); // 0 to 1
        // Voltage (E-field) distribution for Half-Wave:
        // V(x) = cos(pi * x)  -> Max at 0 and 1, Zero at 0.5
        const spatialAmp = Math.cos(t * Math.PI);

        // Time oscillation (Voltage) - sin(wt)
        const timeAmp = Math.sin(time);

        const amp = spatialAmp * timeAmp;

        const pos = wireCurve.getPoint(t);
        const tangent = wireCurve.getTangent(t);
        const normal = new Vector3(0, 0, 1).cross(tangent).normalize();

        // E-field scales with amplitude
        tempObj.position.copy(pos);
        tempObj.lookAt(pos.clone().add(normal));
        tempObj.rotateX(Math.PI / 2);
        tempObj.scale.set(1, Math.abs(amp) * 3, 1); // Scale length

        tempObj.updateMatrix();
        eRef.current.setMatrixAt(i, tempObj.matrix);
      }
      eRef.current.instanceMatrix.needsUpdate = true;
    }

    if (hRef.current) {
      for (let i = 0; i < segmentCount; i++) {
        const t = i / (segmentCount - 1); // 0 to 1
        // Current (H-field) distribution for Half-Wave:
        // I(x) = sin(pi * x) -> Zero at 0 and 1, Max at 0.5
        const spatialAmp = Math.sin(t * Math.PI);

        // Time oscillation (Current) - 90 deg phase shift from Voltage
        // I(t) = cos(wt)
        const timeAmp = Math.cos(time);

        const amp = spatialAmp * timeAmp;

        const pos = wireCurve.getPoint(t);
        const tangent = wireCurve.getTangent(t);

        tempObj.position.copy(pos);
        tempObj.lookAt(pos.clone().add(tangent));
        tempObj.scale.set(Math.abs(amp) * 2, Math.abs(amp) * 2, 1); // Scale ring size

        tempObj.updateMatrix();
        hRef.current.setMatrixAt(i, tempObj.matrix);
      }
      hRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[2, 0, 0]}>
      {/* Unun Box */}
      <mesh position={[0, 0, 0]} geometry={ununBox}>
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Connector */}
      <mesh position={[0, -0.25, 0]} geometry={connectorGeo}>
        <meshStandardMaterial color="#ccc" />
      </mesh>

      {/* Wire */}
      <primitive
        object={
          new Line(
            wireGeo,
            new LineBasicMaterial({ color: "#ef4444", linewidth: 2 }),
          )
        }
      />

      {/* Insulator */}
      <mesh
        position={[endPoint.x, endPoint.y, endPoint.z]}
        rotation={[0, 0, -0.25]}
        geometry={insulatorBox}
      >
        <meshStandardMaterial color="#fff" />
      </mesh>

      {/* Coax (Counterpoise) */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 4, 8]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Fields */}
      <primitive object={eFieldInstances} ref={eRef} />
      <primitive object={hFieldInstances} ref={hRef} />
    </group>
  );
}

function RadiationPattern() {
  // End fed (long wire) pattern depends on length. 1/2 wave is dipole-like.
  // Let's assume 1/2 wave for simplicity -> Donut shape (Toroidal) but distorted due to sloper?
  // Let's just use a standard dipole pattern but aligned with wire.
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 60, 40);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 5;

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      vertex.normalize();

      // Dipole pattern aligned with X axis (roughly wire direction)
      // Gain is low at ends (X axis), high broadside (Y-Z plane)
      // sin(theta) where theta is angle from axis.
      // vertex.x is cos(angle)
      // gain = sqrt(y^2 + z^2) basically.
      const gain = Math.sqrt(vertex.y * vertex.y + vertex.z * vertex.z);

      vertex.multiplyScalar(Math.max(0.1, gain) * scale);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group position={[-2, 1, 0]} rotation={[0, 0, 0.2]}>
      {" "}
      {/* Centered on wire approx */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#22c55e"
          wireframe={true}
          transparent={true}
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function EndFedAntennaScene({
  isThumbnail = false,
  isHovered = false,
}: {
  isThumbnail?: boolean;
  isHovered?: boolean;
}) {
  const { t } = useTranslation("scene");
  const [showWaves, setShowWaves] = useState(true);
  const [showPattern, setShowPattern] = useState(true);
  const [speedMode, setSpeedMode] = useState<"slow" | "medium" | "fast">(
    "medium",
  );

  const speedMultiplier = {
    slow: 0.3,
    medium: 0.6,
    fast: 1.0,
  }[speedMode];

  const effectiveSpeed = isThumbnail && !isHovered ? 0 : speedMultiplier;

  const LegendContent = () => (
    <>
      <h2 className="text-lg md:text-xl font-bold mb-2">
        {t("endFedAntenna.title")}
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-2">
        <Trans
          ns="scene"
          i18nKey="endFedAntenna.desc"
          components={{ br: <br /> }}
        />
      </p>

      <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span>{t("endFedAntenna.radiator")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-sm" />
          <span>{t("endFedAntenna.eField")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <span>{t("endFedAntenna.hField")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
          <span>{t("endFedAntenna.pattern")}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Gradient Legend for Wave Strength */}
          <div
            className="w-16 h-3 rounded-sm"
            style={{
              background:
                "linear-gradient(to right, #ef4444, #eab308, #22c55e, #3b82f6)",
            }}
          />
          <span>{t("endFedAntenna.waves")}</span>
        </div>
      </div>
    </>
  );

  const ControlsContent = () => (
    <div className="flex flex-col space-y-3">
      <div className="pt-3 border-t border-white/10 md:border-none md:pt-0">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          {t("common.controls.visualization")}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="wave-mode"
              checked={showWaves}
              onCheckedChange={setShowWaves}
              className="data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-zinc-700 border-zinc-500"
            />
            <Label
              htmlFor="wave-mode"
              className="text-xs md:text-sm text-zinc-300"
            >
              {t("common.controls.showWaves")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="pattern-mode"
              checked={showPattern}
              onCheckedChange={setShowPattern}
              className="data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-zinc-700 border-zinc-500"
            />
            <Label
              htmlFor="pattern-mode"
              className="text-xs md:text-sm text-zinc-300"
            >
              {t("common.controls.showPattern")}
            </Label>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          {t("common.controls.speed")}
        </div>
        <RadioGroup
          defaultValue="medium"
          value={speedMode}
          onValueChange={(v) => setSpeedMode(v as "slow" | "medium" | "fast")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="slow"
              id="r-slow"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="r-slow"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("common.controls.slow")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="medium"
              id="r-medium"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="r-medium"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("common.controls.medium")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="fast"
              id="r-fast"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="r-fast"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("common.controls.fast")}
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`relative w-full ${isThumbnail ? "h-full" : "h-[450px] md:h-[600px]"} border rounded-lg overflow-hidden bg-black touch-none`}
      >
        <Canvas
          camera={{ position: [5, 4, 8], fov: 50 }}
          frameloop={isThumbnail && !isHovered ? "demand" : "always"}
        >
          <color attach="background" args={["#111111"]} />
          <fog attach="fog" args={["#111111", 10, 50]} />

          {!isThumbnail && (
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              zoomSpeed={0.3}
              target={[-2, 1, 0]}
            />
          )}

          <ambientLight intensity={0.5} color={0x404040} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            color={0xffffff}
          />

          <axesHelper args={[5]} />
          <gridHelper
            args={[20, 20, 0x333333, 0x222222]}
            position={[0, -2, 0]}
          />

          <EndFedAntenna speed={effectiveSpeed} />
          {showPattern && <RadiationPattern />}
          {showWaves && (
            <group position={[-2, 1, 0]} rotation={[0, 0, 0.2]}>
              <ElectricFieldInstanced
                antennaType="end-fed"
                polarizationType="horizontal"
                speed={effectiveSpeed}
                amplitudeScale={1.5}
              />
            </group>
          )}
        </Canvas>

        {!isThumbnail && (
          <>
            <div className="hidden md:block absolute top-4 left-4 right-4 md:right-auto md:w-auto p-3 md:p-4 bg-black/70 text-white rounded-lg max-w-full md:max-w-xs pointer-events-none select-none">
              <LegendContent />
            </div>

            <div className="hidden md:block absolute bottom-4 right-4 p-4 bg-black/70 text-white rounded-lg pointer-events-auto">
              <ControlsContent />
            </div>

            <div className="absolute bottom-4 left-4 text-gray-400 text-xs pointer-events-none select-none">
              {t("common.created")}
            </div>
          </>
        )}
      </div>

      {!isThumbnail && (
        <div className="flex flex-col gap-4 md:hidden">
          {/* Mobile Controls below chart */}
          <div className="bg-zinc-900 border rounded-lg p-4">
            <ControlsContent />
          </div>

          {/* Mobile Legend below chart */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4">
            <LegendContent />
          </div>
        </div>
      )}
    </div>
  );
}

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  BufferGeometry,
  CylinderGeometry,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  LineCurve3,
  MeshBasicMaterial,
  Object3D,
  Quaternion,
  SphereGeometry,
  Vector3,
} from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { calculateField } from "~/utils/antenna-physics";
import { ElectricFieldInstanced } from "./electric-field-instanced";

const WIRE_START = new Vector3(-5, -1, 0);
const WIRE_END = new Vector3(5, 3, 0);

function LongWireAntenna({
  speed = 1.0,
  length = 2.5,
}: {
  speed?: number;
  length?: number;
}) {
  const insulatorGeo = useMemo(
    () => new CylinderGeometry(0.05, 0.05, 0.2, 16),
    [],
  );

  useMemo(() => {
    return () => {
      insulatorGeo.dispose();
    };
  }, [insulatorGeo]);

  const startPoint = useMemo(() => WIRE_START.clone(), []);
  const endPoint = useMemo(() => WIRE_END.clone(), []);

  const wireCurve = useMemo(() => {
    return new LineCurve3(startPoint, endPoint);
  }, [startPoint, endPoint]);

  const wireGeo = useMemo(() => {
    const points = wireCurve.getPoints(20);
    return new BufferGeometry().setFromPoints(points);
  }, [wireCurve]);

  useMemo(() => {
    return () => {
      wireGeo.dispose();
    };
  }, [wireGeo]);

  // E-Field and H-Field visualization
  const segmentCount = 60; // Increased resolution for higher harmonics

  const eRef = useRef<InstancedMesh>(null);
  const hRef = useRef<InstancedMesh>(null);
  const timeRef = useRef(0);

  // Instanced Meshes for Standing Wave Visualization on the wire
  const eFieldInstances = useMemo(() => {
    const mesh = new InstancedMesh(
      new CylinderGeometry(0.03, 0.03, 1, 8),
      new MeshBasicMaterial({
        color: "#ea580c",
        transparent: true,
        opacity: 0.8,
      }),
      segmentCount,
    );
    return mesh;
  }, []);

  const hFieldInstances = useMemo(() => {
    const geometry = new CylinderGeometry(0.15, 0.15, 0.05, 16);
    const mesh = new InstancedMesh(
      geometry,
      new MeshBasicMaterial({
        color: "#3b82f6",
        transparent: true,
        opacity: 0.8,
      }),
      segmentCount,
    );
    return mesh;
  }, []);

  useMemo(() => {
    return () => {
      if (eFieldInstances.material) {
        if (Array.isArray(eFieldInstances.material)) {
          eFieldInstances.material.forEach((m) => {
            m.dispose();
          });
        } else {
          eFieldInstances.material.dispose();
        }
      }
      hFieldInstances.geometry.dispose();
      if (hFieldInstances.material) {
        if (Array.isArray(hFieldInstances.material)) {
          hFieldInstances.material.forEach((m) => {
            m.dispose();
          });
        } else {
          hFieldInstances.material.dispose();
        }
      }
    };
  }, [eFieldInstances, hFieldInstances]);

  useFrame((_, delta) => {
    timeRef.current += delta * 3 * speed;
    const time = timeRef.current;
    const tempObj = new Object3D();
    const up = new Vector3(0, 1, 0);
    const arbitraryUp = new Vector3(0, 0, 1);

    // Wavenumber k = 2 * PI / lambda (normalized lambda=1)
    // Wire length L in real space is fixed for visualization, but physically it represents 'length' wavelengths.
    // Standing wave distribution: I(z) ~ sin(k * (L - z)) or similar standing wave form.
    // For a wire of length L*lambda, the phase change is 2*PI * L.

    if (eRef.current) {
      for (let i = 0; i < segmentCount; i++) {
        const t = i / (segmentCount - 1);
        // t goes from 0 to 1 along the wire.
        // Effective position z from 0 to 'length'.
        // Standing wave V(z) ~ cos(beta * z) for open end?
        // Let's use the simple standing wave form sin(2*PI * length * t) to see nodes.
        const k = 2 * Math.PI * length;

        // V and I are 90 deg out of phase in space and time.
        // Voltage (E-field) is max at ends (open circuit).
        // const spatialAmp = Math.cos(k * t); // Cosine ensures max at t=0 (if we consider feed/end logic)
        // Actually, for open ends, current is 0, voltage is max.
        // If we treat t=0 and t=1 as ends.

        // Let's stick to a simple visual representation:
        // Standing wave has 'length * 2' lobes (loops).
        const spatialPhase = k * t;
        const standingWave = Math.cos(spatialPhase) * Math.cos(time);

        const amp = standingWave;

        const pos = wireCurve.getPoint(t);
        const tangent = wireCurve.getTangent(t).normalize();

        const normal = new Vector3()
          .crossVectors(tangent, arbitraryUp)
          .normalize();
        if (normal.lengthSq() === 0) {
          arbitraryUp.set(0, 1, 0);
          normal.crossVectors(tangent, arbitraryUp).normalize();
        }

        tempObj.position.copy(pos);
        const quaternion = new Quaternion().setFromUnitVectors(up, normal);
        tempObj.setRotationFromQuaternion(quaternion);
        tempObj.scale.set(1, Math.abs(amp) * 2, 1);
        tempObj.updateMatrix();
        eRef.current.setMatrixAt(i, tempObj.matrix);
      }
      eRef.current.instanceMatrix.needsUpdate = true;
    }

    if (hRef.current) {
      for (let i = 0; i < segmentCount; i++) {
        const t = i / (segmentCount - 1);
        const k = 2 * Math.PI * length;
        // Current (H-field) is 0 at ends. Sin wave.
        const spatialPhase = k * t;
        const standingWave = Math.sin(spatialPhase) * Math.sin(time); // 90 deg time phase diff from E
        const amp = standingWave;

        const pos = wireCurve.getPoint(t);
        const tangent = wireCurve.getTangent(t).normalize();

        tempObj.position.copy(pos);
        const quaternion = new Quaternion().setFromUnitVectors(up, tangent);
        tempObj.setRotationFromQuaternion(quaternion);
        tempObj.scale.set(
          Math.abs(amp) * 1.5 + 0.1,
          1,
          Math.abs(amp) * 1.5 + 0.1,
        );
        tempObj.updateMatrix();
        hRef.current.setMatrixAt(i, tempObj.matrix);
      }
      hRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Wire */}
      <primitive
        object={
          new Line(
            wireGeo,
            new LineBasicMaterial({ color: "#ef4444", linewidth: 2 }),
          )
        }
      />

      {/* Insulators */}
      <mesh
        position={[startPoint.x, startPoint.y, startPoint.z]}
        geometry={insulatorGeo}
        rotation={[0, 0, 1]}
      >
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh
        position={[endPoint.x, endPoint.y, endPoint.z]}
        geometry={insulatorGeo}
        rotation={[0, 0, 1]}
      >
        <meshStandardMaterial color="#fff" />
      </mesh>

      {/* Fields on Wire */}
      <primitive object={eFieldInstances} ref={eRef} />
      <primitive object={hFieldInstances} ref={hRef} />
    </group>
  );
}

function RadiationPattern({ length }: { length: number }) {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 120, 60); // Higher resolution for sharp nulls
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 5; // Scale up to be visible

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);

      // Angle to X axis (wire axis in simplified local calc)
      // Note: calculateField expects angle from axis (0 to PI).
      // Our sphere vertex angleTo(1,0,0) does exactly that (0 to PI).
      const theta = vertex.angleTo(new Vector3(1, 0, 0));

      // Use the physics engine!
      const gain = calculateField(theta, length, "standing");

      // Apply gain to vertex position
      // Add a small epsilon to avoid z-fighting or zero-size
      vertex.normalize().multiplyScalar(Math.max(0.01, gain) * scale);

      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    geo.computeVertexNormals();
    return geo;
  }, [length]);

  useMemo(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  // Align pattern with the wire
  // Wire goes from (-5, -1, 0) to (5, 3, 0).
  // Direction vector:
  const direction = new Vector3().subVectors(WIRE_END, WIRE_START).normalize();
  // We need to rotate the default (X-aligned) pattern to match this direction.
  // Default calculateField assumes wire along Z axis?
  // Wait, in calculateField:
  // "phaseArg = K * z * cosTheta" -> theta is angle from Z axis if z is along Z.
  // BUT: "vertex.angleTo(new Vector3(1, 0, 0))" measures from X axis.
  // So my geometry generation assumes the antenna is along X axis.
  // Therefore, I just need to rotate from X axis to the wire direction.

  const fromVector = new Vector3(1, 0, 0);
  const quaternion = new Quaternion().setFromUnitVectors(fromVector, direction);

  const midPoint = new Vector3()
    .addVectors(WIRE_START, WIRE_END)
    .multiplyScalar(0.5);

  return (
    <group position={midPoint}>
      <mesh geometry={geometry} quaternion={quaternion}>
        <meshBasicMaterial
          color="#22c55e"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function LongWireAntennaScene({
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
  // Default length 4 lambda
  const [length, setLength] = useState(2);

  const speedMultiplier = {
    slow: 0.3,
    medium: 0.6,
    fast: 1.0,
  }[speedMode];

  const effectiveSpeed = isThumbnail && !isHovered ? 0 : speedMultiplier;

  // Legend and Control logic
  const direction = new Vector3().subVectors(WIRE_END, WIRE_START).normalize();
  const rotationAngle = Math.atan2(direction.y, direction.x);
  const midPoint = new Vector3()
    .addVectors(WIRE_START, WIRE_END)
    .multiplyScalar(0.5);

  // Legend and Control logic
  const LegendContent = () => (
    <>
      <h2 className="text-lg md:text-xl font-bold mb-2">
        {t("longWireAntenna.title")}
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-2">
        <Trans
          ns="scene"
          i18nKey="longWireAntenna.desc"
          components={{ br: <br /> }}
        />
      </p>

      <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span>{t("longWireAntenna.radiator")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-sm" />
          <span>{t("longWireAntenna.eField")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <span>{t("longWireAntenna.hField")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
          <span>{t("longWireAntenna.pattern")}</span>
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
              className="data-[state=checked]:bg-primary-foreground/80 data-[state=unchecked]:bg-zinc-700 border-zinc-500"
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
              className="data-[state=checked]:bg-primary-foreground/80 data-[state=unchecked]:bg-zinc-700 border-zinc-500"
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
          {t("common.controls.length")}
        </div>
        <RadioGroup
          value={length.toString()}
          onValueChange={(v) => setLength(Number.parseInt(v, 10))}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="2"
              id="l-2"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="l-2"
              className="text-xs cursor-pointer text-zinc-300"
            >
              2λ
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="4"
              id="l-4"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="l-4"
              className="text-xs cursor-pointer text-zinc-300"
            >
              4λ
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="8"
              id="l-8"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="l-8"
              className="text-xs cursor-pointer text-zinc-300"
            >
              8λ
            </Label>
          </div>
        </RadioGroup>
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
          camera={{ position: [5, 5, 12], fov: 45 }}
          frameloop={isThumbnail && !isHovered ? "demand" : "always"}
        >
          <color attach="background" args={["#111111"]} />
          <fog attach="fog" args={["#111111", 10, 60]} />

          {!isThumbnail && (
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              zoomSpeed={0.3}
              target={[0, 1, 0]}
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

          <LongWireAntenna speed={effectiveSpeed} length={length} />
          {showPattern && <RadiationPattern length={length} />}
          {showWaves && (
            <group position={midPoint} rotation={[0, 0, rotationAngle]}>
              <ElectricFieldInstanced
                key={length}
                antennaType="long-wire"
                polarizationType="horizontal"
                speed={effectiveSpeed}
                amplitudeScale={1.5}
                antennaLength={length}
              />
            </group>
          )}
        </Canvas>

        {!isThumbnail && (
          <>
            <div className="hidden md:block absolute top-4 left-4 right-4 md:right-auto md:w-auto p-3 md:p-4 bg-black/70 text-white rounded-lg max-w-full md:max-w-xs pointer-events-none select-none">
              <LegendContent />
            </div>

            <div className="hidden md:block absolute bottom-4 right-4 p-4 bg-black/70 text-white rounded-lg pointer-events-auto w-64">
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
          <div className="bg-zinc-900 border rounded-lg p-4">
            <ControlsContent />
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4">
            <LegendContent />
          </div>
        </div>
      )}
    </div>
  );
}

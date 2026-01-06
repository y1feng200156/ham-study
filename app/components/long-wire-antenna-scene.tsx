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
  Quaternion, // Added for quaternion logic
  SphereGeometry,
  Vector3,
} from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { ElectricFieldInstanced } from "./electric-field-instanced";

function LongWireAntenna({ speed = 1.0 }: { speed?: number }) {
  const insulatorGeo = useMemo(
    () => new CylinderGeometry(0.05, 0.05, 0.2, 16),
    [],
  );

  // Antenna wire points
  // Long wire usually starts low and goes high, or is horizontal.
  // Let's model a generic random wire starting from a "shack" (origin) to a support.
  // To make it "Long", we make it > 1 wavelength.
  // Let's assume lambda is approx 4 units. So length 10 is ~2.5 lambda.

  const startPoint = useMemo(() => new Vector3(-5, -1, 0), []);
  const endPoint = useMemo(() => new Vector3(5, 3, 0), []);

  const wireCurve = useMemo(() => {
    return new LineCurve3(startPoint, endPoint);
  }, [startPoint, endPoint]);

  const wireGeo = useMemo(() => {
    const points = wireCurve.getPoints(20);
    return new BufferGeometry().setFromPoints(points);
  }, [wireCurve]);

  // E-Field and H-Field visualization
  const segmentCount = 40;

  // Ref for animating fields
  // We can reuse ElectricFieldInstanced for the main wave propagation visualization in the "air"
  // But strictly for the wire currents/voltages, we might want manual control like in EndFed scene
  // OR we can just use the standard ElectricFieldInstanced for simplicity and consistency if it supports line sources well.
  // The EndFed implementation manually instantiates E/H fields along the wire to show Standing Waves (Voltage/Current distribution).
  // Long wire also has standing waves if unmatched, or traveling waves if terminated.
  // "Long Wire" usually implies standing waves unless it's a Beverage antenna (terminated).
  // Let's assume standing waves (random wire).

  const eRef = useRef<InstancedMesh>(null);
  const hRef = useRef<InstancedMesh>(null);
  const timeRef = useRef(0);

  // Instanced Meshes for Standing Wave Visualization on the wire
  const eFieldInstances = useMemo(() => {
    const mesh = new InstancedMesh(
      new CylinderGeometry(0.02, 0.02, 1, 8),
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
    // Current rings
    const geometry = new CylinderGeometry(0.15, 0.15, 0.05, 16); // Ring-like cylinder
    // Or Torus
    // const geometry = new TorusGeometry(0.15, 0.02, 8, 16);
    // Cylinder is cheaper/easier to align sometimes
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

  useFrame((_, delta) => {
    timeRef.current += delta * 3 * speed;
    const time = timeRef.current;
    const tempObj = new Object3D();
    const up = new Vector3(0, 1, 0); // Y-axis is typically 'up' for cylinders

    if (eRef.current) {
      for (let i = 0; i < segmentCount; i++) {
        const t = i / (segmentCount - 1);
        // Standing wave pattern for ~2.5 wavelengths (5 half-waves)
        // V(x) distribution
        const k = 2.5 * 2 * Math.PI; // Total phase change
        const spatialAmp = Math.sin(t * k); // 0 at start, varying
        const timeAmp = Math.sin(time);
        const amp = spatialAmp * timeAmp;

        const pos = wireCurve.getPoint(t);
        const tangent = wireCurve.getTangent(t).normalize();
        // E-field is perpendicular to the wire.
        // To get a perpendicular vector, we can cross the tangent with an arbitrary non-collinear vector.
        // If the wire is in XY plane, Z is perpendicular. If wire is 3D, it's more complex.
        // For visualization, let's assume E-field is in the plane containing the wire and a global 'up' vector.
        const arbitraryUp = new Vector3(0, 0, 1); // Use Z-axis as a general 'up' for perpendicular calculation
        const normal = new Vector3()
          .crossVectors(tangent, arbitraryUp)
          .normalize();
        if (normal.lengthSq() === 0) {
          // Handle case where tangent is parallel to arbitraryUp
          arbitraryUp.set(0, 1, 0); // Try Y-axis instead
          normal.crossVectors(tangent, arbitraryUp).normalize();
        }

        tempObj.position.copy(pos);
        // Align cylinder (which is along Y-axis by default) to the normal vector
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
        // Current distribution shifted by 90 deg (PI/2) spatially and temporally relative to voltage
        const k = 2.5 * 2 * Math.PI;
        const spatialAmp = Math.cos(t * k);
        const timeAmp = Math.cos(time);
        const amp = spatialAmp * timeAmp;

        const pos = wireCurve.getPoint(t);
        const tangent = wireCurve.getTangent(t).normalize();

        tempObj.position.copy(pos);
        // Align cylinder (which is along Y-axis by default) to the tangent vector
        const quaternion = new Quaternion().setFromUnitVectors(up, tangent);
        tempObj.setRotationFromQuaternion(quaternion);
        tempObj.scale.set(
          Math.abs(amp) * 1.5 + 0.1,
          1,
          Math.abs(amp) * 1.5 + 0.1,
        ); // Scale radius
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

function RadiationPattern() {
  // Long wire pattern: Multiple lobes.
  // Main lobes are angled towards the wire axis in the direction of wave travel (if traveling)
  // or symmetric if standing wave.
  // For standing wave (unmatched): 4 main lobes for 1 wavelength, more for longer.
  // Let's visualize a generic multi-lobed shape.

  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 90, 60);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 4;

    // Wire axis roughly X? Our wire is diagonal-ish in X-Y plane.
    // Let's simplify and make the pattern aligned to X-axis and tilt the whole group to match wire.
    // Wire vector: (10, 4, 0) -> normalized.

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);

      // Calculate angle theta from X-axis
      // const theta = Math.acos(vertex.x / vertex.length());
      // Formula for long wire pattern approx: | sin(theta) * sin(n * pi * (1 - cos(theta))) | ??
      // Let's use a simpler lobing function: |sin( L * cos(theta))|
      // L relates to length in wavelengths.

      const angle = vertex.angleTo(new Vector3(1, 0, 0)); // Angle to X axis

      // Pattern factor
      // A simple multi-lobe pattern: |sin(k * cos(angle))|
      // k = 2.5 * PI (for 2.5 wavelengths)
      const k = 2.5 * Math.PI;
      // We also need sin(theta) factor for element factor if it's wire
      const gain = Math.abs(Math.sin(angle) * Math.sin(k * Math.cos(angle)));

      // Add distinct lobes
      vertex.normalize().multiplyScalar(Math.max(0.01, gain) * scale);

      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Determine wire angle
  const start = new Vector3(-5, -1, 0);
  const end = new Vector3(5, 3, 0);
  const direction = new Vector3().subVectors(end, start).normalize();

  // Calculate rotation angle relative to X-axis pattern
  const rotationAngle = Math.acos(new Vector3(1, 0, 0).dot(direction));

  return (
    <group position={[0, 1, 0]}>
      <mesh geometry={geometry} rotation={[0, 0, rotationAngle]}>
        {" "}
        {/* rotationAngle is around Z axis because wire is in X-Y plane */}
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

  const speedMultiplier = {
    slow: 0.3,
    medium: 0.6,
    fast: 1.0,
  }[speedMode];

  const effectiveSpeed = isThumbnail && !isHovered ? 0 : speedMultiplier;

  // Legend and Control logic (similar to others)
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
        <div className="flex items-center gap-2">
          <div
            className="w-16 h-3 rounded-sm"
            style={{
              background:
                "linear-gradient(to right, #ef4444, #eab308, #22c55e, #3b82f6)",
            }}
          />
          <span>{t("longWireAntenna.waves")}</span>
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

          <LongWireAntenna speed={effectiveSpeed} />
          {showPattern && <RadiationPattern />}
          {showWaves && (
            <ElectricFieldInstanced
              antennaType="long-wire"
              polarizationType="horizontal" // Generalization, as it's mixed
              speed={effectiveSpeed}
              amplitudeScale={1.5}
            />
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

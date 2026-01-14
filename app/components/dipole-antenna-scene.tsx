import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CatmullRomCurve3, DoubleSide, SphereGeometry, Vector3 } from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { ElectricFieldInstanced } from "./electric-field-instanced";

// Dipole Geometry Component
function DipoleStructure({
  length,
  isInvertedV,
}: {
  length: number;
  isInvertedV: boolean;
}) {
  const armLength = length / 2;
  const angle = isInvertedV ? (120 * Math.PI) / 180 : Math.PI; // 120 degrees or 180 (straight)
  const droopAngle = (Math.PI - angle) / 2;

  // Cylinder geometry for arms
  // Left Arm (Z-)
  // Rotate around X? No, around Z usually if wire is X.
  // Let's assume wire layout is usually along Z axis in our scenes (Horizontal).
  // If "Horizontal", wire is along Z.
  // Inverted V drops the ends (low Y). So rotate around X axis.

  const rotation = isInvertedV ? droopAngle : 0;

  return (
    <group>
      {/* Feedpoint */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#fff" />
      </mesh>

      {/* Arm 1 (+Z) */}
      <group rotation={[rotation, 0, 0]}>
        <mesh position={[0, 0, armLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, armLength, 16]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Arm 2 (-Z) */}
      <group rotation={[-rotation, 0, 0]}>
        <mesh position={[0, 0, -armLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, armLength, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>

      {/* Current Distribution Visualization (Standing Wave) */}
      <StandingWaveVisualizer length={length} isInvertedV={isInvertedV} />
    </group>
  );
}

function RadiationPattern({
  length,
  isInvertedV,
}: {
  length: number;
  isInvertedV: boolean;
}) {
  const geometry = useMemo(() => {
    // High resolution for smooth pattern
    const geo = new SphereGeometry(1, 90, 45);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 5; // Visual scale

    // L is total length in wavelengths
    // The prop 'length' passed here is actually physical length in the scene (lengthFactor * visualScale)
    // We need "length in wavelengths" (lengthFactor) for the formula.
    // However, DipoleStructure receives 'physicalLength' which is lengthFactor * 6.
    // We need to reverse this or pass lengthFactor directly.
    // physicalLength = lengthFactor * 6. So L_lambda = length / 6.
    const L_lambda = length / 6;

    // kL/2 = pi * L_lambda
    const kL_2 = Math.PI * L_lambda;

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      vertex.normalize();

      // Dipole axis is Z.
      // Theta is angle with Z-axis. cos(theta) = z component of normalized vertex.
      const cosTheta = vertex.z;
      const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);

      // Formula: F(theta) = (cos(kL/2 * cos(theta)) - cos(kL/2)) / sin(theta)
      // Avoid division by zero at poles (sinTheta = 0)
      let gain = 0;
      if (sinTheta > 0.001) {
        const num = Math.cos(kL_2 * cosTheta) - Math.cos(kL_2);
        gain = Math.abs(num / sinTheta);
      } else {
        // Limit at poles? For half-wave it's 0.
        // For L=1 lambda, it might be non-zero?
        // Let's just clamp.
        gain = 0;
      }

      // Normalize gain for visualization consistency?
      // Standard half-wave max gain is 1. (Normalized).
      // The formula naturally produces nice values.

      // Apply Inverted V distortion roughly?
      // Inverted V tilts the lobes down (towards -Y?).
      // The wire bends at X-axis rotating around X?
      // Let's stick to ideal dipole pattern for now to avoid confusion,
      // as the exact pattern of V is complex integral.
      // Maybe reduce gain slightly to show it's less efficient?
      if (isInvertedV) {
        gain *= 0.9;
      }

      vertex.multiplyScalar(gain * scale);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geo.computeVertexNormals();
    geo.computeVertexNormals();
    return geo;
  }, [length, isInvertedV]);

  useMemo(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color="#22c55e"
        wireframe
        transparent
        opacity={0.3}
        side={DoubleSide}
      />
    </mesh>
  );
}

function StandingWaveVisualizer({
  length,
  isInvertedV,
}: {
  length: number;
  isInvertedV: boolean;
}) {
  // Visualize Current: Sine wave standing on the wire
  // Current I(z) = I_max * sin(k * (L/2 - |z|))
  // For half wave: L = lambda/2. kL/2 = pi/2.
  // I(z) ~ cos(k*z)? No, 0 at ends.
  // Half wave: Max at center, 0 at ends.
  // Shape is roughly sine arch.

  // Construct a curve? Or just a dynamic mesh?
  // Let's use a TubeGeometry along a path that bulges?
  // Or simpler: A flat shape (plane) that scales?
  // Let's use points to draw a line is simpler for visualization?
  // Or just a shape.
  // Let's use a dynamic custom geometry or simpler scaled spheres?
  // A "Tube" following the standing wave envelope might be nice.

  // Let's create points for a Line.
  const points = useMemo(() => {
    const pts = [];
    const segments = 50;
    const armLength = length / 2;
    const droopAngle = isInvertedV ? (Math.PI - (120 * Math.PI) / 180) / 2 : 0;

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * 2 - 1; // -1 to 1
      const z = t * armLength;

      // Physical position of wire point
      // If Inverted V:
      // y = -absZ * sin(droopAngle)
      // newZ = z * cos(droopAngle)
      // But wait, z wraps along the wire.

      const wireY = -Math.abs(z) * Math.sin(droopAngle);
      const wireZ = z * Math.cos(droopAngle);

      // Standing Wave Height (Current Magnitude)
      // Current is 0 at ends (|z| = armLength), Max at center (z=0)
      // Shape: cos(pi/2 * z / armLength)
      const magnitude = Math.cos((Math.PI / 2) * t);

      // We displace UP from the wire (Y direction local to wire?)
      // Global Up (Y) is fine.
      pts.push(new Vector3(0, wireY + magnitude * 0.5, wireZ));
    }
    return pts; // This is just the "Current" line
  }, [length, isInvertedV]);

  // curve is just data (CatmullRomCurve3), doesn't need dispose.
  const curve = useMemo(() => new CatmullRomCurve3(points), [points]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
      <meshBasicMaterial color="yellow" transparent opacity={0.6} />
    </mesh>
  );
}

export default function DipoleAntennaScene({
  isThumbnail = false,
  isHovered = false,
}: {
  isThumbnail?: boolean;
  isHovered?: boolean;
}) {
  const { t } = useTranslation("scene");
  const [showWaves, setShowWaves] = useState(true);
  const [showPattern, setShowPattern] = useState(true);
  const [isInvertedV, setIsInvertedV] = useState(false);
  // Length in "lambda". Standard is 0.5.
  const [lengthFactor, setLengthFactor] = useState(0.5);

  const [speedMode, setSpeedMode] = useState<"slow" | "medium" | "fast">(
    "medium",
  );

  const speedMultiplier = {
    slow: 0.3,
    medium: 0.6,
    fast: 1.0,
  }[speedMode];

  const effectiveSpeed = isThumbnail && !isHovered ? 0 : speedMultiplier;

  // Physical length scale for visualization
  // Let's say lambda = 10 units?
  // We passed 'antennaLength' to E-field. In our E-field logic, we treated it as Lambda fraction.
  // So we pass 'lengthFactor' directly.

  // For Geometry:
  // If lambda is standard, say 4 units.
  // Arm length = lengthFactor * 4.
  const visualScale = 6;
  const physicalLength = lengthFactor * visualScale;

  const ControlsContent = () => (
    <div className="flex flex-col space-y-3">
      <div className="pt-3 border-t border-white/10 md:border-none md:pt-0">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          {t("common.controls.visualization")}
        </div>
        <div className="flex flex-col space-y-2">
          {/* Inverted V Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="inv-v-mode"
              checked={isInvertedV}
              onCheckedChange={setIsInvertedV}
              className="data-[state=checked]:bg-primary-foreground/80 data-[state=unchecked]:bg-zinc-700 border-zinc-500"
            />
            <Label
              htmlFor="inv-v-mode"
              className="text-xs md:text-sm text-zinc-300"
            >
              {t("common.controls.invertedV")}
            </Label>
          </div>

          {/* Show Waves Toggle */}
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

          {/* Show Pattern Toggle */}
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
          defaultValue="0.5"
          value={lengthFactor.toString()}
          onValueChange={(v) => setLengthFactor(Number.parseFloat(v))}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="0.5"
              id="l-half"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="l-half"
              className="text-xs cursor-pointer text-zinc-300"
            >
              0.5λ
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="1.0"
              id="l-full"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="l-full"
              className="text-xs cursor-pointer text-zinc-300"
            >
              1.0λ
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="1.5"
              id="l-1.5"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="l-1.5"
              className="text-xs cursor-pointer text-zinc-300"
            >
              1.5λ
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
          camera={{ position: [5, 5, 10], fov: 45 }}
          frameloop={isThumbnail && !isHovered ? "demand" : "always"}
        >
          <color attach="background" args={["#111111"]} />
          <fog attach="fog" args={["#111111", 10, 50]} />

          {!isThumbnail && (
            <OrbitControls enableDamping dampingFactor={0.05} zoomSpeed={0.3} />
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

          <DipoleStructure length={physicalLength} isInvertedV={isInvertedV} />

          {showPattern && (
            <RadiationPattern
              length={physicalLength}
              isInvertedV={isInvertedV}
            />
          )}

          {showWaves && (
            <ElectricFieldInstanced
              antennaType="dp"
              polarizationType="horizontal"
              speed={effectiveSpeed}
              amplitudeScale={1.5}
              antennaLength={lengthFactor} // Passing lambda fraction
              radialAngle={isInvertedV ? "120" : "180"} // Just for potential use
            />
          )}
        </Canvas>

        {!isThumbnail && (
          <>
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
        </div>
      )}
    </div>
  );
}

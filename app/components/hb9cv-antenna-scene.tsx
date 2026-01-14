import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CatmullRomCurve3, SphereGeometry, Vector3 } from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { ElectricFieldInstanced } from "./electric-field-instanced";

function RadiationPattern() {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 60, 40);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 3; // Visual scale

    // HB9CV Cardiod Pattern Parameters
    const kd = Math.PI / 4; // 45 degrees spacing (lambda/8)
    const delta = (5 * Math.PI) / 4; // 225 degrees phase shift

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      vertex.normalize();

      // Angle from X-axis (Main Beam Direction)
      // cosTheta = x coordinate (if normalized) ??
      // Actually, for full 3D pattern, angle is between position vector and axis (+X).
      // cosTheta = vertex.x / 1.
      const cosTheta = vertex.x;

      // Array Factor Magnitude
      // AF = | 1 + exp(j(kd * cosTheta + delta)) |
      // AF = sqrt( 2 * (1 + cos(kd * cosTheta + delta)) )

      const psi = kd * cosTheta + delta;
      let gain = Math.sqrt(2 * (1 + Math.cos(psi)));

      // Normalize max gain (sqrt(2) approx 1.414) to 1 for visual consistency
      gain = gain / Math.SQRT2;

      // Add a small floor so the mesh doesn't disappear completely
      gain = Math.max(gain, 0.05);

      // Apply gain to vertex distance
      vertex.multiplyScalar(gain * scale);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useMemo(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <group>
      <mesh geometry={geometry}>
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

function HB9CVAntenna() {
  // HB9CV Geometry (Aligned to X-axis for consistency with Yagi/ElectricField)
  // Boom: Along X axis.
  // Elements: Along Z axis (Horizontal Polarization).
  // Front (Director/Driver 2): +X direction.
  // Rear (Reflector/Driver 1): -X direction.

  const spacing = 0.6; // Visual spacing (lambda/8 ~ 0.5m scaled)
  const xFront = spacing / 2;
  const xRear = -spacing / 2;

  const lenFront = 2.8; // ~ 0.94 * 3
  const lenRear = 3.0; // ~ 1.0 * 3

  // Phasing Line Points
  const phaseLinePoints = useMemo(() => {
    // A Z-shaped line between the two feedpoints
    // Front Feed: (xFront, 0, 0)
    // Rear Feed: (xRear, 0, 0)
    return [
      new Vector3(xRear, 0, 0),
      new Vector3(0, 0.2, 0), // Up hump
      new Vector3(xFront, 0, 0),
    ];
  }, [xFront, xRear]);

  const curve = useMemo(
    () => new CatmullRomCurve3(phaseLinePoints),
    [phaseLinePoints],
  );

  // Note: TubeGeometry is created inline in the JSX like <tubeGeometry args={[curve, ...]} />.
  // R3F handles automatic disposal for objects declared in JSX (primitives/elements).
  // Only useMemo'd objects that aren't 'attached' need manual dispose.
  // CatmullRomCurve3 doesn't have a dispose() (it's just data).
  // The 'geometry' in RadiationPattern DOES need it.

  return (
    <group>
      {/* Boom (Along X) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, spacing + 0.2, 16]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Rear Element (At -X, Along Z) */}
      <mesh position={[xRear, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, lenRear, 16]} />
        <meshStandardMaterial color="#3b82f6" />
        <mesh position={[0, lenRear / 2, 0]}>{/* Cap or detail? */}</mesh>
      </mesh>

      {/* Front Element (At +X, Along Z) */}
      <mesh position={[xFront, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, lenFront, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Phasing Line Visualization */}
      <mesh>
        <tubeGeometry args={[curve, 20, 0.015, 8, false]} />
        <meshStandardMaterial color="#eab308" />
      </mesh>

      {/* Mast */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 4, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

export default function HB9CVAntennaScene({
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
        {t("hb9cvAntenna.title")}
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-2">
        <Trans
          ns="scene"
          i18nKey="hb9cvAntenna.desc"
          components={{ br: <br /> }}
        />
      </p>

      <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span>{t("hb9cvAntenna.frontElement")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <span>{t("hb9cvAntenna.rearElement")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
          <span>{t("hb9cvAntenna.phaseLine")}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Gradient Legend for E-field Strength */}
          <div
            className="w-16 h-3 rounded-sm"
            style={{
              background:
                "linear-gradient(to right, #ef4444, #eab308, #22c55e, #3b82f6)",
            }}
          />
          <span>{t("hb9cvAntenna.strength")}</span>
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
          camera={{ position: [5, 8, 8], fov: 45 }}
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

          <HB9CVAntenna />

          {showPattern && <RadiationPattern />}

          {/* Surface/Field Mode */}
          {showWaves && (
            <ElectricFieldInstanced
              antennaType="hb9cv"
              polarizationType="horizontal"
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

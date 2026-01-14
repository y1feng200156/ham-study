import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SphereGeometry, Vector3 } from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { ElectricFieldInstanced } from "./electric-field-instanced";

function GPAntenna({ radialAngle }: { radialAngle: "60" | "135" }) {
  const radials = 4;
  const radialLen = 2;
  // Radial Angle is the angle from the VERTICAL axis (Zenith).
  // 90 deg = Horizontal.
  // 135 deg = Drooping (pointing down 45 deg from horizontal).
  // 60 deg = Uptilted (pointing up 30 deg from horizontal).
  const angleFromVertical =
    radialAngle === "135" ? (135 * Math.PI) / 180 : (60 * Math.PI) / 180;

  return (
    <group position={[0, 3, 0]}>
      {/* Vertical Radiator */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Feedpoint */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#fff" />
      </mesh>

      {/* Radials */}
      {Array.from({ length: radials }).map((_, i) => {
        const angle = (i / radials) * Math.PI * 2;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static array length
          <group key={`radial-${i}`} rotation={[0, angle, 0]}>
            <group rotation={[0, 0, -angleFromVertical]}>
              <mesh position={[0, radialLen / 2, 0]}>
                <cylinderGeometry args={[0.015, 0.015, radialLen, 16]} />
                <meshStandardMaterial color="#3b82f6" />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Mast */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 6, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

function RadiationPattern({ radialAngle }: { radialAngle: "60" | "135" }) {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 40, 30);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 5;

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      vertex.normalize();

      // GP Pattern
      // Omnidirectional in Azimuth (XZ plane).
      // Vertical pattern varies. Low takeoff angle usually.
      // Null at zenith (straight up).

      // Monopole Formula from mds/gp.md
      // F(theta) = (cos(PI/2 * cos(theta))) / sin(theta)
      // theta is angle from vertical (Zenith).
      // In Three.js, vertex.y is cos(theta).
      // sin(theta) is sqrt(1 - y^2).

      const cosTheta = vertex.y;
      const sinTheta = Math.sqrt(1.0 - cosTheta * cosTheta);

      let gain = 0;

      // Avoid division by zero at poles (theta=0 or 180, sinTheta=0)
      // Avoid division by zero at poles
      if (sinTheta > 0.001) {
        if (radialAngle === "135") {
          // 135 deg (Drooping): Behaves closer to a vertical dipole
          // Standard 1/4 wave monopole on ground plane formula:
          // F(theta) = (cos(PI/2 * cos(theta))) / sin(theta)
          const num = Math.cos((Math.PI / 2) * cosTheta);
          // Allow full sphere radiation (donut shape)
          gain = Math.abs(num / sinTheta);
        } else {
          // 60 deg (Uptilted / Bowl):
          // Radials act as a reflector, pushing the beam UPWARDS.
          // We aim for a peak elevation around 45-60 degrees up.

          // 2. Beam Shaping for "Bowl" effect
          // We want to shift the peak from horizon (y=0) to upwards (y>0).
          // Let's use a directional factor peaked at target elevation.
          const elevation = Math.asin(vertex.y); // -PI/2 to PI/2
          const targetElevation = Math.PI / 4; // 45 deg up

          // Simple beam shape: cos(elevation - target)
          // Squaring it makes it tighter.
          const beamShape = Math.cos(elevation - targetElevation);

          // Combine:
          // We use the beamShape primarily, but keep some monopole characteristic?
          // Actually, purely directional beam might be clearer for visualization.
          gain = beamShape * beamShape * beamShape;

          // Ensure null at zenith if strictly vertical wire?
          // Vertical wire always has null at zenith.
          if (vertex.y > 0.98) gain = 0;

          // Boost scale slightly to match visual bulk of other patterns
          gain *= 1.2;
        }
      } else {
        gain = 0;
      }

      vertex.multiplyScalar(gain * scale);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    geo.computeVertexNormals();
    return geo;
  }, [radialAngle]);

  useMemo(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <group position={[0, 3, 0]}>
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

export default function GPAntennaScene({
  isThumbnail = false,
  isHovered = false,
}: {
  isThumbnail?: boolean;
  isHovered?: boolean;
}) {
  const { t } = useTranslation("scene");
  const [showWaves, setShowWaves] = useState(true);
  const [showPattern, setShowPattern] = useState(true);
  const [radialAngle, setRadialAngle] = useState<"60" | "135">("135");
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
        {t("gpAntenna.title")}
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-2">
        <Trans
          ns="scene"
          i18nKey="gpAntenna.desc"
          components={{ br: <br /> }}
        />
      </p>

      <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span>{t("gpAntenna.radiator")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <span>{t("gpAntenna.radials")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
          <span>{t("gpAntenna.pattern")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-3 rounded-sm bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
          <span>{t("gpAntenna.eField")}</span>
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
          {t("gpAntenna.radialAngle")}
        </div>
        <RadioGroup
          defaultValue="135"
          value={radialAngle}
          onValueChange={(v) => setRadialAngle(v as "60" | "135")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="60"
              id="angle-60"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="angle-60"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("gpAntenna.angle60")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="135"
              id="angle-135"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="angle-135"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("gpAntenna.angle135")}
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
          camera={{ position: [10, 5, 10], fov: 45 }}
          frameloop={isThumbnail && !isHovered ? "demand" : "always"}
        >
          <color attach="background" args={["#111111"]} />
          <fog attach="fog" args={["#111111", 10, 50]} />

          {!isThumbnail && (
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              zoomSpeed={0.3}
              target={[0, 3, 0]}
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
            position={[0, -3, 0]}
          />

          <GPAntenna radialAngle={radialAngle} />
          {showPattern && <RadiationPattern radialAngle={radialAngle} />}
          {/* Surface/Field Mode */}
          {showWaves && (
            <group position={[0, 3, 0]}>
              <ElectricFieldInstanced
                antennaType="gp"
                polarizationType="vertical"
                speed={effectiveSpeed}
                amplitudeScale={1.5}
                radialAngle={radialAngle}
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

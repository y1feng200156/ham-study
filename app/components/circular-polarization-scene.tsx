import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";

import { ElectricFieldInstanced } from "./electric-field-instanced";

function HelicalAntenna() {
  const points = useMemo(() => {
    const pts = [];
    const turns = 6;
    const height = 4;
    const radius = 0.5;
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const angle = t * Math.PI * 2 * turns;
      const x = t * height;
      const y = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      pts.push(new Vector3(x, y, z));
    }
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useMemo(() => {
    return () => {
      lineGeometry.dispose();
    };
  }, [lineGeometry]);

  const line = useMemo(() => {
    const mat = new LineBasicMaterial({ color: "#ef4444", linewidth: 3 });
    return new Line(lineGeometry, mat);
  }, [lineGeometry]);

  useMemo(() => {
    return () => {
      line.material.dispose();
    };
  }, [line]);

  return (
    <group position={[-2, 0, 0]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
      <primitive object={line} />
      <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    </group>
  );
}

function RadiationPattern() {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 60, 40);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 8;

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      vertex.normalize();

      // Circular polarization (Axial Mode): Highly directional beam along +X axis
      // (Helix axis)
      const cosAngle = vertex.x;
      const gain = cosAngle > 0 ? cosAngle ** 3 * 1.5 : 0.1;
      // const gain = 0.8 + 0.2 * horizontalComponent; // Old Omni pattern

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
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function CircularPolarizationScene({
  isThumbnail = false,
  isHovered = false,
}: {
  isThumbnail?: boolean;
  isHovered?: boolean;
}) {
  const { t } = useTranslation("scene");
  const [isRHCP, setIsRHCP] = useState(true);
  const [showWaves, setShowWaves] = useState(true);
  const [showPattern, setShowPattern] = useState(true);
  const [speedMode, setSpeedMode] = useState<"slow" | "medium" | "fast">(
    "medium",
  );
  // Removed vizMode logic

  const speedMultiplier = {
    slow: 0.3,
    medium: 0.6,
    fast: 1.0,
  }[speedMode];

  const effectiveSpeed = isThumbnail && !isHovered ? 0 : speedMultiplier;

  const LegendContent = () => (
    <>
      <h2 className="text-lg md:text-xl font-bold mb-2">
        {t("circularPolarization.title")}
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-2">
        <Trans
          ns="scene"
          i18nKey="circularPolarization.desc"
          components={{ br: <br /> }}
        />
      </p>

      <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span>{t("circularPolarization.driven")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded-sm" />
          <span>{t("circularPolarization.parasitic")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
          <span>{t("circularPolarization.pattern")}</span>
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
          <span>{t("circularPolarization.strength")}</span>
        </div>
      </div>
    </>
  );

  const ControlsContent = () => (
    <div className="flex flex-col space-y-3">
      {/* Visualization Mode */}
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

      {/* Function Toggles */}
      <div className="flex items-center justify-between space-x-4">
        <Label
          htmlFor="polarization-toggle"
          className="text-xs md:text-sm text-gray-300 whitespace-nowrap"
        >
          {t("circularPolarization.polarization")}{" "}
          {isRHCP
            ? t("circularPolarization.rhcp")
            : t("circularPolarization.lhcp")}
        </Label>
        <Switch
          id="polarization-toggle"
          checked={isRHCP}
          onCheckedChange={setIsRHCP}
          className="data-[state=checked]:bg-primary-foreground/80 data-[state=unchecked]:bg-zinc-700 border-zinc-500"
        />
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
          camera={{ position: [5, 5, 10], fov: 50 }}
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

          <HelicalAntenna />
          {showPattern && <RadiationPattern />}
          {showWaves && (
            <ElectricFieldInstanced
              antennaType="helical"
              polarizationType="circular"
              speed={effectiveSpeed}
              amplitudeScale={1.5}
              isRHCP={isRHCP}
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

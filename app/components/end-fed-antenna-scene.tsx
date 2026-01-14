import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  Line,
  LineBasicMaterial,
  LineCurve3,
  SphereGeometry,
  Vector3,
} from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { ElectricFieldInstanced } from "./electric-field-instanced";

const wireLength = 8;
const wireHeight = 2;

function EndFedAntenna() {
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
  // Removed internal field visualization in favor of ElectricFieldInstanced

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
    </group>
  );
}

function RadiationPattern({ harmonic = 1 }: { harmonic?: number }) {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 90, 60);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 5;

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      const originalDir = vertex.clone().normalize();

      // Theoretical Formula Calculation
      // We align the pattern along the X axis (Dipole axis)
      // theta is angle from X axis.
      // x component corresponds to cos(theta)
      // y,z components correspond to sin(theta) part
      // cos(theta) = x / r (r=1 here) -> x
      // sin(theta) = sqrt(y^2 + z^2)

      const cosTheta = originalDir.x;
      const sinTheta = Math.sqrt(
        originalDir.y * originalDir.y + originalDir.z * originalDir.z,
      );

      // Avoid division by zero
      const safeSinTheta = Math.max(0.001, sinTheta);

      let gain = 0;
      const n = harmonic;

      if (n % 2 === 1) {
        // Odd harmonic (1, 3, 5...)
        // F(theta) = cos(n * pi/2 * cosTheta) / sinTheta
        const num = Math.cos(((n * Math.PI) / 2) * cosTheta);
        gain = Math.abs(num / safeSinTheta);
      } else {
        // Even harmonic (2, 4...)
        // F(theta) = sin(n * pi/2 * cosTheta) / sinTheta
        const num = Math.sin(((n * Math.PI) / 2) * cosTheta);
        gain = Math.abs(num / safeSinTheta);
      }

      // Normalize gain somewhat so it fits
      // For n=1, max is 1. For higher n, max can be different ??
      // Actually standard formula usually normalized to 1, but let's check.
      // n=2, max at 45deg -> cos(45)=0.707. n*pi/2*0.707 = pi*0.707 = 2.22 rad. sin(2.22)=0.8. sin(45)=0.707. gain ~ 1.1.
      // It's reasonably normalized.

      vertex.multiplyScalar(gain * scale);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, [harmonic]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color="#22c55e"
        wireframe={true}
        transparent={true}
        opacity={0.3}
        side={2} // DoubleSide
      />
    </mesh>
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
  const [harmonic, setHarmonic] = useState(1);

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
          {/* Harmonic Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs md:text-sm text-zinc-300">
              Harmonic Mode
            </Label>
            <RadioGroup
              value={harmonic.toString()}
              onValueChange={(v) => setHarmonic(parseInt(v, 10))}
              className="grid grid-cols-4 gap-2"
            >
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={n.toString()}
                    id={`h-${n}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`h-${n}`}
                    className={`
                      w-full text-center py-1 px-2 rounded cursor-pointer text-xs
                      ${
                        harmonic === n
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      }
                    `}
                  >
                    {n}x (
                    {n === 1
                      ? "Fund."
                      : n === 2
                        ? "2nd"
                        : n === 3
                          ? "3rd"
                          : "4th"}
                    )
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

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

          <EndFedAntenna />
          {showPattern && (
            <group position={[-2, 1, 0]} rotation={[0, 0, Math.atan2(2, -8)]}>
              <RadiationPattern harmonic={harmonic} />
            </group>
          )}
          {showWaves && (
            <group position={[-2, 1, 0]} rotation={[0, 0, Math.atan2(2, -8)]}>
              <ElectricFieldInstanced
                antennaType="end-fed"
                polarizationType="horizontal"
                speed={effectiveSpeed}
                amplitudeScale={1.5}
                activeHarmonic={harmonic}
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

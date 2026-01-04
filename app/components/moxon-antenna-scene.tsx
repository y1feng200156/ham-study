import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
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

const width = 2;
const depth = 0.7;

function MoxonAntenna() {
  // Split driven element to show feedpoint
  const drivenRightPoints = useMemo(
    () => [
      new Vector3(width / 2, 0, depth / 2 - 0.3), // Tip Right
      new Vector3(width / 2, 0, depth / 2), // Corner Right
      new Vector3(0.05, 0, depth / 2), // Feedpoint Right
    ],
    [],
  );

  const drivenLeftPoints = useMemo(
    () => [
      new Vector3(-0.05, 0, depth / 2), // Feedpoint Left
      new Vector3(-width / 2, 0, depth / 2), // Corner Left
      new Vector3(-width / 2, 0, depth / 2 - 0.3), // Tip Left
    ],
    [],
  );

  const refPoints = useMemo(
    () => [
      new Vector3(width / 2, 0, -depth / 2 + 0.3), // Tip Right
      new Vector3(width / 2, 0, -depth / 2), // Corner Right
      new Vector3(-width / 2, 0, -depth / 2), // Corner Left
      new Vector3(-width / 2, 0, -depth / 2 + 0.3), // Tip Left
    ],
    [],
  );

  const drivenRightGeo = useMemo(
    () => new BufferGeometry().setFromPoints(drivenRightPoints),
    [drivenRightPoints],
  );

  const drivenLeftGeo = useMemo(
    () => new BufferGeometry().setFromPoints(drivenLeftPoints),
    [drivenLeftPoints],
  );

  const refGeo = useMemo(
    () => new BufferGeometry().setFromPoints(refPoints),
    [refPoints],
  );

  const drivenRightLine = useMemo(
    () =>
      new Line(
        drivenRightGeo,
        new LineBasicMaterial({ color: "#ef4444", linewidth: 3 }),
      ),
    [drivenRightGeo],
  );

  const drivenLeftLine = useMemo(
    () =>
      new Line(
        drivenLeftGeo,
        new LineBasicMaterial({ color: "#ef4444", linewidth: 3 }),
      ),
    [drivenLeftGeo],
  );

  const refLine = useMemo(() => {
    return new Line(
      refGeo,
      new LineBasicMaterial({ color: "#3b82f6", linewidth: 3 }),
    );
  }, [refGeo]);

  return (
    <group position={[0, 2, 0]}>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <boxGeometry args={[width * 0.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
        <boxGeometry args={[depth * 0.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Antenna Elements */}
      <primitive object={drivenRightLine} />
      <primitive object={drivenLeftLine} />
      <primitive object={refLine} />

      {/* Feedpoint Balun */}
      <mesh position={[0, 0, depth / 2]}>
        <boxGeometry args={[0.1, 0.08, 0.08]} />
        <meshStandardMaterial color="#111" />
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

      // Moxon pattern: high front-to-back ratio
      // Strong forward lobe in +Z direction (towards driven element), very weak back lobe
      let gain = (1 + vertex.z) * 0.6; // Ranges from 0 to 1.2
      if (gain < 0.2) {
        gain = 0.05; // Minimal back lobe
      }

      vertex.multiplyScalar(gain * scale);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group position={[0, 2, 0]}>
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

export default function MoxonAntennaScene({
  isThumbnail = false,
  isHovered = false,
}: {
  isThumbnail?: boolean;
  isHovered?: boolean;
}) {
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
      <h2 className="text-lg md:text-xl font-bold mb-2">莫克森天线 (Moxon)</h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-2">
        一种紧凑型两单元定向天线。矩形结构，末端折叠。
        <br />A compact, rectangular beam antenna with high F/B ratio.
      </p>

      <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span>振子 (有源元件 / Driven)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <span>反射器 (无源元件 / Reflector)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
          <span>辐射方向图 (Pattern)</span>
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
          <span>电场强度 (强 &rarr; 弱)</span>
        </div>
      </div>
    </>
  );

  const ControlsContent = () => (
    <div className="flex flex-col space-y-3">
      {/* Visualization Mode */}
      <div className="pt-3 border-t border-white/10 md:border-none md:pt-0">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          显示模式 (Visualization)
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
              显示电波 (Show Waves)
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
              显示方向图 (Show Pattern)
            </Label>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          电波速度 (Speed)
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
              慢
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
              中
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
              快
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
          camera={{ position: [8, 10, 8], fov: 50 }}
          frameloop={isThumbnail && !isHovered ? "demand" : "always"}
        >
          <color attach="background" args={["#111111"]} />
          <fog attach="fog" args={["#111111", 10, 50]} />

          {!isThumbnail && (
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              zoomSpeed={0.3}
              target={[0, 2, 0]}
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
            position={[0, 0, 0]}
          />

          <MoxonAntenna />
          {showPattern && <RadiationPattern />}
          {/* Surface/Field Mode */}
          {showWaves && (
            <ElectricFieldInstanced
              antennaType="moxon"
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
              Created by BG8ROM - For Ham Radio Education
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

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

interface QuadElementProps {
  position: [number, number, number];
  color?: string;
  rotation?: [number, number, number];
  feedPoint?: "bottom" | "side";
}

function QuadElement({
  position,
  color = "#ef4444",
  rotation = [0, 0, 0],
  feedPoint,
}: QuadElementProps) {
  // A square loop diamond shape or square.
  // Let's do diamond shape (corners at top/bottom/left/right) or Square (flat).
  // Usually "Cubical Quad" is square.
  const size = 2; // Side length

  // Points for a square loop
  const points = useMemo(() => {
    const half = size / 2;
    return [
      new Vector3(-half, -half, 0),
      new Vector3(half, -half, 0),
      new Vector3(half, half, 0),
      new Vector3(-half, half, 0),
      new Vector3(-half, -half, 0),
    ];
  }, []);

  const lineGeo = useMemo(
    () => new BufferGeometry().setFromPoints(points),
    [points],
  );

  const lineObject = useMemo(() => {
    const line = new Line(
      lineGeo,
      new LineBasicMaterial({ color: color, linewidth: 2 }),
    );
    return line;
  }, [lineGeo, color]);

  return (
    <group position={position} rotation={rotation}>
      {/* X shape spreaders support */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.02, 0.02, size * Math.sqrt(2), 8]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.02, 0.02, size * Math.sqrt(2), 8]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      {/* The Wire Loop */}
      <primitive object={lineObject} />

      {/* Feed Point Visualization */}
      {feedPoint === "bottom" && (
        <mesh position={[0, -size / 2, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
      )}
      {feedPoint === "side" && (
        <mesh position={[size / 2, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
      )}
    </group>
  );
}

function QuadAntenna({
  polarization,
}: {
  polarization: "horizontal" | "vertical";
}) {
  return (
    <group position={[0, 2, 0]}>
      {/* Boom */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Mast */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Reflector (Back) */}
      <QuadElement
        position={[-1, 0, 0]}
        color="#3b82f6"
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Driven (Front/Middle) */}
      <QuadElement
        position={[1, 0, 0]}
        color="#ef4444"
        rotation={[0, Math.PI / 2, 0]}
        feedPoint={polarization === "horizontal" ? "bottom" : "side"}
      />
    </group>
  );
}

function RadiationPattern({
  _polarization,
}: {
  _polarization: "horizontal" | "vertical";
}) {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 60, 40);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 8;

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      vertex.normalize();

      // Quad pattern: bidirectional along X-axis (boom is X)?
      // Wait, Yagi fires along X. Quad is YZ plane. Fires along X.
      // Gain is highest along X.
      // But polarization affects the E-field plane.
      // Code was using Math.abs(vertex.z) for gain? That would beam along Z.
      // If boom is X, we want beam along X.

      const gain = Math.abs(vertex.x) ** 2; // Beaming along X axis

      vertex.multiplyScalar(gain * scale);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []); // Pattern geometry is static for now, or could depend on polarization for minor shape changes?
  // Usually Quad pattern is symmetric for both Pols, just rotated E-field.
  // BUT, if I rotate element, the pattern logic was previously sending beam along Z?
  // Previous code: gain = Math.abs(vertex.z)**0.7.
  // If elements were in XY plane, beam would be Z. Correct.
  // Now elements are in YZ plane, beam should be X. Correct.

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

export default function QuadAntennaScene({
  isThumbnail = false,
  isHovered = false,
}: {
  isThumbnail?: boolean;
  isHovered?: boolean;
}) {
  const [showWaves, setShowWaves] = useState(true);
  const [showPattern, setShowPattern] = useState(true);
  const [polarization, setPolarization] = useState<"horizontal" | "vertical">(
    "horizontal",
  );
  const [speedMode, setSpeedMode] = useState<"slow" | "medium" | "fast">(
    "medium",
  );
  // Removed vizMode as we only have 'surface' + 'pattern' toggle now

  const speedMultiplier = {
    slow: 0.3,
    medium: 0.6,
    fast: 1.0,
  }[speedMode];

  const effectiveSpeed = isThumbnail && !isHovered ? 0 : speedMultiplier;

  const LegendContent = () => (
    <>
      <h2 className="text-lg md:text-xl font-bold mb-2">
        方框天线 (Quad Antenna)
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-2">
        也称立方体方框天线 (Cubical Quad)。由两个或多个方形回路组成。
        <br />A directional beam antenna made of wire loops.
      </p>

      <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span>振子环 (有源 / Driven Loop)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <span>反射环 (无源 / Reflector Loop)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
          <span>辐射方向图 (Beams along Boom)</span>
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
      <div className="flex items-center justify-between space-x-4">
        <Label className="text-xs md:text-sm text-gray-300">
          极化:{" "}
          {polarization === "horizontal"
            ? "水平 (Horizontal)"
            : "垂直 (Vertical)"}
        </Label>
        <Switch
          checked={polarization === "vertical"}
          onCheckedChange={(c) =>
            setPolarization(c ? "vertical" : "horizontal")
          }
          className="data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-zinc-700 border-zinc-500"
        />
      </div>

      <div className="pt-3 border-t border-white/10">
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
          camera={{ position: [8, 5, 8], fov: 50 }}
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

          <QuadAntenna polarization={polarization} />
          {showPattern && <RadiationPattern _polarization={polarization} />}
          {showWaves && (
            <group position={[1, 2, 0]}>
              {/* Surface/Field Mode - Always On */}
              <ElectricFieldInstanced
                antennaType="quad"
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

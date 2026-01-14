import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CatmullRomCurve3, DoubleSide, SphereGeometry, Vector3 } from "three";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { ElectricFieldInstanced } from "./electric-field-instanced";

// Helper to get wire geometry points and currents
function getWireSegments(
  harmonic: number, // n = 1, 2, 3, 4...
  visualScale: number,
  isInvertedV: boolean,
) {
  const segments = 80; // Higher segment count for smoother waves
  // Fixed physical visual length (The antenna doesn't grow, the frequency changes)
  // But for visualization of "waves", it is often easier to keep the waves constant size and grow the antenna?
  // No, the user explicitly said: "Fundamental, 2nd Harmonic...".
  // Meaning the antenna is a fixed object, and we are exciting it at different frequencies.
  // In our visualization, usually we keep the antenna size constant on screen.
  // So: L = constant. Lambda shrinks.
  // kL = n * pi.

  const L = visualScale;
  const feedPos = -L / 6; // Offset feed at 33% (approx 17% from center)

  // Feed is properly at 33% from one end?
  // Center is 0. Left is -L/2. Right is L/2.
  // Total L.
  // Feed relative to Left: (-L/6) - (-L/2) = -L/6 + 3L/6 = 2L/6 = L/3.
  // Yes, Feed is at 33% from the Left end.

  const apexZ = feedPos; // Inverted V apex is structurally at the feedpoint support

  // Inverted V Drop
  // 120 deg included angle.
  const angle = isInvertedV ? (120 * Math.PI) / 180 : Math.PI;
  const droopAngle = (Math.PI - angle) / 2;

  const pts: { pos: Vector3; tangent: Vector3; current: number }[] = [];

  const shortLen = L / 3;

  for (let i = 0; i < segments; i++) {
    const d = (i / (segments - 1)) * L; // distance from Left End

    // 1. Position Calculation
    let x = 0,
      y = 0,
      z = 0;
    const tangent = new Vector3();

    if (d < shortLen) {
      // Left Arm (Short)
      // Visual: From Apex extending Left
      const distFromApex = shortLen - d;

      // Vector pointing Left ( -Z ):
      // If flat: (0, 0, -1)
      // If Droop: Rotate down around X axis (Y becomes negative)
      // Z: -cos(droop)
      // Y: -sin(droop)
      const nz = -Math.cos(isInvertedV ? droopAngle : 0);
      const ny = -Math.sin(isInvertedV ? droopAngle : 0);

      z = apexZ + distFromApex * nz;
      y = distFromApex * ny;

      // Tangent (direction of increasing d, i.e. Left->Right)
      // is opposite to the "Apex->Left" vector.
      tangent.set(0, -ny, -nz).normalize();
    } else {
      // Right Arm (Long)
      const distFromApex = d - shortLen;

      // Vector pointing Right ( +Z ):
      const nz = Math.cos(isInvertedV ? droopAngle : 0);
      const ny = -Math.sin(isInvertedV ? droopAngle : 0);

      z = apexZ + distFromApex * nz;
      y = distFromApex * ny;

      // Tangent (Left->Right) is same as Apex->Right vector
      tangent.set(0, ny, nz).normalize();
    }

    // 2. Current Calculation
    // Windom is a standing wave antenna.
    // Boundary conditions: Current is 0 at ends.
    // I(d) ~ sin( k * d )
    // Total length L corresponds to 'harmonic * lambda / 2'.
    // So k * L = harmonic * pi.
    // phase = d/L * (harmonic * pi) ?
    // Check: d=0 -> sin(0)=0. d=L -> sin(harmonic*pi) = 0. Correct.

    const phase = (d / L) * (harmonic * Math.PI);
    const current = Math.sin(phase);

    pts.push({
      pos: new Vector3(x, y, z), // Scene uses Y=up, Z=wire axis
      tangent: tangent,
      current: current,
    });
  }

  return pts;
}

function getInvertedVTilt(harmonic: number): number {
  // Logic updated to "Empirical Visual Alignment" per user request.

  // n=1: User requires "Red Line" angle ~30 deg (Symmetric to Droop).
  if (harmonic === 1) {
    return (30 * Math.PI) / 180;
  }

  // n >= 2: Use Physics-based "ThetaMax - Droop" logic,
  // which correctly yields the flatter angles (21 deg, 0 deg) accepted by user.
  let thetaMax = 90;
  if (harmonic === 2) thetaMax = 51;
  if (harmonic === 3) thetaMax = 37;
  if (harmonic >= 4) thetaMax = 30;

  // Droop Angle (30 deg)
  const droop = 30;

  // Rotation Angle = Resultant Angle from Horizon
  // n=2: 51 - 30 = 21 (Matches "Almost Horizontal")
  // n=4: 30 - 30 = 0 (Horizontal)
  const rotDeg = thetaMax - droop;

  return (rotDeg * Math.PI) / 180;
}

function WindomStructure({
  harmonic,
  isInvertedV,
  visualScale,
}: {
  harmonic: number;
  isInvertedV: boolean;
  visualScale: number;
}) {
  const segments = useMemo(
    () => getWireSegments(harmonic, visualScale, isInvertedV),
    [harmonic, isInvertedV, visualScale],
  );

  const curvePoints = segments.map((s) => s.pos);
  const curve = useMemo(() => new CatmullRomCurve3(curvePoints), [curvePoints]);

  // Standing Wave visualization
  // Displace visually in Y (up/down) to show magnitude
  const wavePoints = useMemo(() => {
    return segments.map((s) => {
      // Add 'current * scale' to the Y position
      return new Vector3(s.pos.x, s.pos.y + s.current * 0.5, s.pos.z);
    });
  }, [segments]);
  const waveCurve = useMemo(
    () => new CatmullRomCurve3(wavePoints),
    [wavePoints],
  );

  // Feedpoint position (Static visual marker)
  const feedZ = -visualScale / 6;

  return (
    <group>
      {/* The Physical Wire */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.03, 8, false]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Feedpoint Box */}
      <mesh position={[0, 0, feedZ]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Current/Standing Wave Visualization (Yellow Line) */}
      <mesh>
        <tubeGeometry args={[waveCurve, 64, 0.02, 8, false]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function RadiationPattern({
  harmonic,
  isInvertedV,
  visualScale,
}: {
  harmonic: number;
  isInvertedV: boolean;
  visualScale: number;
}) {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(1, 72, 36);
    const posAttribute = geo.attributes.position;
    const vertex = new Vector3();
    const scale = 5;

    const segments = getWireSegments(harmonic, visualScale, isInvertedV);

    // k is wavenumber.
    // L_physical = visualScale.
    // But L represents 'harmonic' half-wavelengths.
    // L = n * (lambda / 2)
    // => lambda = 2L / n
    // k = 2pi / lambda = 2pi / (2L/n) = n * pi / L.
    const k = (harmonic * Math.PI) / visualScale;

    // We calculate Far Field pattern by integrating current contribution
    let maxGain = 0;
    const gains = new Float32Array(posAttribute.count);

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      const dir = vertex.normalize(); // Direction vector r_hat

      // Calculate Vector Potential A ~ Sum( I * exp(j k r.r') )
      // Ignore constants, we just want relative pattern shape

      // Sum Re/Im parts of the vector integral
      let rx = 0,
        ry = 0,
        rz = 0; // Real parts of vector
      let ix = 0,
        iy = 0,
        iz = 0; // Im parts of vector

      for (const seg of segments) {
        // Phase shift k * (r . r')
        // r . r' = dot product of direction and source position
        const phase = k * dir.dot(seg.pos);
        const cp = Math.cos(phase);
        const sp = Math.sin(phase);

        const I = seg.current; // Magnitude and sign of current
        const tx = seg.tangent.x;
        const ty = seg.tangent.y;
        const tz = seg.tangent.z;

        // Vector current phasor: J = I * tangent * e^(j phase)
        // J_re = I * tangent * cos(phase)
        // J_im = I * tangent * sin(phase)

        rx += I * tx * cp;
        ry += I * ty * cp;
        rz += I * tz * cp;

        ix += I * tx * sp;
        iy += I * ty * sp;
        iz += I * tz * sp;
      }

      // The Electric Field E_theta/phi is proportional to the component of A
      // perpendicular to r.
      // E ~ (A - (A.r)r)
      // Let A_vec = (rx + j ix, ry + j iy, rz + j iz)

      // A_dot_r_re = rx*dx + ry*dy + rz*dz
      const AdotR_re = rx * dir.x + ry * dir.y + rz * dir.z;
      const AdotR_im = ix * dir.x + iy * dir.y + iz * dir.z;

      // A_perp_re = A_re - AdotR_re * dir
      const Aperp_x_re = rx - AdotR_re * dir.x;
      const Aperp_y_re = ry - AdotR_re * dir.y;
      const Aperp_z_re = rz - AdotR_re * dir.z;

      const Aperp_x_im = ix - AdotR_im * dir.x;
      const Aperp_y_im = iy - AdotR_im * dir.y;
      const Aperp_z_im = iz - AdotR_im * dir.z;

      // Magnitude squared
      const magSq =
        Aperp_x_re ** 2 +
        Aperp_y_re ** 2 +
        Aperp_z_re ** 2 +
        (Aperp_x_im ** 2 + Aperp_y_im ** 2 + Aperp_z_im ** 2);

      const gain = Math.sqrt(magSq);
      gains[i] = gain;
      if (gain > maxGain) maxGain = gain;
    }

    // Apply gains to vertex positions
    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      vertex.normalize();

      let normalized = 0;
      if (maxGain > 0.00001) normalized = gains[i] / maxGain;

      // Shaping for visuals
      const rad = normalized ** 0.8 * scale;
      vertex.multiplyScalar(rad);

      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geo.computeVertexNormals();
    return geo;
  }, [harmonic, isInvertedV, visualScale]);

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

export default function WindomAntennaScene({
  isThumbnail = false,
  isHovered = false,
}: {
  isThumbnail?: boolean;
  isHovered?: boolean;
}) {
  const { t } = useTranslation("scene");

  // State
  const [showWaves, setShowWaves] = useState(true);
  const [showPattern, setShowPattern] = useState(true);
  const [isInvertedV, setIsInvertedV] = useState(false);

  // Harmonic Mode (1 = Fund, 2, 3, 4)
  const [harmonic, setHarmonic] = useState(1);

  const [speedMode, setSpeedMode] = useState<"slow" | "medium" | "fast">(
    "medium",
  );

  const speedMultiplier = {
    slow: 0.3,
    medium: 0.6,
    fast: 1.0,
  }[speedMode];

  const effectiveSpeed = isThumbnail && !isHovered ? 0 : speedMultiplier;
  const visualScale = 6;

  // For the ElectricFieldInstanced which uses 'antennaLength' prop (usually lambda counts),
  // we need to pass something that produces 'harmonic' lobes.
  // The 'end-fed' logic in ElectricFieldInstanced uses `activeHarmonic`.
  // Perfect.

  const ControlsContent = () => (
    <div className="flex flex-col space-y-3">
      {/* Visual Toggles */}
      <div className="pt-3 border-t border-white/10 md:border-none md:pt-0">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          {t("common.controls.visualization")}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="inv-v"
              checked={isInvertedV}
              onCheckedChange={setIsInvertedV}
              className="data-[state=checked]:bg-primary-foreground/80 data-[state=unchecked]:bg-zinc-700 border-zinc-500"
            />
            <Label htmlFor="inv-v" className="text-xs md:text-sm text-zinc-300">
              {t("common.controls.invertedV")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="waves"
              checked={showWaves}
              onCheckedChange={setShowWaves}
              className="data-[state=checked]:bg-primary-foreground/80 data-[state=unchecked]:bg-zinc-700 border-zinc-500"
            />
            <Label htmlFor="waves" className="text-xs md:text-sm text-zinc-300">
              {t("common.controls.showWaves")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="pattern"
              checked={showPattern}
              onCheckedChange={setShowPattern}
              className="data-[state=checked]:bg-primary-foreground/80 data-[state=unchecked]:bg-zinc-700 border-zinc-500"
            />
            <Label
              htmlFor="pattern"
              className="text-xs md:text-sm text-zinc-300"
            >
              {t("common.controls.showPattern")}
            </Label>
          </div>
        </div>
      </div>

      {/* Harmonic Selection */}
      <div className="pt-3 border-t border-white/10">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          {t("common.controls.harmonicMode")}
        </div>
        <RadioGroup
          value={harmonic.toString()}
          onValueChange={(v) => setHarmonic(Number.parseInt(v, 10))}
          className="flex flex-wrap flex-col gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="1"
              id="h1"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="h1"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("common.controls.harmonic1")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="2"
              id="h2"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="h2"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("common.controls.harmonic2")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="3"
              id="h3"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="h3"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("common.controls.harmonic3")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="4"
              id="h4"
              className="border-zinc-400 text-primary-foreground data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground data-[state=checked]:text-input"
            />
            <Label
              htmlFor="h4"
              className="text-xs cursor-pointer text-zinc-300"
            >
              {t("common.controls.harmonic4")}
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Speed */}
      <div className="pt-3 border-t border-white/10">
        <div className="mb-2 text-xs md:text-sm font-medium text-zinc-200">
          {t("common.controls.speed")}
        </div>
        <RadioGroup
          value={speedMode}
          onValueChange={(v: never) => setSpeedMode(v)}
          className="flex gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="slow"
              id="slow"
              className="border-zinc-400 text-primary-foreground"
            />
            <Label htmlFor="slow" className="text-xs text-zinc-300">
              {t("common.controls.slow")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="medium"
              id="med"
              className="border-zinc-400 text-primary-foreground"
            />
            <Label htmlFor="med" className="text-xs text-zinc-300">
              {t("common.controls.medium")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="fast"
              id="fast"
              className="border-zinc-400 text-primary-foreground"
            />
            <Label htmlFor="fast" className="text-xs text-zinc-300">
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

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />

          <gridHelper
            args={[20, 20, 0x333333, 0x222222]}
            position={[0, -2, 0]}
          />
          <axesHelper args={[5]} />

          <WindomStructure
            harmonic={harmonic}
            isInvertedV={isInvertedV}
            visualScale={visualScale}
          />

          {showPattern && (
            <RadiationPattern
              harmonic={harmonic}
              isInvertedV={isInvertedV}
              visualScale={visualScale}
            />
          )}

          {showWaves && (
            <ElectricFieldInstanced
              antennaType="windom" // Uses End-Fed/Windom harmonic logic
              polarizationType="horizontal"
              speed={effectiveSpeed}
              amplitudeScale={1.5}
              activeHarmonic={harmonic}
              antennaLength={harmonic * 0.5} // Length factor roughly n * 0.5 lambda
              isInvertedV={isInvertedV}
              rotation={
                isInvertedV ? [getInvertedVTilt(harmonic), 0, 0] : [0, 0, 0]
              }
            />
          )}
        </Canvas>

        {!isThumbnail && (
          <>
            <div className="hidden md:block absolute bottom-4 right-4 p-4 bg-black/70 text-white rounded-lg">
              <ControlsContent />
            </div>
            <div className="absolute bottom-4 left-4 text-gray-400 text-xs pointer-events-none select-none">
              {t("common.created")}
            </div>
          </>
        )}
      </div>

      {!isThumbnail && (
        <div className="md:hidden bg-zinc-900 border rounded-lg p-4">
          <ControlsContent />
        </div>
      )}
    </div>
  );
}

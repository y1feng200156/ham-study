import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, type InstancedMesh, Object3D, SphereGeometry } from "three";

interface ElectricFieldInstancedProps {
  antennaType: string;
  polarizationType: "vertical" | "horizontal" | "circular" | "elliptical";
  speed?: number;
  amplitudeScale?: number;
  isRHCP?: boolean;
  axialRatio?: number;
  antennaLength?: number;
  radialAngle?: "60" | "135" | string;
  activeHarmonic?: number;
  isInvertedV?: boolean;
  rotation?: [number, number, number];
}

// Numerical Integration for Windom Pattern (Handles Inverted V geometry)
function calculateWindomFactor(
  angle: number, // angle in X-Z plane (from X axis)
  n: number,
  isInvertedV: boolean,
): number {
  // Normalize wire length L=1.
  // kL = n * pi
  const k = n * Math.PI;

  const segments = 40;
  let Ex_real = 0,
    Ex_imag = 0;
  let Ey_real = 0,
    Ey_imag = 0;
  let Ez_real = 0,
    Ez_imag = 0;

  // Observer direction (Far Field in X-Z Plane)
  // angle is atan2(z, x).
  // x = cos(angle), z = sin(angle).
  // dir = (cos, 0, sin).
  const dx = Math.cos(angle);
  const dy = 0;
  const dz = Math.sin(angle);

  // Wire Geometry
  // Windom Feed is at 33%. Place Feed (Apex) at (0,0,0).
  // Left Arm (Length 1/3): Direction -Z (roughly).
  // Right Arm (Length 2/3): Direction +Z (roughly).

  // Droop Angle (for Inverted V)
  // 120 deg included -> Arms droop 30 deg from horizontal
  const droop = isInvertedV ? Math.PI / 6 : 0;
  const cosD = Math.cos(droop);
  const sinD = Math.sin(droop); // Y component (downwards usually, let's say negative Y)

  for (let i = 0; i < segments; i++) {
    const t = (i + 0.5) / segments; // 0..1 along wire
    // Current Standing Wave (Sinusoidal, 0 at ends)
    const I = Math.sin(k * t);

    // Position & Tangent
    // Feed is at t_feed = 1/3 = 0.3333.
    const distFromFeed = t - 1 / 3; // Negative on Left Arm, Positive on Right

    let px = 0,
      py = 0,
      pz = 0;
    let tx = 0,
      ty = 0,
      tz = 0;

    if (distFromFeed < 0) {
      // Left Arm (Visual: Apex -> Left)
      const d = -distFromFeed; // Dist from Apex
      // Direction: -Z, and Droop (-Y).
      // vector = (0, -sinD, -cosD)
      px = 0;
      py = d * -sinD;
      pz = d * -cosD;
      // Tangent is along +t direction (Left -> Right).
      // Left arm grows from Left(End) to Apex(Feed).
      // Vector End->Apex is (+Z).
      tx = 0;
      ty = sinD;
      tz = cosD;
    } else {
      // Right Arm
      const d = distFromFeed;
      // Direction: +Z, and Droop (-Y).
      px = 0;
      py = d * -sinD;
      pz = d * cosD;
      // Tangent
      tx = 0;
      ty = -sinD;
      tz = cosD;
    }

    // Phase k * (r . dir)
    // k normalized to Length=1 is n*PI.
    // Coordinate r is normalized to Length=1.
    const phase = k * (px * dx + py * dy + pz * dz);
    const cp = Math.cos(phase);
    const sp = Math.sin(phase);

    // Vector Current J = I * Tangent
    const Jx = I * tx;
    const Jy = I * ty;
    const Jz = I * tz;

    // Vector Potential Contribution dA = J * exp(j phase)
    Ex_real += Jx * cp;
    Ex_imag += Jx * sp;
    Ey_real += Jy * cp;
    Ey_imag += Jy * sp;
    Ez_real += Jz * cp;
    Ez_imag += Jz * sp;
  }

  // Far Field E = A - (A.r)r  (Projection onto plane perpendicular to r) (Transverse)
  // A dot r
  const AdotR_real = Ex_real * dx + Ey_real * dy + Ez_real * dz;
  const AdotR_imag = Ex_imag * dx + Ey_imag * dy + Ez_imag * dz;

  const Eperpx_real = Ex_real - AdotR_real * dx;
  const Eperpy_real = Ey_real - AdotR_real * dy;
  const Eperpz_real = Ez_real - AdotR_real * dz;

  const Eperpx_imag = Ex_imag - AdotR_imag * dx;
  const Eperpy_imag = Ey_imag - AdotR_imag * dy;
  const Eperpz_imag = Ez_imag - AdotR_imag * dz;

  const magSq =
    Eperpx_real ** 2 +
    Eperpy_real ** 2 +
    Eperpz_real ** 2 +
    Eperpx_imag ** 2 +
    Eperpy_imag ** 2 +
    Eperpz_imag ** 2;

  // Normalize: A half-wave dipole max gain is ~ something.
  // With 40 segments, expected sum is ~25.
  // Tuning factor 0.5
  return Math.sqrt(magSq) / (segments * 0.5); // Tuning factor
}

export function ElectricFieldInstanced({
  antennaType,
  polarizationType,
  speed = 1.0,
  amplitudeScale = 1.0,
  isRHCP = true,
  antennaLength = 2.5,
  radialAngle,
  activeHarmonic,
  isInvertedV = false,
  rotation = [0, 0, 0],
}: ElectricFieldInstancedProps) {
  // Dense Grid for "Field Fabric"
  const gridSize = 100; // 100x100 = 10,000 particles
  const spacing = 40 / gridSize; // Cover 40 units
  const count = gridSize * gridSize;

  const meshRef = useRef<InstancedMesh>(null);
  const colorArray = useMemo(() => new Float32Array(count * 3), [count]);
  const dummy = useMemo(() => new Object3D(), []);

  // Small Spheres
  const geometry = useMemo(
    () => new SphereGeometry(0.05, 6, 6), // Low poly spheres
    [],
  );

  const timeRef = useRef(0);
  const lengthRef = useRef(antennaLength);
  lengthRef.current = antennaLength;

  const harmonicRef = useRef(activeHarmonic);
  harmonicRef.current = activeHarmonic;

  const invertedVRef = useRef(isInvertedV);
  invertedVRef.current = isInvertedV;

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta * 1.0 * speed;
    const time = timeRef.current;

    let i = 0;
    const centerOffset = (gridSize * spacing) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const posX = x * spacing - centerOffset;
        const posZ = z * spacing - centerOffset;

        // Static Position logic
        const dist = Math.sqrt(posX * posX + posZ * posZ);

        if (dist < 1.0) {
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
          i++;
          continue;
        }

        // Conical Slope Logic for GP 60
        let yOffset = 0;
        if (antennaType === "gp" && radialAngle === "60") {
          // 45 degree slope upwards
          yOffset = dist * 1.2;
        }

        // Phase Calculation (The Wave travels, particles don't)
        const k = 2.0;
        const phase = k * dist - time * 6.0;

        // Direction & Handedness
        const angle = Math.atan2(posZ, posX);
        const cosDir = Math.cos(angle);

        // Polarization Logic
        let yScale = 1.0;
        let hScale = 1.0;
        let dirGain = 1.0; // Directional Antenna Gain pattern

        if (
          polarizationType === "circular" ||
          polarizationType === "elliptical"
        ) {
          const rotDir = isRHCP ? 1 : -1;
          hScale = rotDir * cosDir;
          if (polarizationType === "elliptical") hScale *= 0.6;

          // Helix Pattern: Strong Front (+X), Weak Back (-X), minimal Side
          const front = Math.max(0, cosDir);
          const back = Math.max(0, -cosDir);

          // Model: Main Lobe (Front) + Small Back Lobe
          // Power usually cos^n. Let's start linear for visibility.
          dirGain = front ** 1.5 + 0.3 * back + 0.1;
          dirGain = front ** 1.5 + 0.3 * back + 0.1;
        } else if (
          antennaType === "yagi" ||
          antennaType === "quad" ||
          antennaType === "moxon" ||
          antennaType === "hb9cv" ||
          antennaType === "magnetic-loop"
        ) {
          // Directional Beam Logic first, then apply Polarization hScale/yScale

          if (antennaType === "magnetic-loop") {
            // Magnetic Loop (Small Loop/Magnetic Dipole)
            // Assumed Orientation: Vertical Loop in XY plane.
            // Axis is Z-axis.
            // Nulls are along the Axis (Z).
            // Max Radiation is in the Plane (X-Y).
            // In our X-Z field fabric slice:
            // - Along X (angle=0): In loop plane -> Max.
            // - Along Z (angle=90): Along axis -> Null.
            // So Pattern is cos(angle)-like (Figure-8 along X).
            const cosA = Math.cos(angle);
            dirGain = Math.abs(cosA) + 0.05; // Deep nulls
          } else if (antennaType === "yagi" || antennaType === "quad") {
            // Yagi/Quad: X-axis Beam (+X is forward)
            // Need strong lobes in +X, weak in -X
            const front = Math.max(0, cosDir);
            const _back = Math.max(0, -cosDir);
            dirGain = front ** 2.0 + 0.1; // Sharper beam
          } else if (antennaType === "moxon") {
            // Moxon: Handled slightly differently?
            // Usually Moxon scene has geometry along X/Z?
            // Actually Moxon scene has geometry along X/Z?
            // Let's check: Moxon boom is X, elements are Z-ish?
            // Wait, Moxon scene: drivenRight/Left are Z points? No, points are (x,0,z).
            // Driven is at Z>0? No, width is X. Depth is Z.
            // Driven is Front (+Z) or Back (-Z)?
            // Driven: depth/2. Reflector: -depth/2.
            // So it fires towards +Z (Driven) or away from reflector?
            // Usually Yagi fires from Reflector -> Driven -> Director.
            // Moxon: Reflector is back, Driven is front. Fires +Z.
            // So we need beam along +Z.
            // Angle is from X. sin(angle) ~ Z.
            // So we need beam along +Z.
            const sinDir = Math.sin(angle);
            const front = Math.max(0, sinDir);
            dirGain = front ** 2.0 + 0.1;
          } else if (antennaType === "hb9cv") {
            // HB9CV Pattern: Cardioid-like
            // Phase difference logic approximation
            const kd = Math.PI / 4; // 45 deg
            const delta = (5 * Math.PI) / 4; // 225 deg
            const psi = kd * cosDir + delta;

            // Magnitude of sum of two unit vectors with angle psi
            const mag = Math.sqrt(2 + 2 * Math.cos(psi));
            dirGain = mag / Math.SQRT2; // Normalize peak
            dirGain = dirGain ** 2; // Power pattern for sharpness
          }

          // Apply Polarization Pattern (E-field orientation)
          if (polarizationType === "vertical") {
            hScale = 0;
            // Vertical polarization: E-field is Y (up/down).
            // yScale is 1.0 by default.
            // But usually vertical antennas are isotropic in azimuth?
            // Not for Yagi/Quad: The beam determines power, but the E-field is still Vertical.
            // So we keep dirGain as calculated above.
          } else {
            // Horizontal
            yScale = 0;
            // E-field is horizontal.
            // For Yagi (+X beam): E-field is typically Y (vertical) or Z (horizontal)?
            // If elements are horizontal (parallel to Y or Z?), E-field is horizontal.
            // Yagi elements are cylinderGeometry rotated...
            // Yagi scene: Boom X. Elements Z? No, Elements are Mesh rot [Math.PI/2, 0, 0].
            // Cylinder default Y. Rot X 90 -> Z.
            // So elements are along Z.
            // If elements are Z, Polarization is Horizontal (Z-axis).
            // So E-field should oscillate along Z?
            // Our waves oscillate in Y (vertical) and H (horizontal tangent).
            // Tangent vector: (-sin, cos).
            // At X-axis (angle=0), Tangent is (0, 1) = Z.
            // So hScale controls Z-oscillation at the beam center. Correct.
            // BUT: Dipole logic had hScale = sin(angle).
            // At angle=0 (X axis), sin=0 -> No oscillation?
            // That's for a dipole along Z, firing broadside (along X).
            // WAIT. If dipole is along Z, it radiates max along X.
            // At X, E-field IS along Z.
            // So we need oscillation along Z.
            // hScale * Tangent(Z) -> We need hScale=1.
            // Dipole logic `hScale = sin(angle)`: At angle=0, hScale=0 -> NO WAVE.
            // This contradicts "Max at broadside".
            // Let's re-read the dipole logic in the file:
            // "Dipole Pattern: Figure-8. Null at ends (X-axis, cos=1), Max at broadside (Z-axis, cos=0)"
            // -> This means the Dipole was assumed to be along X-axis!
            // -> "Angle is from X. so sin(angle) is Max at Z." -> Correct for dipole along X.
            //
            // BUT Yagi elements are along Z.
            // So Yagi is like a dipole array along Z.
            // Radiation is along X.
            // At X, E-field is parallel to elements (Z).
            // We need Z-oscillation.
            // Tangent at X is Z.
            // So we need hScale high (e.g. 1.0) near X axis.
            // Previous dipole logic was for X-oriented dipole.
            //
            // FIX: For Horizontal Yagi (Elements along Z, Beam along X):
            // We want max oscillation at X (angle=0).
            // Tangent is Z. So hScale=1 gives Z-oscillation.
            // So we can set hScale=1.0 constant, or maybe taper it?
            // The `dirGain` handles the power drop-off off-axis.
            // So just setting hScale = 1.0 is physically roughly correct for the simplified calc.

            hScale = 1.0;
          }
        } else if (antennaType === "long-wire") {
          // Physics-inspired simplified lobe generator for shader-like speed
          const L = lengthRef.current; // Use Ref to avoid stale closure

          // Use Cosine argument to generate lobes along X-axis
          const lobeArg = 2.5 * Math.PI * L * Math.cos(angle);

          // Sharpen the lobes: power of 2 or more?
          const baseLobe = Math.abs(Math.sin(lobeArg));
          const num = baseLobe ** 2; // Sharper lobes

          // Denom to boost main lobes near axis?
          const den = Math.abs(Math.sin(angle));

          // Clamp denom to avoid infinity
          const val = den > 0.1 ? num / den : num * 10.0;

          // Normalize somewhat so it's not too huge
          dirGain = val * 0.5 + 0.05;
        } else if (antennaType === "windom") {
          // Windom (OCFD) Logic using Numerical Integration
          // This correctly handles the V-shape (Inverted V) and Harmonic patterns
          const n = harmonicRef.current ? harmonicRef.current : 1;
          const isInv = invertedVRef.current;

          // Calculate Pattern Factor numerically
          let val = calculateWindomFactor(angle, n, isInv);

          val = val ** 1.5;
          dirGain = val * 0.5 + 0.05;

          // Enforce Linear Polarization
          if (polarizationType === "vertical") {
            yScale = 1.0;
            hScale = 0.0;
          } else {
            // Horizontal (Linear)
            yScale = 0.0;
            hScale = 1.0;
          }
        } else if (antennaType === "end-fed") {
          // End-Fed Half Wave (EFHW) operates at harmonics (n=1, 2, 3...)
          const n = harmonicRef.current ? harmonicRef.current : 1;

          const cosTheta = Math.cos(angle);
          const sinTheta = Math.abs(Math.sin(angle));
          const safeSinTheta = Math.max(0.001, sinTheta);

          let val = 0;
          if (n % 2 === 1) {
            // Odd harmonic
            const num = Math.cos(((n * Math.PI) / 2) * cosTheta);
            val = Math.abs(num / safeSinTheta);
          } else {
            // Even harmonic
            const num = Math.sin(((n * Math.PI) / 2) * cosTheta);
            val = Math.abs(num / safeSinTheta);
          }

          val = val ** 1.5;
          dirGain = val * 0.5 + 0.05;

          // Enforce Linear Polarization
          if (polarizationType === "vertical") {
            yScale = 1.0;
            hScale = 0.0;
          } else {
            // Horizontal (Linear)
            yScale = 0.0;
            hScale = 1.0;
          }
        } else if (
          antennaType === "vertical" ||
          antennaType === "gp" ||
          antennaType === "dp" // Dipole uses vertical's logic base but has its own pattern
        ) {
          if (antennaType === "dp") {
            // Dipole (Horizontal usually, but here visualized in free space)
            // If we assume the dipole is along the Z-axis (standard for "Vertical" logic here usually means Y, but let's check)

            // In this scene, "Vertical" polarization means E-field along Y.
            // "Horizontal" polarization means E-field along H (tangent).

            // A standard dipole in free space:
            // If oriented along Z-axis:
            // Radiation is max at X (broadside).
            // E-field is along Z (Horizontal/Tangent). (Wait, if dipole is Z, E is Z).
            //
            // If oriented along Y-axis (Vertical Dipole):
            // Radiation is max at H plane.
            // E-field is along Y (Vertical).
            //
            // Let's assume this "dp" visualization is for a Horizontal Dipole (standard Ham usage).
            // Orientation: Along Z-axis (like Yagi elements).
            // Radiation Pattern: F(theta) with theta from Z-axis.
            // In our grid: angle is in X-Z plane. X is 0. Z is 90 deg (PI/2).
            // "Angle from wire":
            // If wire is Z, then angle from wire 'theta' is related to our grid angle 'phi':
            // The grid is a slice.
            // Wait, this visualization is a 2D slice/plane? E-field fabric is usually horizontal plane?
            // "ElectricFieldInstanced" is usually X-Z plane grid.
            //
            // If we are visualizing a Horizontal Dipole (along Z):
            // The X-Z plane contains the wire. So we are looking at the E-plane?
            // No, if wire is Z, and we look at X-Z plane, we see the wire and the field around it.
            // Angle theta is angle from Z-axis.
            // Our grid point (x,z) has angle `phi = atan2(z,x)`.
            // Angle from Z-axis:
            // vector P = (x, 0, z). Wire is along Z.
            // Angle between P and Z-axis is... 0 at Z, 90 at X.
            // theta = 0 at Z-axis (phi=90).
            // theta = 90 at X-axis (phi=0).
            // So theta = |phi - PI/2| ? Or just use dot product.
            // Let's rely on standard angles:
            // grid angle 'angle' is from X axis.
            // Wire is along Z (assume).
            // Theta (angle from wire) = angle between (x,z) and (0,1).
            // cos(theta) = z / rho = sin(angle).
            //
            // Formula: F(theta) = (cos(kL/2 * cos(theta)) - cos(kL/2)) / sin(theta)
            //
            // We need L (length in wavelengths).
            // antennaLength = 2.5 usually means 2.5 units? Or 2.5 wavelengths?
            // In other files `antennaLength` passed to E-field often maps to physical size.
            // For "Half Wave Dipole", L = 0.5 lambda.
            // Let's assume `antennaLength` prop IS L in wavelengths?
            // Or is `antennaLength` just a scaler?
            // In `yagi` scene, L is physical.
            // Let's use `antennaLength` as L (wavelengths) if simpler, but likely it's arbitrary units.
            // Let's HARDCODE L=0.5 for a "Half Wave Dipole" unless `antennaLength` is providing that info.
            // User's slider might change it.
            // Let's assume input `antennaLength` is in "Sim Units" and we need to map to Wavelengths.
            // Standard dipole L=0.5.
            // Let's try to map: if slider is 0.5 -> 0.5 lambda.
            const L_lambda = lengthRef.current; // Assume input is in wavelengths (e.g. 0.5)

            // Theta is angle from wire axis.
            // Assume wire is along Z.
            // Our `angle` is from X.
            // cos(theta) = sin(angle) (projection on Z).
            const cosTheta = Math.sin(angle);
            const sinTheta = Math.cos(angle); // This is sin(theta) because theta is from Z.

            const safeSinTheta = Math.max(0.001, Math.abs(sinTheta)); // Avoid div by zero at poles

            const kL_2 = (Math.PI * 2 * L_lambda) / 2; // k * L / 2 = (2pi/lambda) * (L_lambda * lambda) / 2 = pi * L_lambda

            const num = Math.cos(kL_2 * cosTheta) - Math.cos(kL_2);
            dirGain = Math.abs(num / safeSinTheta);

            // Dipole polarization
            // If wire is Z, E-field is along Z?
            // In far field broadside (X-axis), E is parallel to wire -> Z.
            // So we need "Horizontal" polarization (tangent/Z).
            yScale = 0;
            // hscale?
            // tangent vector at X-axis is Z.
            // So hScale=1 means osc along Z.
            hScale = 1.0;
          } else if (antennaType === "vertical" || antennaType === "gp") {
            hScale = 0;
            dirGain = 1.0; // Omni
          }
        } else if (polarizationType === "horizontal") {
          yScale = 0;
          hScale = Math.sin(angle);
          // Dipole Pattern: Figure-8. Null at ends (X-axis, cos=1), Max at broadside (Z-axis, cos=0)
          // Angle is from X. so sin(angle) is Max at Z.
          // Gain ~ sin(angle).
          dirGain = Math.abs(Math.sin(angle)) + 0.1;
        }

        const amp = amplitudeScale * dirGain;
        // Decay
        // Use a smoother curve: 1.0 at center, 0.0 at maxDist
        // Let's use a bell-curveish or simple linear fade
        // dist ranges from 0 to ~28 (sqrt(2)*20)

        // We want strong oscillation in center, fading to 0 at edge
        const decay = Math.max(0, 1.0 - dist / 22.0);

        // Apply decay to "Effective Amplitude" (Physical Undulation)
        const effectiveAmp = amp * decay;

        // Oscillate in place
        const valY = Math.sin(phase);
        const valH = Math.cos(phase);

        // Movement amplitude scales with signal strength
        const dispY = valY * yScale * effectiveAmp;
        const dispH = valH * hScale * effectiveAmp;

        // Tangent vectors
        const tanX = -Math.sin(angle);
        const tanZ = Math.cos(angle);

        const finalX = posX + tanX * dispH;
        const finalY = dispY + yOffset;
        const finalZ = posZ + tanZ * dispH;

        dummy.position.set(finalX, finalY, finalZ);

        // Scale based on distance (Enforce circular boundary cleanly)
        const s = decay > 0.01 ? 1.0 : 0.0;
        dummy.scale.setScalar(s);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Color Logic: Pulse Wave
        const color = new Color();

        // Standardize: Red (Strong) -> Yellow -> Green -> Blue (Weak)
        // Hue mapping: 0.0 (Red) -> 0.66 (Blue)
        // Formula: hue = (1.0 - normalizedGain) * 0.66

        let normalizedGain = 0;
        let useHeatMap = false;

        const isVariableGain =
          antennaType === "yagi" ||
          antennaType === "quad" ||
          antennaType === "moxon" ||
          antennaType === "hb9cv" ||
          antennaType === "magnetic-loop" ||
          polarizationType === "horizontal"; // Dipoles/V-antennas have nulls

        if (
          polarizationType === "circular" ||
          polarizationType === "elliptical"
        ) {
          useHeatMap = true;
          // CP/Elliptical: Strong Front (+X), Weak Back (-X)
          // cosDir ranges -1 to 1.
          // Map to 0..1
          normalizedGain = (cosDir + 1.0) * 0.5;
          // Apply some curve to make the "Red" zone more prominent?
          // pow(g, 0.5) pushes vals higher -> more red/yellow/green, less blue
        } else if (isVariableGain) {
          useHeatMap = true;
          // Linear Directional: dirGain ~0.1 to ~1.2
          // Map to 0..1
          normalizedGain = Math.min(1.0, Math.max(0, (dirGain - 0.1) / 1.0));
        }

        if (useHeatMap) {
          // Apply Heat Map
          // Strong (1.0) -> Red (0.0)
          // Weak (0.0) -> Blue (0.66)
          const hue = (1.0 - normalizedGain) * 0.66;
          color.setHSL(hue, 1.0, 0.5);
        } else {
          // Uniform / Linear Non-Directional
          // Cyan-Blue (0.55) as requested
          color.setHSL(0.55, 0.9, 0.5);
        }

        // Brightness Pulse
        // The wave peaks are bright, troughs are dim
        const wavePulse = (Math.sin(phase) + 1.0) * 0.5; // 0 to 1
        // Make it sharper?
        const sharpness = wavePulse ** 2.0;

        // MODIFIED: Scale brightness by dirGain so that "weak" directions are visible dimmer
        // We clamp dirGain to not overbook brightness in main lobe (max 1.0 usually)
        // usage of Math.min(1.0, dirGain) or just use logic.
        // dirGain can be > 1.0 (some lobes). normalise roughly?
        // Let's just multiply. If it's super bright in main lobe, that's "strong".

        // Also apply a minimum brightness so blue waves aren't invisible
        const effectiveGain = Math.max(0.3, dirGain);

        const brightness = sharpness * decay * 2.0 * effectiveGain + 0.2; // Ambient 0.2
        color.multiplyScalar(brightness);

        color.toArray(colorArray, i * 3);
        i++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  // Manual cleanup for useMemo resources to prevent WebGL context leaks
  useMemo(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      rotation={rotation}
    >
      <meshBasicMaterial toneMapped={false} />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}

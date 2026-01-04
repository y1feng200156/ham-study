import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  CylinderGeometry,
  InstancedMesh,
  Object3D,
  SphereGeometry,
  Color,
} from "three";

interface ElectricFieldInstancedProps {
  antennaType: string;
  polarizationType: "vertical" | "horizontal" | "circular" | "elliptical";
  speed?: number;
  amplitudeScale?: number;
  isRHCP?: boolean;
  axialRatio?: number;
}

export function ElectricFieldInstanced({
  antennaType,
  polarizationType,
  speed = 1.0,
  amplitudeScale = 1.0,
  isRHCP = true,
}: ElectricFieldInstancedProps) {
  // Dense Grid for "Field Fabric"
  const gridSize = 100; // 100x100 = 10,000 particles
  const spacing = 40 / gridSize; // Cover 40 units
  const count = gridSize * gridSize;

  const meshRef = useRef<InstancedMesh>(null);
  const colorArray = useMemo(() => new Float32Array(count * 3), []);
  const dummy = useMemo(() => new Object3D(), []);

  // Small Spheres
  const geometry = useMemo(
    () => new SphereGeometry(0.05, 6, 6), // Low poly spheres
    [],
  );

  const timeRef = useRef(0);

  useFrame((state, delta) => {
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
          dirGain = Math.pow(front, 1.5) + 0.3 * back + 0.1;
        } else if (
          polarizationType === "vertical" ||
          antennaType === "vertical" ||
          antennaType === "gp"
        ) {
          hScale = 0;
          dirGain = 1.0; // Omni
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
        const finalY = dispY;
        const finalZ = posZ + tanZ * dispH;

        dummy.position.set(finalX, finalY, finalZ);

        // Scale based on distance (Enforce circular boundary cleanly)
        const s = decay > 0.01 ? 1.0 : 0.0;
        dummy.scale.setScalar(s);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Color Logic: Pulse Wave
        const color = new Color();

        // Base Color based on Polarization Mode
        if (
          polarizationType === "circular" ||
          polarizationType === "elliptical"
        ) {
          // Directional Color for Helical/CP
          // Front: Reddish, Back: Blueish
          if (cosDir > 0) {
            color.setHSL(0.0 + (1 - cosDir) * 0.15, 1.0, 0.5);
          } else {
            color.setHSL(0.6 - (1 + cosDir) * 0.1, 1.0, 0.5);
          }
          // Side blend
          if (Math.abs(cosDir) < 0.3) {
            const t = 1.0 - Math.abs(cosDir) / 0.3;
            const baseC = new Color().setHSL(0.3, 1.0, 0.5);
            color.lerp(baseC, t);
          }
        } else {
          // Linear Polarization (Vertical / Horizontal)
          // Should be uniform color, representing the "Type"
          // Vertical: Cyan/Blueish for "Electric"? Or Green?
          // Let's use a nice energetic Blue-Cyan (0.55).
          if (polarizationType === "vertical") {
            color.setHSL(0.55, 0.9, 0.5);
          } else {
            // Horizontal
            color.setHSL(0.1, 0.9, 0.5); // Orange/Yellowish for Horizontal
          }
        }

        // Brightness Pulse
        // The wave peaks are bright, troughs are dim
        const wavePulse = (Math.sin(phase) + 1.0) * 0.5; // 0 to 1
        // Make it sharper?
        const sharpness = Math.pow(wavePulse, 2.0);

        const brightness = sharpness * decay * 2.0 + 0.2; // Ambient 0.2
        color.multiplyScalar(brightness);

        color.toArray(colorArray, i * 3);
        i++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshBasicMaterial toneMapped={false} />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}

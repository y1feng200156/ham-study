import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Color,
  type InstancedMesh,
  Object3D,
  Quaternion,
  Vector3,
} from "three";

interface PoyntingVectorFieldProps {
  antennaType:
    | "vertical"
    | "horizontal"
    | "circular"
    | "yagi"
    | "inverted-v"
    | "gp"
    | "positive-v"
    | "quad"
    | "moxon"
    | "elliptical"
    | "end-fed";
  amplitudeScale?: number;
}

export function PoyntingVectorField({
  antennaType,
  amplitudeScale = 1.0,
}: PoyntingVectorFieldProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const gridSize = 30; // 30x30 grid
  const spacing = 1.5;

  // Pre-calculate grid positions
  const gridPositions = useMemo(() => {
    const positions: Vector3[] = [];
    const offset = (gridSize * spacing) / 2;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i * spacing - offset;
        const z = j * spacing - offset;
        // Skip center
        if (Math.abs(x) < 1 && Math.abs(z) < 1) continue;
        positions.push(new Vector3(x, 0, z));
      }
    }
    return positions;
  }, []);

  const dummy = useMemo(() => new Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;

    let idx = 0;

    for (let i = 0; i < gridPositions.length; i++) {
      const pos = gridPositions[i];

      // Direction is Radial (Far-field approximation)
      const dir = pos.clone().normalize();

      // Calculate Gain/Strength
      let gain = 1.0;
      // Replicate logic from RadialWaveLines/calculateGain
      // Important: "theta" for logic.
      // pos.x, pos.z.
      // dir is already normalized.

      switch (antennaType) {
        case "vertical":
        case "gp":
          gain = 1.0;
          break;
        case "horizontal":
        case "inverted-v":
        case "positive-v":
        case "quad": // Quad XZ plane gain is roughly abs(z) if boom is X?
          // Wait, in RadialWaveLines for "quad", gain = Math.abs(dirVec.z).
          // That implies nulls at X (Boom).
          // Let's match RadialWaveLines exactly.
          gain = Math.abs(dir.z);
          break;
        case "yagi":
          // RadialWaveLines: gain = dirVec.x > 0 ? dirVec.x ** 2 : 0.1;
          // Boom is X. Beam along +X.
          gain = dir.x > 0 ? dir.x ** 2 : 0.1;
          break;
        case "moxon":
          // RadialWaveLines: gain = (1 + dirVec.z) * 0.5;
          gain = (1 + dir.z) * 0.5;
          if (gain < 0.2) gain = 0;
          break;
        case "elliptical":
        case "circular":
          gain = dir.x > 0 ? dir.x ** 2 : 0;
          break;
        case "end-fed":
          gain = Math.sqrt(dir.y * dir.y + dir.z * dir.z); // Wait this is 3D? EndFed is mostly horizontal.
          // In RadialWaveLines loop, it uses 2D dirVec (y=0).
          // For EndFed there: gain = Math.sqrt(dirVec.y*dirVec.y + dirVec.z*dirVec.z).
          // But dirVec.y is 0 in that loop logic?
          // Wait, RadialWaveLines loop sets dirVec = (cos, 0, sin). y is 0.
          // So gain = abs(dirVec.z). Same as horizontal dipole.
          gain = Math.abs(dir.z);
          break;
      }

      const dist = pos.length();
      // Use a gentler decay for visualization
      const visualDecay = 5.0 / (dist + 2.0);

      // Vector Magnitude
      const magnitude = gain * visualDecay * amplitudeScale;

      // Threshold
      if (magnitude < 0.05) {
        // Invisible
        dummy.scale.set(0, 0, 0);
      } else {
        dummy.position.copy(pos);

        // Orientation: Point radially outward
        // Quaternion to rotate Up (0,1,0) to Dir
        // Cone default points Up? ConeGeometry points Up (Y).
        // We want it to point along 'dir' (XZ plane).
        // So we rotate Y to Dir.
        const targetQ = new Quaternion().setFromUnitVectors(
          new Vector3(0, 1, 0),
          dir,
        );
        dummy.quaternion.copy(targetQ);

        // Scale: Arrow length proportional to strength?
        // User image has subtle arrows, maybe uniform size but color varied?
        // Or size varied.
        // Let's vary scale slightly.
        const s = Math.min(0.8, magnitude * 2.0);
        dummy.scale.set(s, s * 2, s); // Thinner width
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx, dummy.matrix);

      // Color
      // Black arrows like image?
      // Or Heatmap?
      // User image: Arrows are BLACK. Background is color.
      // Let's stick to BLACK arrows for high contrast against color waves.
      meshRef.current.setColorAt(idx, new Color(0.1, 0.1, 0.1)); // Dark Grey/Black

      idx++;
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, gridPositions.length]} // Geometry, Material inferred
    >
      <coneGeometry args={[0.2, 0.8, 8]} />
      <meshBasicMaterial color="#000000" />
    </instancedMesh>
  );
}

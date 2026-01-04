import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferAttribute, DoubleSide, type Mesh, PlaneGeometry } from "three";

interface ContinuousWaveSurfaceProps {
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
  polarizationType: "vertical" | "horizontal" | "circular" | "elliptical";
  speed?: number;
  amplitudeScale?: number;
}

export function ContinuousWaveSurface({
  antennaType,
  speed = 1.0,
  amplitudeScale = 1.0,
}: ContinuousWaveSurfaceProps) {
  // Config
  const size = 30; // Matches maxDist
  const segments = 120; // High res mesh

  const meshRef = useRef<Mesh>(null);

  // Create Geometry
  const geometry = useMemo(() => {
    // Plane in XZ plane
    const geo = new PlaneGeometry(size * 2, size * 2, segments, segments);
    // Rotate to lie flat on XZ (PlaneGeometry is XY by default)
    geo.rotateX(-Math.PI / 2);

    // Add color attribute
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    geo.setAttribute("color", new BufferAttribute(colors, 3));

    return geo;
  }, []);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta * 3.0 * speed;
    const time = timeRef.current;

    const posAttr = meshRef.current.geometry.attributes.position;
    const colAttr = meshRef.current.geometry.attributes.color;
    const positions = posAttr.array as Float32Array;
    const colors = colAttr.array as Float32Array;

    const count = posAttr.count;

    // Animate Vertices
    for (let i = 0; i < count; i++) {
      // Read current positions
      // Since we only modify Y, X and Z are stable / derived from grid.
      // But wait, if we never write X/Z, they remain their initial PlaneGeometry values.
      // We need to read them to calculate distance.
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];

      const dist = Math.sqrt(x * x + z * z);
      if (dist < 0.5) {
        // Center hole
        positions[i * 3 + 1] = 0;
        continue;
      }

      // Direction Vector
      // Normalized (x, 0, z)
      const dirX = x / dist;
      const dirZ = z / dist;

      // Calculate Gain
      let gain = 1.0;
      switch (antennaType) {
        case "vertical":
        case "gp":
          gain = 1.0;
          break;
        case "horizontal":
        case "inverted-v":
        case "positive-v":
        case "quad":
          gain = Math.abs(dirZ);
          break;
        case "yagi":
          gain = dirX > 0 ? dirX ** 2 : 0.1;
          break;
        case "moxon":
          gain = (1 + dirZ) * 0.5;
          if (gain < 0.2) gain = 0;
          break;
        case "elliptical":
        case "circular":
          // Directional beam for Helix
          gain = dirX > 0 ? dirX ** 2 : 0;
          break;
        case "end-fed":
          gain = Math.abs(dirZ);
          break;
      }

      // Physics
      const k = 2.0;
      const w = 6.0;
      const phase = k * dist - time * w;

      const endEnvelope = Math.max(0, 1.0 - (dist / (size * 0.9)) ** 3);
      const decay = 4.0 / (dist + 1.0);

      const waveVal = Math.sin(phase);

      // Surface "Ripple" Visualization
      // We map the Wave Magnitude to Y-displacement (Height).
      // For Circular/Elliptical, the wavefronts are still spherical/circular.
      // The "Rotation" of the vector is abstract on a surface.
      // We visualize the propagating wave energy/phase as standard ripples.
      const amp = decay * gain * endEnvelope * amplitudeScale;
      const yDisp = amp * waveVal;

      positions[i * 3 + 1] = yDisp;

      // Color Logic: Dynamic Wave Color
      const signal = waveVal * gain;

      let rCol = 0,
        gCol = 0,
        bCol = 0;

      const intensity = 0.6; // Scale factor for color strength

      if (signal > 0) {
        // Positive: Green -> Light Red/Orange
        const t = Math.min(1.0, signal) * intensity;
        rCol = t;
        gCol = 1.0 - t * 0.3;
        bCol = 0.0;
      } else {
        // Negative: Green -> Light Blue/Cyan
        const t = Math.min(1.0, -signal) * intensity;
        rCol = 0.0;
        gCol = 1.0 - t * 0.3;
        bCol = t;
      }

      colors[i * 3] = rCol;
      colors[i * 3 + 1] = gCol;
      colors[i * 3 + 2] = bCol;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals(); // Recalc for lighting
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        vertexColors={true}
        side={DoubleSide}
        transparent={true}
        opacity={0.3}
        roughness={0.1}
        metalness={0.1}
        transmission={0.5} // Glassy look
        thickness={0.5}
      />
    </mesh>
  );
}

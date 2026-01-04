import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  type Group,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";

interface RadialWaveLinesProps {
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
  isThumbnail?: boolean;
  speed?: number;
  phaseOffset?: number;
  amplitudeScale?: number;
  forceAnimation?: boolean;
  visualizationMode?: "waves" | "energy_flow";
}

export function RadialWaveLines({
  antennaType,
  polarizationType,
  isThumbnail = false,
  speed = 1.0,
  phaseOffset = 0,
  amplitudeScale = 1.0,
  forceAnimation = false,
  visualizationMode = "waves",
}: RadialWaveLinesProps) {
  const lineCount = visualizationMode === "energy_flow" ? 40 : 20; // Increased line count for better density
  const segments = 250; // Increased segments for smoother high-freq waves
  const maxDist = 30;
  const minStart = 0.6; // Start from antenna surface

  // Create line objects with vertex colors
  const lines = useMemo(() => {
    const linesArray: Line[] = [];

    for (let i = 0; i < lineCount; i++) {
      const geometry = new BufferGeometry();
      const positions = new Float32Array(segments * 3);
      const colors = new Float32Array(segments * 3);

      geometry.setAttribute("position", new BufferAttribute(positions, 3));
      geometry.setAttribute("color", new BufferAttribute(colors, 3));

      const material = new LineBasicMaterial({
        vertexColors: true, // Enable vertex colors for pulse effect
        blending: AdditiveBlending, // Additive blending for glow look
        transparent: true,
        linewidth: 2,
      });

      const line = new Line(geometry, material);
      const theta = (i / lineCount) * Math.PI * 2;
      line.userData = { theta };
      linesArray.push(line);
    }

    return linesArray;
  }, [lineCount]);

  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);

  // Initialize static snapshot for thumbnails
  useState(() => {
    if (isThumbnail && !forceAnimation) {
      const t = 8.0; // Static time for thumbnail
      lines.forEach((line) => {
        updateLinePositions(line, t);
      });
    }
  });

  useFrame((_, delta) => {
    if (isThumbnail && !forceAnimation) return;

    // Match example.html time increment logic but use delta for speed control
    timeRef.current += delta * 3.0 * speed;
    const time = timeRef.current;

    lines.forEach((line) => {
      updateLinePositions(line, time);
    });
  });

  function updateLinePositions(line: Line, time: number) {
    const positions = line.geometry.attributes.position.array as Float32Array;
    const colors = line.geometry.attributes.color.array as Float32Array;
    const theta = line.userData.theta;

    const dirX = Math.cos(theta);
    const dirZ = Math.sin(theta);
    const dirVec = new Vector3(dirX, 0, dirZ).normalize();

    const gain = calculateGain(dirVec);

    for (let j = 0; j < segments; j++) {
      // Distance from minStart
      const r = minStart + (j / segments) * (maxDist - minStart);

      const baseX = dirX * r;
      const baseZ = dirZ * r;

      // Physics parameters from example.html
      const k = 2.0;
      const w = 6.0;
      const phase = k * r - time * w + phaseOffset;

      // Removed start envelope for "instant out" effect
      // End envelope for natural fade out
      const endEnvelope = Math.max(0, 1.0 - (r / (maxDist * 0.95)) ** 3);

      const decay = 4.0 / (r + 1.0);

      let x = baseX;
      let y = 0;
      let z = baseZ;
      let visualIntensity = 0;

      if (visualizationMode === "waves") {
        // --- WAVE MODE ---
        const amp = decay * gain * endEnvelope * amplitudeScale;
        const waveVal = Math.sin(phase);

        if (polarizationType === "vertical") {
          y = amp * waveVal;
        } else if (polarizationType === "horizontal") {
          const tanX = -Math.sin(theta);
          const tanZ = Math.cos(theta);
          x += tanX * amp * waveVal;
          z += tanZ * amp * waveVal;
        } else if (polarizationType === "circular") {
          const vComp = Math.sin(phase);
          const hComp = Math.cos(phase);
          const tanX = -Math.sin(theta);
          const tanZ = Math.cos(theta);
          y = amp * vComp;
          x += tanX * amp * hComp;
          z += tanZ * amp * hComp;
        } else if (polarizationType === "elliptical") {
          const vComp = Math.sin(phase);
          const hComp = Math.cos(phase) * 0.6;
          const tanX = -Math.sin(theta);
          const tanZ = Math.cos(theta);
          y = amp * vComp;
          x += tanX * amp * hComp;
          z += tanZ * amp * hComp;
        }

        // Wave Intensity
        let i = Math.abs(waveVal);
        if (i < 0.1) i = 0.1;
        visualIntensity = i;
      } else {
        // --- ENERGY FLOW MODE (Poynting) ---
        // Straight Radial Lines
        // Visual: Moving Pulses representing Energy Packets

        // Phase for flow
        // Use 'sawtooth' or compressed sine for "bullets"
        // We want pulses moving OUTWARD. (phase decreases as r increases? no, phase = kr - wt)
        // To track a peak: kr = wt => r = (w/k)t. Speed is w/k.

        const flowPhase = r * 0.5 - time * 2.0; // Slower, wider pulses
        // Create "Dashes"
        const pulse = Math.sin(flowPhase);
        // Sharpen pulse to make it look like a dash
        // Map -1..1 to 0..1, then power
        let flowVal = Math.max(0, pulse);
        flowVal = flowVal ** 10; // Very sharp peaks (dots/dashes)

        visualIntensity = flowVal;

        // No spatial displacement
        x = baseX;
        y = 0;
        z = baseZ;
      }

      positions[j * 3] = x;
      positions[j * 3 + 1] = y;
      positions[j * 3 + 2] = z;

      // --- Pulse Color Logic ---
      // Intensity based on wave amplitude (peaks) AND Directional Gain
      // Gain determines if we are in the "beam" or the "null"
      // Stronger signal = Brighter/Warmer color + Higher Opacity

      // Modulate by gain (Directionality)
      // If gain is 0 (null), visualIntensity should be 0 (invisible).
      const visualGain = gain * amplitudeScale;

      // Combined Envelope
      const combinedEnvelope = endEnvelope * Math.min(1.0, r * 0.5); // Fade in/out edges

      // Visual Strength (0..1)
      // High gain + High wave Peak = 1.0
      const strength = visualGain * visualIntensity * combinedEnvelope;

      // Color Gradient based on Strength/Gain
      // We want the *Beam* to be a certain color, and *Nulls* to be another (or invisible).
      // Let's base color primarily on 'gain' so the beam has a consistent "hot" core,
      // creating a "Heatmap" effect.
      // High Gain (~1.0) -> Red/Orange
      // Medium Gain (~0.5) -> Green
      // Low Gain (~0.0) -> Blue/Transparent

      // HSL Ramp:
      // Red (~0.0 or 1.0) -> Green (~0.3) -> Blue (~0.66)
      // Let's map Gain 0..1 to Hue 0.66..0.0 (Blue -> Red)
      // const hue = (1.0 - gain) * 0.66;

      // Saturation: 1.0
      // Lightness: 0.5 (Normal) to 0.8 (Bright/Hot) ?
      // Let's do simple RGB interpolation for performance? Vector3 lerp? No, manual is faster.

      // Simple Heatmap Ramp (Cold to Hot):
      // 0.0: Blue (0, 0, 1)
      // 0.5: Green (0, 1, 0)
      // 1.0: Red (1, 0, 0)

      let rCol = 0,
        gCol = 0,
        bCol = 0;

      if (gain < 0.5) {
        // Blue to Green
        const t = gain * 2.0; // 0..1
        rCol = 0.0;
        gCol = t;
        bCol = 1.0 - t;
      } else {
        // Green to Red
        const t = (gain - 0.5) * 2.0; // 0..1
        rCol = t;
        gCol = 1.0 - t;
        bCol = 0.0;
      }

      // Force cyan/white aesthetic if user prefers?
      // The user asked for "Strength / Directionality by Color".
      // Let's try this Heatmap approach.

      // Apply Pulse/Wave intensity to the Alpha/Brightness
      // We are using AdditiveBlending, so "Black" is transparent.
      // We modulate the calculated Color by the 'strength' (Wave Shape).

      // Boost the peak brightness
      const brightness =
        strength * (visualizationMode === "energy_flow" ? 5.0 : 3.0);

      colors[j * 3] = rCol * brightness;
      colors[j * 3 + 1] = gCol * brightness;
      colors[j * 3 + 2] = bCol * brightness;
    }

    line.geometry.attributes.position.needsUpdate = true;
    line.geometry.attributes.color.needsUpdate = true;
  }

  function calculateGain(dirVec: Vector3): number {
    let gain = 1.0;

    switch (antennaType) {
      case "vertical":
      case "gp":
        gain = 1.0;
        break;

      case "horizontal":
      case "inverted-v":
      case "positive-v":
        gain = Math.abs(dirVec.z);
        break;

      case "yagi":
        gain = dirVec.x > 0 ? dirVec.x ** 2 : 0.1;
        break;

      case "quad":
        gain = Math.abs(dirVec.z);
        break;

      case "moxon":
        gain = (1 + dirVec.z) * 0.5;
        if (gain < 0.2) gain = 0;
        break;

      case "elliptical":
        gain = 1.0;
        break;

      case "circular":
        // Helical antenna (Axial mode) - directional along X
        gain = dirVec.x > 0 ? dirVec.x ** 2 : 0;
        break;

      case "end-fed":
        // Similar to dipole (inverted-v/horizontal) pattern relation
        gain = Math.sqrt(dirVec.y * dirVec.y + dirVec.z * dirVec.z);
        break;
    }

    return gain;
  }

  return (
    <group ref={groupRef}>
      {lines.map((line) => (
        <primitive key={line.id} object={line} />
      ))}
    </group>
  );
}

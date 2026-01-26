import { forwardRef } from "react";
import type { MoxonDesign } from "~/lib/moxon-calc";

interface MoxonSvgRendererProps {
  design: MoxonDesign;
  width: number;
  height: number;
}

export const MoxonSvgRenderer = forwardRef<
  SVGSVGElement,
  MoxonSvgRendererProps
>(({ design, width, height }, ref) => {
  // Canvas padding
  const padding = 60;
  const drawW = width - padding * 2;
  const drawH = height - padding * 2;

  // Moxon Dimensions
  // Width = A (Driven Width)
  // Depth = E (Side Length = B + C + D)
  // We want to scale this to fit in drawW/drawH

  // Physical dimensions
  const physicalW = design.A;
  const physicalH = design.E;

  // Calculate scale to fit
  // Maintain aspect ratio
  const scaleX = drawW / physicalW;
  const scaleY = drawH / physicalH;
  const scale = Math.min(scaleX, scaleY) * 0.8; // 0.8 for safety margin

  // Center the drawing
  const centerX = width / 2;
  const centerY = height / 2;

  // Coordinates relative to center
  // Moxon is centered.
  // Half Width
  const hw = (design.A * scale) / 2;
  const hh = (design.E * scale) / 2;

  // Driven Element (Front / Top in this view?)
  // Usually Yagi is drawn with boom horizontal.
  // Moxon is a rectangle. Let's draw it "Plan View" (Top down).
  // Driven Element at the "Top" (or Bottom?)
  // Convention: Forward direction is usually "Up" or "Right".
  // Let's assume Forward is UP.
  // So Driven Element is at the Bottom?
  // Wait, Yagi: Reflector is at position 0 (Left), Driven is spacing (Right). Fire direction -> Right.
  // Moxon: Driven Element is the "Front" element? No!
  // Driven Element is the ACTIVE element. Reflector is BEHIND it.
  // So if firing UP: Reflector is at Bottom, Driven is at Top.
  // Let's verify Moxon direction.
  // Moxon is a 2-element Yagi. Reflector behind Driven.
  // Direction of fire is FROM Reflector TOWARDS Driven.
  // So if Reflector is at Bottom, Driven is Top. Fire is UP.

  // Dimensions:
  // A = Driven Width (Top horizontal bar)
  // B = Driven Tail (Top vertical sides, pointing down)
  // C = Gap
  // D = Reflector Tail (Bottom vertical sides, pointing up)
  // E = Reflector Width (Bottom horizontal bar)

  // Actually, normally:
  // A (Driven) is the "Back" physically? No.
  // Reflector is the "Back".
  // So Reflector (E) is at the bottom. Tails (D) point UP.
  // Driven (A) is at the top. Tails (B) point DOWN.
  // Gap (C) is between the tips.

  // Let's draw:
  // Reflector Y position: +hh (Bottom)
  // Driven Y position: -hh (Top) ??
  // Wait, Depth is E = B+C+D.
  // Distance from Driven Center to Reflector Center?
  // It's not a simple center-to-center.
  // The structure is defined by the tails.
  // Total Height (Depth) = E.
  // Top Edge (Driven): Y_top
  // Bottom Edge (Reflector): Y_bottom = Y_top + E?

  // Let's use coordinate system: (0,0) is center of the rectangle.
  // Top Y: -hh
  // Bottom Y: +hh
  // Left X: -hw
  // Right X: +hw

  // Driven Element (Top):
  // Horizontal Bar: (-hw, -hh) to (+hw, -hh)
  // Left Tail: (-hw, -hh) to (-hw, -hh + B*scale)
  // Right Tail: (+hw, -hh) to (+hw, -hh + B*scale)

  // Reflector Element (Bottom):
  // Horizontal Bar: (-hw, +hh) to (+hw, +hh)  <-- Assuming width E approx equals A.
  // Actually our model assumes A width for both.
  // Left Tail: (-hw, +hh) to (-hw, +hh - D*scale)
  // Right Tail: (+hw, +hh) to (+hw, +hh - D*scale)

  // Gap check:
  // Driven Tail Y end: -hh + B*scale
  // Reflector Tail Y end: +hh - D*scale
  // Distance = (+hh - D) - (-hh + B) = 2hh - (B+D) = E - (B+D) = (B+C+D) - B - D = C.
  // Valid.

  // Colors
  const drivenColor = "#ef4444"; // Red
  const refColor = "#3b82f6"; // Blue
  const dimColor = "#94a3b8"; // Slate 400

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="max-w-full h-auto"
    >
      <title>Moxon</title>
      <rect width={width} height={height} fill="#0f172a" rx="12" />

      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* Grid check / Center Cross */}
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#1e293b" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#1e293b" />

        {/* --- DRIVEN ELEMENT (Red) --- */}
        {/* Main Horizontal A */}
        <line
          x1={-hw}
          y1={-hh}
          x2={hw}
          y2={-hh}
          stroke={drivenColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Left Tail B */}
        <line
          x1={-hw}
          y1={-hh}
          x2={-hw}
          y2={-hh + design.B * scale}
          stroke={drivenColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right Tail B */}
        <line
          x1={hw}
          y1={-hh}
          x2={hw}
          y2={-hh + design.B * scale}
          stroke={drivenColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* --- REFLECTOR ELEMENT (Blue) --- */}
        {/* Main Horizontal E (using A width for now as per simple model) */}
        <line
          x1={-hw}
          y1={hh}
          x2={hw}
          y2={hh}
          stroke={refColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Left Tail D */}
        <line
          x1={-hw}
          y1={hh}
          x2={-hw}
          y2={hh - design.D * scale}
          stroke={refColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right Tail D */}
        <line
          x1={hw}
          y1={hh}
          x2={hw}
          y2={hh - design.D * scale}
          stroke={refColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* --- DIMENSIONS --- */}

        {/* Dimension A (Width) */}
        <text
          x="0"
          y={-hh - 15}
          fill={dimColor}
          textAnchor="middle"
          fontSize="14"
          fontFamily="monospace"
        >
          A = {design.A.toFixed(1)} mm
        </text>

        {/* Dimension C (Gap) - Left Side */}
        <line
          x1={-hw - 20}
          y1={-hh + design.B * scale}
          x2={-hw - 20}
          y2={hh - design.D * scale}
          stroke={dimColor}
          strokeWidth="1"
          strokeDasharray="4 2"
        />
        <text
          x={-hw - 25}
          y={0}
          fill={dimColor}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize="12"
          fontFamily="monospace"
        >
          C (Gap) = {design.C.toFixed(1)}
        </text>

        {/* Dimension B (Driven Tail) - Right Side */}
        <text
          x={hw + 10}
          y={-hh + (design.B * scale) / 2}
          fill={dimColor}
          textAnchor="start"
          dominantBaseline="middle"
          fontSize="12"
          fontFamily="monospace"
        >
          B = {design.B.toFixed(1)}
        </text>

        {/* Dimension D (Reflector Tail) - Right Side */}
        <text
          x={hw + 10}
          y={hh - (design.D * scale) / 2}
          fill={dimColor}
          textAnchor="start"
          dominantBaseline="middle"
          fontSize="12"
          fontFamily="monospace"
        >
          D = {design.D.toFixed(1)}
        </text>

        {/* Dimension E (Total Depth) - Far Right */}
        <line
          x1={hw + 60}
          y1={-hh}
          x2={hw + 60}
          y2={hh}
          stroke={dimColor}
          strokeWidth="1"
        />
        <line
          x1={hw + 55}
          y1={-hh}
          x2={hw + 65}
          y2={-hh}
          stroke={dimColor}
          strokeWidth="1"
        />
        <line
          x1={hw + 55}
          y1={hh}
          x2={hw + 65}
          y2={hh}
          stroke={dimColor}
          strokeWidth="1"
        />
        <text
          x={hw + 70}
          y="0"
          fill={dimColor}
          textAnchor="start"
          dominantBaseline="middle"
          fontSize="12"
          fontFamily="monospace"
        >
          Depth E = {design.E.toFixed(1)}
        </text>

        {/* Feedpoint Indication */}
        <circle
          cx="0"
          cy={-hh}
          r="4"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <text x="0" y={-hh + 15} fill="white" textAnchor="middle" fontSize="10">
          Feed
        </text>
      </g>

      {/* Title / Watermark */}
      <text
        x="20"
        y={height - 20}
        fill="#475569"
        fontSize="14"
        fontWeight="bold"
      >
        Moxon {design.config.frequency} MHz
      </text>
    </svg>
  );
});

MoxonSvgRenderer.displayName = "MoxonSvgRenderer";

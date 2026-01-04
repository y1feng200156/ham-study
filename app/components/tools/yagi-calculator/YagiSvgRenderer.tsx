import type React from "react";
import type { YagiDesign } from "~/lib/yagi-calc";

interface YagiSvgRendererProps {
  design: YagiDesign;
  width: number;
  height: number;
  minimal?: boolean;
  ref?: React.Ref<SVGSVGElement>;
}

// Improved SVG Renderer with Grid and Dimensions
export function YagiSvgRenderer({
  design,
  width,
  height,
  minimal = false,
  ref,
}: YagiSvgRendererProps) {
  // Layout Constants
  const padX = minimal ? 30 : 60;
  const vPad = minimal ? 40 : 160;
  const boomY = height / 2;

  // Scales
  const totalLen = design.totalBoomLength || 1;
  const maxElLen = design.elements[0].length * 1.2;
  const scaleX = (width - padX * 2) / totalLen;
  const scaleY = (height - vPad) / maxElLen; // Leave vertical padding

  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      ref={ref}
    >
      <title>Yagi Design Schematic</title>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#334155"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
        <marker
          id="arrow"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#64748b" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="100%" height="100%" fill="#1e293b" />
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Boom */}
      <line
        x1={padX - 20}
        y1={boomY}
        x2={padX + totalLen * scaleX + 20}
        y2={boomY}
        stroke="#475569"
        strokeWidth={Math.max(6, design.config.boomDiameter * scaleY)}
        strokeLinecap="round"
      />

      {design.elements.map((el, idx) => {
        const cx = padX + el.position * scaleX;
        const halfPx = (el.length / 2) * scaleY;
        const y1 = boomY - halfPx;
        const y2 = boomY + halfPx;

        // Colors
        const isDE = el.type === "DE";
        const col = isDE
          ? "#38bdf8"
          : el.type === "REF"
            ? "#f472b6"
            : "#cbd5e1";
        const sw = el.type === "REF" ? 4 : 3;

        return (
          <g key={el.name}>
            {/* Element Graphic */}
            {isDE ? (
              el.style === "folded" ? (
                // Folded Dipole Graphic
                <g>
                  <path
                    d={`M${cx - 7},${y1 + 5} A7,7 0 0 1 ${cx + 7},${y1 + 5} L${cx + 7},${y2 - 5} A7,7 0 0 1 ${cx - 7},${y2 - 5} L${cx - 7},${boomY + 4} M${cx - 7},${boomY - 4} L${cx - 7},${y1 + 5}`}
                    stroke={col}
                    strokeWidth={4}
                    fill="none"
                  />
                  {/* Terminals */}
                  <circle cx={cx - 7} cy={boomY - 4} r={2} fill="white" />
                  <circle cx={cx - 7} cy={boomY + 4} r={2} fill="white" />
                </g>
              ) : (
                // Straight Split Dipole
                <g>
                  <line
                    x1={cx}
                    y1={y1}
                    x2={cx}
                    y2={boomY - ((el.gap || 0) * scaleY) / 2}
                    stroke={col}
                    strokeWidth={4}
                  />
                  <line
                    x1={cx}
                    y1={boomY + ((el.gap || 0) * scaleY) / 2}
                    x2={cx}
                    y2={y2}
                    stroke={col}
                    strokeWidth={4}
                  />
                  <circle
                    cx={cx}
                    cy={boomY - ((el.gap || 0) * scaleY) / 2}
                    r={2}
                    fill="white"
                  />
                  <circle
                    cx={cx}
                    cy={boomY + ((el.gap || 0) * scaleY) / 2}
                    r={2}
                    fill="white"
                  />
                </g>
              )
            ) : (
              // Parasitic Element
              <line
                x1={cx}
                y1={y1}
                x2={cx}
                y2={y2}
                stroke={col}
                strokeWidth={sw}
              />
            )}

            {/* Labels and Dimensions - Hide in minimal mode */}
            {!minimal && (
              <>
                {/* Label */}
                <text
                  x={cx}
                  y={y2 + 25}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {el.name.split(" ")[0].replace("Director", "D")}
                </text>

                {/* Dimension Lines */}
                {/* Width dim */}
                <g opacity="0.6">
                  <line
                    x1={cx + 15}
                    y1={y1}
                    x2={cx + 15}
                    y2={y2}
                    stroke="#475569"
                    strokeWidth="1"
                    markerStart="url(#arrow)"
                    markerEnd="url(#arrow)"
                  />
                  <text
                    x={cx + 25}
                    y={boomY}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="12"
                    fontFamily="monospace"
                    transform={`rotate(-90, ${cx + 25}, ${boomY})`}
                  >
                    {el.cutLength.toFixed(1)}
                  </text>
                </g>

                {/* Position Dim from prev (only if spacing > 0) */}
                {idx > 0 && (
                  <g>
                    <line
                      x1={cx}
                      y1={y2 + 30}
                      x2={cx}
                      y2={height - 60}
                      stroke="#334155"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={cx}
                      y={height - 50}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="12"
                      fontFamily="monospace"
                    >
                      {el.position.toFixed(0)}
                    </text>
                  </g>
                )}
              </>
            )}
          </g>
        );
      })}

      {/* Origin Mark - Hide in minimal mode */}
      {!minimal && (
        <>
          <text
            x={padX}
            y={height - 50}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="12"
            fontFamily="monospace"
          >
            0
          </text>
          <line
            x1={padX}
            y1={boomY + 60}
            x2={padX}
            y2={height - 60}
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </>
      )}
    </svg>
  );
}

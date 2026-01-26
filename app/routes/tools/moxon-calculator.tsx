import { CalculatorIcon, DownloadIcon, Square } from "@phosphor-icons/react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useMemo, useRef, useState } from "react";
import { initReactI18next } from "react-i18next";
import { MoxonResultsTable } from "~/components/tools/moxon-calculator/MoxonResultsTable";
import { MoxonSpecsCard } from "~/components/tools/moxon-calculator/MoxonSpecsCard";
import { MoxonSvgRenderer } from "~/components/tools/moxon-calculator/MoxonSvgRenderer";
import { Button } from "~/components/ui/button";
import { TooltipProvider } from "~/components/ui/tooltip";
import { calculateMoxon, type MoxonConfig } from "~/lib/moxon-calc";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/moxon-calculator";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t = await i18next.use(initReactI18next).init({
    lng: locale,
    ns: "common",
    resources,
  });
  return {
    title: t("tools.moxonCalculator.title"),
    description: t("tools.moxonCalculator.description"),
    keywords: t("tools.moxonCalculator.keywords"),
  };
};

export const meta = ({ loaderData }: Route.MetaArgs) => {
  const { title, description, keywords } = loaderData;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "keywords", content: keywords },
  ];
};

export default function MoxonCalculator() {
  const { t } = useTranslation("common");
  // --- State ---
  const [frequency, setFrequency] = useState(145.0);
  const [wireDiameter, setWireDiameter] = useState(3.0);

  // --- Derived ---
  const config: MoxonConfig = useMemo(() => {
    return {
      frequency,
      wireDiameter,
    };
  }, [frequency, wireDiameter]);

  const design = useMemo(() => calculateMoxon(config), [config]);

  // --- Handlers ---
  const copyTable = () => {
    const header = "Dimension\tValue (mm)\tDesc\n";
    const body = `
A\t${design.A.toFixed(1)}\tDriven Width
B\t${design.B.toFixed(1)}\tDriven Tail
C\t${design.C.toFixed(1)}\tGap
D\t${design.D.toFixed(1)}\tReflector Tail
E\t${design.E.toFixed(1)}\tTotal Depth
Freq\t${config.frequency}\tMHz
`.trim();
    navigator.clipboard.writeText(header + body);
    alert(t("tools.moxonCalculator.results.copied"));
  };

  const svgRef = useRef<SVGSVGElement>(null);

  const downloadPng = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const scale = 2;
    const w = 1000;
    const h_svg = 600;

    // Table settings
    const headerHeight = 60;
    const rowHeight = 35;
    const footerHeight = 50;
    const tableRows = 5; // A, B, C, D, E
    const tableH = tableRows * rowHeight + headerHeight + footerHeight;
    const totalH = h_svg + tableH;

    // Canvas dimensions
    canvas.width = w * scale;
    canvas.height = totalH * scale;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scale, scale);

    // 1. Draw Blueprint Background (Dark)
    ctx.fillStyle = "#0f172a"; // Match SVG bg
    ctx.fillRect(0, 0, w, h_svg);

    const img = new Image();
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));

    img.onload = () => {
      // 2. Draw SVG
      ctx.drawImage(img, (w - 800) / 2, 0, 800, 500); // Center the 800x500 svg in 1000w width?
      // Actually SVG renderer was passed width=800. Let's draw it spanning or centered?
      // The previous code had w=1000, h_svg=600.
      // And MoxonSvgRenderer was rendered with width=800 in the UI.
      // But we captured its current state.
      // Let's just draw it filling the top area or centered.
      // The SVG 'viewBox' is set to its props.
      // Let's just draw it at 0,0 assuming it scales nicely or is captured as is.
      ctx.drawImage(img, 0, 0, w, h_svg);

      // 3. Draw Table Background (Light)
      const tableStartY = h_svg;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, tableStartY, w, tableH);

      // 4. Draw Header
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("Moxon Antenna Dimensions / 尺寸表", 40, tableStartY + 40);

      // Draw Line
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, tableStartY + 55);
      ctx.lineTo(w - 40, tableStartY + 55);
      ctx.stroke();

      // 5. Draw Table Headers
      const colX = [40, 150, 400];
      const headers = ["ID", "Value (mm)", "Description"];

      ctx.fillStyle = "#64748b";
      ctx.font = "bold 14px sans-serif";
      let y = tableStartY + 80;

      headers.forEach((h, i) => ctx.fillText(h, colX[i], y));

      // 6. Draw Rows
      const data = [
        { id: "A", val: design.A, desc: "Driven Element Width" },
        { id: "B", val: design.B, desc: "Driven Element Tail" },
        { id: "C", val: design.C, desc: "Gap Distance" },
        { id: "D", val: design.D, desc: "Reflector Tail" },
        { id: "E", val: design.E, desc: "Reflector Width (Total Depth)" },
      ];

      ctx.font = "16px monospace";
      y += 10; // spacing

      data.forEach((row) => {
        y += rowHeight;

        // Zebra striping
        if (data.indexOf(row) % 2 === 0) {
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(20, y - 25, w - 40, rowHeight);
        }

        ctx.fillStyle = "#0f172a"; // Text color
        ctx.font = "bold 18px monospace";
        ctx.fillText(row.id, colX[0], y);

        ctx.font = "18px monospace";
        ctx.fillText(row.val.toFixed(1), colX[1], y);

        ctx.font = "16px sans-serif";
        ctx.fillStyle = "#334155";
        ctx.fillText(row.desc, colX[2], y);
      });

      // 7. Footer
      y += 60;
      ctx.fillStyle = "#94a3b8";
      ctx.font = "italic 12px sans-serif";
      ctx.fillText(
        `Generated by Moxon Calc | Freq: ${design.config.frequency} MHz | Wire: ${design.config.wireDiameter}mm`,
        40,
        y,
      );

      const a = document.createElement("a");
      a.download = `moxon_design_${design.config.frequency}MHz.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl font-sans">
      <TooltipProvider delayDuration={100}>
        {/* Navbar / Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-slate-900 text-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <CalculatorIcon className="w-8 h-8 text-indigo-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                {t("tools.moxonCalculator.title")}
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest">
                {t("tools.moxonCalculator.algorithm")}
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="px-3 py-1 bg-slate-800 rounded-md text-xs font-mono text-slate-300">
              v1.0.0
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <MoxonSpecsCard
              frequency={frequency}
              setFrequency={setFrequency}
              wireDiameter={wireDiameter}
              setWireDiameter={setWireDiameter}
            />

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-800">
              <p className="font-bold flex items-center mb-1">
                <Square className="w-3.5 h-3.5 mr-1" />
                {t("tools.moxonCalculator.specs.introTitle")}
              </p>
              <p className="opacity-90 leading-relaxed">
                {t("tools.moxonCalculator.specs.introDesc")}
              </p>
            </div>
          </div>

          {/* Right Panel: Results */}
          <div className="lg:col-span-8 space-y-6">
            {/* Blueprint */}
            <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 p-1">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-800 rounded-t-lg">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {t("tools.moxonCalculator.blueprint.title")}
                </span>
                <Button
                  variant="default"
                  size="sm"
                  type="button"
                  className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 font-bold"
                  onClick={downloadPng}
                >
                  <DownloadIcon className="mr-2 w-3 h-3" />⬇{" "}
                  {t("tools.moxonCalculator.blueprint.download")}
                </Button>
              </div>
              <div className="bg-slate-950 min-h-[400px] flex items-center justify-center overflow-auto rounded-b-lg scrollbar-none relative">
                <MoxonSvgRenderer
                  design={design}
                  width={800} // slightly smaller render width for svg container
                  height={500}
                  ref={svgRef}
                />
              </div>
            </div>

            <MoxonResultsTable design={design} copyTable={copyTable} />
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}

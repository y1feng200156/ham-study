import {
  CalculatorIcon,
  CompassToolIcon,
  DownloadIcon,
  InfoIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import i18next from "i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { initReactI18next } from "react-i18next";
import { BasicSpecsCard } from "~/components/tools/yagi-calculator/BasicSpecsCard";
import { ProModePanel } from "~/components/tools/yagi-calculator/ProModePanel";
import {
  QuickModePanel,
  type QuickPresetType,
} from "~/components/tools/yagi-calculator/QuickModePanel";
import { ResultsTable } from "~/components/tools/yagi-calculator/ResultsTable";
import { YagiSvgRenderer } from "~/components/tools/yagi-calculator/YagiSvgRenderer";
import { Button } from "~/components/ui/button";
import { TooltipProvider } from "~/components/ui/tooltip";
import {
  type BoomShape,
  calculateYagi,
  type DrivenElementType,
  type MountMethod,
  type SpacingType,
  type YagiConfig,
} from "~/lib/yagi-calc";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/yagi-calculator";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t = await i18next.use(initReactI18next).init({
    lng: locale,
    ns: "common",
    resources,
  });
  return {
    title: t("tools.yagiCalculator.title"),
    description: t("tools.yagiCalculator.description"),
    keywords: t("tools.yagiCalculator.keywords"),
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

export default function YagiCalculator() {
  // --- UI State ---
  const [mode, setMode] = useState<"quick" | "pro">("quick");

  // --- Common Specs ---
  const [frequency, setFrequency] = useState(435.0);
  const [elementCount, setElementCount] = useState(5);

  // --- Quick Mode State ---
  const [quickPreset, setQuickPreset] =
    useState<QuickPresetType>("metal_bonded");

  // --- Pro Mode State ---
  const [proElDia, setProElDia] = useState(4.0);
  const [proBoomDia, setProBoomDia] = useState(20.0);
  const [proBoomShape, setProBoomShape] = useState<BoomShape>("round");
  const [proMountMethod, setProMountMethod] = useState<MountMethod>("bonded");
  const [proDeType, setProDeType] = useState<DrivenElementType>("folded");
  const [proFeedGap, setProFeedGap] = useState(10);
  const [proSpacingType, setProSpacingType] = useState<SpacingType>("dl6wu");
  const [proManualSpacing, setProManualSpacing] = useState(0.2);
  const [proManualBCFactor, setProManualBCFactor] = useState<
    number | undefined
  >();

  // --- Derived Config ---
  const config: YagiConfig = useMemo(() => {
    if (mode === "quick") {
      let mount: MountMethod = "bonded";
      let bcFactorOverride: number | undefined;

      switch (quickPreset) {
        case "metal_bonded":
          mount = "bonded";
          bcFactorOverride = 0.7; // Hardcoded preset from HTML logic
          break;
        case "metal_insulated":
          mount = "insulated";
          bcFactorOverride = 0.3;
          break;
        case "pvc":
          mount = "none";
          bcFactorOverride = 0.0;
          break;
      }

      return {
        frequency,
        elementCount,
        elementDiameter: 4.0, // Fixed in quick
        boomDiameter: 20.0, // Fixed in quick
        boomShape: "round",
        mountMethod: mount,
        feedGap: 10,
        drivenElementType: "folded",
        spacingType: "dl6wu",
        manualSpacing: 0,
        manualBCFactor: bcFactorOverride,
      };
    } else {
      // Pro Mode
      return {
        frequency,
        elementCount,
        elementDiameter: proElDia,
        boomDiameter: proBoomDia,
        boomShape: proBoomShape,
        mountMethod: proMountMethod,
        feedGap: proFeedGap,
        drivenElementType: proDeType,
        spacingType: proSpacingType,
        manualSpacing: proManualSpacing,
        manualBCFactor: proManualBCFactor,
      };
    }
  }, [
    mode,
    frequency,
    elementCount,
    quickPreset,
    proElDia,
    proBoomDia,
    proBoomShape,
    proMountMethod,
    proDeType,
    proFeedGap,
    proSpacingType,
    proManualSpacing,
    proManualBCFactor,
  ]);

  const design = useMemo(() => calculateYagi(config), [config]);

  // --- Auto-calculate K Factor for display in Pro Mode ---
  const autoKFactor = useMemo(() => {
    const d = proElDia || 0;
    const B = proBoomDia || 0;
    const ratio = d > 0 ? B / d : 0;
    const m = proMountMethod;

    if (m === "none" || m === "non_metal") return 0;
    if (m === "above" || m === "above_bonded") return 0.05;
    if (m === "insulated" || m === "through_insulated") return 0.3;
    if (m === "bonded" || m === "through_bonded") {
      if (ratio > 1) {
        let k = 0.35 + 0.23 * Math.log(ratio);
        if (k > 1) k = 1.0;
        return k;
      }
      return 0.7;
    }
    return 0;
  }, [proElDia, proBoomDia, proMountMethod]);

  useEffect(() => {
    if (mode === "pro") {
      setProManualBCFactor(parseFloat(autoKFactor.toFixed(3)));
    }
  }, [autoKFactor, mode]);

  // --- Handlers ---
  const copyTable = () => {
    const header =
      "单元(Element)\t位置(Pos)\t间距(Space)\t半长(Half)\t切割长(Cut)\t备注(Note)\n";
    const body = design.elements
      .map((e) => {
        let note = "-";
        if (e.type === "DE") {
          if (e.style === "folded") note = "折合振子";
          else if (e.gap) note = `间隙: ${e.gap}mm`;
        }
        return `${e.name}\t${e.position.toFixed(1)}\t${e.spacing > 0 ? e.spacing.toFixed(1) : "-"}\t${e.halfLength.toFixed(1)}\t${e.cutLength.toFixed(1)}\t${note}`;
      })
      .join("\n");
    navigator.clipboard.writeText(header + body);
    alert("数据已复制到剪贴板！");
  };

  const svgRef = useRef<SVGSVGElement>(null);

  const downloadPng = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const scale = 2;
    const w = 1000;
    const h_svg = 600;

    // Table vars
    const rowHeight = 30;
    const headerHeight = 80;
    const footerHeight = 50;
    const tableH = design.elements.length * rowHeight;
    const totalH = h_svg + headerHeight + tableH + footerHeight;

    canvas.width = w * scale;
    canvas.height = totalH * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scale, scale);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, w, totalH);

    const img = new Image();
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
    img.onload = () => {
      // Draw Blueprint
      ctx.drawImage(img, 0, 0, w, h_svg);

      // Draw Table
      const startY = h_svg;
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("切割尺寸表 (CUT LIST)", 40, startY + 40);

      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, startY + 55);
      ctx.lineTo(w - 40, startY + 55);
      ctx.stroke();

      const headers = [
        "ELEMENT / 单元",
        "POS (mm)",
        "SPACE (mm)",
        "HALF LEN (mm)",
        "CUT LEN (mm)",
        "NOTES / 备注",
      ];
      const colX = [40, 200, 350, 500, 650, 800];

      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 12px monospace";
      let y = startY + 75;
      headers.forEach((h, i) => {
        ctx.fillText(h, colX[i], y);
      });

      ctx.font = "12px monospace";
      y += 10;

      design.elements.forEach((el) => {
        y += rowHeight;
        const isDE = el.type === "DE";
        ctx.fillStyle = isDE ? "#38bdf8" : "#cbd5e1";

        let note = "-";
        if (isDE) {
          if (el.style === "folded") note = "Folded Loop";
          else if (el.gap) note = `Gap: ${el.gap}mm`;
        }

        const rowData = [
          el.name,
          el.position.toFixed(1),
          el.spacing > 0 ? el.spacing.toFixed(1) : "-",
          el.halfLength.toFixed(1),
          el.cutLength.toFixed(1),
          note,
        ];

        rowData.forEach((txt, i) => {
          if (i === 4) ctx.font = "bold 12px monospace";
          else ctx.font = "12px monospace";
          ctx.fillText(txt, colX[i], y);
        });

        // Line
        ctx.strokeStyle = "#334155";
        ctx.beginPath();
        ctx.moveTo(40, y + 5);
        ctx.lineTo(w - 40, y + 5);
        ctx.stroke();
      });

      // Footer
      y += 40;
      ctx.fillStyle = "#64748b";
      ctx.font = "italic 10px sans-serif";
      ctx.fillText(
        `Generated by Yagi Calc Pro | ${new Date().toISOString().split("T")[0]}`,
        40,
        y,
      );

      const a = document.createElement("a");
      a.download = `yagi_design_${design.config.frequency}MHz.png`;
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
            <CalculatorIcon className="w-8 h-8 text-sky-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                八木天线计算器
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest">
                DL6WU 工程工具
              </p>
            </div>
          </div>

          <div className="flex bg-slate-800 rounded-lg p-1 mt-4 md:mt-0">
            <button
              type="button"
              onClick={() => setMode("quick")}
              className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold transition-all ${mode === "quick" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-white"}`}
            >
              <LightningIcon
                className="size-5 text-yellow-400"
                weight="duotone"
              />{" "}
              快速模式
            </button>
            <button
              type="button"
              onClick={() => setMode("pro")}
              className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold transition-all ${mode === "pro" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-white"}`}
            >
              <CompassToolIcon
                className="size-5 text-blue-400"
                weight="duotone"
              />{" "}
              专业工程模式
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <BasicSpecsCard
              frequency={frequency}
              setFrequency={setFrequency}
              elementCount={elementCount}
              setElementCount={setElementCount}
            />

            {/* Quick Mode Panel */}
            {mode === "quick" && (
              <QuickModePanel
                quickPreset={quickPreset}
                setQuickPreset={setQuickPreset}
              />
            )}

            {/* Pro Mode Panel */}
            {mode === "pro" && (
              <ProModePanel
                proBoomShape={proBoomShape}
                setProBoomShape={setProBoomShape}
                proElDia={proElDia}
                setProElDia={setProElDia}
                proBoomDia={proBoomDia}
                setProBoomDia={setProBoomDia}
                proMountMethod={proMountMethod}
                setProMountMethod={setProMountMethod}
                proManualBCFactor={proManualBCFactor}
                setProManualBCFactor={setProManualBCFactor}
                proDeType={proDeType}
                setProDeType={setProDeType}
                proFeedGap={proFeedGap}
                setProFeedGap={setProFeedGap}
                proSpacingType={proSpacingType}
                setProSpacingType={setProSpacingType}
                proManualSpacing={proManualSpacing}
                setProManualSpacing={setProManualSpacing}
              />
            )}
          </div>
          {/* Right Panel: Results */}
          <div className="lg:col-span-8 space-y-6">
            {/* Blueprint */}
            <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 p-1">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-800 rounded-t-lg">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  设计蓝图预览 (Blueprint Preview)
                </span>
                <Button
                  variant="default"
                  size="sm"
                  type="button"
                  className="h-7 text-xs bg-sky-600 hover:bg-sky-500 font-bold"
                  onClick={downloadPng}
                >
                  <DownloadIcon className="mr-2 w-3 h-3" />⬇ 保存图纸+表格
                </Button>
              </div>
              <div className="bg-slate-950 min-h-[400px] flex items-center justify-center overflow-auto rounded-b-lg scrollbar-none relative">
                <YagiSvgRenderer
                  design={design}
                  width={1000}
                  height={500}
                  ref={svgRef}
                />
              </div>
            </div>

            {/* Info Box */}
            {design.boomCorrection > 0.1 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 animate-in fade-in">
                <p className="font-bold flex items-center mb-1 text-xs uppercase tracking-wide text-amber-900">
                  <InfoIcon className="w-4 h-4 mr-1.5" />
                  物理修正已应用
                </p>
                <p className="text-xs opacity-90 leading-relaxed font-mono">
                  基于 B/d=
                  {(
                    design.config.boomDiameter / design.config.elementDiameter
                  ).toFixed(2)}{" "}
                  和 k={design.bcFactor.toFixed(3)}. 所有振子已延长{" "}
                  <span className="font-bold underline bg-amber-100 px-1 rounded">
                    {design.boomCorrection.toFixed(2)} mm
                  </span>
                  .
                </p>
              </div>
            )}

            <ResultsTable design={design} copyTable={copyTable} />
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}

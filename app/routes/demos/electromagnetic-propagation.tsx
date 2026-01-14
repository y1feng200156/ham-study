import { FadersIcon, XIcon } from "@phosphor-icons/react";
import type { TFunction } from "i18next";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import ElectromagneticPropagationScene from "~/components/electromagnetic-propagation-scene";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/electromagnetic-propagation";

const EARTH_RADIUS = 50;
const CRITICAL_FREQUENCY_FOF2 = 7;

function ClientOnly({
  children,
  fallback = null,
}: {
  children: () => React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? children() : fallback;
}

export const meta = ({ loaderData }: Route.MetaArgs) => {
  const { title, description, keywords } = loaderData;
  return [
    { title },
    {
      name: "description",
      content: description,
    },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: description,
    },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "keywords",
      content: keywords,
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t: TFunction<["common", "demos"]> = await i18next
    .use(initReactI18next)
    .init({
      lng: locale,
      resources,
    });
  return {
    title: t(`demos:electromagneticPropagation.metaTitle`),
    description: t(`demos:electromagneticPropagation.metaDescription`),
    keywords: t(`demos:electromagneticPropagation.metaKeywords`),
  };
};

function HUDBox({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-slate-900/80 backdrop-blur border border-cyan-500/30 p-4 rounded shadow-[0_0_15px_rgba(6,182,212,0.15)] ${className}`}
    >
      <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2">
        <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_cyan]"></span>
          {title}
        </h3>
        <div className="flex gap-1">
          {[...Array(3)].map((i) => (
            <div
              key={`hud-deco-${i}`}
              className="w-1 h-3 bg-cyan-900/50 transform -skew-x-12"
            ></div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

function HUDButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300
        border relative overflow-hidden group w-full
        ${
          active
            ? "bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            : "bg-transparent border-slate-700 text-slate-500 hover:border-cyan-700 hover:text-cyan-300"
        }
      `}
    >
      <div
        className={`absolute inset-0 bg-cyan-400/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out`}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {active && <span className="w-1 h-1 bg-cyan-300 rounded-full" />}
        {children}
      </span>
    </button>
  );
}

export default function PropagationApp() {
  const { t } = useTranslation("demos");

  // 核心参数
  const [mode, setMode] = useState<"HF" | "UV">("HF");
  const [frequency, setFrequency] = useState(14); // MHz
  const [angle, setAngle] = useState(30); // Degrees
  const [ionoHeight, setIonoHeight] = useState(20); // Scale factor
  const [showControls, setShowControls] = useState(false); // Mobile controls toggle

  // 模拟 HUD 数据波动
  const [hudData, setHudData] = useState({ signal: -80, noise: -110 });

  // 计算当前颜色 (同步 3D 场景逻辑)
  const rad = (angle * Math.PI) / 180;
  const ionoR = EARTH_RADIUS + ionoHeight;
  const incidenceAngle = Math.asin((EARTH_RADIUS / ionoR) * Math.cos(rad));
  const currentMUF = CRITICAL_FREQUENCY_FOF2 / Math.cos(incidenceAngle);
  const isPenetrating = mode === "UV" ? true : frequency > currentMUF;

  // 颜色映射 (十六进制转 CSS)
  // 同步 electromagnetic-propagation-scene.tsx 中的颜色定义
  const COLORS = {
    GW: "#22c55e", // 地波 (Green)
    HF_REFLECT: "#06b6d4", // HF 反射 (Cyan)
    HF_PENETRATE: "#f43f5e", // HF 穿透 (Pink)
    UV: "#facc15", // UV (Yellow)
  };

  const skyWaveColor =
    mode === "HF"
      ? isPenetrating
        ? COLORS.HF_PENETRATE
        : COLORS.HF_REFLECT
      : COLORS.UV;
  const groundWaveColor = COLORS.GW;

  useEffect(() => {
    const interval = setInterval(() => {
      setHudData({
        signal: Math.floor(-50 - Math.random() * 40),
        noise: Math.floor(-100 - Math.random() * 20),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden font-mono select-none text-cyan-50">
      {/* 背景网格线 (保持 CSS 实现以节省性能) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* 3D 场景层 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ClientOnly
          fallback={
            <div className="w-full h-full flex items-center justify-center text-cyan-500">
              Loading 3D Engine...
            </div>
          }
        >
          {() => (
            <ElectromagneticPropagationScene
              mode={mode}
              frequency={frequency}
              angle={angle}
              ionoHeight={ionoHeight}
            />
          )}
        </ClientOnly>
      </div>

      {/* 顶部状态栏 */}
      <div className="absolute top-0 left-0 w-full p-3 md:p-4 pointer-events-none flex justify-between items-start z-10 bg-linear-to-b from-black/60 to-transparent">
        <div className="flex gap-3 md:gap-4 items-center">
          <div className="w-10 h-10 md:w-16 md:h-16 border-2 border-cyan-500 rounded-full flex items-center justify-center animate-spin-slow opacity-80 scale-75 md:scale-100">
            <div className="w-8 h-8 md:w-12 md:h-12 border border-cyan-300 rounded-full border-t-transparent border-l-transparent"></div>
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-cyan-400 tracking-widest md:tracking-wider uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
              {t("electromagneticPropagation.hudTitle")}
              <span className="text-[10px] md:text-xs align-top opacity-70 ml-1 md:ml-2">
                v3.0
              </span>
            </h1>
            <div className="flex gap-2 md:gap-4 text-[10px] md:text-xs text-cyan-600 mt-0.5 md:mt-1">
              <span>{t("electromagneticPropagation.systemStatus.online")}</span>
              <span className="hidden md:inline">
                {t("electromagneticPropagation.systemStatus.ionosphereStable")}
              </span>
              <span className="text-amber-500 animate-pulse">
                {t(
                  "electromagneticPropagation.systemStatus.transmissionActive",
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:block text-right text-xs text-cyan-700 space-y-1">
          <p>
            {t("electromagneticPropagation.geoInfo.latitude")}:{" "}
            {Math.abs(hudData.signal)}.4221 N
          </p>
          <p>
            {t("electromagneticPropagation.geoInfo.longitude")}:{" "}
            {Math.abs(hudData.noise)}.9102 E
          </p>
          <p>{t("electromagneticPropagation.geoInfo.altitude")}: 0.0000 KM</p>
        </div>
      </div>

      {/* 移动端控制台开关 */}
      <button
        type="button"
        onClick={() => setShowControls(!showControls)}
        className="md:hidden absolute bottom-6 right-6 z-30 w-12 h-12 bg-cyan-900/80 border border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur active:scale-95 transition-transform"
      >
        {showControls ? (
          <XIcon className="w-6 h-6" weight="bold" />
        ) : (
          <FadersIcon className="w-6 h-6" weight="bold" />
        )}
      </button>

      {/* 控制面板 (右下角 HUD) */}
      <div
        className={`
          absolute z-20 w-80 max-w-[calc(100vw-3rem)]
          transition-all duration-300 ease-out
          ${
            showControls
              ? "bottom-20 right-6 opacity-100 translate-y-0"
              : "bottom-6 right-6 opacity-0 translate-y-8 pointer-events-none md:pointer-events-auto md:opacity-100 md:translate-y-0"
          }
        `}
      >
        <HUDBox
          title={t("electromagneticPropagation.controls.title")}
          className="space-y-6"
        >
          {/* 模式切换 */}
          <div className="flex gap-2">
            <HUDButton active={mode === "HF"} onClick={() => setMode("HF")}>
              {t("electromagneticPropagation.controls.mode.hf")}
            </HUDButton>
            <HUDButton active={mode === "UV"} onClick={() => setMode("UV")}>
              {t("electromagneticPropagation.controls.mode.uv")}
            </HUDButton>
          </div>

          {/* 参数滑块 */}
          <div className="space-y-4">
            {mode === "HF" && (
              <div className="relative">
                <div className="flex justify-between text-xs text-cyan-400 mb-1">
                  <span>
                    {t("electromagneticPropagation.controls.frequency")}
                  </span>
                  <span className="text-amber-400 font-bold">
                    {frequency} MHz
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-none appearance-none accent-cyan-500 hover:accent-cyan-300 cursor-pointer"
                />
                <div className="w-full flex justify-between text-[10px] text-slate-600 mt-1">
                  <span>3MHz</span>
                  <span>30MHz</span>
                </div>
              </div>
            )}

            <div className="relative">
              <div className="flex justify-between text-xs text-cyan-400 mb-1">
                <span>
                  {t("electromagneticPropagation.controls.elevation")}
                </span>
                <span className="text-cyan-200">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-none appearance-none accent-cyan-500 hover:accent-cyan-300 cursor-pointer"
              />
            </div>

            <div className="relative">
              <div className="flex justify-between text-xs text-cyan-400 mb-1">
                <span>
                  {t("electromagneticPropagation.controls.ionosphereHeight")}
                </span>
                <span className="text-cyan-200">
                  {(ionoHeight * 10).toFixed(0)} KM
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={ionoHeight}
                onChange={(e) => setIonoHeight(Number(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-none appearance-none accent-cyan-500 hover:accent-cyan-300 cursor-pointer"
              />
            </div>
          </div>

          {/* 底部数据流装饰 */}
          <div className="border-t border-cyan-900 pt-2 flex justify-between items-end text-[10px] text-cyan-800 font-mono">
            <div>
              {t("electromagneticPropagation.metrics.snr")}: {hudData.signal} dB
              <br />
              {t("electromagneticPropagation.metrics.ber")}: 1.0e-
              {Math.abs(hudData.noise)}
            </div>
            <div className="h-4 w-20 bg-slate-800 overflow-hidden flex items-end gap-[2px]">
              {[...Array(10)].map((i) => (
                <div
                  key={`flow-${i}`}
                  className="w-1 bg-cyan-600"
                  style={{ height: `${Math.random() * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
        </HUDBox>
      </div>

      {/* 左下角图例 */}
      <div className="absolute bottom-6 left-6 z-10 w-64 hidden md:block">
        <HUDBox title={t("electromagneticPropagation.legend.title")}>
          <ul className="space-y-3 text-xs">
            {mode === "HF" && (
              <li className="flex items-center gap-2 transition-colors duration-300">
                <div
                  className="w-2 h-2"
                  style={{
                    backgroundColor: groundWaveColor,
                    boxShadow: `0 0 8px ${groundWaveColor}`,
                  }}
                ></div>
                <span style={{ color: groundWaveColor }}>
                  {t("electromagneticPropagation.legend.groundWave")}
                </span>
              </li>
            )}
            <li className="flex items-center gap-2 transition-colors duration-300">
              <div
                className="w-2 h-2"
                style={{
                  backgroundColor: skyWaveColor,
                  boxShadow: `0 0 8px ${skyWaveColor}`,
                }}
              ></div>
              <span style={{ color: skyWaveColor }}>
                {t("electromagneticPropagation.legend.skyWave")}
              </span>
            </li>
            <li className="flex items-center gap-2 transition-colors duration-300">
              <div
                className="w-2 h-2 opacity-60"
                style={{
                  backgroundColor: skyWaveColor,
                  border: `1px solid ${skyWaveColor}`,
                }}
              ></div>
              <span className="opacity-80" style={{ color: skyWaveColor }}>
                {t("electromagneticPropagation.legend.scatter")}
              </span>
            </li>
          </ul>
        </HUDBox>
      </div>
    </div>
  );
}

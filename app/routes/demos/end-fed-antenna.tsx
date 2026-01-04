import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const EndFedAntennaScene = lazy(
  () => import("~/components/end-fed-antenna-scene"),
);

import { MathOmega, MathZVI } from "~/components/math-inline";
import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "端馈半波天线 (End-Fed Half Wave) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示端馈天线（EFHW）的便携性与多波段谐振特性，展示49:1阻抗变换器原理。",
    },
    {
      property: "og:title",
      content: "端馈半波天线 (End-Fed Half Wave) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示端馈天线（EFHW）的便携性与多波段谐振特性，展示49:1阻抗变换器原理。",
    },
    {
      name: "twitter:title",
      content: "端馈半波天线 (End-Fed Half Wave) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示端馈天线（EFHW）的便携性与多波段谐振特性，展示49:1阻抗变换器原理。",
    },
    {
      name: "keywords",
      content:
        "端馈天线, EFHW, End-Fed Half Wave, 49:1 balun, 便携天线, portable antenna, 多波段天线",
    },
  ];
};

export default function EndFedAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">端馈半波天线 (End-Fed Half Wave)</h1>
        <p className="text-muted-foreground">
          天线理论可视化 (Antenna Theory Visualization)
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <ClientOnly
          fallback={
            <div className="h-[450px] md:h-[600px] w-full flex items-center justify-center bg-slate-100 rounded-lg">
              加载 3D 场景中...
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="h-[450px] md:h-[600px] w-full flex items-center justify-center bg-slate-100 rounded-lg">
                加载 3D 场景中...
              </div>
            }
          >
            <EndFedAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            端馈半波天线 (EFHW)
            是一种非常流行的多波段天线，特别适合野外便携架设。
            它本质上是一根长度为工作的一半波长的导线，一端馈电。
          </p>
          <ul>
            <li>
              <strong>阻抗变换:</strong> 由于在半波长末端馈电，阻抗极高（约
              2000-4000 欧姆），因此需要一个 49:1 或 64:1 的阻抗变换器 (Unun)
              将其匹配到 50 欧姆。
            </li>
            <li>
              <strong>结构:</strong> 主要由一个 Unun
              盒子、一根长振子线（Radiator）和一段同轴电缆组成。同轴电缆的屏蔽层通常充当反向地（Counterpoise）。
            </li>
            <li>
              <strong>多波段:</strong>{" "}
              在基频的谐波频率上也能自然谐振，无需天调即可工作在多个波段（如
              40m, 20m, 15m, 10m）。
            </li>
          </ul>

          <h3>极化与应用</h3>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    端馈半波天线 (EFHW)
                    在谐振时，馈电点位于电压波腹（电压最大）和电流波节（电流最小）处。
                    根据 <MathZVI />
                    ，这意味着其输入阻抗极高（理论上无穷大，实际上约 2500-5000
                    <MathOmega />
                    ）。 因此必须使用高变比（如 49:1 或
                    64:1）的宽带阻抗变换器将其降至 50
                    <MathOmega />。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "An end-fed half-wave antenna presents a very high impedance
                    at the feed point... requiring a matching network (unun) to
                    transform the high impedance down to 50 ohms."
                  </p>
                </>
              }
              citations={[
                {
                  id: "hallas",
                  text: "Hallas, J., W1ZR. (2019). The End-Fed Half-Wave Antenna. QST Magazine.",
                },
                {
                  id: "aa5tb",
                  text: "Yates, S., AA5TB. (2020). The End Fed Half Wave Antenna.",
                  url: "https://www.aa5tb.com/efha.html",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

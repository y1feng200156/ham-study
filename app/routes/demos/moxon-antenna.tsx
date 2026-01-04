import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const MoxonAntennaScene = lazy(
  () => import("~/components/moxon-antenna-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "莫克森天线 (Moxon Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示莫克森天线（Moxon Rectangle）的紧凑结构，展示其高前后比和卓越的指向性。",
    },
    {
      property: "og:title",
      content: "莫克森天线 (Moxon Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示莫克森天线（Moxon Rectangle）的紧凑结构，展示其高前后比和卓越的指向性。",
    },
    {
      name: "twitter:title",
      content: "莫克森天线 (Moxon Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示莫克森天线（Moxon Rectangle）的紧凑结构，展示其高前后比和卓越的指向性。",
    },
    {
      name: "keywords",
      content:
        "莫克森天线, Moxon antenna, 长方形天线, 矩形天线, 高前后比, high F/B ratio",
    },
  ];
};

export default function MoxonAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">莫克森天线 (Moxon Antenna)</h1>
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
            <MoxonAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            Moxon 矩形天线由 Les Moxon (G6XN)
            推广。它是一个两单元的导线天线，元件末端向内弯曲形成矩形。
          </p>
          <ul>
            <li>
              <strong>卓越的前后比 (F/B):</strong> Moxon
              的最大特点是其极高的前后比，能极其有效地抑制来自背后的干扰信号。
            </li>
            <li>
              <strong>紧凑尺寸:</strong> 其跨度仅为同频段全尺寸八木的 70%
              左右，非常适合空间受限的场合。
            </li>
            <li>
              <strong>宽带宽:</strong> 可以在很宽的频率范围内保持良好的驻波比。
            </li>
          </ul>

          <h3>应用</h3>
          <ul>
            <li>
              <strong>手持测向:</strong>{" "}
              由于其极好的方向性和前后比，常用于无线电测向 (Fox Hunting)。
            </li>
            <li>
              <strong>受限空间 DX:</strong>{" "}
              在阳台或屋顶空间不足以架设八木时，Moxon 是极佳的替代品。
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    Moxon 矩形天线利用了“临界耦合”原理。
                    通过将元件末端向内弯曲并保持特定的间距，使得有源振子与反射器之间的互感耦合增强。
                    这种特定的几何结构产生了近乎完美的心形 (Cardioid)
                    辐射方向图，在保持前向增益的同时，极大程度地消除了后向辐射
                    (极高的 F/B 比)。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "The Moxon Rectangle is a 2-element beam with the element
                    tips folded towards each other... maximizing the
                    front-to-back ratio."
                  </p>
                </>
              }
              citations={[
                {
                  id: "moxon-book",
                  text: "Moxon, L. A., G6XN. (1993). HF Antennas for All Locations. RSGB. Chapter 6.",
                },
                {
                  id: "cebik-moxon",
                  text: "Cebik, L. B., W4RNL. The Moxon Rectangle: A Review.",
                  url: "http://www.antentop.org/w4rnl.001/moxon1.html",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

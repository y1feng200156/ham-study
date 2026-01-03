import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const MoxonAntennaScene = lazy(
  () => import("~/components/moxon-antenna-scene"),
);

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
        </div>
      </div>
    </div>
  );
}

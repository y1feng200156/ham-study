import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const EndFedAntennaScene = lazy(
  () => import("~/components/end-fed-antenna-scene"),
);

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
          <ul>
            <li>
              <strong>极化:</strong>{" "}
              取决于使得方式。水平架设时为水平极化；倾斜架设（Sloper）或倒L形架设时包含垂直和水平分量。
            </li>
            <li>
              <strong>应用:</strong> POTA (公园通联)、SOTA (山顶通联)
              及受限空间的基地台常用天线。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

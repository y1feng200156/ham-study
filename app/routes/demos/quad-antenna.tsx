import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const QuadAntennaScene = lazy(() => import("~/components/quad-antenna-scene"));

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "方框天线 (Quad Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示方框天线（Quad Antenna）的回路结构，展示其高增益和低辐射仰角的特性。",
    },
    {
      property: "og:title",
      content: "方框天线 (Quad Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示方框天线（Quad Antenna）的回路结构，展示其高增益和低辐射仰角的特性。",
    },
    {
      name: "twitter:title",
      content: "方框天线 (Quad Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示方框天线（Quad Antenna）的回路结构，展示其高增益和低辐射仰角的特性。",
    },
    {
      name: "keywords",
      content:
        "方框天线, Quad antenna, 定向天线, directional antenna, DX利器, 高增益, high gain",
    },
  ];
};

export default function QuadAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">方框天线 (Quad Antenna)</h1>
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
            <QuadAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            方框天线（通常指 Cubical Quad）由两个或多个方形回路元件组成。由
            Clarence Moore (W9LZX) 在 1940 年代为解决高海拔电晕放电问题而发明。
          </p>
          <ul>
            <li>
              <strong>高增益:</strong> 2 单元的 Quad 天线通常相当于 3
              单元的八木天线增益。
            </li>
            <li>
              <strong>低噪音:</strong>{" "}
              闭合回路结构有助于减少接收时的静电噪音，听感通常比八木更安静。
            </li>
          </ul>

          <h3>极化与特性</h3>
          <ul>
            <li>
              <strong>极化:</strong> 取决于馈电点位置。
              <br />- 底部或顶部中心馈电 &rarr; 水平极化。
              <br />- 侧边中心馈电 &rarr; 垂直极化。
            </li>
            <li>
              <strong>挑战:</strong> 3D
              立体结构导致受风面积大，抗风和结冰是主要挑战。
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    四方框天线 (Quad)
                    是一个全波长闭合回路，相比于半波长偶极子，它具有更有效的辐射孔径。
                    标准的 2 单元 Quad (有源振子 + 反射器) 通过临界耦合可提供约
                    7dBi 的增益，相当于 3 单元八木。
                    由于它是直流接地的闭合回路，能有效泄放雨雪静电
                    (Precipitation Static)，因此接收背景噪音通常比八木更低。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "The closed-loop configuration of the Quad antenna results
                    in a lower Q and wider bandwidth... and is less susceptible
                    to static noise."
                  </p>
                </>
              }
              citations={[
                {
                  id: "w9lzx",
                  text: "Moore, C. C., W9LZX. (1947). The Quad Antenna.",
                },
                {
                  id: "cubical-quad",
                  text: "Orr, W. I., W6SAI. (1959). All About Cubical Quad Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

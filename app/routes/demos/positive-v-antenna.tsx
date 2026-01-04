import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const PositiveVAntennaScene = lazy(
  () => import("~/components/positive-v-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "正V天线 (Positive V Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示正V天线（Positive V）的结构特点，展示为何它是受限空间下理想的楼顶天线。",
    },
    {
      property: "og:title",
      content: "正V天线 (Positive V Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示正V天线（Positive V）的结构特点，展示为何它是受限空间下理想的楼顶天线。",
    },
    {
      name: "twitter:title",
      content: "正V天线 (Positive V Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示正V天线（Positive V）的结构特点，展示为何它是受限空间下理想的楼顶天线。",
    },
    {
      name: "keywords",
      content:
        "正V天线, Positive V antenna, 偶极子, dipole, 楼顶天线, balcony antenna, 紧凑型天线",
    },
  ];
};

export default function PositiveVAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">正V天线 (Positive V Antenna)</h1>
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
            <PositiveVAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            正V天线 (Positive V) 是一种两臂向上翘起的偶极子天线，形状像一个 "V"
            字。 这与中心高、两端低的"倒V天线" (Inverted V) 正好相反。
          </p>
          <ul>
            <li>
              <strong>结构优势:</strong>{" "}
              由于两端翘起，天线末端（电压波腹点）远离地面和周围物体，减少了介质损耗，也提高了安全性。
            </li>
            <li>
              <strong>旋转偶极子:</strong>{" "}
              在短波波段，正V结构常用于制作"旋转偶极子" (Rotatable
              Dipole)。V形结构减小了回转半径，使得天线更紧凑，转动惯量更小。
            </li>
          </ul>

          <h3>极化与方向图</h3>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    正V天线 (Positive-V)
                    将高电压点（天线末端）抬高并远离地面或屋顶结构。
                    这显著减少了由周围物体引起的电容效应和介质损耗，从而保持了较高的辐射效率。
                    同时，V形结构会轻微改变远场辐射方向图，使“8字形”凹陷变浅。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "Raising the ends of the dipole in a V-shape keeps the
                    high-voltage points away from lossy structures... minimizing
                    ground losses."
                  </p>
                </>
              }
              citations={[
                {
                  id: "rotatable-dipole",
                  text: "Witt, F. J., AI1H. (2014). Broadband Rotatable Dipole. QST Magazine.",
                },
                {
                  id: "balanis-dipole",
                  text: "Balanis, C. A. Antenna Theory. Chapter 4: Linear Wire Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const InvertedVAntennaScene = lazy(
  () => import("~/components/inverted-v-scene"),
);

import { MathOmega } from "~/components/math-inline";
import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "倒V天线 (Inverted V Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示倒V天线（Inverted-V）的结构与辐射特性，解释其阻抗特性与架设优势。",
    },
    {
      property: "og:title",
      content: "倒V天线 (Inverted V Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示倒V天线（Inverted-V）的结构与辐射特性，解释其阻抗特性与架设优势。",
    },
    {
      name: "twitter:title",
      content: "倒V天线 (Inverted V Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示倒V天线（Inverted-V）的结构与辐射特性，解释其阻抗特性与架设优势。",
    },
    {
      name: "keywords",
      content:
        "倒V天线, Inverted V antenna, 偶极子, dipole, 阻抗匹配, impedance matching, 便携天线",
    },
  ];
};

export default function InvertedVAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">倒V天线 (Inverted V Antenna)</h1>
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
            <InvertedVAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            倒V天线实际上就是中间架高、两端下垂的偶极子天线 (Dipole)。
            由于其架设简单（只需一根支撑杆），是业余无线电爱好者最常用的短波天线之一。
          </p>
          <ul>
            <li>
              <strong>阻抗匹配:</strong>{" "}
              两臂下垂会降低天线的辐射阻抗，使其从水平偶极子的 73Ω 降至约
              50Ω，从而能直接与常见的 50Ω 同轴电缆良好匹配。
            </li>
            <li>
              <strong>空间占用:</strong>{" "}
              相比水平展宽的偶极子，倒V占用的水平投影面积更小。
            </li>
          </ul>

          <h3>极化特性与应用</h3>
          <ul>
            <li>
              <strong>混合极化:</strong>{" "}
              虽然主要是水平极化（在宽边方向），但由于两臂下垂，也包含垂直极化分量。这使得它在某些角度比纯水平偶极子更接近全向。
            </li>
            <li>
              <strong>应用:</strong> 非常适合初学者作为第一个 HF (短波)
              天线，用于 40米、20米波段等。
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    倒V天线 (Inverted-V) 的两臂下垂会影响其辐射阻抗和方向图。
                    随着夹角小于 180°，输入阻抗会降低（通常降至 50
                    <MathOmega /> 附近），使其能直接匹配同轴电缆。
                    此外，垂直辐射分量会有所增加，填充了水平偶极子两侧的零点，使方向图在全方位上更均匀。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "Dropping the ends of the dipole to form an Inverted-V
                    lowers the resonant frequency and the feed-point
                    impedance... somewhat more omnidirectional than a horizontal
                    dipole."
                  </p>
                </>
              }
              citations={[
                {
                  id: "arrl-wire",
                  text: "The ARRL Antenna Book. Chapter 6: Low-Frequency Antennas - The Inverted-V Dipole.",
                },
                {
                  id: "cebik",
                  text: "Cebik, L. B., W4RNL. (2000). The Inverted-V: Its Gain and Patterns.",
                  url: "http://www.antentop.org/w4rnl.001/v1.html",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

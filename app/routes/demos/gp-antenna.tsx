import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const GPAntennaScene = lazy(() => import("~/components/gp-antenna-scene"));

import { MathLambdaQuarter, MathOmega } from "~/components/math-inline";
import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "GP天线 (Ground Plane Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示GP天线（Ground Plane）的垂直单极子结构、地网作用及辐射图。",
    },
    {
      property: "og:title",
      content: "GP天线 (Ground Plane Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示GP天线（Ground Plane）的垂直单极子结构、地网作用及辐射图。",
    },
    {
      name: "twitter:title",
      content: "GP天线 (Ground Plane Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示GP天线（Ground Plane）的垂直单极子结构、地网作用及辐射图。",
    },
    {
      name: "keywords",
      content:
        "GP天线, Ground Plane antenna, 垂直单极子, vertical monopole, 地网, radials, 1/4波长",
    },
  ];
};

export default function GPAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">GP天线 (Ground Plane Antenna)</h1>
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
            <GPAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            GP 天线（Ground Plane，地网天线）是最基础、最常见的垂直天线。
            它由一根垂直的 1/4 波长振子和数根（通常 3-4
            根）水平或下倾的地网（Radials）组成。
          </p>
          <ul>
            <li>
              <strong>人造地网:</strong>{" "}
              那些径向伸出的金属杆模拟了一个完美的“地面”，就像镜子一样反射出另一半天线（镜像），从而形成了等效的偶极子。
            </li>
            <li>
              <strong>发射仰角:</strong>{" "}
              具有较低的发射仰角，这意味着大部分能量是贴着地面或水平方向发射出去的，非常适合
              DX (远距离) 通信和本地覆盖。
            </li>
          </ul>

          <h3>极化特性与应用</h3>
          <ul></ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    GP 天线 (Ground Plane) 的原理基于
                    <strong>镜像理论 (Image Theory)</strong>。
                    导电平面（地网）充当反射面，使垂直单极子 (Monopole)
                    产生的辐射场等效于一个完整的偶极子 (Dipole)。
                    理想导电地面上的 <MathLambdaQuarter />
                    单极子，其增益比自由空间偶极子高 3dB
                    (因为能量仅集中在上半球)，其输入阻抗约为 37
                    <MathOmega />
                    (偶极子的一半)。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "A monopole above a perfect ground plane... radiates only in
                    the upper half-space... It is equivalent to a dipole in free
                    space."
                  </p>
                </>
              }
              citations={[
                {
                  id: "stutzman",
                  text: "Stutzman, W. L., & Thiele, G. A. (2012). Antenna Theory and Design (3rd ed.). Wiley. Section 3.2: Monopole Antennas.",
                },
                {
                  id: "balanis-mono",
                  text: "Balanis, C. A. (2016). Antenna Theory. Section 4.7: Ground Plane Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

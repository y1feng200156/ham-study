import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const HorizontalPolarizationScene = lazy(
  () => import("~/components/horizontal-polarization-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "水平极化 (Horizontal Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示水平极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      property: "og:title",
      content: "水平极化 (Horizontal Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示水平极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "twitter:title",
      content: "水平极化 (Horizontal Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示水平极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "keywords",
      content:
        "水平极化, horizontal polarization, 偶极子, dipole, 水平天线, horizontal antenna, 极化损耗",
    },
  ];
};

export default function HorizontalPolarizationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">
          水平极化 (Horizontal Polarization)
        </h1>
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
            <HorizontalPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            本可视化演示了来自水平极化偶极子天线 (Horizontal Dipole Antenna)
            的电磁波传播。 观察电场 (E-field)
            矢量如何在波向外传播时左右（水平）振荡。
          </p>
          <ul>
            <li>
              <strong>极化 (Polarization):</strong> 由电场 (E-field)
              矢量的方向定义。
            </li>
            <li>
              <strong>水平偶极子 (Horizontal Dipole):</strong>{" "}
              产生水平极化的波。
            </li>
            <li>
              <strong>传播 (Propagation):</strong>{" "}
              虽然在垂直于导线的方向最强，但通常我们关注其相对于地面的水平特性。
            </li>
          </ul>

          <h3>极化匹配与损耗 (Polarization Match & Loss)</h3>
          <ul>
            <li>
              <strong>
                水平发射 -&gt; 水平接收 (Horizontal to Horizontal):
              </strong>
              <span className="text-green-600 font-bold dark:text-green-400">
                {" "}
                最佳匹配
              </span>
              。信号强度最大。
            </li>
            <li>
              <strong>水平发射 -&gt; 垂直接收 (Horizontal to Vertical):</strong>
              <span className="text-red-600 font-bold dark:text-red-400">
                {" "}
                极化隔离 (Cross-polarization)
              </span>
              。 巨大的信号损耗 (约 <strong>-20dB 到 -30dB</strong>)。在短波 DX
              (远距离通信)
              中，由于电离层反射经常改变极化方向，这种影响可能不如视距通信(VHF/UHF)那么显著，但在视距通信中是致命的。
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    水平极化偶极子天线 (Horizontal Dipole)
                    产生的电场矢量平行于地面。
                    其辐射方向图在自由空间中是围绕导线的圆环
                    (doughnut)，但受地面反射影响，实际辐射图通常呈现为从地面向上翘起的瓣状。
                    水平极化在HF波段 DX
                    通信中非常流行，部分原因是它比垂直极化受地面噪声干扰更小。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "Horizontally polarized antennas are less susceptible to
                    man-made noise... The ground reflection factor reinforces
                    the signal at certain takeoff angles."
                  </p>
                </>
              }
              citations={[
                {
                  id: "arrl-handbook",
                  text: "Silver, H. W. (Ed.). (2023). The ARRL Handbook for Radio Communications. Chapter 21: Antennas.",
                },
                {
                  id: "itu-r",
                  text: "ITU-R P.372-14: Radio noise.",
                  url: "https://www.itu.int/rec/R-REC-P.372/en",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

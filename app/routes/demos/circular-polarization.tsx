import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const CircularPolarizationScene = lazy(
  () => import("~/components/circular-polarization-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "圆极化 (Circular Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示圆极化电波的传播特性，包括右旋(RHCP)和左旋(LHCP)。",
    },
    {
      property: "og:title",
      content: "圆极化 (Circular Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示圆极化电波的传播特性，包括右旋(RHCP)和左旋(LHCP)。",
    },
    {
      name: "twitter:title",
      content: "圆极化 (Circular Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示圆极化电波的传播特性，包括右旋(RHCP)和左旋(LHCP)。",
    },
    {
      name: "keywords",
      content:
        "圆极化, circular polarization, RHCP, LHCP, 螺旋天线, helical antenna, 卫星通信, satellite communication",
    },
  ];
};

export default function CircularPolarizationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">圆极化 (Circular Polarization)</h1>
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
            <CircularPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            本可视化演示了<b>圆极化 (Circular Polarization)</b> 的电磁波传播。
            在这种极化方式中，电场矢量随着波的传播而不断旋转，描绘出一个螺旋形状。
          </p>
          <ul>
            <li>
              <strong>右旋圆极化 (RHCP):</strong>{" "}
              电场矢量沿传播方向顺时针旋转（符合右手法则）。
            </li>
            <li>
              <strong>左旋圆极化 (LHCP):</strong> 电场矢量沿传播方向逆时针旋转。
            </li>
            <li>
              <strong>应用:</strong> 圆极化广泛用于<b>卫星通信</b>
              ，因为它可以抵抗法拉第旋转（信号穿过电离层时极化面的改变），并且不要求接收天线与发射天线的极化角度精确对齐（不需要像线极化那样严格水平或垂直对齐）。
            </li>
          </ul>

          <h3>极化匹配与损耗 (Polarization Match & Loss)</h3>
          <ul>
            <li>
              <strong>RHCP 发射 -&gt; RHCP 接收:</strong>
              <span className="text-green-600 font-bold dark:text-green-400">
                {" "}
                最佳匹配
              </span>
              。
            </li>
            <li>
              <strong>RHCP 发射 -&gt; LHCP 接收 (交叉极化):</strong>
              <span className="text-red-600 font-bold dark:text-red-400">
                {" "}
                极高损耗 (High Loss)
              </span>
              。 理论上有无限大损耗，实际通常 &gt;20dB。
              <br />
              <em>
                注意：当圆极化信号从表面反射时，其旋转方向通常会翻转 (例如 RHCP
                变成 LHCP)。
              </em>
            </li>
            <li>
              <strong>
                圆极化发射 -&gt; 线性极化接收 (Vertical/Horizontal):
              </strong>
              <span className="text-yellow-600 font-bold dark:text-yellow-400">
                {" "}
                3dB 损耗
              </span>
              。
              这是打卫星时的常用策略（如果不想制作复杂的追踪圆极化天线），但会损失一半信号。
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    对于螺旋天线 (Helical
                    Antenna)，当螺旋周长接近一个波长时，天线工作在
                    <strong>轴向模式 (Axial Mode)</strong>。
                    此时，天线沿螺旋轴向辐射最强，形成特定的方向性波束
                    (Directional Beam)，且产生近似完美的圆极化波。
                    本演示中的辐射方向图正是基于此模式绘制，而非侧向模式 (Normal
                    Mode) 的全向辐射。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "The axial mode of radiation... maximum radiation is along
                    the helix axis... The polarization is circularly polarized."
                  </p>
                </>
              }
              citations={[
                {
                  id: "kraus-helix",
                  text: "Kraus, J. D. (1947). Helical Beam Antennas. Electronics, 20, 109-111.",
                },
                {
                  id: "balanis-helix",
                  text: "Balanis, C. A. (2016). Antenna Theory: Analysis and Design. Wiley. Chapter 10: Traveling Wave and Broadband Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

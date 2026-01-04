import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const VerticalPolarizationScene = lazy(
  () => import("~/components/vertical-polarization-scene"),
);

import { MathETheta } from "~/components/math-inline";
import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "垂直极化 (Vertical Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示垂直极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      property: "og:title",
      content: "垂直极化 (Vertical Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示垂直极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "twitter:title",
      content: "垂直极化 (Vertical Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示垂直极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "keywords",
      content:
        "垂直极化, vertical polarization, 偶极子, dipole, 垂直天线, vertical antenna, 极化损耗",
    },
  ];
};

export default function VerticalPolarizationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">垂直极化 (Vertical Polarization)</h1>
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
            <VerticalPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            本可视化演示了来自垂直极化偶极子天线 (Dipole Antenna) 的电磁波传播。
            观察电场 (E-field) 矢量如何在波向外传播时上下（垂直）振荡。
          </p>
          <ul>
            <li>
              <strong>极化 (Polarization):</strong> 由电场 (E-field)
              矢量的方向定义。
            </li>
            <li>
              <strong>垂直偶极子 (Vertical Dipole):</strong> 产生垂直极化的波。
            </li>
            <li>
              <strong>传播 (Propagation):</strong> 在水平面 (Azimuth) 上是全向的
              (Omnidirectional)。
            </li>
          </ul>

          <h3>极化匹配与损耗 (Polarization Match & Loss)</h3>
          <ul>
            <li>
              <strong>垂直发射 -&gt; 垂直接收 (Vertical to Vertical):</strong>
              <span className="text-green-600 font-bold dark:text-green-400">
                {" "}
                最佳匹配
              </span>
              。信号强度最大，无额外极化损耗。
            </li>
            <li>
              <strong>垂直发射 -&gt; 水平接收 (Vertical to Horizontal):</strong>
              <span className="text-red-600 font-bold dark:text-red-400">
                {" "}
                极化隔离 (Cross-polarization)
              </span>
              。 理论上接收不到任何信号
              (无限大损耗)。实际上由于反射和多径效应，通常会有{" "}
              <strong>-20dB 到 -30dB</strong> 的巨大损耗。
              <br />
              <em>
                这也是为什么这两种极化方式可以复用同一频率而不容易互相干扰。
              </em>
            </li>
            <li>
              <strong>垂直发射 -&gt; 圆极化接收 (Vertical to Circular):</strong>
              <span className="text-yellow-600 font-bold dark:text-yellow-400">
                {" "}
                3dB 损耗
              </span>
              。
              线性极化波可以分解为两个相反旋转的圆极化波，接收天线只能接收其中一个分量，因此损失一半能量
              (3dB)。尽管有损耗，但考虑到极化失配的风险，这种组合在特定情况下（如移动通信）是可以接受的。
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    根据天线理论，垂直偶极子 (Vertical Dipole)
                    产生的电场只有垂直分量 (<MathETheta />
                    )。 其在水平面上的辐射强度是均匀的，形成全向方向图。
                    这意味着“电场矢量”(Vertical) 与 “主辐射波瓣方向”(Horizontal
                    Plane) 在几何上确实是正交的。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "The radiation pattern of a vertical dipole is
                    omnidirectional in the horizontal plane... The E-field lines
                    are vertical, parallel to the dipole axis."
                  </p>
                </>
              }
              citations={[
                {
                  id: "balanis",
                  text: "Balanis, C. A. (2016). Antenna Theory: Analysis and Design (4th ed.). Wiley. pp. 170-172.",
                  url: "https://www.wiley.com/en-us/Antenna+Theory%3A+Analysis+and+Design%2C+4th+Edition-p-9781118642061",
                },
                {
                  id: "kraus",
                  text: "Kraus, J. D., & Marhefka, R. J. (2002). Antennas for All Applications (3rd ed.). McGraw-Hill. Ch. 5.",
                },
                {
                  id: "ieee",
                  text: "IEEE Standard Definitions of Terms for Antennas (IEEE Std 145-2013).",
                  url: "https://ieeexplore.ieee.org/document/6758443",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const EllipticalPolarizationScene = lazy(
  () => import("~/components/elliptical-polarization-scene"),
);

import { MathInfinity } from "~/components/math-inline";
import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示极化的一般形式——椭圆极化，介于线极化和圆极化之间。",
    },
    {
      property: "og:title",
      content: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示极化的一般形式——椭圆极化，介于线极化和圆极化之间。",
    },
    {
      name: "twitter:title",
      content: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示极化的一般形式——椭圆极化，介于线极化和圆极化之间。",
    },
    {
      name: "keywords",
      content:
        "椭圆极化, elliptical polarization, 极化, polarization, 无线电传播, radio propagation",
    },
  ];
};

export default function EllipticalPolarizationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">
          椭圆极化 (Elliptical Polarization)
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
            <EllipticalPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            本可视化演示了<b>椭圆极化 (Elliptical Polarization)</b>
            。这是极化的一般形式。 当垂直和水平分量的幅度不同，或者相位差不是
            0、90、180度时，就会产生椭圆极化。
          </p>
          <p>通过调整下方的滑块，你可以观察不同参数对极化形状的影响：</p>
          <ul>
            <li>
              <strong>线极化 (Linear):</strong> 相位差为 0° 或 180°。
            </li>
            <li>
              <strong>圆极化 (Circular):</strong> 垂直与水平幅度相等且相位差为
              90°。
            </li>
            <li>
              <strong>椭圆极化 (Elliptical):</strong> 其他所有情况。
            </li>
          </ul>

          <h3>关于极化匹配的一般规则</h3>
          <p>
            实际上，大多数无线电信号在传播过程中都会变成某种程度的椭圆极化（由于反射、折射等）。
            极化失配损耗 (Polarization Mismatch Loss) 取决于两个椭圆极化波的
            <strong>轴比 (Axial Ratio)</strong> 和{" "}
            <strong>倾角 (Tilt Angle)</strong> 的差异。
          </p>
          <ul></ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    椭圆极化是电磁波极化的一般形式，线极化和圆极化只是其特例。
                    从数学上讲，它是两个正交线极化分量的叠加，且这两个分量具有任意的幅度比和相位差。
                    <strong>轴比 (Axial Ratio, AR)</strong>{" "}
                    是衡量椭圆扁平程度的关键指标：AR=1 (0dB) 为圆极化，AR=
                    <MathInfinity /> 为线极化。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "In the general case, the trace of the tip of the electric
                    field vector... forms an ellipse... The ratio of the major
                    axis to the minor axis is called the Axial Ratio."
                  </p>
                </>
              }
              citations={[
                {
                  id: "pozar",
                  text: "Pozar, D. M. (2011). Microwave Engineering (4th ed.). Wiley. Section 1.5: Plane Waves.",
                },
                {
                  id: "ieee-pol",
                  text: "IEEE Standard Definitions of Terms for Antennas. (IEEE Std 145-2013). Section 2.29.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

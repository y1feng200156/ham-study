import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const YagiAntennaScene = lazy(() => import("~/components/yagi-antenna-scene"));

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示八木天线的工作原理，展示引向器、有源振子和反射器的作用及辐射方向图。",
    },
    {
      property: "og:title",
      content: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示八木天线的工作原理，展示引向器、有源振子和反射器的作用及辐射方向图。",
    },
    {
      name: "twitter:title",
      content: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示八木天线的工作原理，展示引向器、有源振子和反射器的作用及辐射方向图。",
    },
    {
      name: "keywords",
      content:
        "八木天线, Yagi-Uda antenna, 定向天线, directional antenna, 引向器, director, 反射器, reflector",
    },
  ];
};

export default function YagiAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">八木-宇田天线 (Yagi-Uda Antenna)</h1>
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
            <YagiAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此演示</h3>
          <p>
            八木天线是由日本的八木秀次和宇田新太郎发明的。它是一种
            <strong>高增益、强方向性</strong>
            的天线，广泛用于短波通信、电视接收和雷达。
          </p>
          <ul>
            <li>
              <strong>工作原理:</strong>{" "}
              通过寄生振子（反射器和引向器）与有源振子之间的互感耦合，改变电流相位，从而在单一方向叠加增强信号，在反方向抵消信号。
            </li>
            <li>
              <strong>增益 (Gain):</strong>{" "}
              单元越多，引向器越长，增益越高，波束越窄。
            </li>
          </ul>

          <h3>极化特性与应用</h3>
          <ul>
            <li>
              <strong>应用:</strong> 最常见的 DX (远距离)
              通信天线。将你的信号集中发射给远方的特定电台。
            </li>
            <li>
              <strong>极化匹配:</strong>{" "}
              大多数短波八木是水平安装，产生水平极化。
              <br />
              <em>
                注意：对于本地 VHF/UHF FM
                通信，通常垂直安装以匹配手台和车载台的垂直极化。
              </em>
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title="物理原理验证 (Physics Validation)"
              content={
                <>
                  <p className="mb-2">
                    八木天线的定向性源于寄生单元（反射器和引向器）上的感应电流与有源振子电流之间的
                    <strong>相位差 (Phase Difference)</strong>。
                    反射器通常比谐振长度略长 (呈感性)，电流滞后；引向器略短
                    (呈容性)，电流超前。
                    这种相位关系导致信号在前方叠加增强，在后方抵消。本演示正是通过在各单元上设置相应的相位偏移来模拟这一物理现象。
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    "The phase of the current in the parasitic element depends
                    on its length... By proper spacing and length, the radiation
                    from the parasitic element reinforces the radiation from the
                    driven element in the forward direction."
                  </p>
                </>
              }
              citations={[
                {
                  id: "yagi-uda",
                  text: "Yagi, H., & Uda, S. (1926). Projector of the Sharpest Beam of Electric Waves. Proceedings of the Imperial Academy, 2(2), 49-52.",
                  url: "https://www.japan-acad.go.jp/en/activities/publications/proceedings.html",
                },
                {
                  id: "arrl-yagi",
                  text: "The ARRL Antenna Book (24th ed.). Chapter 11: HF Yagi Arrays.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

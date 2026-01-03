import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const GPAntennaScene = lazy(() => import("~/components/gp-antenna-scene"));

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
          <ul>
            <li>
              <strong>垂直极化 (Vertical):</strong> 产生标准的垂直极化波。
            </li>
            <li>
              <strong>全向性 (Omnidirectional):</strong>{" "}
              在水平方向上360度均匀辐射，没有方向性。
            </li>
            <li>
              <strong>应用:</strong> 本地 V/UHF 中继通讯、车载天线、以及作为 DX
              通信的基础天线（特别是低波段如 40m/80m）。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

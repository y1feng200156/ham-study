import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";

const PositiveVAntennaScene = lazy(
  () => import("~/components/positive-v-scene"),
);

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
          <ul>
            <li>
              <strong>极化:</strong> 主要是水平极化（当水平安装时）。
            </li>
            <li>
              <strong>方向图:</strong>{" "}
              V形弯曲会稍微填充偶极子两端的零点，使得方向图略微变圆，但仍然具有明显的双向性。调节夹角可以改变馈电点阻抗（通常夹角越小阻抗越低）。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

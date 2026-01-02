import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";
import InvertedVAntennaScene from "~/components/inverted-v-scene";

export const meta: MetaFunction = () => {
  return [
    { title: "倒V天线 (Inverted V Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示倒V天线（Inverted V）的结构、阻抗匹配优势及混合极化特性。",
    },
    { property: "og:title", content: "倒V天线 (Inverted V Antenna) | 业余无线电可视化" },
    {
      property: "og:description",
      content:
        "3D演示倒V天线（Inverted V）的结构、阻抗匹配优势及混合极化特性。",
    },
    { name: "twitter:title", content: "倒V天线 (Inverted V Antenna) | 业余无线电可视化" },
    {
      name: "twitter:description",
      content:
        "3D演示倒V天线（Inverted V）的结构、阻抗匹配优势及混合极化特性。",
    },
    {
      name: "keywords",
      content:
        "倒V天线, inverted v antenna, 偶极子, dipole, 阻抗匹配, impedance matching, 倒V架设",
    },
  ];
};

export default function InvertedVAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
         <h1 className="text-2xl font-bold">倒V天线 (Inverted V Antenna)</h1>
         <p className="text-muted-foreground">著名天线系列 (Famous Antennas)</p>
      </div>

      <div className="flex flex-col gap-6">
        <ClientOnly fallback={<div className="h-[450px] md:h-[600px] w-full flex items-center justify-center bg-slate-100 rounded-lg">加载 3D 场景中...</div>}>
          <InvertedVAntennaScene />
        </ClientOnly>
        
        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此天线</h3>
          <p>
            倒V天线实际上就是中间架高、两端下垂的偶极子天线 (Dipole)。
            由于其架设简单（只需一根支撑杆），是业余无线电爱好者最常用的短波天线之一。
          </p>
          <ul>
             <li><strong>阻抗匹配:</strong> 两臂下垂会降低天线的辐射阻抗，使其从水平偶极子的 73Ω 降至约 50Ω，从而能直接与常见的 50Ω 同轴电缆良好匹配。</li>
             <li><strong>空间占用:</strong> 相比水平展宽的偶极子，倒V占用的水平投影面积更小。</li>
          </ul>

          <h3>极化特性与应用</h3>
           <ul>
            <li>
                <strong>混合极化:</strong> 虽然主要是水平极化（在宽边方向），但由于两臂倾斜，也包含垂直分量。这使得它在某些角度比纯水平偶极子更接近全向。
            </li>
             <li>
                <strong>应用:</strong> 非常适合初学者作为第一个 HF (短波) 天线，用于 40米、20米波段等。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

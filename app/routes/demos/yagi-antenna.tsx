import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";
import YagiAntennaScene from "~/components/yagi-antenna-scene";

export const meta: MetaFunction = () => {
  return [
    { title: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示八木天线的引向/反射原理、高增益方向性及极化特性。",
    },
    { property: "og:title", content: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化" },
    {
      property: "og:description",
      content:
        "3D演示八木天线的引向/反射原理、高增益方向性及极化特性。",
    },
    { name: "twitter:title", content: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化" },
    {
      name: "twitter:description",
      content:
        "3D演示八木天线的引向/反射原理、高增益方向性及极化特性。",
    },
    {
      name: "keywords",
      content:
        "八木天线, yagi antenna, yagi-uda, 定向天线, directional antenna, 引向器, director, 反射器, reflector",
    },
  ];
};

export default function YagiAntennaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
         <h1 className="text-2xl font-bold">八木-宇田天线 (Yagi-Uda Antenna)</h1>
         <p className="text-muted-foreground">著名天线系列 (Famous Antennas)</p>
      </div>

      <div className="flex flex-col gap-6">
        <ClientOnly fallback={<div className="h-[450px] md:h-[600px] w-full flex items-center justify-center bg-slate-100 rounded-lg">加载 3D 场景中...</div>}>
          <YagiAntennaScene />
        </ClientOnly>
        
        <div className="prose dark:prose-invert max-w-none">
          <h3>关于此天线</h3>
          <p>
            八木天线是由日本的八木秀次和宇田新太郎发明的。它是一种<strong>高增益、强方向性</strong>的天线，广泛用于短波通信、电视接收和雷达。
          </p>
          <ul>
             <li><strong>工作原理:</strong> 通过寄生振子（反射器和引向器）与有源振子之间的互感耦合，改变电流相位，从而在单一方向叠加增强信号，在反方向抵消信号。</li>
             <li><strong>增益 (Gain):</strong> 单元越多，引向器越长，增益越高，波束越窄。</li>
             <li><strong>极化:</strong> 通常与元件方向一致（水平安装即水平极化，垂直安装即垂直极化）。DX 通信通常使用水平极化。</li>
          </ul>

          <h3>极化特性与应用</h3>
           <ul>
            <li>
                <strong>应用:</strong> 最常见的 DX (远距离) 通信天线。将你的信号集中发射给远方的特定电台。
            </li>
            <li>
                <strong>极化匹配:</strong> 大多数短波八木是水平安装，产生水平极化。
                <br/>
                <em>注意：对于本地 VHF/UHF FM 通信，通常垂直安装以匹配手台和车载台的垂直极化。</em>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

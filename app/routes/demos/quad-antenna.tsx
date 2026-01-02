import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";
import QuadAntennaScene from "~/components/quad-antenna-scene";

export const meta: MetaFunction = () => {
	return [
		{ title: "方框天线 (Quad Antenna) | 业余无线电可视化" },
		{
			name: "description",
			content:
				"3D演示方框天线（Cubical Quad）的闭合回路结构、高增益及低噪特性。",
		},
		{
			property: "og:title",
			content: "方框天线 (Quad Antenna) | 业余无线电可视化",
		},
		{
			property: "og:description",
			content:
				"3D演示方框天线（Cubical Quad）的闭合回路结构、高增益及低噪特性。",
		},
		{
			name: "twitter:title",
			content: "方框天线 (Quad Antenna) | 业余无线电可视化",
		},
		{
			name: "twitter:description",
			content:
				"3D演示方框天线（Cubical Quad）的闭合回路结构、高增益及低噪特性。",
		},
		{
			name: "keywords",
			content:
				"方框天线, quad antenna, cubical quad, 回路天线, loop antenna, 高增益, high gain, 低底噪, low noise",
		},
	];
};

export default function QuadAntennaPage() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-2xl font-bold">方框天线 (Quad Antenna)</h1>
				<p className="text-muted-foreground">著名天线系列 (Famous Antennas)</p>
			</div>

			<div className="flex flex-col gap-6">
				<ClientOnly
					fallback={
						<div className="h-[450px] md:h-[600px] w-full flex items-center justify-center bg-slate-100 rounded-lg">
							加载 3D 场景中...
						</div>
					}
				>
					<QuadAntennaScene />
				</ClientOnly>

				<div className="prose dark:prose-invert max-w-none">
					<h3>关于此天线</h3>
					<p>
						方框天线（通常指 Cubical Quad）由两个或多个方形回路元件组成。由
						Clarence Moore (W9LZX) 在 1940 年代为解决高海拔电晕放电问题而发明。
					</p>
					<ul>
						<li>
							<strong>高增益:</strong> 2 单元的 Quad 天线通常相当于 3
							单元的八木天线增益。
						</li>
						<li>
							<strong>低噪音:</strong>{" "}
							闭合回路结构有助于减少接收时的静电噪音，听感通常比八木更安静。
						</li>
					</ul>

					<h3>极化与特性</h3>
					<ul>
						<li>
							<strong>极化:</strong> 取决于馈电点位置。
							<br />- 底部或顶部中心馈电 &rarr; 水平极化。
							<br />- 侧边中心馈电 &rarr; 垂直极化。
						</li>
						<li>
							<strong>挑战:</strong> 3D
							立体结构导致受风面积大，抗风和结冰是主要挑战。
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

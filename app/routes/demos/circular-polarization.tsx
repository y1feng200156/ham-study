import type { MetaFunction } from "react-router";
import CircularPolarizationScene from "~/components/circular-polarization-scene";
import { ClientOnly } from "~/components/client-only";

export const meta: MetaFunction = () => {
	return [
		{ title: "圆极化 (Circular Polarization) | 业余无线电可视化" },
		{
			name: "description",
			content:
				"3D演示电磁波的圆极化传播（RHCP/LHCP），及其在卫星通信中的应用。",
		},
		{
			property: "og:title",
			content: "圆极化 (Circular Polarization) | 业余无线电可视化",
		},
		{
			property: "og:description",
			content:
				"3D演示电磁波的圆极化传播（RHCP/LHCP），及其在卫星通信中的应用。",
		},
		{
			name: "twitter:title",
			content: "圆极化 (Circular Polarization) | 业余无线电可视化",
		},
		{
			name: "twitter:description",
			content:
				"3D演示电磁波的圆极化传播（RHCP/LHCP），及其在卫星通信中的应用。",
		},
		{
			name: "keywords",
			content:
				"圆极化, circular polarization, RHCP, LHCP, 卫星通信, satellite communication, 螺旋天线, axial mode",
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
					<CircularPolarizationScene />
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
				</div>
			</div>
		</div>
	);
}

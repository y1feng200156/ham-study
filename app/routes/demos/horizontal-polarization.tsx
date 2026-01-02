import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";
import HorizontalPolarizationScene from "~/components/horizontal-polarization-scene";

export const meta: MetaFunction = () => {
	return [
		{ title: "水平极化 (Horizontal Polarization) | 业余无线电可视化" },
		{
			name: "description",
			content: "3D演示水平偶极子天线的电场传播与极化匹配原理。",
		},
		{
			property: "og:title",
			content: "水平极化 (Horizontal Polarization) | 业余无线电可视化",
		},
		{
			property: "og:description",
			content: "3D演示水平偶极子天线的电场传播与极化匹配原理。",
		},
		{
			name: "twitter:title",
			content: "水平极化 (Horizontal Polarization) | 业余无线电可视化",
		},
		{
			name: "twitter:description",
			content: "3D演示水平偶极子天线的电场传播与极化匹配原理。",
		},
		{
			name: "keywords",
			content:
				"水平极化, horizontal polarization, 偶极子, dipole, 电场, electric field, 天线方向性",
		},
	];
};

export default function HorizontalPolarizationPage() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-2xl font-bold">
					水平极化 (Horizontal Polarization)
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
					<HorizontalPolarizationScene />
				</ClientOnly>

				<div className="prose dark:prose-invert max-w-none">
					<h3>关于此演示</h3>
					<p>
						本可视化演示了来自水平极化偶极子天线 (Horizontal Dipole Antenna)
						的电磁波传播。 观察电场 (E-field)
						矢量如何在波向外传播时左右（水平）振荡。
					</p>
					<ul>
						<li>
							<strong>极化 (Polarization):</strong> 由电场 (E-field)
							矢量的方向定义。
						</li>
						<li>
							<strong>水平偶极子 (Horizontal Dipole):</strong>{" "}
							产生水平极化的波。
						</li>
						<li>
							<strong>传播 (Propagation):</strong>{" "}
							虽然在垂直于导线的方向最强，但通常我们关注其相对于地面的水平特性。
						</li>
					</ul>

					<h3>极化匹配与损耗 (Polarization Match & Loss)</h3>
					<ul>
						<li>
							<strong>
								水平发射 -&gt; 水平接收 (Horizontal to Horizontal):
							</strong>
							<span className="text-green-600 font-bold dark:text-green-400">
								{" "}
								最佳匹配
							</span>
							。信号强度最大。
						</li>
						<li>
							<strong>水平发射 -&gt; 垂直接收 (Horizontal to Vertical):</strong>
							<span className="text-red-600 font-bold dark:text-red-400">
								{" "}
								极化隔离 (Cross-polarization)
							</span>
							。 巨大的信号损耗 (约 <strong>-20dB 到 -30dB</strong>)。在短波 DX
							(远距离通信)
							中，由于电离层反射经常改变极化方向，这种影响可能不如视距通信(VHF/UHF)那么显著，但在视距通信中是致命的。
						</li>
						<li>
							<strong>
								水平发射 -&gt; 圆极化接收 (Horizontal to Circular):
							</strong>
							<span className="text-yellow-600 font-bold dark:text-yellow-400">
								{" "}
								3dB 损耗
							</span>
							。 损失一半能量。
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

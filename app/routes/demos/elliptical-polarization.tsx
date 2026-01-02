import type { MetaFunction } from "react-router";
import { ClientOnly } from "~/components/client-only";
import EllipticalPolarizationScene from "~/components/elliptical-polarization-scene";

export const meta: MetaFunction = () => {
	return [
		{ title: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化" },
		{
			name: "description",
			content: "3D演示极化的一般形式——椭圆极化，探索轴比与倾角对通信的影响。",
		},
		{
			property: "og:title",
			content: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化",
		},
		{
			property: "og:description",
			content: "3D演示极化的一般形式——椭圆极化，探索轴比与倾角对通信的影响。",
		},
		{
			name: "twitter:title",
			content: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化",
		},
		{
			name: "twitter:description",
			content: "3D演示极化的一般形式——椭圆极化，探索轴比与倾角对通信的影响。",
		},
		{
			name: "keywords",
			content:
				"椭圆极化, elliptical polarization, 轴比, axial ratio, 极化损耗, polarization loss",
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
					<EllipticalPolarizationScene />
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
					<ul>
						<li>
							如果接收和发射极化的旋转方向相反，或者长轴方向互相垂直，损耗最大。
						</li>
						<li>
							在实际工程中，为了避免严重的极化失配，通常会选择
							<strong>圆极化</strong>（用于不确定的方向或卫星）或严格的
							<strong>同向线极化</strong>（用于固定点对点通信）。
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

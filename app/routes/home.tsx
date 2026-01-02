import { GithubLogo } from "@phosphor-icons/react";
import { Link, type MetaFunction } from "react-router";
import CircularPolarizationScene from "../components/circular-polarization-scene";
import { ClientOnly } from "../components/client-only";
import EllipticalPolarizationScene from "../components/elliptical-polarization-scene";
import GPAntennaScene from "../components/gp-antenna-scene";
import HorizontalPolarizationScene from "../components/horizontal-polarization-scene";
import InvertedVAntennaScene from "../components/inverted-v-scene";
import MoxonAntennaScene from "../components/moxon-antenna-scene";
import PositiveVAntennaScene from "../components/positive-v-scene";
import QuadAntennaScene from "../components/quad-antenna-scene";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import VerticalPolarizationScene from "../components/vertical-polarization-scene";
import YagiAntennaScene from "../components/yagi-antenna-scene";

export const meta: MetaFunction = () => {
	return [
		{ title: "业余无线电可视化" },
		{
			name: "description",
			content:
				"业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
		},
		{ property: "og:title", content: "业余无线电可视化" },
		{
			property: "og:description",
			content:
				"业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
		},
		{ name: "twitter:title", content: "业余无线电可视化" },
		{
			name: "twitter:description",
			content:
				"业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
		},
		{
			name: "keywords",
			content:
				"业余无线电, 天线演示, 3D可视化, 垂直极化, 水平极化, 圆极化, 八木天线, GP天线, 倒V天线, 正V天线, 方框天线, 莫克森天线, ham radio demos, antenna visualization",
		},
	];
};

export default function Home() {
	const demos = [
		{
			title: "垂直极化 (Vertical Polarization)",
			description:
				"可视化垂直极化天线的电场传播 (Electric Field Propagation)。",
			href: "/demos/vertical-polarization",
			component: VerticalPolarizationScene,
		},
		{
			title: "水平极化 (Horizontal Polarization)",
			description:
				"可视化水平极化天线的电场传播 (Electric Field Propagation)。",
			href: "/demos/horizontal-polarization",
			component: HorizontalPolarizationScene,
		},
		{
			title: "圆极化 (Circular Polarization)",
			description: "可视化电场矢量旋转的圆极化传播 (Circular Polarization)。",
			href: "/demos/circular-polarization",
			component: CircularPolarizationScene,
		},
		{
			title: "椭圆极化 (Elliptical Polarization)",
			description: "极化的一般形式，介于线极化和圆极化之间。",
			href: "/demos/elliptical-polarization",
			component: EllipticalPolarizationScene,
		},
		{
			title: "八木-宇田天线 (Yagi-Uda Antenna)",
			description: "著名的定向天线，由引向器、有源振子和反射器组成。",
			href: "/demos/yagi-antenna",
			component: YagiAntennaScene,
		},
		{
			title: "倒V天线 (Inverted V Antenna)",
			description: "架设简便的偶极子变种，中间高两端低。",
			href: "/demos/inverted-v-antenna",
			component: InvertedVAntennaScene,
		},
		{
			title: "GP天线 (Ground Plane Antenna)",
			description: "垂直单极天线，带有水平或下倾的地网 (Radials)。",
			href: "/demos/gp-antenna",
			component: GPAntennaScene,
		},
		{
			title: "正V天线 (Positive V Antenna)",
			description: "两臂向上翘起的偶极子，适合楼顶架设，更加安全紧凑。",
			href: "/demos/positive-v-antenna",
			component: PositiveVAntennaScene,
		},
		{
			title: "方框天线 (Quad Antenna)",
			description: "方形回路构成的定向天线，具有高增益和低底噪的特点。",
			href: "/demos/quad-antenna",
			component: QuadAntennaScene,
		},
		{
			title: "莫克森天线 (Moxon Antenna)",
			description: "矩形紧凑型定向天线，拥有卓越的前后比和宽带宽。",
			href: "/demos/moxon-antenna",
			component: MoxonAntennaScene,
		},
	];

	return (
		<div className="container mx-auto py-10 px-4 md:px-6">
			<h1 className="text-3xl font-bold mb-4">业余无线电可视化</h1>
			<p className="text-muted-foreground text-lg mb-6 max-w-[800px]">
				欢迎来到业余无线电可视化实验室。这里汇集了各种经典天线和电磁波极化的 3D
				仿真演示。通过交互式的 3D
				场景，您可以直观地探索天线原理与电波传播特性，深入理解无线电通信背后的物理机制。
			</p>

			<div className="mb-8 flex gap-4">
				<Button asChild variant="outline">
					<Link
						to="https://github.com/y1feng200156/ham-study"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2"
					>
						<GithubLogo size={20} />
						<span>GitHub 仓库</span>
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{demos.map((demo) => (
					<Card
						key={demo.href}
						className="border flex flex-col ring-offset-4 ring-border/50 ring-offset-gray-50 hover:ring-offset-gray-100 transition duration-300 hover:shadow-lg"
					>
						<CardHeader className="flex-1">
							<CardTitle>{demo.title}</CardTitle>
							<CardDescription>{demo.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="bg-slate-100 grid dark:bg-slate-800 h-[200px] rounded-md overflow-hidden text-muted-foreground text-sm">
								<ClientOnly
									fallback={
										<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
									}
								>
									<demo.component isThumbnail={true} />
								</ClientOnly>
							</div>
						</CardContent>
						<CardFooter>
							<Button asChild className="w-full">
								<Link to={demo.href}>查看演示</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{/* JSON-LD Structured Data for CollectionPage */}
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires this
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "CollectionPage",
						name: "业余无线电天线可视化合集",
						description:
							"包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
						url: "https://ham.charlesify.com/",
						hasPart: demos.map((demo) => ({
							"@type": "CreativeWork",
							name: demo.title,
							description: demo.description,
							url: `https://ham.charlesify.com${demo.href}`, // Assuming absolute URL required for best practice, or relative if base is set
						})),
					}),
				}}
			/>
		</div>
	);
}

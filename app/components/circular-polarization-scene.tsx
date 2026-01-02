import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { RadialWaveLines } from "./radial-wave-lines";

function HelicalAntenna() {
	const points = useMemo(() => {
		const pts = [];
		const turns = 6;
		const height = 4;
		const radius = 0.5;
		for (let i = 0; i <= 100; i++) {
			const t = i / 100;
			const angle = t * Math.PI * 2 * turns;
			const x = t * height;
			const y = Math.cos(angle) * radius;
			const z = Math.sin(angle) * radius;
			pts.push(new THREE.Vector3(x, y, z));
		}
		return pts;
	}, []);

	const lineGeometry = useMemo(() => {
		const geo = new THREE.BufferGeometry().setFromPoints(points);
		return geo;
	}, [points]);

	const line = useMemo(() => {
		const mat = new THREE.LineBasicMaterial({ color: "#ef4444", linewidth: 3 });
		return new THREE.Line(lineGeometry, mat);
	}, [lineGeometry]);

	return (
		<group position={[-2, 0, 0]}>
			<mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[1, 1, 0.1, 32]} />
				<meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
			</mesh>
			<primitive object={line} />
			<mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.05, 0.05, 4, 16]} />
				<meshStandardMaterial color="#666" />
			</mesh>
		</group>
	);
}

function RadiationPattern() {
	const geometry = useMemo(() => {
		const geo = new THREE.SphereGeometry(1, 60, 40);
		const posAttribute = geo.attributes.position;
		const vertex = new THREE.Vector3();
		const scale = 8;

		for (let i = 0; i < posAttribute.count; i++) {
			vertex.fromBufferAttribute(posAttribute, i);
			vertex.normalize();

			// Circular polarization: nearly omnidirectional (spherical)
			const horizontalComponent = Math.sqrt(
				vertex.x * vertex.x + vertex.z * vertex.z,
			);
			const gain = 0.8 + 0.2 * horizontalComponent;

			vertex.multiplyScalar(gain * scale);
			posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
		}
		geo.computeVertexNormals();
		return geo;
	}, []);

	return (
		<group>
			<mesh geometry={geometry}>
				<meshBasicMaterial
					color="#22c55e"
					wireframe={true}
					transparent={true}
					opacity={0.2}
				/>
			</mesh>
		</group>
	);
}

export default function CircularPolarizationScene({
	isThumbnail = false,
}: {
	isThumbnail?: boolean;
}) {
	const [isRHCP, setIsRHCP] = useState(true);
	const [showWaves, setShowWaves] = useState(true);
	const [showPattern, setShowPattern] = useState(true);

	const LegendContent = () => (
		<>
			<h2 className="text-lg md:text-xl font-bold mb-2">
				圆极化 (Circular Polarization)
			</h2>
			<p className="text-xs md:text-sm text-muted-foreground mb-2">
				电场矢量随着传播像螺旋一样旋转。常用于卫星通信 (Satellite Comm)。
				<br />
				E-field vector rotates during propagation. Common in space comms.
			</p>

			<div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-red-500 rounded-sm" />
					<span>振子 (有源)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-gray-400 rounded-sm" />
					<span>无源元件/地网</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
					<span>辐射方向图</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-cyan-400 rounded-sm shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
					<span>电磁波</span>
				</div>
			</div>
		</>
	);

	return (
		<div className="flex flex-col gap-4">
			<div
				className={`relative w-full ${isThumbnail ? "h-full" : "h-[450px] md:h-[600px]"} border rounded-lg overflow-hidden bg-black touch-none`}
			>
				<Canvas
					camera={{ position: [5, 5, 10], fov: 50 }}
					frameloop={isThumbnail ? "demand" : "always"}
				>
					<color attach="background" args={["#111111"]} />
					<fog attach="fog" args={["#111111", 10, 50]} />

					{!isThumbnail && (
						<OrbitControls enableDamping dampingFactor={0.05} zoomSpeed={0.3} />
					)}

					<ambientLight intensity={0.5} color={0x404040} />
					<directionalLight
						position={[10, 10, 10]}
						intensity={1}
						color={0xffffff}
					/>

					<axesHelper args={[5]} />
					<gridHelper
						args={[20, 20, 0x333333, 0x222222]}
						position={[0, -2, 0]}
					/>

					<HelicalAntenna />
					{showPattern && <RadiationPattern />}
					{showWaves && (
						<RadialWaveLines
							antennaType="circular"
							polarizationType="circular"
							isThumbnail={isThumbnail}
						/>
					)}
				</Canvas>

				{!isThumbnail && (
					<>
						<div className="hidden md:block absolute top-4 left-4 right-4 md:right-auto md:w-auto p-3 md:p-4 bg-black/70 text-white rounded-lg max-w-full md:max-w-xs pointer-events-none select-none">
							<LegendContent />
						</div>

						<div className="absolute bottom-4 right-4 p-4 bg-black/70 text-white rounded-lg pointer-events-auto">
							<div className="flex flex-col space-y-3">
								<div className="flex items-center justify-between space-x-4">
									<Label
										htmlFor="polarization-toggle"
										className="text-xs md:text-sm text-gray-300 whitespace-nowrap"
									>
										当前极化: {isRHCP ? "RHCP (右旋)" : "LHCP (左旋)"}
									</Label>
									<Switch
										id="polarization-toggle"
										checked={isRHCP}
										onCheckedChange={setIsRHCP}
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										id="wave-mode"
										checked={showWaves}
										onCheckedChange={setShowWaves}
									/>
									<Label htmlFor="wave-mode" className="text-xs md:text-sm">
										显示电波 (Show Waves)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										id="pattern-mode"
										checked={showPattern}
										onCheckedChange={setShowPattern}
									/>
									<Label htmlFor="pattern-mode" className="text-xs md:text-sm">
										显示方向图 (Show Pattern)
									</Label>
								</div>
							</div>
						</div>

						<div className="absolute bottom-4 left-4 text-gray-400 text-xs pointer-events-none select-none">
							Created by BG8ROM - For Ham Radio Education
						</div>
					</>
				)}
			</div>

			{!isThumbnail && (
				<div className="md:hidden bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4">
					<LegendContent />
				</div>
			)}
		</div>
	);
}

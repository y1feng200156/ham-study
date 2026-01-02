import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { RadialWaveLines } from "./radial-wave-lines";

function Antenna() {
	return (
		<group rotation={[0, 0, Math.PI / 2]}>
			{/* Main Dipole Element (Horizontal along X) */}
			<mesh position={[0, 0, 0]}>
				<cylinderGeometry args={[0.2, 0.2, 4, 32]} />
				<meshPhongMaterial color="#ef4444" shininess={100} />
			</mesh>
			{/* Feed point indicator */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[0.5, 0.5, 0.5]} />
				<meshBasicMaterial color={0x888888} />
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

			// Horizontal dipole (along X axis) pattern:
			// Figure-8 in YZ plane, nulls along X axis
			// Gain proportional to sin(theta) where theta is angle from dipole axis (X)
			// Simplified: gain = sqrt(y^2 + z^2) which is the perpendicular component
			const gain = Math.sqrt(vertex.y * vertex.y + vertex.z * vertex.z);

			// Apply gain
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
					opacity={0.3}
				/>
			</mesh>
		</group>
	);
}

export default function HorizontalPolarizationScene({
	isThumbnail = false,
}: {
	isThumbnail?: boolean;
}) {
	const [showWaves, setShowWaves] = useState(true);
	const [showPattern, setShowPattern] = useState(true);

	const LegendContent = () => (
		<>
			<h2 className="text-lg md:text-xl font-bold mb-2">
				水平极化 (Horizontal Polarization)
			</h2>
			<p className="text-xs md:text-sm text-muted-foreground mb-2">
				常用于短波 (HF) 远距离通信。地面反射对水平波的影响较小。
				<br />
				E-field oscillates horizontally. Common in HF DX communications.
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
					camera={{ position: [10, 5, 10], fov: 45 }}
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

					<Antenna />
					{showPattern && <RadiationPattern />}
					{showWaves && (
						<RadialWaveLines
							antennaType="horizontal"
							polarizationType="horizontal"
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

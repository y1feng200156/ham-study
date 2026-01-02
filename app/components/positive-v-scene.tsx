import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { RadialWaveLines } from "./radial-wave-lines";

function PositiveVAntenna() {
	// Dipole bent upwards. Center at mount height.
	const angle = Math.PI / 4; // 45 degrees up from horizontal (or 90 included angle)
	const length = 2; // Arm length

	return (
		<group position={[0, 1, 0]}>
			{/* Mast */}
			<mesh position={[0, -2, 0]}>
				<cylinderGeometry args={[0.05, 0.05, 4, 16]} />
				<meshStandardMaterial color="#666" />
			</mesh>

			{/* Feedpoint */}
			<mesh position={[0, 0, 0]}>
				<boxGeometry args={[0.15, 0.15, 0.15]} />
				<meshStandardMaterial color="white" />
			</mesh>

			{/* Left Leg (Up and Left) */}
			<mesh
				position={[
					(-length * Math.cos(angle)) / 2,
					(length * Math.sin(angle)) / 2,
					0,
				]}
				rotation={[0, 0, -angle]}
			>
				<cylinderGeometry args={[0.02, 0.02, length, 16]} />
				<meshStandardMaterial color="#ef4444" />
			</mesh>

			{/* Right Leg (Up and Right) */}
			<mesh
				position={[
					(length * Math.cos(angle)) / 2,
					(length * Math.sin(angle)) / 2,
					0,
				]}
				rotation={[0, 0, angle]}
			>
				<cylinderGeometry args={[0.02, 0.02, length, 16]} />
				<meshStandardMaterial color="#ef4444" />
			</mesh>
		</group>
	);
}

function RadiationPattern() {
	const geometry = useMemo(() => {
		const geo = new THREE.SphereGeometry(1, 40, 30);
		const posAttribute = geo.attributes.position;
		const vertex = new THREE.Vector3();
		const scale = 5;

		for (let i = 0; i < posAttribute.count; i++) {
			vertex.fromBufferAttribute(posAttribute, i);
			vertex.normalize();

			// Positive V Pattern
			// Similar to dipole but nulls are shallower and pattern is
			// shifted slightly.
			// For 90 degree V (Vertical plane):

			// Major lobes are still broadside (Perpendicular to plane of V).

			const angleFromX = Math.acos(vertex.x);

			// Basic dipole pattern
			let gain = Math.sin(angleFromX);

			// Modification for V shape:
			// Slightly less gain broadside, slightly more off ends compared to straight dipole.
			// But main feature of "Positive V" vs "Inverted V":
			// Inverted V is closer to ground at ends -> Capacitance to ground effects.
			// Positive V ends are high -> Clear of obstructions, safer voltage-wise?

			// Visually very similar pattern to dipole in free space.

			gain = 0.8 * Math.sin(angleFromX) + 0.2;

			vertex.multiplyScalar(gain * scale);
			posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
		}
		geo.computeVertexNormals();
		return geo;
	}, []);

	return (
		<group position={[0, 1, 0]}>
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

export default function PositiveVAntennaScene({
	isThumbnail = false,
}: {
	isThumbnail?: boolean;
}) {
	const [showWaves, setShowWaves] = useState(true);
	const [showPattern, setShowPattern] = useState(true);

	const LegendContent = () => (
		<>
			<h2 className="text-lg md:text-xl font-bold mb-2">
				正V天线 (Positive V)
			</h2>
			<p className="text-xs md:text-sm text-muted-foreground mb-2">
				两端向上倾斜的偶极子天线。通常安装在桅杆顶部，以避开地面障碍物。
				<br />A dipole with ends tilted upwards. Usually mounted high on a mast.
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
					camera={{ position: [10, 8, 10], fov: 45 }}
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
						position={[0, -1, 0]}
					/>

					<PositiveVAntenna />
					{showPattern && <RadiationPattern />}
					{showWaves && (
						<group position={[0, 1, 0]}>
							<RadialWaveLines
								antennaType="positive-v"
								polarizationType="horizontal"
								isThumbnail={isThumbnail}
							/>
						</group>
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

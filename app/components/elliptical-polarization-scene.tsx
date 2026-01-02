import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { RadialWaveLines } from "./radial-wave-lines";

function GenericAntenna() {
	return (
		<group position={[-2, 0, 0]}>
			<mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
				<boxGeometry args={[1, 1, 0.5]} />
				<meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
			</mesh>
			<mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
				<coneGeometry args={[0.2, 1, 16]} />
				<meshStandardMaterial color="#666" />
			</mesh>
		</group>
	);
}

function RadiationPattern({ ampY, ampZ }: { ampY: number; ampZ: number }) {
	const geometry = useMemo(() => {
		// Elliptical pattern logic
		const geo = new THREE.SphereGeometry(1, 60, 40);
		const posAttribute = geo.attributes.position;
		const vertex = new THREE.Vector3();
		const scale = 8;

		const maxAmp = Math.max(ampY, ampZ, 0.1);
		const normY = ampY / maxAmp;
		const normZ = ampZ / maxAmp;

		for (let i = 0; i < posAttribute.count; i++) {
			vertex.fromBufferAttribute(posAttribute, i);
			vertex.normalize();

			const gainVerticalPol = Math.sqrt(
				vertex.x * vertex.x + vertex.z * vertex.z,
			);
			const gainHorizontalPol = Math.sqrt(
				vertex.x * vertex.x + vertex.y * vertex.y,
			);

			// Combine
			const gain =
				(normY * gainVerticalPol + normZ * gainHorizontalPol) /
				(normY + normZ + 0.001);

			vertex.multiplyScalar(gain * scale);
			posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
		}
		geo.computeVertexNormals();
		return geo;
	}, [ampY, ampZ]);

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

export default function EllipticalPolarizationScene({
	isThumbnail = false,
}: {
	isThumbnail?: boolean;
}) {
	const [ampY, setAmpY] = useState(1.5);
	const [ampZ, setAmpZ] = useState(0.8);
	const [phaseShift, setPhaseShift] = useState(90);
	const [showWaves, setShowWaves] = useState(true);
	const [showPattern, setShowPattern] = useState(true);

	const LegendContent = () => (
		<>
			<h2 className="text-lg md:text-xl font-bold mb-2">
				椭圆极化 (Elliptical Polarization)
			</h2>
			<p className="text-xs md:text-sm text-muted-foreground mb-2">
				最普遍的极化形式。垂直和水平分量的幅度和相位不完美时形成。
				<br />
				The general form where E-field traces an ellipse.
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

					<GenericAntenna />
					{showPattern && <RadiationPattern ampY={ampY} ampZ={ampZ} />}
					{showWaves && (
						<RadialWaveLines
							antennaType="elliptical"
							polarizationType="elliptical"
							isThumbnail={isThumbnail}
						/>
					)}
				</Canvas>

				{!isThumbnail && (
					<>
						<div className="hidden md:block absolute top-4 left-4 right-4 md:right-auto md:w-auto p-3 md:p-4 bg-black/70 text-white rounded-lg max-w-full md:max-w-xs pointer-events-none select-none overflow-y-auto max-h-[90%]">
							<LegendContent />
						</div>

						<div className="absolute bottom-4 right-4 p-4 bg-black/70 text-white rounded-lg pointer-events-auto max-w-xs">
							<div className="flex flex-col space-y-4">
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

								<div className="space-y-1">
									<div className="flex justify-between text-white text-xs">
										<Label>垂直幅度 (Amp Y)</Label>
										<span>{ampY.toFixed(1)}</span>
									</div>
									<Slider
										value={[ampY]}
										min={0}
										max={3}
										step={0.1}
										onValueChange={(vals: number[]) => setAmpY(vals[0])}
									/>
								</div>

								<div className="space-y-1">
									<div className="flex justify-between text-white text-xs">
										<Label>水平幅度 (Amp Z)</Label>
										<span>{ampZ.toFixed(1)}</span>
									</div>
									<Slider
										value={[ampZ]}
										min={0}
										max={3}
										step={0.1}
										onValueChange={(vals: number[]) => setAmpZ(vals[0])}
									/>
								</div>

								<div className="space-y-1">
									<div className="flex justify-between text-white text-xs">
										<Label>相位差 (Phase Shift)</Label>
										<span>{phaseShift.toFixed(0)}°</span>
									</div>
									<Slider
										value={[phaseShift]}
										min={0}
										max={180}
										step={1}
										onValueChange={(vals: number[]) => setPhaseShift(vals[0])}
									/>
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

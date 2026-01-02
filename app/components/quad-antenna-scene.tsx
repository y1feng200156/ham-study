import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { RadialWaveLines } from "./radial-wave-lines";

function QuadElement({
	position,
	color = "#ef4444",
}: {
	position: [number, number, number];
	color?: string;
}) {
	// A square loop diamond shape or square.
	// Let's do diamond shape (corners at top/bottom/left/right) or Square (flat).
	// Usually "Cubical Quad" is square.
	const size = 2; // Side length

	// Points for a square loop
	const points = useMemo(() => {
		const half = size / 2;
		return [
			new THREE.Vector3(-half, -half, 0),
			new THREE.Vector3(half, -half, 0),
			new THREE.Vector3(half, half, 0),
			new THREE.Vector3(-half, half, 0),
			new THREE.Vector3(-half, -half, 0),
		];
	}, []);

	const lineGeo = useMemo(
		() => new THREE.BufferGeometry().setFromPoints(points),
		[points],
	);

	const lineObject = useMemo(() => {
		const line = new THREE.Line(
			lineGeo,
			new THREE.LineBasicMaterial({ color: color, linewidth: 2 }),
		);
		return line;
	}, [lineGeo, color]);

	return (
		<group position={position}>
			{/* X shape spreaders support */}
			<mesh rotation={[0, 0, Math.PI / 4]}>
				<cylinderGeometry args={[0.02, 0.02, size * Math.sqrt(2), 8]} />
				<meshStandardMaterial color="#888" />
			</mesh>
			<mesh rotation={[0, 0, -Math.PI / 4]}>
				<cylinderGeometry args={[0.02, 0.02, size * Math.sqrt(2), 8]} />
				<meshStandardMaterial color="#888" />
			</mesh>

			{/* The Wire Loop */}
			<primitive object={lineObject} />
		</group>
	);
}

function QuadAntenna() {
	return (
		<group position={[0, 2, 0]}>
			{/* Boom */}
			<mesh rotation={[0, 0, Math.PI / 2]}>
				<cylinderGeometry args={[0.05, 0.05, 3, 16]} />
				<meshStandardMaterial color="#666" />
			</mesh>

			{/* Mast */}
			<mesh position={[0, -2, 0]}>
				<cylinderGeometry args={[0.08, 0.08, 4, 16]} />
				<meshStandardMaterial color="#444" />
			</mesh>

			{/* Reflector (Back) */}
			<QuadElement position={[-1, 0, 0]} color="#3b82f6" />

			{/* Driven (Front/Middle) */}
			<QuadElement position={[1, 0, 0]} color="#ef4444" />
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

			// Quad/Loop pattern: bidirectional along Z axis (front and back)
			// Nulls on the sides (X-Y plane)
			// Gain proportional to |z|^0.7
			const gain = Math.abs(vertex.z) ** 0.7;

			vertex.multiplyScalar(gain * scale);
			posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
		}
		geo.computeVertexNormals();
		return geo;
	}, []);

	return (
		<group position={[0, 2, 0]}>
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

export default function QuadAntennaScene({
	isThumbnail = false,
}: {
	isThumbnail?: boolean;
}) {
	const [showWaves, setShowWaves] = useState(true);
	const [showPattern, setShowPattern] = useState(true);

	const LegendContent = () => (
		<>
			<h2 className="text-lg md:text-xl font-bold mb-2">
				方框天线 (Quad Antenna)
			</h2>
			<p className="text-xs md:text-sm text-muted-foreground mb-2">
				也称立方体方框天线 (Cubical Quad)。由两个或多个方形回路组成。
				<br />A directional beam antenna made of wire loops.
			</p>

			<div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-red-500 rounded-sm" />
					<span>振子环 (有源 / Driven Loop)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-blue-500 rounded-sm" />
					<span>反射环 (无源 / Reflector Loop)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-gray-400 rounded-sm" />
					<span>支撑杆 (Support Rods)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 border-2 border-green-500 rounded-sm" />
					<span>辐射方向图 (Pattern)</span>
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
					camera={{ position: [8, 5, 8], fov: 50 }}
					frameloop={isThumbnail ? "demand" : "always"}
				>
					<color attach="background" args={["#111111"]} />
					<fog attach="fog" args={["#111111", 10, 50]} />

					{!isThumbnail && (
						<OrbitControls
							enableDamping
							dampingFactor={0.05}
							zoomSpeed={0.3}
							target={[0, 2, 0]}
						/>
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
						position={[0, 0, 0]}
					/>

					<QuadAntenna />
					{showPattern && <RadiationPattern />}
					{showWaves && (
						<group position={[1, 2, 0]}>
							<RadialWaveLines
								antennaType="quad"
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

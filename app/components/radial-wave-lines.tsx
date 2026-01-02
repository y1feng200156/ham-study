import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface RadialWaveLinesProps {
	antennaType:
		| "vertical"
		| "horizontal"
		| "circular"
		| "yagi"
		| "inverted-v"
		| "gp"
		| "positive-v"
		| "quad"
		| "moxon"
		| "elliptical";
	polarizationType: "vertical" | "horizontal" | "circular" | "elliptical";
	isThumbnail?: boolean;
}

export function RadialWaveLines({
	antennaType,
	polarizationType,
	isThumbnail = false,
}: RadialWaveLinesProps) {
	const lineCount = 20; // Increased line count for better density
	const segments = 250; // Increased segments for smoother high-freq waves
	const maxDist = 30;
	const minStart = 0.6; // Start from antenna surface

	// Create line objects with vertex colors
	const lines = useMemo(() => {
		const linesArray: THREE.Line[] = [];

		for (let i = 0; i < lineCount; i++) {
			const geometry = new THREE.BufferGeometry();
			const positions = new Float32Array(segments * 3);
			const colors = new Float32Array(segments * 3);

			geometry.setAttribute(
				"position",
				new THREE.BufferAttribute(positions, 3),
			);
			geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

			const material = new THREE.LineBasicMaterial({
				vertexColors: true, // Enable vertex colors for pulse effect
				blending: THREE.AdditiveBlending, // Additive blending for glow look
				transparent: true,
				linewidth: 2,
			});

			const line = new THREE.Line(geometry, material);
			const theta = (i / lineCount) * Math.PI * 2;
			line.userData = { theta };
			linesArray.push(line);
		}

		return linesArray;
	}, []);

	const groupRef = useRef<THREE.Group>(null);

	// Initialize static snapshot for thumbnails
	useState(() => {
		if (isThumbnail) {
			const t = 8.0; // Static time for thumbnail
			lines.forEach((line) => {
				updateLinePositions(line, t);
			});
		}
	});

	useFrame(({ clock }) => {
		if (isThumbnail) return;

		// Match example.html time increment logic
		const time = clock.getElapsedTime() * 3.0;
		lines.forEach((line) => {
			updateLinePositions(line, time);
		});
	});

	function updateLinePositions(line: THREE.Line, time: number) {
		const positions = line.geometry.attributes.position.array as Float32Array;
		const colors = line.geometry.attributes.color.array as Float32Array;
		const theta = line.userData.theta;

		const dirX = Math.cos(theta);
		const dirZ = Math.sin(theta);
		const dirVec = new THREE.Vector3(dirX, 0, dirZ).normalize();

		const gain = calculateGain(dirVec);

		for (let j = 0; j < segments; j++) {
			// Distance from minStart
			const r = minStart + (j / segments) * (maxDist - minStart);

			const baseX = dirX * r;
			const baseZ = dirZ * r;

			// Physics parameters from example.html
			const k = 2.0;
			const w = 6.0;
			const phase = k * r - time * w;

			// Removed start envelope for "instant out" effect
			// End envelope for natural fade out
			const endEnvelope = Math.max(0, 1.0 - (r / (maxDist * 0.95)) ** 3);

			const decay = 4.0 / (r + 1.0);

			const amp = decay * gain * endEnvelope;
			const waveVal = Math.sin(phase);

			let x = baseX;
			let y = 0;
			let z = baseZ;

			if (polarizationType === "vertical") {
				y = amp * waveVal;
			} else if (polarizationType === "horizontal") {
				const tanX = -Math.sin(theta);
				const tanZ = Math.cos(theta);
				x += tanX * amp * waveVal;
				z += tanZ * amp * waveVal;
			} else if (polarizationType === "circular") {
				const vComp = Math.sin(phase);
				const hComp = Math.cos(phase);
				const tanX = -Math.sin(theta);
				const tanZ = Math.cos(theta);
				y = amp * vComp;
				x += tanX * amp * hComp;
				z += tanZ * amp * hComp;
			} else if (polarizationType === "elliptical") {
				const vComp = Math.sin(phase);
				const hComp = Math.cos(phase) * 0.6;
				const tanX = -Math.sin(theta);
				const tanZ = Math.cos(theta);
				y = amp * vComp;
				x += tanX * amp * hComp;
				z += tanZ * amp * hComp;
			}

			positions[j * 3] = x;
			positions[j * 3 + 1] = y;
			positions[j * 3 + 2] = z;

			// --- Pulse Color Logic ---
			// High intensity at wave peaks, transparent at nodes
			let intensity = Math.abs(waveVal) ** 3.0;
			intensity *= Math.min(1.0, r * 0.5); // Prevent start artifact
			intensity *= endEnvelope;

			// Cyan color (0, 1, 1)
			colors[j * 3] = 0.0 * intensity; // R
			colors[j * 3 + 1] = 1.0 * intensity; // G
			colors[j * 3 + 2] = 1.0 * intensity; // B
		}

		line.geometry.attributes.position.needsUpdate = true;
		line.geometry.attributes.color.needsUpdate = true;
	}

	function calculateGain(dirVec: THREE.Vector3): number {
		let gain = 1.0;

		switch (antennaType) {
			case "vertical":
			case "gp":
				gain = 1.0;
				break;

			case "horizontal":
			case "inverted-v":
			case "positive-v":
				gain = Math.abs(dirVec.z);
				break;

			case "yagi":
				gain = dirVec.x > 0 ? dirVec.x ** 2 : 0.1;
				break;

			case "quad":
				gain = Math.abs(dirVec.z);
				break;

			case "moxon":
				gain = (1 + dirVec.x) * 0.5;
				if (gain < 0.2) gain = 0;
				break;

			case "circular":
			case "elliptical":
				gain = 1.0;
				break;
		}

		return gain;
	}

	return (
		<group ref={groupRef}>
			{lines.map((line) => (
				<primitive key={line.id} object={line} />
			))}
		</group>
	);
}

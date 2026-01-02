import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface RadialWaveLinesProps {
    antennaType: 'vertical' | 'horizontal' | 'circular' | 'yagi' | 'inverted-v' | 'gp' | 'positive-v' | 'quad' | 'moxon' | 'elliptical';
    polarizationType: 'vertical' | 'horizontal' | 'circular' | 'elliptical';
    isThumbnail?: boolean;
}

export function RadialWaveLines({ antennaType, polarizationType, isThumbnail = false }: RadialWaveLinesProps) {
    const lineCount = 12; // 12条射线
    const segments = 120;  // 增加段数以获得更平滑的高频波
    const maxDist = 25;

    // Create 12 line objects
    const lines = useMemo(() => {
        const linesArray: THREE.Line[] = [];
        
        for (let i = 0; i < lineCount; i++) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(segments * 3);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.LineBasicMaterial({
                color: 0x22d3ee, // Cyan color matching legend
                linewidth: 2,
                transparent: true,
                opacity: 0.8
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
            lines.forEach(line => {
                updateLinePositions(line, t);
            });
        }
    });

    useFrame(({ clock }) => {
        if (isThumbnail) return;
        
        // Match example.html time increment logic
        // example.html adds 0.05 per frame (at 60fps = 3.0 units/sec)
        // Here we use elapsed time, so we multiply by 3.0 to match speed
        const time = clock.getElapsedTime() * 3.0; 
        lines.forEach(line => {
            updateLinePositions(line, time);
        });
    });

    function updateLinePositions(line: THREE.Line, time: number) {
        const positions = line.geometry.attributes.position.array as Float32Array;
        const theta = line.userData.theta;

        // 计算射线方向 (在XZ平面上)
        const dirX = Math.cos(theta);
        const dirZ = Math.sin(theta);
        const dirVec = new THREE.Vector3(dirX, 0, dirZ).normalize();

        // 计算该方向上的天线增益
        const gain = calculateGain(dirVec);

        // 更新该线的每个顶点
        for (let j = 0; j < segments; j++) {
            const r = (j / segments) * maxDist; // 距离中心的距离

            // 基础位置 (在射线上)
            const baseX = dirX * r;
            const baseZ = dirZ * r;

            // --- 关键修改 ---
            // 1. 增加波数 K: 从1.5 -> 4.5。波长变短，波更密集，消除“长绳感”。
            // 2. 增加频率 W: 配合波长保持流动感。
            const k = 4.5;
            const w = 8.0;
            const phase = k * r - time * w;

            // 3. 极速起振 (Super Fast Attack):
            // exp(-r * 8.0) 意味着在 r=0.5时包络已经接近1.0了。
            // 这样波形看起来就是直接从原点喷出来的，而不是有一段直棍子。
            const startEnvelope = 1.0 - Math.exp(-r * 8.0);

            // 4. 末端自然消散
            const endEnvelope = Math.max(
                0,
                1.0 - Math.pow(r / (maxDist * 0.9), 4)
            );

            // 5. 增强距离衰减: 让中心能量看起来很强，强调“点源”
            const decay = 5.0 / (r + 1.5);

            const amp = decay * gain * startEnvelope * endEnvelope;
            const waveVal = Math.sin(phase);

            let x = baseX;
            let y = 0;
            let z = baseZ;

            // 根据极化方式添加偏移
            if (polarizationType === 'vertical') {
                // 垂直极化：Y轴振动
                y = amp * waveVal;
            } else if (polarizationType === 'horizontal') {
                // 水平极化：切向振动
                const tanX = -Math.sin(theta);
                const tanZ = Math.cos(theta);
                x += tanX * amp * waveVal;
                z += tanZ * amp * waveVal;
            } else if (polarizationType === 'circular') {
                // 圆极化：螺旋
                const vComp = Math.sin(phase);
                const hComp = Math.cos(phase);

                const tanX = -Math.sin(theta);
                const tanZ = Math.cos(theta);

                y = amp * vComp;
                x += tanX * amp * hComp;
                z += tanZ * amp * hComp;
            } else if (polarizationType === 'elliptical') {
                // 椭圆极化：类似圆极化但椭圆比例
                const vComp = Math.sin(phase);
                const hComp = Math.cos(phase) * 0.6; // Elliptical ratio

                const tanX = -Math.sin(theta);
                const tanZ = Math.cos(theta);

                y = amp * vComp;
                x += tanX * amp * hComp;
                z += tanZ * amp * hComp;
            }

            positions[j * 3] = x;
            positions[j * 3 + 1] = y;
            positions[j * 3 + 2] = z;
        }
        line.geometry.attributes.position.needsUpdate = true;
    }

    function calculateGain(dirVec: THREE.Vector3): number {
        let gain = 1.0;

        switch (antennaType) {
            case 'vertical':
            case 'gp':
                gain = 1.0; // Omnidirectional
                break;

            case 'horizontal':
            case 'inverted-v':
            case 'positive-v':
                gain = Math.abs(dirVec.z); // Max at ±Z
                break;

            case 'yagi':
                gain = dirVec.x > 0 ? dirVec.x ** 2 : 0.1;
                break;

            case 'quad':
                gain = Math.abs(dirVec.z);
                break;

            case 'moxon':
                gain = (1 + dirVec.x) * 0.5;
                if (gain < 0.2) gain = 0;
                break;

            case 'circular':
            case 'elliptical':
                gain = 1.0; // Nearly omnidirectional
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

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

function Antenna() {
  return (
    <group>
      {/* Main Dipole Element (Vertical) */}
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
        // Normalize to get direction
        const yNorm = vertex.y / Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y + vertex.z * vertex.z);
        // Angle from Y axis
        const angleFromAxis = Math.acos(yNorm);
        // Gain ~ sin(angle)
        const gain = Math.sin(angleFromAxis);
        
        // Apply gain
        vertex.normalize().multiplyScalar(gain * scale);
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

function WaveParticles() {
    const particleCount = 600;
    
    // Initial state
    const [initialData] = useState(() => {
        const initialAngles = [];
        const initialDistances = [];
        const speeds = [];
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            initialAngles.push(Math.random() * Math.PI * 2);
            initialDistances.push(Math.random() * 15);
            speeds.push(0.05 + Math.random() * 0.02);
            
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;
        }
        return { initialAngles, initialDistances, speeds, positions };
    });

    const particlesRef = useRef<THREE.Points>(null);
    const distancesRef = useRef([...initialData.initialDistances]);

    useFrame(({ clock }) => {
        if (!particlesRef.current) return;
        
        // Snippet time logic:
        // animate loop: time += 0.1
        // y = ... sin(2.0 * dist - time * 2)
        // Let's use clock.getElapsedTime() directly but scale it if needed. 
        // 60fps * 0.1 = 6 units per second roughly.
        // clock.getElapsedTime is in seconds. So maybe `clock.getElapsedTime() * 6` ?
        // actually let's stick to the visual feel.
        
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const { initialAngles, speeds } = initialData;
        
        // We need to track cumulative time matching user's snippet logic roughly
        // The user snippet uses a global `time` variable incremented by 0.1 per frame.
        // We can approximate this by just using a factor on React Three Fiber's clock.
        // Let's rely on standard elapsed time but scaling phase.
        
        // User snippet: time += 0.1. Y calculation uses `time * 2`.
        // So effective phase speed is 0.2 per frame.
        // At 60FPS that is 12 rad/sec.
        
        const t = clock.getElapsedTime() * 6; 

        for (let i = 0; i < particleCount; i++) {
            // Update distance
            distancesRef.current[i] += speeds[i];
            
            // Reset if out of bounds
            if (distancesRef.current[i] > 15) {
                distancesRef.current[i] = 1 + Math.random();
            }
            
            const dist = distancesRef.current[i];
            const angle = initialAngles[i];
            
            // Calc X, Z
            const x = Math.cos(angle) * dist;
            const z = Math.sin(angle) * dist;
            
            // Calc Y (Wave)
            const amplitude = 1.5 * Math.exp(-0.1 * dist);
            const y = amplitude * Math.sin(2.0 * dist - t);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    args={[initialData.positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#22d3ee"
                size={0.2} // Snippet was 0.3, adjusting for R3F scaling potentially
                transparent
                opacity={0.8}
            />
        </points>
    );
}

export default function VerticalPolarizationScene() {
    const [showPattern, setShowPattern] = useState(true);
    const [showWaves, setShowWaves] = useState(true);

    return (
        <div className="relative w-full h-[450px] md:h-[600px] border rounded-lg overflow-hidden bg-black touch-none">
            <Canvas camera={{ position: [20, 15, 20], fov: 45 }}>
                <color attach="background" args={["#111111"]} />
                <fog attach="fog" args={["#111111", 20, 100]} />
                
                <OrbitControls enableDamping dampingFactor={0.05} />
                
                <ambientLight intensity={0.5} color={0x404040} />
                <directionalLight position={[10, 10, 10]} intensity={1} color={0xffffff} />
                <pointLight position={[0, 0, 0]} intensity={1} distance={10} color={0xffaa00} />
                
                <axesHelper args={[5]} />
                
                <Antenna />
                {showPattern && <RadiationPattern />}
                {showWaves && <WaveParticles />}
            </Canvas>

            {/* Overlay UI */}
             <div className="absolute top-4 left-4 right-4 md:right-auto md:w-auto p-3 md:p-4 bg-black/70 text-white rounded-lg max-w-full md:max-w-xs pointer-events-none select-none">
                <h1 className="text-xl font-bold text-sky-400 mb-2">天线垂直极化演示</h1>
                <p className="text-sm mb-2">这是一个垂直放置的偶极子天线。</p>
                <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 inline-block rounded-full"></span>
                        <span>天线 (Y轴)</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="w-3 h-3 border-2 border-green-500 inline-block box-border rounded-full"></span>
                        <span>辐射方向图 (甜甜圈形)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-cyan-400 inline-block rounded-full"></span>
                        <span>电场 (E-field) - 上下振动</span>
                    </div>
                </div>
                 <p className="text-xs text-gray-400 mt-2">操作：鼠标左键旋转，滚轮缩放。</p>
            </div>

            <div className="absolute bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 flex justify-center gap-4 md:gap-6 pointer-events-auto bg-black/70 p-3 md:p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="show-pattern"
                        checked={showPattern}
                        onCheckedChange={setShowPattern}
                    />
                    <Label htmlFor="show-pattern" className="text-white text-xs cursor-pointer">
                        方向图
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="show-waves"
                        checked={showWaves}
                        onCheckedChange={setShowWaves}
                    />
                    <Label htmlFor="show-waves" className="text-white text-xs cursor-pointer">
                        电波
                    </Label>
                </div>
            </div>
        </div>
    );
}

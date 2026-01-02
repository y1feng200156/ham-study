import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

function WaveParticles() {
    const particleCount = 500;
    const [initialData] = useState(() => {
        const positions = new Float32Array(particleCount * 3);
        const angles = [];
        const radii = [];
        for(let i=0; i<particleCount; i++) {
             angles.push(Math.random() * Math.PI * 2);
             radii.push(Math.random() * 10);
             positions[i*3] = 0;
             positions[i*3+1] = 0;
             positions[i*3+2] = 0;
        }
        return { positions, angles, radii };
    });
    
    const particlesRef = useRef<THREE.Points>(null);
    const radiiRef = useRef([...initialData.radii]);

    useFrame(({ clock }) => {
       if (!particlesRef.current) return;
       const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
       const t = clock.getElapsedTime() * 4;
       
       for(let i=0; i<particleCount; i++) {
           radiiRef.current[i] += 0.05; 
           if(radiiRef.current[i] > 10) radiiRef.current[i] = 0;
           
           const r = radiiRef.current[i];
           const angle = initialData.angles[i];
           
           const k = 2;
           const phase = k * r - t;
           
           // Vertical Polarization: Vibrates Up/Down (Y axis)
           const y = Math.sin(phase) * 1.5;
           
           positions[i*3] = Math.cos(angle) * r;
           positions[i*3+1] = y + 1; // Center height offset
           positions[i*3+2] = Math.sin(angle) * r;
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
            <pointsMaterial color="#22d3ee" size={0.15} transparent opacity={0.6} />
        </points>
    );
}

function GPAntenna() {
    const radials = 4;
    const radialLen = 2;
    // Radials droop slightly typically, say 45 deg or horizontal.
    // Standard GP is often horizontal radials or 45 deg for impedance match.
    // Let's do 45 deg as it looks "cooler" and is common for 50 ohm match.
    const droop = Math.PI / 4; 
    
  return (
    <group position={[0, 3, 0]}>
        {/* Vertical Radiator */}
        <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2, 16]} />
            <meshStandardMaterial color="#ef4444" />
        </mesh>
        
         {/* Feedpoint */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#fff" />
        </mesh>

        {/* Radials */}
        {Array.from({length: radials}).map((_, i) => {
            const angle = (i / radials) * Math.PI * 2;
            return (
                // biome-ignore lint/suspicious/noArrayIndexKey: Static array length
                <group key={`radial-${i}`} rotation={[0, angle, 0]}>
                    <mesh 
                        position={[radialLen * Math.sin(droop) / 2, -radialLen * Math.cos(droop) / 2, 0]} 
                        rotation={[0, 0, -droop]}
                    >
                        <cylinderGeometry args={[0.015, 0.015, radialLen, 16]} />
                        <meshStandardMaterial color="#3b82f6" />
                    </mesh>
                </group>
            )
        })}

        {/* Mast */}
        <mesh position={[0, -3, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 6, 16]} />
            <meshStandardMaterial color="#444" />
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
        
        // GP Pattern
        // Omnidirectional in Azimuth (XZ plane).
        // Vertical pattern varies. Low takeoff angle usually.
        // Null at zenith (straight up).
        
        // y is vertical cosine.
        const cosTheta = Math.abs(vertex.y); // Zenith angle cosine
        const sinTheta = Math.sqrt(1 - cosTheta * cosTheta); // Horizontal component
        
        // Donut shape
        const gain = sinTheta;
        
        vertex.multiplyScalar(gain * scale);
        posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
     <group position={[0, 3, 0]}>
        <mesh geometry={geometry}>
            <meshBasicMaterial 
                color="#8b5cf6" 
                wireframe={true} 
                transparent={true} 
                opacity={0.3} 
            />
        </mesh>
    </group>
  );
}

export default function GPAntennaScene() {
    const [showPattern, setShowPattern] = useState(true);
    const [showWaves, setShowWaves] = useState(true);

    return (
        <div className="relative w-full h-[450px] md:h-[600px] border rounded-lg overflow-hidden bg-black touch-none">
            <Canvas camera={{ position: [10, 5, 10], fov: 45 }}>
                <color attach="background" args={["#111111"]} />
                <fog attach="fog" args={["#111111", 10, 50]} />
                <OrbitControls enableDamping dampingFactor={0.05} target={[0, 3, 0]} />
                
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                
                <gridHelper args={[20, 20, 0x333333, 0x222222]} />
                
                <GPAntenna />
                {showPattern && <RadiationPattern />}
                {showWaves && (
                    <group position={[0, 3, 0]}>
                        <WaveParticles />
                    </group>
                )}
                
            </Canvas>

            <div className="absolute top-4 left-4 p-4 bg-black/70 text-white rounded-lg pointer-events-none select-none max-w-xs">
                <h1 className="text-xl font-bold text-violet-500 mb-2">GP天线 (Ground Plane)</h1>
                <p className="text-xs text-gray-300 mb-2">
                    最常见的垂直全向天线。由一根垂直振子和若干根地网 (Radials) 组成。
                </p>
                <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>垂直振子 (Radiator)</span>
                    </div>
                     <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                         <span>地网 (Radials) - 模拟地平面</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                        <span>方向图 (Violet)</span>
                    </div>
                     <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                        <span>电波 (Cyan)</span>
                    </div>
                </div>
            </div>
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto bg-black/70 p-3 rounded-lg backdrop-blur-sm shadow-xl border border-white/10">
                <div className="flex items-center space-x-2">
                    <Switch id="show-pattern" checked={showPattern} onCheckedChange={setShowPattern} />
                    <Label htmlFor="show-pattern" className="text-white text-xs cursor-pointer">方向图</Label>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center space-x-2">
                    <Switch id="show-waves" checked={showWaves} onCheckedChange={setShowWaves} />
                    <Label htmlFor="show-waves" className="text-white text-xs cursor-pointer">电波</Label>
                </div>
            </div>
        </div>
    );
}

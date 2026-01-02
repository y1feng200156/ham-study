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
             radii.push(Math.random() * 8);
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
           
           // Positive V (Dipole along X, bent up):
           // Main polarization Horizontal (X).
           const xOsc = Math.sin(phase) * 1.0;
           
           positions[i*3] = Math.cos(angle) * r + xOsc; 
           positions[i*3+1] = 1; // Height = 1
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
      <mesh position={[-length * Math.cos(angle) / 2, length * Math.sin(angle) / 2, 0]} rotation={[0, 0, -angle]}>
          <cylinderGeometry args={[0.02, 0.02, length, 16]} />
          <meshStandardMaterial color="#ef4444" />
      </mesh>

       {/* Right Leg (Up and Right) */}
      <mesh position={[length * Math.cos(angle) / 2, length * Math.sin(angle) / 2, 0]} rotation={[0, 0, angle]}>
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
                color="#f59e0b" 
                wireframe={true} 
                transparent={true} 
                opacity={0.3} 
            />
        </mesh>
    </group>
  );
}

export default function PositiveVAntennaScene() {
    const [showPattern, setShowPattern] = useState(true);
    const [showWaves, setShowWaves] = useState(true);

    return (
        <div className="relative w-full h-[450px] md:h-[600px] border rounded-lg overflow-hidden bg-black touch-none">
            <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
                <color attach="background" args={["#111111"]} />
                <fog attach="fog" args={["#111111", 10, 50]} />
                <OrbitControls enableDamping dampingFactor={0.05} target={[0, 2, 0]} />
                
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                
                <gridHelper args={[20, 20, 0x333333, 0x222222]} />
                
                <PositiveVAntenna />
                {showPattern && <RadiationPattern />}
                {showWaves && <WaveParticles />}
                
            </Canvas>

            <div className="absolute top-4 left-4 p-4 bg-black/70 text-white rounded-lg pointer-events-none select-none max-w-xs">
                <h1 className="text-xl font-bold text-amber-500 mb-2">正V天线 (Positive V / V-Dipole)</h1>
                <p className="text-xs text-gray-300 mb-2">
                    呈 V 字形向上的偶极子天线。
                </p>
                <div className="space-y-1 text-xs">
                     <p>特点：</p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>两臂向上翘起，末端电压高点远离地面/人员，更安全。</li>
                        <li>常用于受限空间，通过旋转 V 形角度调整阻抗。</li>
                         <li>常见于楼顶安装的短波旋转偶极子天线。</li>
                    </ul>
                     <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                         <span>振子 (Element)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <span>方向图 (Amber)</span>
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

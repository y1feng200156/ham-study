import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

function WaveParticles() {
    const particleCount = 400;
    const [initialData] = useState(() => {
        const positions = new Float32Array(particleCount * 3);
        const offsets = []; 
        for(let i=0; i<particleCount; i++) {
             offsets.push(Math.random() * 20);
             positions[i*3] = 0;
             positions[i*3+1] = 0;
             positions[i*3+2] = 0;
        }
        return { positions, offsets };
    });
    
    const particlesRef = useRef<THREE.Points>(null);
    const offsetsRef = useRef([...initialData.offsets]);

    useFrame(({ clock }) => {
       if (!particlesRef.current) return;
       const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
       const t = clock.getElapsedTime() * 6;
       
       for(let i=0; i<particleCount; i++) {
           offsetsRef.current[i] += 0.1; 
           if(offsetsRef.current[i] > 15) offsetsRef.current[i] = 0;
           
           const d = offsetsRef.current[i];
           const k = 1.5;
           const phase = k * d - t;
           
           // Moxon usually Horizontal.
           // Beam direction: Defined as +Z in my logic? (Reflector at -Z).
           // So propagating along Z.
           // E-field vibrates along X (Horizontal).
           
           const x = Math.sin(phase) * 1.5; 
           const z = d;
           
           if (d < 0) {
              positions[i*3] = -999;
           } else {
               // Beam
               positions[i*3] = x;
               positions[i*3+1] = 0;
               positions[i*3+2] = z + 0.5; // Start near driven element
           }
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

function MoxonAntenna() {
    // Moxon Rectangle
    // Driven Element (Front) + Reflector (Back)
    // Ends bent towards each other.
    
    // Geometry:
    // A        B
    // |-------|  Driven
    // |       |
    // |   gap |
    // |       |
    // |-------|  Reflector
    // D        C
    
    // Let's implement using line segments.
    // Dimensions approximate.
    const width = 2; 
    const depth = 0.7;

    
    // Driven Element
    const drivenPoints = useMemo(() => [
        new THREE.Vector3(width/2, 0, depth/2 - 0.3), // Tip Right
        new THREE.Vector3(width/2, 0, depth/2),       // Corner Right
        new THREE.Vector3(-width/2, 0, depth/2),      // Corner Left
        new THREE.Vector3(-width/2, 0, depth/2 - 0.3) // Tip Left
    ], []);
    
    // Reflector Element
     const refPoints = useMemo(() => [
        new THREE.Vector3(width/2, 0, -depth/2 + 0.3), // Tip Right
        new THREE.Vector3(width/2, 0, -depth/2),       // Corner Right
        new THREE.Vector3(-width/2, 0, -depth/2),      // Corner Left
        new THREE.Vector3(-width/2, 0, -depth/2 + 0.3) // Tip Left
    ], []);

    const drivenGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(drivenPoints), [drivenPoints]);
    const refGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(refPoints), [refPoints]);

    const drivenLine = useMemo(() => {
         return new THREE.Line(drivenGeo, new THREE.LineBasicMaterial({ color: "#ef4444", linewidth: 3 }));
    }, [drivenGeo]);
    
    const refLine = useMemo(() => {
         return new THREE.Line(refGeo, new THREE.LineBasicMaterial({ color: "#3b82f6", linewidth: 3 }));
    }, [refGeo]);
    
  return (
    <group position={[0, 2, 0]}>
        {/* Support structure (X shape) */}
        <mesh rotation={[0,0,0]} position={[0,0,0]}>
            <boxGeometry args={[width * 0.8, 0.05, 0.05]} />
            <meshStandardMaterial color="#888" />
        </mesh>
         <mesh rotation={[0,Math.PI/2,0]} position={[0,0,0]}>
            <boxGeometry args={[depth * 0.8, 0.05, 0.05]} />
            <meshStandardMaterial color="#888" />
        </mesh>

        {/* Mast */}
         <mesh position={[0, -2, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
            <meshStandardMaterial color="#444" />
        </mesh>

        {/* Elements */}
         <primitive object={drivenLine} />
         <primitive object={refLine} />
    </group>
  );
}

function RadiationPattern() {
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 60, 40);
    const posAttribute = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const scale = 8; // Gain scale

    for (let i = 0; i < posAttribute.count; i++) {
        vertex.fromBufferAttribute(posAttribute, i);
        vertex.normalize();
        
        // Moxon Pattern: Cardioid-like but wider beam than Yagi, excellent F/B ratio.
        // Beam along +Z (or wherever Driven is relative to Reflector).
        // In geometry above: Driven is at +Z (depth/2), Reflector at -Z.
        // Usually Reflector is 'behind', so beam is towards Driven? 
        // Driven -> Reflector direction? 
        // Yagi: Reflector -> Driven -> Director. Beam forward.
        // So Reflector is Back. Driven is Front.
        // If Reflector is at -Z, Driven at +Z. Beam is towards +Z?
        // Wait, normally Reflector is larger and 'behind'.
        // Current coords: Reflector at -Z. Driven at +Z.
        // So Beam should be towards +Z.
        
        const cosAngle = vertex.z; // Angle with Z axis
        
        let gain = 0.05; 
        
        // Front Lobe (+Z)
        if (cosAngle > 0) {
            gain += cosAngle ** 2 * 0.9; // Wider beam than Yagi (power 2 vs 3)
        }
        
        // Very Small Back Lobe
        if (cosAngle < -0.8) {
             gain += Math.abs(cosAngle) ** 5 * 0.05;
        }

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
                color="#ec4899" 
                wireframe={true} 
                transparent={true} 
                opacity={0.2} 
            />
        </mesh>
    </group>
  );
}

export default function MoxonAntennaScene() {
    const [showPattern, setShowPattern] = useState(true);
    const [showWaves, setShowWaves] = useState(true);

    return (
        <div className="relative w-full h-[450px] md:h-[600px] border rounded-lg overflow-hidden bg-black touch-none">
            <Canvas camera={{ position: [5, 6, 5], fov: 50 }}>
                <color attach="background" args={["#111111"]} />
                <fog attach="fog" args={["#111111", 10, 50]} />
                <OrbitControls enableDamping dampingFactor={0.05} target={[0, 2, 0]} />
                
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <gridHelper args={[20, 20, 0x333333, 0x222222]} />
                
                <MoxonAntenna />
                {showPattern && <RadiationPattern />}
                {showWaves && (
                    <group position={[0, 2, 0]}>
                        <WaveParticles />
                    </group>
                )}
                
            </Canvas>

            <div className="absolute top-4 left-4 p-4 bg-black/70 text-white rounded-lg pointer-events-none select-none max-w-xs">
                <h1 className="text-xl font-bold text-pink-500 mb-2">莫克森天线 (Moxon)</h1>
                <p className="text-xs text-gray-300 mb-2">
                     一种紧凑型两单元定向天线。矩形结构，末端折叠。
                </p>
                <div className="space-y-1 text-xs">
                    <ul className="list-disc pl-4 space-y-1">
                        <li>极高的前后比 (F/B Ratio)，几乎听不到背后的信号。</li>
                        <li>带宽极宽。</li>
                         <li>尺寸约为同频段全尺寸八木的 70%。</li>
                    </ul>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                         <span>有源振子 (Driven)</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>反射器 (Reflector)</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        <span>方向图 (Pink)</span>
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

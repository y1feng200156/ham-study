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
           
           const x = offsetsRef.current[i];
           const k = 1.5;
           const phase = k * x - t;
           
           // Quad is usually Horizontal Polarization (if fed at bottom/top)
           // Vibrating in Z axis
           const z = Math.sin(phase) * 1.5; 
           
           if (x < 0) {
              positions[i*3] = -999;
           } else {
               // Beam
               positions[i*3] = x + 1; // Start from driven element
               positions[i*3+1] = 0;
               positions[i*3+2] = z; 
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
            <pointsMaterial color="#3b82f6" size={0.15} transparent opacity={0.6} />
        </points>
    );
}

function QuadElement({ position, color = "#ef4444" }: { position: [number, number, number], color?: string }) {
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
    
    const lineGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

    const lineObject = useMemo(() => {
        const line = new THREE.Line(
            lineGeo, 
            new THREE.LineBasicMaterial({ color: color, linewidth: 2 })
        );
        return line;
    }, [lineGeo, color]);

    return (
        <group position={position}>
             {/* X shape spreaders support */}
            <mesh rotation={[0,0,Math.PI/4]}>
                <cylinderGeometry args={[0.02, 0.02, size * Math.sqrt(2), 8]} />
                 <meshStandardMaterial color="#888" />
            </mesh>
            <mesh rotation={[0,0,-Math.PI/4]}>
                <cylinderGeometry args={[0.02, 0.02, size * Math.sqrt(2), 8]} />
                 <meshStandardMaterial color="#888" />
            </mesh>
            
            {/* The Wire Loop */}
             <primitive object={lineObject} />
        </group>
    )
}

function QuadAntenna() {
    return (
        <group position={[0, 2, 0]}>
             {/* Boom */}
            <mesh rotation={[0,0,Math.PI/2]}>
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
    )
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
        
        // Directional Pattern like Yagi
        // Beam along X axis
        
        const cosAngle = vertex.x; 
        
        let gain = 0.1; 
        if (cosAngle > 0) {
            gain += cosAngle ** 3 * 0.9;
        }
        if (cosAngle < -0.5) {
             gain += Math.abs(cosAngle) ** 4 * 0.2;
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
                color="#22c55e" 
                wireframe={true} 
                transparent={true} 
                opacity={0.2} 
            />
        </mesh>
    </group>
  );
}

export default function QuadAntennaScene() {
    const [showPattern, setShowPattern] = useState(true);
    const [showWaves, setShowWaves] = useState(true);

    return (
        <div className="relative w-full h-[450px] md:h-[600px] border rounded-lg overflow-hidden bg-black touch-none">
            <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
                <color attach="background" args={["#111111"]} />
                <fog attach="fog" args={["#111111", 10, 50]} />
                <OrbitControls enableDamping dampingFactor={0.05} target={[0, 2, 0]} />
                
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                 <gridHelper args={[20, 20, 0x333333, 0x222222]} />
                
                <QuadAntenna />
                {showPattern && <RadiationPattern />}
                {showWaves && (
                    <group position={[0, 2, 0]}>
                        <WaveParticles />
                    </group>
                )}
                
            </Canvas>

            <div className="absolute top-4 left-4 p-4 bg-black/70 text-white rounded-lg pointer-events-none select-none max-w-xs">
                <h1 className="text-xl font-bold text-sky-500 mb-2">方框天线 (Quad Antenna)</h1>
                <p className="text-xs text-gray-300 mb-2">
                    也称立方体方框天线 (Cubical Quad)。由两个或多个方形回路组成。
                </p>
                <div className="space-y-1 text-xs">
                    <ul className="list-disc pl-4 space-y-1">
                        <li>比同等单元数的八木天线增益略高。</li>
                        <li>接收噪音通常比八木低。</li>
                         <li>立体结构，抗风是一大挑战。</li>
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
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>辐射方向图 (Green)</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>电波传播 (Blue)</span>
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


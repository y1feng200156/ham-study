import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

function YagiAntenna() {
  return (
    <group>
      {/* Boom */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Reflector (Back, Longest) */}
      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.2, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Driven Element (Middle) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 3, 16]} />
        <meshStandardMaterial color="#3b82f6" />
        {/* Feedpoint */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#fff" />
        </mesh>
      </mesh>

      {/* Director (Front, Shortest) */}
      <mesh position={[1.5, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2.8, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Mast */}
       <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

function YagiPattern() {
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 60, 40);
    // Rotate initially so Z is forward for our logic, but Yagi boom is X axis.
    // Let's assume boom is along X axis. Forward is +X.
    
    const posAttribute = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const scale = 10;

    for (let i = 0; i < posAttribute.count; i++) {
        vertex.fromBufferAttribute(posAttribute, i);
        vertex.normalize();
        
        // Calculate gain based on direction
        // Angle from X axis (Main beam direction)
        
        // Simple Yagi pattern approximation:
        // Main lobe: cos^4(angle/2) or similar narrow beam
        // Back lobe: small bump
        
        // Let's use a simplified cos power for main beam + small back lobe
        const cosAngle = vertex.x; // cos(theta) where theta is angle from X axis
        
        let gain = 0.1; // Base omni/noise
        
        // Forward Lobe (+X)
        if (cosAngle > 0) {
            gain += cosAngle ** 3 * 0.9;
        }
        
        // Back Lobe (-X)
        if (cosAngle < -0.5) {
             gain += Math.abs(cosAngle) ** 4 * 0.3;
        }

        // Add some side lobes
        // gain += Math.abs(Math.sin(angleFromX * 3)) * 0.1;
        
        // Apply gain
        vertex.multiplyScalar(gain * scale);
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
                opacity={0.2} 
            />
        </mesh>
    </group>
  );
}

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
           offsetsRef.current[i] += 0.1; // Move forward along X
           if(offsetsRef.current[i] > 15) offsetsRef.current[i] = 0;
           
           const x = offsetsRef.current[i];
           
           // Wave Packets logic
           // Horizontal polarization (Yagi is usually horizontal for DX)
           // E-field along Z axis? Or Y axis?
           // Our dipole is Vertical in the cylinder geometry?
           // Wait, in YagiAntenna, cylinder is [0,0,0] default rotation = vertical.
           // Ah! `cylinderGeometry` defaults to upright (Y-axis).
           // In `YagiAntenna`, I did:
           // Reflector: `cylinderGeometry args={[0.02, 0.02, 3.2, 16]}` at `[-1.5, 0, 0]` no rotation.
           // So elements are VERTICAL (along Y).
           // That means this is a VERTICAL Yagi (common for FM).
           // BUT for "Famous Antennas" usually people think of Horizontal HF Yagis.
           // Let's stick to Vertical for now as it matches the scene orientation ease, OR rotate the whole antenna.
           // Let's keep it Vertical for simplicity of viewing on ground plane? 
           // ACTUALLY, most "Yagi" diagrams show horizontal elements.
           // User asked for "Horizontal Polarization" demo before.
           // Let's make this a HORIZONTAL Yagi.
           
           // If I want Horizontal Yagi:
           // Elements should lie along Z axis (if Boom is X).
           // So rotate cylinders 90 deg X.
           
           // I will adjust geometry in `YagiAntenna`.
           // Let's assume Elements are along Z.
           
           const k = 1.5;
           const phase = k * x - t;
           
           // Horizontal polarization (Z axis vibration)
           const z = Math.sin(phase) * 1.5; 
           // Amplitude decay
           // const amp = 1.0;
           
           if (x < 0) {
              positions[i*3] = -999;
           } else {
               // Beam width constraint
               // Particles spread slightly in Y/Z?
               
               // Let's just show the E-field vector wave along the main beam
               positions[i*3] = x;
               positions[i*3+1] = 0;
               positions[i*3+2] = z; // Vibrating in Z (Horizontal)
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

export default function YagiAntennaScene() {
    const [showPattern, setShowPattern] = useState(true);
    const [showWaves, setShowWaves] = useState(true);
    const [isHorizontal, _setIsHorizontal] = useState(true); // Toggle orientation?

    return (
        <div className="relative w-full h-[450px] md:h-[600px] border rounded-lg overflow-hidden bg-black touch-none">
            <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
                <color attach="background" args={["#111111"]} />
                <fog attach="fog" args={["#111111", 20, 100]} />
                
                <OrbitControls enableDamping dampingFactor={0.05} />
                
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                
                <gridHelper args={[20, 20, 0x333333, 0x222222]} position={[0,-2,0]} />
                <axesHelper args={[2]} />
                
                <group rotation={isHorizontal ? [0,0,0] : [0,0,Math.PI/2]}>
                     {/* If isHorizontal is true, elements should be horizontal. 
                         My YagiAntenna component below needs to support correct orientation.
                         Let's just rebuild the inline component logic here for simplicity or modify above.
                         Actually, let's fix `YagiAntenna` to be horizontal by default (Elements along Z).
                      */}
                     <group rotation={[Math.PI/2, 0, 0]}> 
                        {/* Rotating the whole group 90 deg around X. 
                            Original Elements (Y-aligned) -> Now Z-aligned.
                            Original Boom (X-aligned) -> Still X-aligned (rotation is around X? No, wait.)
                            
                            Rotation around X:
                            Y -> Z
                            Z -> -Y
                            X -> X
                            
                            So if Boom was Cylinder(Height along Y) rotated 90 Z -> Boom is along X.
                            Wait, Cylinder default is along Y.
                            Boom: `rotation={[0, 0, Math.PI / 2]}` -> Aligned X.
                            Elements: `mesh position`... `cylinderGeometry` (Along Y).
                            
                            So `YagiAntenna` as defined has Boom on X, Elements on Y. (Vertical Polarization).
                            
                            To make it Horizontal (Elements on Z):
                            Rotate the whole `YagiAntenna` group by 90 degrees around X axis.
                            Now Elements (Y) become Z. Boom (X) stays X.
                        */}
                        <YagiAntenna />
                     </group>
                </group>

                {showPattern && <YagiPattern />}
                {/* WaveParticles tailored for Horizontal X-propagation, Z-vibration */}
                {showWaves && <WaveParticles />}
            </Canvas>

            <div className="absolute top-4 left-4 p-4 bg-black/70 text-white rounded-lg pointer-events-none select-none max-w-xs">
                <h1 className="text-xl font-bold text-blue-400 mb-2">八木-宇田天线 (Yagi-Uda)</h1>
                <p className="text-xs text-gray-300 mb-2">
                    最著名的定向天线。由一个有源振子 (Driven)、一个反射器 (Reflector) 和若干引向器 (Director) 组成。
                </p>
                <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>有源振子 (Driven Element)</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>反射器 (Reflector) - 较长</span>
                    </div>
                     <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                         <span>引向器 (Director) - 较短</span>
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

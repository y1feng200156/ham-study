import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { RadialWaveLines } from "./radial-wave-lines";

function YagiAntenna() {
  return (
    <group>
      {/* Boom */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Reflector (Back, Longest) */}
      <mesh position={[-1.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.2, 16]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Driven Element (Middle) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 3, 16]} />
        <meshStandardMaterial color="#ef4444" />
        {/* Feedpoint */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#fff" />
        </mesh>
      </mesh>

      {/* Director (Front, Shortest) */}
      <mesh position={[1.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2.8, 16]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Mast */}
       <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

function RadiationPattern() {
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 60, 40);
    const posAttribute = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const scale = 10;

    for (let i = 0; i < posAttribute.count; i++) {
        vertex.fromBufferAttribute(posAttribute, i);
        vertex.normalize();
        
        // Yagi pattern: highly directional beam along +X axis
        // Strong forward lobe, weak back lobe
        const cosAngle = vertex.x; // cos(theta) where theta is angle from X axis (beam direction)
        
        let gain = 0.1; // Base/noise floor
        
        // Forward lobe (+X direction)
        if (cosAngle > 0) {
            gain += cosAngle ** 3 * 1.5;
        }
        
        // Back lobe (-X direction) - small ripple
        if (cosAngle < -0.5) {
            gain += 0.2 * Math.abs(Math.cos(cosAngle * 5));
        }
        
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





export default function YagiAntennaScene({ isThumbnail = false }: { isThumbnail?: boolean }) {
    const [showWaves, setShowWaves] = useState(true);
    const [showPattern, setShowPattern] = useState(true);

    return (
        <div className={`relative w-full ${isThumbnail ? 'h-full' : 'h-[450px] md:h-[600px]'} border rounded-lg overflow-hidden bg-black touch-none`}>
            <Canvas 
                camera={{ position: [5, 10, 15], fov: 45 }}
                frameloop={isThumbnail ? "demand" : "always"}
            >
                <color attach="background" args={["#111111"]} />
                <fog attach="fog" args={["#111111", 10, 50]} />
                
                {!isThumbnail && <OrbitControls enableDamping dampingFactor={0.05} />}
                
                <ambientLight intensity={0.5} color={0x404040} />
                <directionalLight position={[10, 10, 10]} intensity={1} color={0xffffff} />
                
                <axesHelper args={[5]} />
                <gridHelper args={[20, 20, 0x333333, 0x222222]} position={[0,-2,0]} />

                <YagiAntenna />
                {showPattern && <RadiationPattern />}
                {showWaves && <RadialWaveLines antennaType="yagi" polarizationType="horizontal" isThumbnail={isThumbnail} />}
            </Canvas>

            {!isThumbnail && (
                <>
                    <div className="absolute top-4 left-4 right-4 md:right-auto md:w-auto p-3 md:p-4 bg-black/70 text-white rounded-lg max-w-full md:max-w-xs pointer-events-none select-none">
                        <h2 className="text-lg md:text-xl font-bold mb-2">八木天线 (Yagi-Uda)</h2>
                        <p className="text-xs md:text-sm text-gray-300 mb-2">
                            具有高增益和强方向性。常用于远距离通信、卫星追踪。
                            <br />
                            High gain and directional. Used for DXing and satellite tracking.
                        </p>
                        
                        <div className="mt-3 mb-2 space-y-1.5 text-xs border-t border-gray-600 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-sm" />
                                <span>振子 (有源元件 / Driven)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                                <span>反射器/引向器 (无源 / Passive)</span>
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
                        
                        <div className="flex flex-col space-y-3 pointer-events-auto">
                            <div className="flex items-center space-x-2">
                                <Switch 
                                    id="wave-mode" 
                                    checked={showWaves}
                                    onCheckedChange={setShowWaves}
                                />
                                <Label htmlFor="wave-mode" className="text-xs md:text-sm">显示电波 (Show Waves)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch 
                                    id="pattern-mode" 
                                    checked={showPattern}
                                    onCheckedChange={setShowPattern}
                                />
                                <Label htmlFor="pattern-mode" className="text-xs md:text-sm">显示方向图 (Show Pattern)</Label>
                            </div>
                        </div>
                    </div>
                
                    <div className="absolute bottom-4 left-4 text-gray-400 text-xs pointer-events-none select-none">
                        Created by BG4IST - For Ham Radio Education
                    </div>
                </>
            )}
        </div>
    );
}

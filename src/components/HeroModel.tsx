
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HeroModelProps {
  mousePosition: { x: number; y: number };
}

const HeroModel = ({ mousePosition }: HeroModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      // Smooth follow mouse movement
      groupRef.current.rotation.y += (mousePosition.x * 0.5 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mousePosition.y * 0.5 - groupRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#64ffda"
          emissive="#64ffda"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.3, 0.2, 0.7]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#112240" />
      </mesh>
      <mesh position={[-0.3, 0.2, 0.7]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#112240" />
      </mesh>
      
      {/* Smile */}
      <mesh position={[0, -0.1, 0.7]} rotation={[0, 0, Math.PI * 0.1]}>
        <torusGeometry args={[0.3, 0.05, 16, 16, Math.PI]} />
        <meshBasicMaterial color="#112240" />
      </mesh>
      
      {/* Security rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshStandardMaterial color="#64ffda" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshStandardMaterial color="#64ffda" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

export default HeroModel;

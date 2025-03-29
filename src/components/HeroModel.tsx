
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HeroModelProps {
  mousePosition: { x: number; y: number };
}

const HeroModel = ({ mousePosition }: HeroModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Update rotation based on mouse position
  useFrame(() => {
    if (meshRef.current) {
      // Automatic rotation
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.003;
      
      // Interactive rotation based on mouse position
      meshRef.current.rotation.x += (mousePosition.y * 0.01 - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (mousePosition.x * 0.01 - meshRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        color="#64ffda"
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

export default HeroModel;

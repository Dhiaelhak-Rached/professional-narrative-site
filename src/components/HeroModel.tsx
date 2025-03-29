
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface HeroModelProps {
  mousePosition: { x: number; y: number };
}

const HeroModel = ({ mousePosition }: HeroModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Update rotation based on mouse position
  useFrame((state) => {
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
    <Sphere
      args={[1, 64, 64]}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <MeshDistortMaterial
        color="#64ffda"
        attach="material"
        distort={0.4}
        speed={4}
        roughness={0.2}
        metalness={0.8}
        opacity={0.8}
        transparent={true}
      />
    </Sphere>
  );
};

export default HeroModel;

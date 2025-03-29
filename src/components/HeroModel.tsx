
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface HeroModelProps {
  mousePosition: { x: number; y: number };
  section: string;
}

const HeroModel = ({ mousePosition, section }: HeroModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const [blinking, setBlinking] = useState(false);
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0 });
  
  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 3000 + Math.random() * 5000);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Change look offset based on current section
  useEffect(() => {
    if (section === "skills") {
      setLookOffset({ x: 0.3, y: -0.2 });
    } else if (section === "projects") {
      setLookOffset({ x: -0.3, y: -0.2 });
    } else if (section === "contact") {
      setLookOffset({ x: 0, y: -0.3 });
    } else {
      setLookOffset({ x: 0, y: 0 });
    }
  }, [section]);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth follow mouse movement with section-based offset
      groupRef.current.rotation.y += ((mousePosition.x * 0.5 + lookOffset.x) - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += ((mousePosition.y * 0.3 + lookOffset.y) - groupRef.current.rotation.x) * 0.05;
      
      // Subtle breathing animation
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      
      // Eye movement
      if (eyeLeftRef.current && eyeRightRef.current) {
        // Eyes follow mouse more intensely than the whole head
        const targetX = mousePosition.x * 0.2;
        const targetY = mousePosition.y * 0.1;
        
        eyeLeftRef.current.position.x = 0.3 + targetX * 0.2;
        eyeLeftRef.current.position.y = 0.2 + targetY * 0.2;
        
        eyeRightRef.current.position.x = -0.3 + targetX * 0.2;
        eyeRightRef.current.position.y = 0.2 + targetY * 0.2;
        
        // Blinking effect
        if (blinking) {
          eyeLeftRef.current.scale.y = 0.1;
          eyeRightRef.current.scale.y = 0.1;
        } else {
          eyeLeftRef.current.scale.y = 1;
          eyeRightRef.current.scale.y = 1;
        }
      }
      
      // Mouth movement (subtle)
      if (mouthRef.current) {
        mouthRef.current.scale.y = 1 + Math.sin(t * 2) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base sphere with distort material for subtle movement */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#64ffda"
          emissive="#64ffda"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.2}
          speed={1}
          distort={0.2}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh ref={eyeLeftRef} position={[0.3, 0.2, 0.7]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#112240" />
      </mesh>
      <mesh ref={eyeRightRef} position={[-0.3, 0.2, 0.7]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#112240" />
      </mesh>
      
      {/* Pupils that follow cursor more intensely */}
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Smile/Mouth */}
      <mesh ref={mouthRef} position={[0, -0.1, 0.7]} rotation={[0, 0, Math.PI * 0.1]}>
        <torusGeometry args={[0.3, 0.05, 16, 16, Math.PI]} />
        <meshBasicMaterial color="#112240" />
      </mesh>
      
      {/* Security rings with animation */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshStandardMaterial color="#64ffda" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshStandardMaterial color="#64ffda" transparent opacity={0.6} />
      </mesh>
      
      {/* Energy particles */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i / 8 * Math.PI * 2) * 1.4,
            Math.cos(i / 8 * Math.PI * 2) * 1.4,
            0
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

export default HeroModel;

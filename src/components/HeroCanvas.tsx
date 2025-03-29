
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HeroModel from "./HeroModel";
import { Shield, Cpu, Database } from "lucide-react";

const HeroCanvas = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position relative to the center of the window
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      {/* Glowing background rings */}
      <div className="absolute inset-0 rounded-full bg-cyber-teal/10 animate-pulse-slow"></div>
      <div className="absolute inset-4 rounded-full bg-cyber-teal/20 animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#64ffda" />
          <HeroModel mousePosition={mousePosition} />
        </Canvas>
      </div>
      
      {/* Floating icons around the character */}
      <div className="absolute w-full h-full z-20 pointer-events-none">
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <Shield size={28} className="text-cyber-teal animate-float" style={{ animationDelay: "0s" }} />
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2">
          <Cpu size={28} className="text-cyber-teal animate-float" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute bottom-4 right-4">
          <Database size={28} className="text-cyber-teal animate-float" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </div>
  );
};

export default HeroCanvas;

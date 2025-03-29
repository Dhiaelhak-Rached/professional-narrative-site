
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
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div className="absolute inset-0 rounded-full bg-cyber-teal/10 animate-pulse-slow"></div>
      <div className="absolute inset-4 rounded-full bg-cyber-teal/20 animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <HeroModel mousePosition={mousePosition} />
        </Canvas>
      </div>
      
      {/* Icons that float over the 3D canvas */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="flex items-center justify-center space-x-4">
          <Shield size={40} className="text-cyber-teal" />
          <Cpu size={40} className="text-cyber-teal" />
          <Database size={40} className="text-cyber-teal" />
        </div>
      </div>
    </div>
  );
};

export default HeroCanvas;

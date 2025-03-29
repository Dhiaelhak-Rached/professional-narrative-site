
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HeroModel from "./HeroModel";
import { Shield, Cpu, Database, Zap, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroCanvas = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Track mouse position
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
  
  // Track the active section by monitoring scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "contact"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      {/* Glowing background rings with reactive animations */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-cyber-teal/10 transition-all duration-300",
        isInteracting ? "animate-pulse" : "animate-pulse-slow"
      )}></div>
      <div className={cn(
        "absolute inset-4 rounded-full bg-cyber-teal/20 transition-all duration-300",
        isInteracting ? "animate-pulse" : "animate-pulse-slow"
      )} style={{ animationDelay: "0.5s" }}></div>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          camera={{ position: [0, 0, 2.5], fov: 45 }}
          dpr={[1, 2]} // Performance optimization
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#64ffda" />
          <HeroModel mousePosition={mousePosition} section={activeSection} />
          {isInteracting && <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />}
        </Canvas>
      </div>
      
      {/* Dynamic section-based indicators */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 bg-cyber-navy/80 px-3 py-1 rounded-full text-xs text-cyber-teal border border-cyber-teal/30 transform transition-all duration-300 z-30",
        isInteracting ? "translate-y-2 opacity-100" : "-translate-y-4 opacity-0"
      )}>
        {activeSection === "home" && "Hello! I'm your guide"}
        {activeSection === "skills" && "Let me show you my skills"}
        {activeSection === "projects" && "Check out my projects"}
        {activeSection === "contact" && "Let's get in touch"}
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
        
        {/* Section-specific icons that appear based on active section */}
        {activeSection === "skills" && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Code size={28} className="text-cyber-teal animate-float" style={{ animationDelay: "1.5s" }} />
          </div>
        )}
        
        {activeSection === "projects" && (
          <div className="absolute bottom-4 left-4">
            <Zap size={28} className="text-cyber-teal animate-float" style={{ animationDelay: "2s" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCanvas;

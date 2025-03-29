
import { ArrowDownCircle, Shield, Cpu, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center network-bg relative overflow-hidden section-padding pt-32 pb-20"
    >
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className={cn(
              "absolute rounded-full bg-cyber-teal/30 animate-network-flow",
              i % 3 === 0 ? "w-2 h-2" : "w-1 h-1",
              i % 2 === 0 ? "animate-pulse-slow" : ""
            )}
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + i * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-3/5 animate-fade-in">
            <div className="mb-6">
              <p className="text-cyber-teal font-space mb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                Hi, my name is
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-space animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <span className="text-cyber-lightest">Security Expert &</span>
                <br />
                <span className="text-cyber-teal">Software Developer</span>
              </h1>
              <p className="text-cyber-slate text-lg md:text-xl max-w-xl animate-fade-up" style={{ animationDelay: "0.6s" }}>
                I specialize in cybersecurity, network engineering, and building exceptional digital solutions with a focus on security, performance, and user experience.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.8s" }}>
              <a 
                href="#projects" 
                className="bg-transparent hover:bg-cyber-teal/10 text-cyber-teal border border-cyber-teal px-6 py-3 rounded-md transition-all duration-300"
              >
                View My Projects
              </a>
              <a 
                href="#contact" 
                className="bg-cyber-teal text-cyber-blue hover:bg-cyber-teal/90 px-6 py-3 rounded-md transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="lg:w-2/5 flex justify-center animate-float">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-cyber-teal/10 animate-pulse-slow"></div>
              <div className="absolute inset-4 rounded-full bg-cyber-teal/20 animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center space-x-4">
                  <Shield size={40} className="text-cyber-teal" />
                  <Cpu size={40} className="text-cyber-teal" />
                  <Database size={40} className="text-cyber-teal" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#skills" className="text-cyber-teal">
            <ArrowDownCircle size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

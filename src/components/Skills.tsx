
import { useState } from "react";
import { Shield, Network, Brain, Code, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  icon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  technologies: string[];
}

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState<number>(0);

  const skills: Skill[] = [
    {
      icon: <Shield size={32} />,
      category: "Cybersecurity",
      title: "Security Analysis & Defense",
      description: "Expert in DNS security, network security protocols, and attack detection & prevention systems. Proficient in vulnerability assessment and penetration testing.",
      technologies: ["DNS Security", "Network Security", "Attack Detection", "Vulnerability Assessment", "Penetration Testing"]
    },
    {
      icon: <Network size={32} />,
      category: "Networking",
      title: "Advanced Network Engineering",
      description: "Specialized in distributed DNS implementation, packet analysis, and flow extraction using Scapy. Deep understanding of network protocols and architecture design.",
      technologies: ["Distributed DNS", "Packet Analysis", "Scapy", "Flow Extraction", "Network Protocols"]
    },
    {
      icon: <Brain size={32} />,
      category: "Machine Learning",
      title: "AI for Security",
      description: "Designing and implementing AI systems for anomaly detection and security pattern recognition. Expertise in Kalman filters for advanced packet sniffing and analysis.",
      technologies: ["Anomaly Detection", "Pattern Recognition", "Kalman Filters", "Security Analytics", "Data Processing"]
    },
    {
      icon: <Code size={32} />,
      category: "Software Development",
      title: "Security-Focused Development",
      description: "Building robust security applications with Python, PowerShell, and other tools. Strong focus on UI/UX design for security applications and containerization.",
      technologies: ["Python", "PowerShell", "Windows Tools", "Docker", "UI/UX Design"]
    },
    {
      icon: <Smartphone size={32} />,
      category: "Mobile Development",
      title: "Mobile Security Solutions",
      description: "Creating complementary security applications for mobile platforms. Ensuring cross-device security monitoring and alert systems.",
      technologies: ["Mobile Security", "Cross-platform Development", "Alert Systems", "Security Monitoring", "App Integration"]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-cyber-navy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space">
            <span className="text-cyber-teal">My</span> Skills
          </h2>
          <div className="w-20 h-1 bg-cyber-teal mx-auto mt-4 mb-6"></div>
          <p className="text-cyber-slate max-w-2xl mx-auto">
            With expertise across multiple domains, I bring a comprehensive approach to cybersecurity and software development challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {skills.map((skill, index) => (
            <div 
              key={index}
              onClick={() => setActiveSkill(index)}
              className={cn(
                "flex flex-col items-center text-center p-4 rounded-lg cursor-pointer transition-all duration-300",
                activeSkill === index 
                  ? "bg-cyber-teal/20 border border-cyber-teal" 
                  : "hover:bg-cyber-teal/10"
              )}
            >
              <div className={cn(
                "text-cyber-teal mb-3 transition-all duration-300",
                activeSkill === index ? "scale-110" : ""
              )}>
                {skill.icon}
              </div>
              <h3 className="font-medium text-cyber-lightest">{skill.category}</h3>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-b from-cyber-navy/50 to-cyber-blue/50 rounded-xl p-8 border border-cyber-teal/20 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-cyber-lightest">
                {skills[activeSkill].title}
              </h3>
              <div className="w-16 h-1 bg-cyber-teal mb-4"></div>
              <p className="text-cyber-slate mb-6">
                {skills[activeSkill].description}
              </p>
            </div>
            
            <div className="md:w-2/3">
              <h4 className="text-cyber-teal mb-4 font-medium">Technologies & Expertise</h4>
              <div className="flex flex-wrap">
                {skills[activeSkill].technologies.map((tech, index) => (
                  <span key={index} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="mt-8">
                <div className="w-full bg-cyber-navy/80 rounded-full h-2.5 mb-6">
                  <div className="bg-cyber-teal h-2.5 rounded-full animate-pulse-slow" style={{ width: '95%' }}></div>
                </div>
                <div className="w-full bg-cyber-navy/80 rounded-full h-2.5 mb-6">
                  <div className="bg-cyber-teal h-2.5 rounded-full animate-pulse-slow" style={{ width: '90%', animationDelay: '0.2s' }}></div>
                </div>
                <div className="w-full bg-cyber-navy/80 rounded-full h-2.5">
                  <div className="bg-cyber-teal h-2.5 rounded-full animate-pulse-slow" style={{ width: '85%', animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

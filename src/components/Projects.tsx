
import { useState } from "react";
import { Github, ExternalLink, Shield, Database, Smartphone, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  icon: React.ReactNode;
  github: string;
  live?: string;
}

const Projects = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "Cybersecurity Desktop App",
      description: "An advanced security application that defends against DNS attacks using AI-powered packet sniffing and statistical analysis. Features real-time traffic monitoring and threat detection capabilities.",
      technologies: ["Python", "PyQt", "Machine Learning", "Packet Analysis", "DNS Security"],
      image: "bg-gradient-to-br from-blue-900 to-indigo-900",
      icon: <Shield size={32} />,
      github: "https://github.com/yourusername/cyber-desktop-app"
    },
    {
      title: "DNS Security Testing Tool",
      description: "A comprehensive command-line tool designed to scan DNS servers for vulnerabilities. Supports multiple output formats including JSON, CSV, and HTML reports with detailed security recommendations.",
      technologies: ["Python", "DNS Protocols", "Security Testing", "Vulnerability Assessment"],
      image: "bg-gradient-to-br from-cyan-900 to-blue-900",
      icon: <Database size={32} />,
      github: "https://github.com/yourusername/dns-security-tester"
    },
    {
      title: "Mobile Security App",
      description: "A companion mobile application that extends desktop security features to mobile devices. Allows for remote monitoring, notifications, and basic security operations on the go.",
      technologies: ["React Native", "Mobile Security", "Push Notifications", "Cross-platform"],
      image: "bg-gradient-to-br from-purple-900 to-indigo-900",
      icon: <Smartphone size={32} />,
      github: "https://github.com/yourusername/mobile-security-app"
    },
    {
      title: "Distributed DNS Protocol Implementation",
      description: "An innovative project focused on creating a decentralized DNS resolution system across multiple devices. Improves resilience against DNS-based attacks and outages.",
      technologies: ["C++", "Networking", "Distributed Systems", "Protocol Design"],
      image: "bg-gradient-to-br from-teal-900 to-blue-900",
      icon: <Network size={32} />,
      github: "https://github.com/yourusername/distributed-dns"
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space">
            <span className="text-cyber-teal">Featured</span> Projects
          </h2>
          <div className="w-20 h-1 bg-cyber-teal mx-auto mt-4 mb-6"></div>
          <p className="text-cyber-slate max-w-2xl mx-auto">
            A showcase of my work in cybersecurity and software development. Each project demonstrates different aspects of my technical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className={cn(
                "h-80 rounded-lg overflow-hidden relative p-8", 
                project.image
              )}>
                <div className={cn(
                  "absolute inset-0 bg-cyber-blue/80 flex flex-col justify-end p-8 transition-opacity duration-300",
                  hoverIndex === index ? "opacity-0" : "opacity-100"
                )}>
                  <div className="text-cyber-teal mb-4">{project.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-cyber-lightest">{project.title}</h3>
                  <div className="flex flex-wrap">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-pill">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className={cn(
                  "absolute inset-0 bg-gradient-to-b from-cyber-navy/95 to-cyber-blue/95 flex flex-col p-8 transition-opacity duration-300",
                  hoverIndex === index ? "opacity-100" : "opacity-0"
                )}>
                  <h3 className="text-xl font-bold mb-3 text-cyber-teal">{project.title}</h3>
                  <p className="text-cyber-slate mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap mb-6">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex gap-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyber-teal hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      <span>Source Code</span>
                    </a>
                    
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyber-teal hover:text-white transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

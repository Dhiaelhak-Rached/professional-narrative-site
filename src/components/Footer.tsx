
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: <Mail size={20} />, href: "mailto:contact@example.com", label: "Email" }
  ];

  return (
    <footer className="bg-cyber-blue border-t border-cyber-teal/20 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="font-space text-xl font-bold text-cyber-teal">
              Portfolio<span className="text-white">.</span>
            </a>
            <p className="text-cyber-slate mt-2 text-sm">
              Cybersecurity Expert & Software Developer
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-cyber-navy hover:bg-cyber-teal/20 text-cyber-teal transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-cyber-teal/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyber-slate text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="#home" className="text-cyber-slate hover:text-cyber-teal text-sm transition-colors">Home</a>
            <a href="#skills" className="text-cyber-slate hover:text-cyber-teal text-sm transition-colors">Skills</a>
            <a href="#projects" className="text-cyber-slate hover:text-cyber-teal text-sm transition-colors">Projects</a>
            <a href="#contact" className="text-cyber-slate hover:text-cyber-teal text-sm transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

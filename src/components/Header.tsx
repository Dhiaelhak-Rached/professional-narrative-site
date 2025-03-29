
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-4 bg-cyber-blue/90 backdrop-blur-md border-b border-cyber-teal/20" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="font-space text-xl font-bold text-cyber-teal">
          Portfolio<span className="text-white">.</span>
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-cyber-teal"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-cyber-lightest hover:text-cyber-teal transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-cyber-blue/95 flex flex-col items-center justify-center z-50 md:hidden">
            <button 
              className="absolute top-6 right-6 text-cyber-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col items-center space-y-8">
              {menuItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-xl text-cyber-lightest hover:text-cyber-teal transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

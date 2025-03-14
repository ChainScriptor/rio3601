
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import { BlockchainIcon, CodeBlock, CubeIcon } from "./pixel-art";

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen pt-20 flex flex-col items-center justify-center relative overflow-hidden bg-grid-pattern bg-[length:20px_20px]"
    >
      <div className="absolute inset-0 crt-overlay"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/6 opacity-80 animate-float">
        <CubeIcon />
      </div>
      <div className="absolute bottom-1/4 right-1/6 opacity-80">
        <BlockchainIcon />
      </div>
      <div className="absolute top-2/3 left-1/3 opacity-80 animate-delayed">
        <CodeBlock />
      </div>
      
      <div className="container px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center px-3 py-1 border border-border bg-secondary font-pixel text-xs text-foreground animate-glitch-1">
              <Terminal className="w-3 h-3 mr-2" />
              <span>Full Stack Blockchain Developer</span>
            </div>
          </div>
          
          <h1 className="font-pixel text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in">
            CRAFTING <span className="text-primary">DIGITAL</span> EXPERIENCES
          </h1>
          
          <p className="font-mono text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up animate-delayed">
            I build cutting-edge web applications and blockchain solutions with a focus on security, 
            performance, and pixel-perfect design.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animate-delayed-medium">
            <a href="#projects" className="pixel-btn bg-primary text-primary-foreground w-full sm:w-auto">
              View Projects
            </a>
            <a href="#contact" className="pixel-btn bg-secondary text-foreground w-full sm:w-auto">
              Contact Me
            </a>
          </div>
          
          {/* Social links */}
          <div className="flex items-center justify-center gap-6 animate-fade-in-up animate-delayed-long">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:contact@example.com" 
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-2 bg-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

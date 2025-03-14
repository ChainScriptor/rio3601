
import { CodeBlock } from "./pixel-art";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="py-20 relative overflow-hidden bg-pixel-grid bg-[length:16px_16px]"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
              <div className="relative">
                <div className="w-48 h-48 bg-primary/10 border-2 border-primary pixel-corners relative animate-float">
                  <div className="absolute inset-0 bg-[url('https://api.dicebear.com/6.x/pixel-art/svg?seed=developer&backgroundColor=0000ff')] bg-cover bg-center"></div>
                </div>
                <CodeBlock className="absolute -bottom-8 -right-8 z-10 animate-delayed" />
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="section-title text-primary">About Me</h2>
              
              <div className="space-y-4 font-mono">
                <p className="text-foreground">
                  Welcome to my digital realm! I'm a passionate blockchain developer and software engineer 
                  with expertise in building decentralized applications and robust web solutions.
                </p>
                
                <p className="text-muted-foreground">
                  With a background in computer science and a deep understanding of blockchain technology, 
                  I bridge the gap between cutting-edge tech and user-friendly experiences. My journey in 
                  software development has equipped me with the skills to tackle complex problems with 
                  elegant solutions.
                </p>
                
                <p className="text-muted-foreground">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the community through articles and workshops.
                </p>
                
                <div className="pt-4">
                  <a 
                    href="#skills" 
                    className="inline-flex items-center font-pixel text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>View my skills</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

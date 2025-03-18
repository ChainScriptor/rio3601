
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
              
              <h3 className="text-xl font-pixel mb-4 text-foreground">Hey, I am Staths Mavridis</h3>
              
              <div className="space-y-4 font-mono">
                <p className="text-foreground">
                  I am an undergraduate student passionate about blockchain technology, with a strong focus on Solidity 
                  and smart contract development. My goal is to build my own DeFi platform and develop innovative Web3 applications.
                </p>
                
                <p className="text-muted-foreground">
                  Beyond blockchain, I have experience with frontend technologies such as Next.js, React, and Tailwind CSS, 
                  allowing me to create modern and efficient user interfaces.
                </p>
                
                <p className="text-muted-foreground">
                  Originally from Thessaloniki, I am currently working in Rotterdam. I have also completed my military service, 
                  allowing me to fully dedicate myself to my career in blockchain development.
                </p>
                
                <p className="text-muted-foreground">
                  I am always eager to learn, explore new technologies, and contribute to the decentralized future.
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

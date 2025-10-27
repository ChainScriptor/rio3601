import { CodeBlock } from "./pixel-art";
import { ArrowRight } from "lucide-react";
import { SocialLinks } from "@/components/ui/social-links";

export function AboutSection() {
  return (
    <>
      <section
        id="about"
        className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-pixel-grid bg-[length:16px_16px]"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
              <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                <div className="relative">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-primary/10 border-2 border-primary pixel-corners relative animate-float overflow-hidden">
                    <img
                      src="/pik.jpg"
                      alt="Staths Mavridis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CodeBlock className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 z-10 animate-delayed w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <h2 className="section-title text-primary text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4">About Me</h2>

                <h3 className="text-lg sm:text-xl md:text-2xl font-pixel mb-3 md:mb-4 text-foreground">Hey, I am Staths Mavridis</h3>

                <div className="space-y-3 md:space-y-4 font-mono text-sm sm:text-base">
                  <p className="text-foreground">
                    I am a graduate computer science student passionate about blockchain technology, with a strong focus on Node js
                    and smart contract development. My goal is to build my own DeFi platform and develop innovative Web3 applications.
                  </p>

                  <p className="text-muted-foreground">
                    Beyond blockchain, I have experience with frontend technologies such as Next.js, React, and Tailwind CSS,
                    allowing me to create modern and efficient user interfaces.
                  </p>

                  <p className="text-muted-foreground">
                    Originally from Thessaloniki, I recently completed my degree in computer science. I have also completed my military service,
                    allowing me to fully dedicate myself to my career in blockchain development.
                  </p>

                  <p className="text-muted-foreground">
                    I am always eager to learn, explore new technologies, and contribute to the decentralized future.
                  </p>

                  <div className="pt-3 md:pt-4">
                    <a
                      href="#skills"
                      className="inline-flex items-center font-pixel text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
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

      <SocialLinks
        links={[
          { platform: "github", href: "https://github.com/yourusername" },
          { platform: "linkedin", href: "https://linkedin.com/in/yourusername" },
          { platform: "mail", href: "mailto:your@email.com" },
        ]}
      />
    </>
  );
}

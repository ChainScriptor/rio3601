
import { AnimatedNavbar } from "@/components/animated-navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { CoursesSection } from "@/components/courses-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { PixelComputer } from "@/components/pixel-computer";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <AnimatedNavbar />
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <CoursesSection />
          <SkillsSection />
          <div id="blockchain" className="w-full">
            <PixelComputer />
          </div>
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;

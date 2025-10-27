
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 border-t border-border bg-background">
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center md:text-left">
            <div className="font-pixel text-xs sm:text-sm mb-1 sm:mb-2">
              DEV<span className="text-primary">::</span>PORTFOLIO
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              © {currentYear} All Rights Reserved
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

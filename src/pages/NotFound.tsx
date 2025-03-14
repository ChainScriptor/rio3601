
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col items-center justify-center bg-pixel-grid bg-[length:20px_20px] p-4">
        <div className="text-center max-w-md">
          <div className="font-pixel text-9xl text-primary mb-6 animate-glitch-1">404</div>
          <h1 className="font-pixel text-xl mb-6 animate-fade-in">PAGE NOT FOUND</h1>
          <p className="text-muted-foreground mb-8 font-mono animate-fade-in-up animate-delayed">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <a 
            href="/" 
            className="pixel-btn inline-flex items-center animate-fade-in-up animate-delayed-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Return Home</span>
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;

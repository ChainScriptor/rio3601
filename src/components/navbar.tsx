
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle # links when on the home page
    if (href.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Offset for the navbar height
          behavior: "smooth",
        });
        
        // Close mobile menu if open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    } else if (href.startsWith("/#") && location.pathname !== "/") {
      // If we're not on the home page but the link is to a section on the home page,
      // don't prevent default so react-router handles the navigation
    }
  };

  const navItems = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Blockchain", href: "/#blockchain" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Courses", href: "/course-videos" },
    { name: "Airdrops", href: "/airdrops" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-sm border-b border-border shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-pixel text-xs sm:text-sm md:text-base text-foreground hover:text-primary transition-colors z-50 relative"
          onClick={() => setMobileMenuOpen(false)}
        >
          DEV<span className="text-primary">::</span>PORTFOLIO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-link text-xs xl:text-sm"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden items-center space-x-3">
          {navItems.slice(0, 4).map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-link text-xs"
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="More options"
          >
            <Menu className="h-5 w-5" />
          </button>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-3 p-2 text-foreground hover:text-primary transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={cn(
                "absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              )} />
              <span className={cn(
                "absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              )} />
              <span className={cn(
                "absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out",
                mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-all duration-300 ease-in-out",
          "md:hidden lg:hidden",
          mobileMenuOpen 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-6">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "font-pixel text-lg sm:text-xl text-foreground hover:text-primary",
                  "transition-all duration-300 transform hover:scale-110",
                  "opacity-0 translate-y-4",
                  mobileMenuOpen && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms",
                  animationFillMode: "forwards"
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

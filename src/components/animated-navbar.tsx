"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Navigation, Menu, User, GraduationCap, Code, Network, Briefcase, Mail, Code2, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import SkyToggle from "./ui/sky-toggle";
import { Link, useLocation } from "react-router-dom";
import { Dock, DockIcon, DockItem, DockLabel } from "./ui/dock";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
    { name: "About", href: "/#about", icon: User },
    { name: "Courses", href: "/#courses", icon: GraduationCap },
    { name: "Skills", href: "/#skills", icon: Code },
    { name: "Blockchain", href: "/#blockchain", icon: Network },
    { name: "Projects", href: "/#projects", icon: Briefcase },
    { name: "Contact", href: "/#contact", icon: Mail },
    { name: "Code Editor", href: "/code-editor", icon: Code2 },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
    expanded: {
        y: 0,
        opacity: 1,
        width: "auto",
        transition: {
            y: { type: "spring", damping: 18, stiffness: 250 },
            opacity: { duration: 0.3 },
            type: "spring",
            damping: 20,
            stiffness: 300,
            staggerChildren: 0.07,
            delayChildren: 0.2,
        },
    },
    collapsed: {
        y: 0,
        opacity: 1,
        width: "3rem",
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 300,
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const logoVariants = {
    expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
    collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
    expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
    collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
    expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    collapsed: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 300,
            delay: 0.15,
        }
    },
}

export function AnimatedNavbar() {
    const location = useLocation();
    const [showDock, setShowDock] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024;
        }
        return false;
    });

    React.useEffect(() => {
        const checkSize = () => {
            setShowDock(window.innerWidth < 1024);
        };
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only handle # links when on the home page
        if (href.startsWith("/#") && location.pathname === "/") {
            e.preventDefault();
            const id = href.replace("/#", "");
            const element = document.getElementById(id);

            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        }
    };

    // Mobile Dock - show for screens < 1024px
    if (showDock) {
        return (
            <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
                <Dock className="flex">
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <DockItem key={item.name}>
                                <a href={item.href} onClick={(e) => handleNavItemClick(e, item.href)}>
                                    <DockIcon>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg">
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                    </DockIcon>
                                </a>
                                <DockLabel>{item.name}</DockLabel>
                            </DockItem>
                        );
                    })}
                    <DockItem>
                        <DockIcon>
                            <button
                                onClick={() => {
                                    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                                    localStorage.setItem('portfolio-theme', newTheme);
                                    document.documentElement.classList.remove('light', 'dark');
                                    document.documentElement.classList.add(newTheme);
                                }}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg cursor-pointer"
                            >
                                <Moon className="h-5 w-5" />
                            </button>
                        </DockIcon>
                        <DockLabel>Theme</DockLabel>
                    </DockItem>
                </Dock>
            </div>
        );
    }

    // Desktop Animated Navbar - only when not showing dock
    return <DesktopNavbar />;
}

function DesktopNavbar() {
    const [isExpanded, setExpanded] = React.useState(true);
    const location = useLocation();
    const { scrollY } = useScroll();
    const lastScrollY = React.useRef(0);
    const scrollPositionOnCollapse = React.useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollY.current;

        if (isExpanded && latest > previous && latest > 150) {
            setExpanded(false);
            scrollPositionOnCollapse.current = latest;
        }
        else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
            setExpanded(true);
        }

        lastScrollY.current = latest;
    });

    const handleNavClick = (e: React.MouseEvent) => {
        if (!isExpanded) {
            e.preventDefault();
            setExpanded(true);
        }
    };

    const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#") && location.pathname === "/") {
            e.preventDefault();
            const id = href.replace("/#", "");
            const element = document.getElementById(id);

            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                });

                if (!isExpanded) {
                    setExpanded(true);
                }
            }
        }
    };

    return (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto max-w-3xl">
            <div className="flex items-center gap-2">
                <motion.nav
                    initial={{ y: -80, opacity: 0 }}
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={containerVariants}
                    whileHover={!isExpanded ? { scale: 1.1 } : {}}
                    whileTap={!isExpanded ? { scale: 0.95 } : {}}
                    onClick={handleNavClick}
                    className={cn(
                        "flex items-center overflow-hidden rounded-full border bg-background/80 shadow-lg backdrop-blur-sm h-10 sm:h-12",
                        !isExpanded && "cursor-pointer justify-center"
                    )}
                >
                    <motion.div
                        variants={logoVariants}
                        className="flex-shrink-0 flex items-center font-semibold pl-2 sm:pl-4 pr-1 sm:pr-2"
                    >
                        <Navigation className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>

                    <motion.div
                        className={cn(
                            "flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-4 pr-2 sm:pr-4",
                            !isExpanded && "pointer-events-none"
                        )}
                    >
                        {navItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                variants={itemVariants}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavItemClick(e, item.href);
                                }}
                                className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-1 sm:px-2 py-1"
                            >
                                <span className="hidden md:inline">{item.name}</span>
                                <span className="md:hidden">{item.name.length > 8 ? item.name.substring(0, 7) + '...' : item.name}</span>
                            </motion.a>
                        ))}
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            variants={collapsedIconVariants}
                            animate={isExpanded ? "expanded" : "collapsed"}
                        >
                            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                    </div>
                </motion.nav>

                {/* Theme Toggle - Always visible outside the navbar */}
                <div className="flex-shrink-0">
                    <SkyToggle />
                </div>
            </div>
        </div>
    );
}

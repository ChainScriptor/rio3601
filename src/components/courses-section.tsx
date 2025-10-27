import { CodeBlock } from "./pixel-art";
import { CheckCircle, ExternalLink } from "lucide-react";

export function CoursesSection() {
    const completedCourses = [
        {
            title: "Complete Solidity Course: Zero to Expert",
            platform: "Udemy",
            instructor: "Patrick Collins",
            description: "Master Solidity programming and smart contract development",
            completionDate: "2024",
            certificate: true,
            url: "https://www.udemy.com/course/complete-solidity-course-zero-to-expert/"
        },
        {
            title: "Web3 Development Bootcamp",
            platform: "Udemy",
            instructor: "Stephen Grider",
            description: "Build decentralized applications with Ethereum and Web3",
            completionDate: "2024",
            certificate: true,
            url: "https://www.udemy.com/course/web3-development-bootcamp/"
        },
        {
            title: "React - The Complete Guide",
            platform: "Udemy",
            instructor: "Maximilian Schwarzmüller",
            description: "Master React.js for building modern web applications",
            completionDate: "2023",
            certificate: true,
            url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"
        },
        {
            title: "Next.js & React - The Complete Guide",
            platform: "Udemy",
            instructor: "Maximilian Schwarzmüller",
            description: "Build full-stack React applications with Next.js",
            completionDate: "2023",
            certificate: true,
            url: "https://www.udemy.com/course/nextjs-react-the-complete-guide/"
        },
        {
            title: "JavaScript: The Complete Developer's Guide",
            platform: "Udemy",
            instructor: "Stephen Grider",
            description: "Master JavaScript from fundamentals to advanced concepts",
            completionDate: "2023",
            certificate: true,
            url: "https://www.udemy.com/course/javascript-the-complete-developers-guide/"
        }
    ];

    return (
        <section
            id="courses"
            className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-pixel-grid bg-[length:16px_16px]"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto">
                    <h2 className="section-title text-primary mb-6 sm:mb-8 md:mb-12 text-2xl sm:text-3xl md:text-4xl">Completed Courses</h2>

                    <div className="grid gap-4 sm:gap-6 md:gap-8">
                        {completedCourses.map((course, index) => (
                            <a
                                key={index}
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-secondary/50 border border-border pixel-corners p-4 sm:p-6 hover:bg-secondary/70 transition-colors cursor-pointer"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-base sm:text-lg md:text-xl font-pixel text-foreground mb-2">
                                            {course.title}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                                            <span className="flex items-center gap-1">
                                                <span className="font-mono">{course.platform}</span>
                                            </span>
                                            <span className="font-mono hidden sm:inline">by {course.instructor}</span>
                                            <span className="font-mono sm:hidden">by {course.instructor}</span>
                                            <span className="font-mono">{course.completionDate}</span>
                                        </div>
                                        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end sm:justify-start gap-2 sm:ml-4 flex-shrink-0">
                                        {course.certificate && (
                                            <div className="flex items-center gap-1 text-green-500">
                                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span className="text-[10px] sm:text-xs font-mono hidden sm:inline">Certificate</span>
                                                <span className="text-[10px] font-mono sm:hidden">Cert</span>
                                            </div>
                                        )}
                                        <a
                                            href={course.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                            aria-label={`View ${course.title} on ${course.platform}`}
                                        >
                                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </a>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 sm:mt-12 text-center">
                        <p className="text-muted-foreground font-mono text-xs sm:text-sm px-4 sm:px-0">
                            Continuously learning and expanding my skills in blockchain and web development
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="hidden md:block absolute top-1/4 right-10 opacity-80">
                <CodeBlock className="rotate-6 animate-float" />
            </div>
            <div className="hidden md:block absolute bottom-1/4 left-10 opacity-80">
                <CodeBlock className="w-8 h-8 animate-float" />
            </div>
        </section>
    );
}


import { ExternalLink, Github, ArrowRight, Calendar, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Project = {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  date: string;
};

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "NFT Marketplace",
      description: "A decentralized NFT marketplace built on Ethereum, allowing users to mint, buy, and sell digital assets with smart contracts.",
      longDescription: "A comprehensive NFT marketplace platform featuring gas-optimized smart contracts, IPFS integration for decentralized storage, and a modern React frontend with Web3 connectivity. Includes features like batch minting, royalty management, and advanced filtering.",
      tags: ["Solidity", "React", "Web3.js", "IPFS", "Ethereum", "TypeScript"],
      image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=600&h=400&fit=crop&crop=center",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      status: "completed",
      date: "2024"
    },
    {
      title: "DeFi Lending Protocol",
      description: "A decentralized lending platform with automated interest rates based on supply and demand, allowing users to earn interest on deposits.",
      longDescription: "A sophisticated DeFi lending protocol implementing automated market makers (AMM) for interest rate calculation. Features include flash loans, collateral management, and governance token integration for decentralized decision making.",
      tags: ["Solidity", "TypeScript", "React", "Hardhat", "Ethers.js", "DeFi"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&crop=center",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      status: "completed",
      date: "2024"
    },
    {
      title: "Blockchain Explorer",
      description: "A block explorer tool for analyzing cryptocurrency transactions, smart contracts, and blockchain data with real-time updates.",
      longDescription: "A comprehensive blockchain explorer with real-time transaction monitoring, smart contract interaction capabilities, and advanced analytics. Features include address tracking, token analysis, and gas price optimization suggestions.",
      tags: ["React", "Node.js", "Express", "Web3.js", "MongoDB", "Redis"],
      image: "https://images.unsplash.com/photo-1639322537228-f712e0acbf43?w=600&h=400&fit=crop&crop=center",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      status: "in-progress",
      date: "2024"
    },
    {
      title: "Smart Contract Audit Tool",
      description: "An automated security analysis tool for Ethereum smart contracts that identifies common vulnerabilities and suggests fixes.",
      longDescription: "An advanced static analysis tool for smart contract security auditing. Implements pattern recognition for common vulnerabilities, provides detailed reports with remediation suggestions, and integrates with popular development environments.",
      tags: ["Python", "Solidity", "TypeScript", "Security", "GraphQL", "AI"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop&crop=center",
      githubUrl: "https://github.com",
      featured: true,
      status: "planned",
      date: "2025"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-600 border-green-500/30";
      case "in-progress": return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "planned": return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "planned": return "Planned";
      default: return "Unknown";
    }
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pixel-grid bg-[length:20px_20px] opacity-5"></div>

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-pixel text-foreground mb-3 sm:mb-4 px-4 sm:px-0">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Explore my portfolio of blockchain and web development projects, showcasing innovative solutions and cutting-edge technology implementations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group"
            >
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(project.status)} backdrop-blur-sm`}
                    >
                      {getStatusText(project.status)}
                    </Badge>
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="backdrop-blur-sm"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          variant="default"
                          className="backdrop-blur-sm"
                          onClick={() => window.open(project.demoUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="text-lg sm:text-xl font-pixel text-foreground group-hover:text-primary transition-colors flex-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] sm:text-xs font-mono bg-muted/50 hover:bg-muted transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
                    <div className="flex gap-2 sm:gap-3">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="group/btn text-xs sm:text-sm flex-1 sm:flex-none"
                        >
                          <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover/btn:rotate-12 transition-transform" />
                          <span className="hidden sm:inline">View Code</span>
                          <span className="sm:hidden">Code</span>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => window.open(project.demoUrl, '_blank')}
                          className="group/btn text-xs sm:text-sm flex-1 sm:flex-none"
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover/btn:translate-x-1 transition-transform" />
                          <span>Live Demo</span>
                        </Button>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="group/arrow text-xs sm:text-sm"
                    >
                      <span className="mr-1 sm:mr-2 hidden sm:inline">Learn More</span>
                      <span className="mr-1 sm:mr-0 sm:hidden">More</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/arrow:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border mx-4 sm:mx-0">
            <Code2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl font-pixel text-foreground mb-2">
              Interested in collaborating?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
              I'm always excited to work on innovative blockchain projects and cutting-edge web applications.
            </p>
            <Button size="lg" className="group text-sm sm:text-base">
              <span>Get In Touch</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

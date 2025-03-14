
import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
};

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "NFT Marketplace",
      description: "A decentralized NFT marketplace built on Ethereum, allowing users to mint, buy, and sell digital assets with smart contracts.",
      tags: ["Solidity", "React", "Web3.js", "IPFS", "Ethereum"],
      image: "https://placehold.co/600x400/3b82f6/ffffff?text=NFT+Marketplace&font=Roboto",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "DeFi Lending Protocol",
      description: "A decentralized lending platform with automated interest rates based on supply and demand, allowing users to earn interest on deposits.",
      tags: ["Solidity", "TypeScript", "React", "Hardhat", "Ethers.js"],
      image: "https://placehold.co/600x400/8b5cf6/ffffff?text=DeFi+Protocol&font=Roboto",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Blockchain Explorer",
      description: "A block explorer tool for analyzing cryptocurrency transactions, smart contracts, and blockchain data with real-time updates.",
      tags: ["React", "Node.js", "Express", "Web3.js", "MongoDB"],
      image: "https://placehold.co/600x400/10b981/ffffff?text=Blockchain+Explorer&font=Roboto",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Smart Contract Audit Tool",
      description: "An automated security analysis tool for Ethereum smart contracts that identifies common vulnerabilities and suggests fixes.",
      tags: ["Python", "Solidity", "TypeScript", "Security", "GraphQL"],
      image: "https://placehold.co/600x400/ef4444/ffffff?text=Audit+Tool&font=Roboto", 
      githubUrl: "https://github.com",
    },
  ];

  return (
    <section 
      id="projects" 
      className="py-20 relative overflow-hidden"
    >
      <div className="container px-4 mx-auto">
        <h2 className="section-title text-center mb-16 relative">
          <span className="relative z-10">Featured Projects</span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="pixel-card group hover:shadow-pixel-lg transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden mb-4 border-2 border-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <h3 className="font-pixel text-base mb-2">{project.title}</h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[10px] px-2 py-1 bg-secondary font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-auto pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </a>
                )}
                
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import { 
  Database, 
  Code2, 
  LineChart, 
  ShieldCheck, 
  Layers, 
  GitBranch,
  Server,
  Globe
} from "lucide-react";

type Skill = {
  name: string;
  level: number;
  icon: React.ReactNode;
};

export function SkillsSection() {
  const technicalSkills: Skill[] = [
    {
      name: "Solidity",
      level: 90,
      icon: <Code2 className="h-4 w-4 text-pixel-blue" />,
    },
    {
      name: "Smart Contract Security",
      level: 85,
      icon: <ShieldCheck className="h-4 w-4 text-pixel-green" />,
    },
    {
      name: "Web3.js / Ethers.js",
      level: 92,
      icon: <Globe className="h-4 w-4 text-pixel-pink" />,
    },
    {
      name: "React.js",
      level: 95,
      icon: <Code2 className="h-4 w-4 text-pixel-blue" />,
    },
    {
      name: "Node.js",
      level: 88,
      icon: <Server className="h-4 w-4 text-pixel-green" />,
    },
    {
      name: "Blockchain Architecture",
      level: 80,
      icon: <Layers className="h-4 w-4 text-pixel-purple" />,
    },
    {
      name: "TypeScript",
      level: 93,
      icon: <Code2 className="h-4 w-4 text-pixel-blue" />,
    },
    {
      name: "DeFi Protocols",
      level: 75,
      icon: <Database className="h-4 w-4 text-pixel-orange" />,
    },
    {
      name: "Git / Version Control",
      level: 90,
      icon: <GitBranch className="h-4 w-4 text-pixel-red" />,
    },
    {
      name: "Data Analysis",
      level: 70,
      icon: <LineChart className="h-4 w-4 text-pixel-yellow" />,
    },
  ];

  const techStack = [
    "Ethereum", "Solidity", "Hardhat", "Truffle", "IPFS", 
    "React", "Next.js", "Node.js", "Express", "TypeScript",
    "MongoDB", "PostgreSQL", "AWS", "Docker", "Git",
    "Web3.js", "Ethers.js", "Metamask", "Ganache", "Infura"
  ];

  return (
    <section 
      id="skills" 
      className="py-20 bg-secondary/50 relative overflow-hidden"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-16 relative">
            <span className="relative z-10">Technical Skills</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {technicalSkills.map((skill) => (
              <div key={skill.name} className="relative">
                <div className="flex items-center mb-2">
                  <div className="mr-2 flex-shrink-0">{skill.icon}</div>
                  <h3 className="font-pixel text-xs">{skill.name}</h3>
                </div>
                <div className="pixel-progress">
                  <div
                    className="pixel-progress-bar"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-pixel text-sm mb-6 text-center">Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

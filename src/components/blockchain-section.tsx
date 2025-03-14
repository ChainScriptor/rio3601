import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, Layers, Code, Database, Server, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { PixelIcon, CodeBlock } from "./pixel-art";
import { BlockchainQuiz } from "./blockchain-quiz";

export function BlockchainSection() {
  const blockchains = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      description: "The first and most widely used blockchain.",
      icon: <Bitcoin className="w-8 h-8 text-orange-500" />,
      features: [
        "Decentralized digital currency",
        "Proof of Work consensus",
        "Limited supply of 21 million coins",
        "High network security"
      ],
      useCase: "Primarily used as digital gold and a store of value.",
      color: "from-orange-400 to-yellow-500",
      score: 85
    },
    {
      id: "ethereum",
      name: "Ethereum",
      description: "The first smart contract platform.",
      icon: <Code className="w-8 h-8 text-purple-500" />,
      features: [
        "Smart contracts",
        "Decentralized applications (dApps)",
        "EVM (Ethereum Virtual Machine)",
        "Transition from Proof of Work to Proof of Stake"
      ],
      useCase: "Supports DeFi, NFTs, DAOs and other decentralized applications.",
      color: "from-purple-400 to-indigo-500",
      score: 92
    },
    {
      id: "solana",
      name: "Solana",
      description: "Blockchain with high speed and low transaction fees.",
      icon: <Layers className="w-8 h-8 text-green-500" />,
      features: [
        "Proof of History + Proof of Stake",
        "High performance (~65,000 transactions/second)",
        "Low transaction fees",
        "Developer-friendly"
      ],
      useCase: "Ideal for applications requiring high performance such as DeFi and gaming.",
      color: "from-green-400 to-teal-500",
      score: 88
    },
    {
      id: "cardano",
      name: "Cardano",
      description: "Blockchain based on academic research.",
      icon: <Server className="w-8 h-8 text-blue-500" />,
      features: [
        "Ouroboros Proof of Stake",
        "Scientific approach to development",
        "Multi-layer architecture",
        "Sustainability and scalability"
      ],
      useCase: "Applications in education, agriculture, healthcare, and identity.",
      color: "from-blue-400 to-cyan-500",
      score: 80
    },
    {
      id: "polkadot",
      name: "Polkadot",
      description: "Multi-chain network that enables interoperability.",
      icon: <Database className="w-8 h-8 text-pink-500" />,
      features: [
        "Parachains",
        "Cross-network interoperability",
        "Nominated Proof of Stake",
        "Shared security across all chains"
      ],
      useCase: "Connecting different blockchains and creating specialized chains.",
      color: "from-pink-400 to-rose-500",
      score: 83
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        duration: 0.6 
      }
    }
  };

  // Removed the inline style object causing the TypeScript error
  const pixelBorderStyle = {
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.2)",
    border: "2px solid currentColor",
  };

  return (
    <section id="blockchain" className="py-20 bg-pixel-darkBlue bg-pixel-grid bg-[length:20px_20px] relative overflow-hidden">
      <div className="absolute inset-0 crt-overlay pointer-events-none"></div>
      
      {/* Pixel art background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none pixel-img-rendering">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
          alt="Pixel grid background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 opacity-80">
        <CodeBlock className="rotate-6 animate-float" />
      </div>
      <div className="absolute bottom-1/4 left-10 opacity-80">
        <PixelIcon color="bg-pixel-purple" className="w-12 h-12 animate-float" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title text-pixel-green mb-4 inline-block pixel-corners bg-pixel-darkPurple px-4 py-2">Blockchain Layer 1</h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-3xl text-pixel-blue"
        >
          Layer 1 blockchains are the base networks that provide infrastructure for decentralized applications.
          Each has its own characteristics, advantages, and limitations.
        </motion.p>

        <div className="mt-10">
          <Tabs defaultValue="blockchain-intro" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-8 w-full pixel-corners overflow-hidden pixel-img-rendering" style={pixelBorderStyle}>
              <TabsTrigger value="blockchain-intro" className="font-pixel text-xs">Introduction</TabsTrigger>
              <TabsTrigger value="blockchain-quiz" className="font-pixel text-xs flex items-center gap-1">
                <Brain className="w-3 h-3" /> Quiz
              </TabsTrigger>
              {blockchains.map(blockchain => (
                <TabsTrigger key={blockchain.id} value={blockchain.id} className="font-pixel text-xs">
                  {blockchain.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="blockchain-intro" className="mt-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur pixel-corners pixel-img-rendering" style={pixelBorderStyle}>
                  <CardHeader>
                    <CardTitle className="font-pixel text-xl">What is Blockchain?</CardTitle>
                    <CardDescription>The core technology behind cryptocurrencies and other decentralized applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.p variants={itemVariants}>
                      <strong>Blockchain</strong> is a decentralized, distributed, and public database that records 
                      transactions across many computers so that any involved record cannot be altered retroactively. 
                      This technology allows secure transactions without the need for a central authority.
                    </motion.p>
                    
                    <motion.div variants={itemVariants} className="grid gap-4 mt-6">
                      <h3 className="text-lg font-semibold">Key features of Blockchain:</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <motion.li variants={itemVariants}><strong>Decentralization:</strong> Operates without a central authority</motion.li>
                        <motion.li variants={itemVariants}><strong>Transparency:</strong> All transactions are publicly recorded</motion.li>
                        <motion.li variants={itemVariants}><strong>Immutability:</strong> Once a transaction is recorded, it cannot be changed</motion.li>
                        <motion.li variants={itemVariants}><strong>Security:</strong> Uses cryptography to protect data</motion.li>
                        <motion.li variants={itemVariants}><strong>Consensus:</strong> Requires network agreement to validate transactions</motion.li>
                      </ul>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="grid gap-4 mt-6">
                      <h3 className="text-lg font-semibold">What are Layer 1 Blockchains?</h3>
                      <motion.p variants={itemVariants}>
                        <strong>Layer 1 Blockchains</strong> are the base networks that operate on their own independent 
                        blockchain. These networks have their own consensus mechanisms, tokenomics, and features. 
                        Examples include Bitcoin, Ethereum, Cardano, Solana, and Polkadot.
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        Each Layer 1 attempts to solve the "blockchain trilemma", the trade-off between 
                        decentralization, security, and scalability, with different approaches and technologies.
                      </motion.p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="blockchain-quiz">
              <BlockchainQuiz />
            </TabsContent>

            {blockchains.map(blockchain => (
              <TabsContent key={blockchain.id} value={blockchain.id} className="mt-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur overflow-hidden pixel-corners pixel-img-rendering" style={pixelBorderStyle}>
                    <div className={`h-2 bg-gradient-to-r ${blockchain.color} w-full`}></div>
                    <CardHeader className="flex md:flex-row items-start justify-between">
                      <div>
                        <CardTitle className="font-pixel text-xl">{blockchain.name}</CardTitle>
                        <CardDescription>{blockchain.description}</CardDescription>
                      </div>
                      <motion.div 
                        variants={iconVariants}
                        className="mt-2 md:mt-0 bg-gradient-to-br p-3 rounded-full shadow-lg backdrop-blur-sm border border-muted pixel-corners pixel-img-rendering"
                        style={pixelBorderStyle}
                      >
                        {blockchain.icon}
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={itemVariants} className="grid gap-4 mt-2">
                        <h3 className="text-lg font-semibold">Key features:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {blockchain.features.map((feature, index) => (
                            <motion.li 
                              key={index} 
                              variants={itemVariants}
                              custom={index}
                            >
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="grid gap-4 mt-4">
                        <h3 className="text-lg font-semibold">Use cases:</h3>
                        <p>{blockchain.useCase}</p>
                      </motion.div>
                      
                      {/* Gamification element - blockchain power meter */}
                      <motion.div 
                        variants={itemVariants} 
                        className="mt-6 bg-pixel-darkBlue p-4 pixel-corners pixel-img-rendering"
                        style={pixelBorderStyle}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-pixel text-sm">Network Power</h4>
                          <span className="font-pixel text-xs text-pixel-green">{blockchain.score}/100</span>
                        </div>
                        <div className="pixel-progress">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${blockchain.score}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="pixel-progress-bar"
                          ></motion.div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs">Achievement unlocked: {blockchain.name} Explorer</span>
                          <span className="text-xs font-pixel text-pixel-yellow">+{blockchain.score} XP</span>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

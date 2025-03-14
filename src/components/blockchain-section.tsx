
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, Layers, Code, Database, Server, Box } from "lucide-react";
import { motion } from "framer-motion";

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
      color: "from-orange-400 to-yellow-500"
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
      color: "from-purple-400 to-indigo-500"
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
      color: "from-green-400 to-teal-500"
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
      color: "from-blue-400 to-cyan-500"
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
      color: "from-pink-400 to-rose-500"
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

  return (
    <section id="blockchain" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Blockchain Layer 1</h2>
        <p className="mb-8 max-w-3xl">
          Layer 1 blockchains are the base networks that provide infrastructure for decentralized applications.
          Each has its own characteristics, advantages, and limitations.
        </p>

        <div className="mt-10">
          <Tabs defaultValue="blockchain-intro" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8 w-full">
              <TabsTrigger value="blockchain-intro" className="font-pixel text-xs">Introduction</TabsTrigger>
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
                <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
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

            {blockchains.map(blockchain => (
              <TabsContent key={blockchain.id} value={blockchain.id} className="mt-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${blockchain.color} w-full`}></div>
                    <CardHeader className="flex md:flex-row items-start justify-between">
                      <div>
                        <CardTitle className="font-pixel text-xl">{blockchain.name}</CardTitle>
                        <CardDescription>{blockchain.description}</CardDescription>
                      </div>
                      <motion.div 
                        variants={iconVariants}
                        className="mt-2 md:mt-0 bg-gradient-to-br p-3 rounded-full shadow-lg backdrop-blur-sm border border-muted"
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

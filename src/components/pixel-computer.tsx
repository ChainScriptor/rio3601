
import React, { useState } from "react";
import { AppWindow, Search, X, Maximize2, Minimize2, LayoutDashboard, Folder, FolderOpen, HelpCircle, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  width?: string;
  height?: string;
  defaultFocus?: boolean;
  minimized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const PixelWindow = ({
  title,
  children,
  onClose,
  className,
  width = "w-full",
  height = "h-full",
  defaultFocus = false,
  minimized = false,
  onMinimize,
  onMaximize
}: WindowProps) => {
  return (
    <div className={cn(
      "pixel-corners bg-accent/90 backdrop-blur-sm flex flex-col overflow-hidden border-2 border-border shadow-pixel",
      width,
      height,
      minimized ? "hidden" : "",
      className
    )}>
      <div className="flex items-center justify-between bg-primary px-2 py-1 text-primary-foreground">
        <div className="flex items-center gap-1">
          <AppWindow className="h-4 w-4" />
          <span className="text-xs font-pixel">{title}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={onMinimize} className="rounded p-0.5 hover:bg-primary-foreground/20">
            <Minimize2 className="h-3 w-3" />
          </button>
          <button onClick={onMaximize} className="rounded p-0.5 hover:bg-primary-foreground/20">
            <Maximize2 className="h-3 w-3" />
          </button>
          <button onClick={onClose} className="rounded p-0.5 hover:bg-destructive">
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

const BlockchainExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<string | null>("blockchains");
  const [openWindows, setOpenWindows] = useState<{ id: string, title: string, content: string }[]>([]);
  const [windowPositions, setWindowPositions] = useState<{ [key: string]: number }>({});
  const isMobile = useIsMobile();

  const blockchains = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      description: "The first and most widely used blockchain.",
      features: [
        "Decentralized digital currency",
        "Proof of Work consensus",
        "Limited supply of 21 million coins",
        "High network security"
      ],
      useCase: "Primarily used as digital gold and a store of value."
    },
    {
      id: "ethereum",
      name: "Ethereum",
      description: "The first smart contract platform.",
      features: [
        "Smart contracts",
        "Decentralized applications (dApps)",
        "EVM (Ethereum Virtual Machine)",
        "Transition from Proof of Work to Proof of Stake"
      ],
      useCase: "Supports DeFi, NFTs, DAOs and other decentralized applications."
    },
    {
      id: "solana",
      name: "Solana",
      description: "Blockchain with high speed and low transaction fees.",
      features: [
        "Proof of History + Proof of Stake",
        "High performance (~65,000 transactions/second)",
        "Low transaction fees",
        "Developer-friendly"
      ],
      useCase: "Ideal for applications requiring high performance such as DeFi and gaming."
    },
    {
      id: "cardano",
      name: "Cardano",
      description: "Blockchain based on academic research.",
      features: [
        "Ouroboros Proof of Stake",
        "Scientific approach to development",
        "Multi-layer architecture",
        "Sustainability and scalability"
      ],
      useCase: "Applications in education, agriculture, healthcare, and identity."
    },
    {
      id: "polkadot",
      name: "Polkadot",
      description: "Multi-chain network that enables interoperability.",
      features: [
        "Parachains",
        "Cross-network interoperability",
        "Nominated Proof of Stake",
        "Shared security across all chains"
      ],
      useCase: "Connecting different blockchains and creating specialized chains."
    }
  ];

  const handleOpenBlockchain = (id: string) => {
    const blockchain = blockchains.find(b => b.id === id);
    if (!blockchain) return;

    const newWindow = {
      id: `blockchain-${id}-${Date.now()}`,
      title: `${blockchain.name} Explorer`,
      content: id
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setWindowPositions(prev => ({ ...prev, [newWindow.id]: prev[newWindow.id] || 0 }));
  };

  const handleClose = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const renderBlockchainContent = (id: string) => {
    const blockchain = blockchains.find(b => b.id === id);
    if (!blockchain) return null;

    return (
      <div className="p-4 font-mono text-sm space-y-4 bg-white text-black h-full">
        <div className="mb-4">
          <h3 className="font-pixel text-lg text-primary mb-2">{blockchain.name}</h3>
          <p className="mb-2 text-xs">{blockchain.description}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-pixel text-xs text-accent mb-2">KEY FEATURES:</h4>
          <ul className="list-disc pl-5 text-xs space-y-1">
            {blockchain.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-pixel text-xs text-accent mb-2">USE CASES:</h4>
          <p className="text-xs">{blockchain.useCase}</p>
        </div>

        <div className="mt-6 bg-secondary/50 p-3 pixel-corners">
          <div className="flex justify-between items-center">
            <span className="font-pixel text-[10px]">ACHIEVEMENT UNLOCKED</span>
            <span className="text-yellow-500 font-pixel text-[10px]">+50 XP</span>
          </div>
          <div className="text-[10px] mt-1">You've discovered {blockchain.name}!</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-primary text-primary-foreground p-1 flex items-center">
        <div className="flex items-center gap-1 mr-4">
          <AppWindow className="h-4 w-4" />
          <span className="text-xs font-pixel">BlockchainOS v1.0</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs font-pixel px-2 hover:bg-primary-foreground/20 rounded">File</button>
          <button className="text-xs font-pixel px-2 hover:bg-primary-foreground/20 rounded">Edit</button>
          <button className="text-xs font-pixel px-2 hover:bg-primary-foreground/20 rounded">View</button>
          <button className="text-xs font-pixel px-2 hover:bg-primary-foreground/20 rounded">Help</button>
        </div>
      </div>

      <div className="flex-1 flex">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={isMobile ? 30 : 20}
            minSize={isMobile ? 30 : 15}
            className="bg-card/80 min-w-[120px]"
          >
            <div className="p-2">
              <h3 className="font-pixel text-xs mb-2">Explore</h3>
              <div className="space-y-1">
                <div
                  onClick={() => setActiveFolder("blockchains")}
                  className={cn(
                    "flex items-center gap-1 p-1 text-xs cursor-pointer hover:bg-accent/30 rounded",
                    activeFolder === "blockchains" ? "bg-accent/50" : ""
                  )}
                >
                  {activeFolder === "blockchains" ? (
                    <FolderOpen className="h-3 w-3 text-primary" />
                  ) : (
                    <Folder className="h-3 w-3" />
                  )}
                  <span>Blockchains</span>
                </div>

                {activeFolder === "blockchains" && (
                  <div className="pl-4 space-y-1">
                    {blockchains.map(blockchain => (
                      <div
                        key={blockchain.id}
                        onClick={() => handleOpenBlockchain(blockchain.id)}
                        className="flex items-center gap-1 p-1 text-xs cursor-pointer hover:bg-accent/30 rounded"
                      >
                        <File className="h-3 w-3 text-foreground/70" />
                        <span>{blockchain.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 p-1 text-xs cursor-pointer hover:bg-accent/30 rounded">
                  <Folder className="h-3 w-3" />
                  <span>Crypto</span>
                </div>
                <div className="flex items-center gap-1 p-1 text-xs cursor-pointer hover:bg-accent/30 rounded">
                  <Folder className="h-3 w-3" />
                  <span>NFTs</span>
                </div>
                <div className="flex items-center gap-1 p-1 text-xs cursor-pointer hover:bg-accent/30 rounded">
                  <HelpCircle className="h-3 w-3" />
                  <span>Help</span>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={isMobile ? 70 : 80}>
            <div className="relative h-full bg-background/90 p-2">
              <div className="absolute top-2 left-2 right-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search blockchains..."
                      className="pl-7 py-1 h-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 relative h-[calc(100%-3rem)]">
                {/* Desktop area */}
                <div className={cn(
                  "grid gap-3 p-2",
                  isMobile ? "grid-cols-2" : "grid-cols-4"
                )}>
                  {blockchains
                    .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(blockchain => (
                      <div
                        key={blockchain.id}
                        onClick={() => handleOpenBlockchain(blockchain.id)}
                        className="flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-accent/20 rounded text-center"
                      >
                        <File className="h-10 w-10 mb-1 text-primary" />
                        <span className="text-xs font-pixel">{blockchain.name}</span>
                      </div>
                    ))}
                </div>

                {/* Windows layer */}
                {openWindows.map((window, index) => (
                  <PixelWindow
                    key={window.id}
                    title={window.title}
                    className="absolute inset-0 m-2"
                    onClose={() => handleClose(window.id)}
                  >
                    <ScrollArea className="h-full max-h-[calc(100vh-6rem)]">
                      {renderBlockchainContent(window.content)}
                    </ScrollArea>
                  </PixelWindow>
                ))}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="bg-primary text-primary-foreground p-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="bg-primary-foreground/20 rounded p-1">
            <AppWindow className="h-4 w-4" />
          </button>
        </div>
        <div className="text-xs font-pixel">
          BlockchainOS © 2024
        </div>
      </div>
    </div>
  );
};

export function PixelComputer() {
  const isMobile = useIsMobile();

  return (
    <div className="relative py-8 sm:py-12 md:py-16 lg:py-24 min-h-[600px] sm:min-h-[700px] md:min-h-[80vh] w-full bg-pixel-darkBlue bg-pixel-grid bg-[length:20px_20px] overflow-hidden">
      <div className="absolute inset-0 crt-overlay pointer-events-none"></div>

      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: 'url("/lovable-uploads/47970209-706b-487e-8627-d769dc745c6d.png")' }}>
      </div>

      {/* Computer frame */}
      <div className="relative z-10 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto h-[600px] sm:h-[700px] md:h-[80vh] lg:h-[90vh] flex flex-col">
        <div className="w-full h-2 sm:h-3 md:h-4 bg-foreground/90 rounded-t-lg"></div>

        {/* Monitor bezel */}
        <div className="flex-1 bg-foreground/90 flex p-1 sm:p-2 md:p-3 lg:p-4">
          {/* Screen area */}
          <div className="w-full h-full bg-background pixel-corners overflow-hidden shadow-inner border-2 sm:border-4 border-black/20 crt-overlay">
            <BlockchainExplorer />
          </div>
        </div>

        {/* Computer base */}
        <div className="h-2 sm:h-4 md:h-6 lg:h-8 bg-foreground/90 rounded-b-lg flex items-center justify-center">
          <div className="h-0.5 sm:h-1 md:h-2 w-8 sm:w-12 md:w-16 lg:w-24 bg-primary/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

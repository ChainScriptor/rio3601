
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Search, Filter, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const airdropData = [
  {
    id: 1,
    name: "Arbitrum",
    logo: "/placeholder.svg",
    description: "Layer 2 scaling solution for Ethereum.",
    rating: "High",
    link: "https://arbitrum.io",
  },
  {
    id: 2,
    name: "Optimism",
    logo: "/placeholder.svg",
    description: "EVM compatible optimistic rollup.",
    rating: "Medium",
    link: "https://optimism.io",
  },
  {
    id: 3,
    name: "zkSync",
    logo: "/placeholder.svg",
    description: "Zero-knowledge scaling technology for Ethereum.",
    rating: "High",
    link: "https://zksync.io",
  },
  {
    id: 4,
    name: "StarkNet",
    logo: "/placeholder.svg",
    description: "Permissionless validity-rollup using STARK technology.",
    rating: "Medium",
    link: "https://starknet.io",
  },
  {
    id: 5,
    name: "Scroll",
    logo: "/placeholder.svg",
    description: "Zkp rollup native to Ethereum.",
    rating: "Low",
    link: "https://scroll.io",
  },
  {
    id: 6,
    name: "LayerZero",
    logo: "/placeholder.svg",
    description: "Omnichain interoperability protocol.",
    rating: "Medium",
    link: "https://layerzero.network",
  },
];

const filterOptions = ["All", "High", "Medium", "Low"];

export default function Airdrops() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filteredAirdrops = airdropData.filter((airdrop) => {
    const matchesSearch = airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          airdrop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || airdrop.rating === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section with AI-themed gradient */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background 
                          dark:from-primary/20 dark:via-accent/20 dark:to-background/80"></div>
          
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-pixel-grid bg-[length:24px_24px] opacity-20"></div>
            <div className="crt-overlay"></div>
          </div>
          
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-pixel text-3xl md:text-4xl mb-4 text-foreground animate-glitch-1">
                BLOCKCHAIN <span className="text-primary">AIRDROPS</span>
              </h1>
              <p className="font-mono text-muted-foreground mb-8">
                Discover upcoming and active airdrops in the blockchain ecosystem.
                Stay updated with the latest opportunities.
              </p>
              
              {/* Search and Filters */}
              <div className="max-w-xl mx-auto">
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search airdrops..."
                    className="pixel-input pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                  <div className="mr-2 font-pixel text-xs flex items-center">
                    <Filter className="h-3 w-3 mr-1" />
                    <span>Filter:</span>
                  </div>
                  
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setActiveFilter(option)}
                      className={cn(
                        "tech-badge transition-all duration-200 text-xs",
                        activeFilter === option 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-secondary"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Airdrops Grid */}
        <div className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAirdrops.map((airdrop) => (
              <div 
                key={airdrop.id}
                className="pixel-card transition-all duration-300 hover:shadow-pixel-lg hover:-translate-y-1 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-sm shadow-pixel overflow-hidden">
                    <img src={airdrop.logo} alt={airdrop.name} className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-pixel text-sm">{airdrop.name}</h3>
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 text-xs font-pixel",
                        airdrop.rating === "High" ? "bg-primary/20 text-primary" :
                        airdrop.rating === "Medium" ? "bg-accent/20 text-accent" :
                        "bg-muted text-muted-foreground"
                      )}>
                        <Zap className="w-3 h-3 mr-1" />
                        {airdrop.rating}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-4">{airdrop.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs font-pixel"
                      >
                        Details
                      </Button>
                      
                      <a 
                        href={airdrop.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

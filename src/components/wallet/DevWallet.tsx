
import React, { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown, LogOut, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const DevWallet = () => {
  const { isConnected, account, balance, connectWallet, disconnectWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectWallet();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast.success("Address copied to clipboard");
    }
  };
  
  // Format the address for display (0x1234...5678)
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect} 
        disabled={isLoading}
        className="font-pixel bg-pixel-green hover:bg-pixel-green/80 text-background flex items-center gap-2 pixel-corners"
        size="sm"
      >
        {isLoading ? (
          <>
            <span className="animate-pulse">Connecting</span>
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            <span>Connect DEV</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="font-pixel bg-pixel-darkPurple text-pixel-green hover:bg-pixel-darkPurple/80 flex items-center gap-2 pixel-corners"
          size="sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pixel-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pixel-green"></span>
          </span>
          <span>{formatAddress(account || "")}</span>
          <span className={cn(
            "px-1.5 py-0.5 text-xs rounded-sm",
            "bg-pixel-darkBlue text-pixel-green"
          )}>
            {balance} ETH
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-pixel bg-pixel-darkPurple border-pixel-green text-pixel-green pixel-corners">
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-pixel-green/30">
          <span className="text-sm font-medium">DEV Wallet</span>
          <span className="text-xs opacity-70">v0.1.0</span>
        </div>
        <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer hover:bg-pixel-green/20">
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer text-destructive hover:bg-destructive/20">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

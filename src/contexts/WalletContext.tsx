
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface WalletContextType {
  isConnected: boolean;
  account: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const defaultContext: WalletContextType = {
  isConnected: false,
  account: null,
  balance: "0",
  connectWallet: async () => {},
  disconnectWallet: () => {},
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    // Check if previously connected and reconnect
    const savedAccount = localStorage.getItem("devWalletAccount");
    if (savedAccount) {
      setAccount(savedAccount);
      setIsConnected(true);
      const savedBalance = localStorage.getItem("devWalletBalance") || "0";
      setBalance(savedBalance);
    }
  }, []);

  // Mock wallet connection function
  const connectWallet = async () => {
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random Ethereum-like address
      const randomAddress = `0x${Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      // Generate random balance (between 0.1 and 10 ETH)
      const randomBalance = (Math.random() * 9.9 + 0.1).toFixed(4);
      
      // Save to local storage for persistence
      localStorage.setItem("devWalletAccount", randomAddress);
      localStorage.setItem("devWalletBalance", randomBalance);
      
      setAccount(randomAddress);
      setBalance(randomBalance);
      setIsConnected(true);
      
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem("devWalletAccount");
    localStorage.removeItem("devWalletBalance");
    setAccount(null);
    setBalance("0");
    setIsConnected(false);
    toast.success("Wallet disconnected");
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        account,
        balance,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

'use client';
import { useState, useEffect } from 'react';

export const ConnectButton = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAddress(accounts[0]);
        localStorage.setItem('user_wallet', accounts[0]);
      } catch (err) {
        console.error("User rejected", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <button 
      onClick={connectWallet}
      className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all text-xs uppercase tracking-widest"
    >
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
    </button>
  );
};
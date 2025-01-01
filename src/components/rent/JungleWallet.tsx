import { useState } from 'react';
import { Coins, Leaf, TreePalm } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Transaction {
  type: string;
  amount: number;
  timestamp: string;
}

interface JungleWalletProps {
  balance: number;
  transactions: Transaction[];
}

const JungleWallet = ({ balance, transactions }: JungleWalletProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors group">
          <div className="relative">
            <Coins className="h-5 w-5 text-primary animate-float-slow" />
            <Leaf className="h-3 w-3 text-primary/70 absolute -top-1 -right-1 animate-leaf-float" />
          </div>
          <span className="text-primary font-medium group-hover:scale-105 transition-transform">
            {balance} JC
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TreePalm className="h-5 w-5 text-primary animate-pulse-gentle" />
              <h3 className="text-lg font-semibold text-white">Jungle Wallet</h3>
            </div>
            <span className="text-primary font-bold animate-pulse-gentle">
              {balance} JungleCoins
            </span>
          </div>
          <ScrollArea className="h-[200px] rounded-md">
            <div className="space-y-2">
              {transactions.map((t, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors animate-fade-in"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div>
                    <p className="text-sm text-white">{t.type}</p>
                    <p className="text-xs text-white/60">{new Date(t.timestamp).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-medium ${t.amount >= 0 ? 'text-success' : 'text-error'}`}>
                    {t.amount >= 0 ? '+' : ''}{t.amount}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JungleWallet;
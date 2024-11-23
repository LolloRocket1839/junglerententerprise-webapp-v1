import { useState } from 'react';
import { Coins } from 'lucide-react';
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
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors">
          <Coins className="h-4 w-4 text-primary" />
          <span className="text-primary font-medium">{balance}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Jungle Wallet</h3>
            <span className="text-primary font-bold">{balance} Coins</span>
          </div>
          <ScrollArea className="h-[200px] rounded-md">
            <div className="space-y-2">
              {transactions.map((t, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <p className="text-sm text-white">{t.type}</p>
                    <p className="text-xs text-white/60">{new Date(t.timestamp).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-medium ${t.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
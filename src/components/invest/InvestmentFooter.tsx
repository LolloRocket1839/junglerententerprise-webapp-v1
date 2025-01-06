import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle, HelpCircle } from 'lucide-react';

const InvestmentFooter = () => {
  return (
    <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex gap-4 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
          Termini & Condizioni
          <ExternalLink className="w-3 h-3" />
        </a>
        <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
          Privacy Policy
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/5 hover:bg-white/10"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/5 hover:bg-white/10"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default InvestmentFooter;
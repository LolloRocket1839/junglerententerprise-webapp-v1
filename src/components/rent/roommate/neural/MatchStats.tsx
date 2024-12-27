import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { InterestNode } from './types';

interface MatchStatsProps {
  nodes: InterestNode[];
}

const MatchStats = ({ nodes }: MatchStatsProps) => {
  return (
    <Card className="glass-card p-4">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Your Neural Network</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Total Neurons</span>
          <span className="font-bold">{nodes.length}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Network Strength</span>
          <span className="font-bold">
            {nodes.length > 0 ? Math.min(100, nodes.length * 10) : 0}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MatchStats;
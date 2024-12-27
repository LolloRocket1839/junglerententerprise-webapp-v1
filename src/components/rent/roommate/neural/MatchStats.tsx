import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { InterestNode } from './types';

interface MatchStatsProps {
  nodes: InterestNode[];
}

const MatchStats = ({ nodes }: MatchStatsProps) => {
  const calculateNetworkStrength = () => {
    if (nodes.length === 0) return 0;
    const totalConnections = nodes.reduce((acc, node) => 
      acc + (node.connections?.length || 0), 0);
    const maxPossibleConnections = nodes.length * (nodes.length - 1);
    return Math.min(100, (totalConnections / maxPossibleConnections) * 100);
  };

  return (
    <Card className="glass-card p-4 bg-black/20 backdrop-blur-sm border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-5 h-5 text-primary animate-pulse" />
        <h3 className="font-semibold text-white">Neural Network Stats</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Total Neurons</span>
          <span className="font-bold text-white">{nodes.length}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Network Strength</span>
          <span className="font-bold text-white">
            {calculateNetworkStrength().toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">Active Connections</span>
          <span className="font-bold text-white">
            {nodes.reduce((acc, node) => acc + (node.connections?.length || 0), 0)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MatchStats;
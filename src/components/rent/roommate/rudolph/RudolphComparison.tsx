import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from 'lucide-react';
import type { Comparison } from './RudolphGame';

interface Props {
  comparison: Comparison;
  onChoice: (choice: 'component_a' | 'component_b', comparisonId: string) => void;
}

const RudolphComparison = ({ comparison, onChoice }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center text-white">
        Which has more Rudolph?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-40 relative overflow-hidden group hover:scale-105 transition-transform"
          onClick={() => onChoice('component_a', comparison.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:opacity-100 opacity-0 transition-opacity" />
          <p className="text-lg font-medium">{comparison.component_a}</p>
        </Button>

        <Button
          variant="outline"
          className="h-40 relative overflow-hidden group hover:scale-105 transition-transform"
          onClick={() => onChoice('component_b', comparison.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:opacity-100 opacity-0 transition-opacity" />
          <p className="text-lg font-medium">{comparison.component_b}</p>
        </Button>
      </div>

      <div className="flex justify-center">
        <ArrowLeftRight className="h-6 w-6 text-primary animate-pulse" />
      </div>
    </div>
  );
};

export default RudolphComparison;
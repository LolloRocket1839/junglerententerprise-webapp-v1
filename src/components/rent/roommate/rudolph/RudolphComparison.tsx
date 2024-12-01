import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from 'lucide-react';
import type { Comparison, Choice } from './RudolphGame';

interface Props {
  comparison: Comparison;
  onChoice: (choice: Choice, comparisonId: string) => void;
}

const RudolphComparison = ({ comparison, onChoice }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center text-white mb-8">
        Which has more Rudolph energy?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button
          variant="outline"
          className="h-48 relative overflow-hidden group hover:scale-105 transition-transform p-6"
          onClick={() => onChoice('component_a', comparison.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:opacity-100 opacity-0 transition-opacity" />
          <p className="text-xl font-medium text-white leading-relaxed whitespace-pre-wrap">
            {comparison.component_a}
          </p>
        </Button>

        <Button
          variant="outline"
          className="h-48 relative overflow-hidden group hover:scale-105 transition-transform p-6"
          onClick={() => onChoice('component_b', comparison.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:opacity-100 opacity-0 transition-opacity" />
          <p className="text-xl font-medium text-white leading-relaxed whitespace-pre-wrap">
            {comparison.component_b}
          </p>
        </Button>
      </div>

      <div className="flex justify-center mt-4">
        <ArrowLeftRight className="h-8 w-8 text-primary animate-pulse" />
      </div>
    </div>
  );
};

export default RudolphComparison;
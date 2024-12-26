import React from 'react';
import { Button } from "@/components/ui/button";
import type { Comparison } from './RudolphGame';

export type Choice = 'component_a' | 'component_b';

interface RudolphComparisonProps {
  comparison: Comparison;
  onChoice: (choice: Choice, comparisonId: string) => void;
}

const RudolphComparison = ({ comparison, onChoice }: RudolphComparisonProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Which has more Rudolph energy?</h2>
        <p className="text-white/60">Choose the option that feels more magical and unique</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Component A */}
        <div className="glass-card p-6 hover:shadow-lg transition-shadow">
          <div className="aspect-square rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
            <span className="text-4xl">{comparison.component_a}</span>
          </div>
          <Button 
            className="w-full"
            onClick={() => onChoice('component_a', comparison.id)}
          >
            Choose {comparison.component_a}
          </Button>
        </div>

        {/* Component B */}
        <div className="glass-card p-6 hover:shadow-lg transition-shadow">
          <div className="aspect-square rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
            <span className="text-4xl">{comparison.component_b}</span>
          </div>
          <Button 
            className="w-full"
            onClick={() => onChoice('component_b', comparison.id)}
          >
            Choose {comparison.component_b}
          </Button>
        </div>
      </div>

      <div className="text-center text-white/60">
        <p>Category: {comparison.category}</p>
      </div>
    </div>
  );
};

export default RudolphComparison;
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Comparison } from './RudolphGame';
import { motion } from "framer-motion";

export type Choice = 'component_a' | 'component_b';

interface RudolphComparisonProps {
  comparison: Comparison;
  onChoice: (choice: Choice, comparisonId: string) => void;
  totalAnswered: number;
}

const RudolphComparison = ({ comparison, onChoice, totalAnswered }: RudolphComparisonProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <Badge variant="outline" className="bg-primary/20 text-white px-4 py-1">
          Question {totalAnswered + 1}
        </Badge>
        <h2 className="text-2xl font-bold text-white mb-2">Which has more Rudolph energy?</h2>
        <p className="text-white/60">Choose the option that resonates more with your personality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Component A */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="h-full glass-card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onChoice('component_a', comparison.id)}>
            <div className="p-6 space-y-4">
              <div className="aspect-square rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">{comparison.component_a}</span>
              </div>
              <Button 
                className="w-full bg-primary/80 hover:bg-primary text-white"
                variant="secondary"
              >
                Choose {comparison.component_a}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Component B */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="h-full glass-card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onChoice('component_b', comparison.id)}>
            <div className="p-6 space-y-4">
              <div className="aspect-square rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">{comparison.component_b}</span>
              </div>
              <Button 
                className="w-full bg-primary/80 hover:bg-primary text-white"
                variant="secondary"
              >
                Choose {comparison.component_b}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="text-center">
        <Badge variant="outline" className="bg-primary/20 text-white">
          Category: {comparison.category}
        </Badge>
      </div>
    </motion.div>
  );
};

export default RudolphComparison;
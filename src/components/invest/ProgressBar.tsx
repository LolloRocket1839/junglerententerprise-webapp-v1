import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, className, showLabel = true }) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  return (
    <div className={cn("space-y-2", className)}>
      <Progress 
        value={percentage} 
        className="h-2 bg-white/10"
      />
      {showLabel && (
        <div className="flex justify-between text-xs text-white/60">
          <span>€{value.toLocaleString()} raccolti</span>
          <span>{percentage}% dell'obiettivo</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
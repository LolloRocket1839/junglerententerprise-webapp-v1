import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
  className
}) => {
  return (
    <Card className={cn(
      "p-4 md:p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="p-2 md:p-3 rounded-lg bg-primary/20">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/60 truncate mb-1">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-lg md:text-xl font-bold text-white truncate">{value}</p>
            {change && (
              <span className={`text-xs ${
                trend === 'up' ? 'text-green-500' : 'text-red-500'
              } flex items-center`}>
                {trend === 'up' ? (
                  <ArrowUpIcon className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-0.5" />
                )}
                {change}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
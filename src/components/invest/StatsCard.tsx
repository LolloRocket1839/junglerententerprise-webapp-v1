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
    <Card className={cn("p-4 md:p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300", className)}>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-lg bg-primary/20">
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/60 text-xs md:text-sm truncate">{title}</p>
            <p className="text-xl md:text-2xl font-bold text-white mt-0.5 truncate">{value}</p>
          </div>
        </div>
        {change && (
          <div className="flex items-center gap-1">
            {trend === 'up' ? (
              <ArrowUpIcon className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
            )}
            <span className={`text-xs md:text-sm ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {change}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
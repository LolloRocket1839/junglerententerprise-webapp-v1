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
      "p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300",
      className
    )}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-white/60 truncate">{title}</p>
            <p className="text-base md:text-lg font-bold text-white mt-0.5 truncate">{value}</p>
          </div>
        </div>
        {change && (
          <div className="flex items-center gap-1">
            {trend === 'up' ? (
              <ArrowUpIcon className="w-3 h-3 text-green-500" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 text-red-500" />
            )}
            <span className={`text-xs ${
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
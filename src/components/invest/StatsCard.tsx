import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  trend
}) => {
  return (
    <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-white/60 text-sm">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-white mt-1">{value}</p>
          <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
            {trend === 'up' ? (
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {change}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
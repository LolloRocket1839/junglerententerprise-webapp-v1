import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <Card className="glass p-6 transition-all duration-300 hover:bg-white/10 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/20">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-white/60">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
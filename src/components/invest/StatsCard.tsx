import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <Card className="bg-white/[0.03] border border-white/[0.08] p-6 
                    transition-all duration-300 hover:bg-white/[0.05] 
                    hover:border-success/20 hover:shadow-success-glow">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-success/10">
          <div className="text-success-light">
            {icon}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="text-2xl font-bold text-white/90">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
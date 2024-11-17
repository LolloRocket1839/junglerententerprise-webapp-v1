import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-300 hover:scale-102 hover:bg-white/15">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-[#22c55e]/20">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-white/60">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
import React from 'react';
import { Building2, Users, TrendingUp } from 'lucide-react';

interface PropertyStatsProps {
  units: number;
  reviewsCount: number;
  rating: number;
}

const PropertyStats: React.FC<PropertyStatsProps> = ({
  units,
  reviewsCount,
  rating
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="glass-card p-4 flex flex-col">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Building2 className="w-4 h-4" />
          <span className="text-sm font-medium">Unità</span>
        </div>
        <p className="text-2xl font-bold text-white tracking-tight">{units}</p>
      </div>
      
      <div className="glass-card p-4 flex flex-col">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">Investitori</span>
        </div>
        <p className="text-2xl font-bold text-white tracking-tight">{reviewsCount}</p>
      </div>
      
      <div className="glass-card p-4 flex flex-col">
        <div className="flex items-center gap-2 text-primary mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">ROI</span>
        </div>
        <p className="text-2xl font-bold text-green-500 tracking-tight">{rating}%</p>
      </div>
    </div>
  );
};

export default PropertyStats;
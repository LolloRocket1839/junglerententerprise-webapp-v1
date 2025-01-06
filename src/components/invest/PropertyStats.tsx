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
      <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Building2 className="w-4 h-4" />
          <span className="text-sm">Unità</span>
        </div>
        <p className="text-xl font-bold text-white">{units}</p>
      </div>
      <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">Investitori</span>
        </div>
        <p className="text-xl font-bold text-white">{reviewsCount}</p>
      </div>
      <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-primary mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">ROI</span>
        </div>
        <p className="text-xl font-bold text-white">{rating}%</p>
      </div>
    </div>
  );
};

export default PropertyStats;
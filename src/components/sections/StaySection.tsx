
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Calendar } from 'lucide-react';
import PropertyListingCard from '../property/PropertyListingCard';

const StaySection = () => {
  return (
    <div className="space-y-4">
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Cerca per città o zona..."
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Check-in</label>
          <div className="flex items-center border rounded-md p-2">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">10 Giu 2025</span>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Check-out</label>
          <div className="flex items-center border rounded-md p-2">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">20 Giu 2025</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <PropertyListingCard
          title="Appartamento nel Centro di Roma"
          location="Via Sallustiana, Roma"
          distance="Centro Storico"
          price={95}
          features={['2 camere', 'Wi-Fi', 'A/C']}
        />

        <PropertyListingCard
          title="Appartamento Vicino Colosseo"
          location="Via Capo d'Africa, Roma"
          distance="Colosseo"
          price={120}
          features={['1 camera', 'Wi-Fi', 'Terrazza']}
        />
      </div>
    </div>
  );
};

export default StaySection;

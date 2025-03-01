
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import PropertyListingCard from '../property/PropertyListingCard';

const RentSection = () => {
  return (
    <div className="space-y-4">
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Cerca per università o zona..."
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex overflow-x-auto py-2 space-x-2 mb-4">
        <Button variant="outline" className="whitespace-nowrap">
          Vicino UniTO
        </Button>
        <Button variant="outline" className="whitespace-nowrap">
          Vicino Sapienza
        </Button>
        <Button variant="outline" className="whitespace-nowrap">
          Vicino LUISS
        </Button>
        <Button variant="outline" className="whitespace-nowrap">
          Vicino Bocconi
        </Button>
      </div>

      <div className="space-y-4">
        <PropertyListingCard
          title="Appartamento Sapienza Via Nomentana"
          location="Via Nomentana"
          distance="350m dalla Sapienza"
          price={450}
          originalPrice={600}
          savings={25}
          features={['4 stanze', 'Wi-Fi', 'Riscaldamento']}
        />

        <PropertyListingCard
          title="Stanza in Via Tiburtina"
          location="Via Tiburtina"
          distance="500m dalla Sapienza"
          price={375}
          originalPrice={500}
          savings={25}
          features={['Stanza singola', 'Wi-Fi', 'Cucina condivisa']}
        />
      </div>
    </div>
  );
};

export default RentSection;

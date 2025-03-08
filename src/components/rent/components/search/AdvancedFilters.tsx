
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchParams } from '../../types';

interface AdvancedFiltersProps {
  searchParams: SearchParams;
  onParamsChange: (params: SearchParams) => void;
}

export const AdvancedFilters = ({ searchParams, onParamsChange }: AdvancedFiltersProps) => {
  return (
    <div 
      id="advanced-filters"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 animate-fade-in py-4 px-1 border-t border-white/10"
    >
      <div>
        <label className="text-white/80 mb-2 block">Tipologia</label>
        <Select
          value={searchParams.roomType}
          onValueChange={(value) => onParamsChange({...searchParams, roomType: value})}
        >
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Tipo di alloggio" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/20">
            <SelectItem value="studio" className="text-white hover:bg-white/10">
              Monolocale
            </SelectItem>
            <SelectItem value="apartment" className="text-white hover:bg-white/10">
              Appartamento
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-white/80 mb-2 block">Prezzo Min (€)</label>
        <Input
          type="number"
          placeholder="0"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
          value={searchParams.minPrice}
          onChange={(e) => onParamsChange({...searchParams, minPrice: e.target.value})}
        />
      </div>

      <div>
        <label className="text-white/80 mb-2 block">Prezzo Max (€)</label>
        <Input
          type="number"
          placeholder="2000"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
          value={searchParams.maxPrice}
          onChange={(e) => onParamsChange({...searchParams, maxPrice: e.target.value})}
        />
      </div>
    </div>
  );
};

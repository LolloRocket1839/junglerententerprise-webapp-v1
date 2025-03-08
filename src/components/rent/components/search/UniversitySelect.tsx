
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School } from 'lucide-react';
import { universities } from '../../data/mockData';

interface UniversitySelectProps {
  value: string;
  onChange: (value: string) => void;
  selectedCity: string;
}

export const UniversitySelect = ({ value, onChange, selectedCity }: UniversitySelectProps) => {
  return (
    <div className="md:col-span-5">
      <label htmlFor="university-select" className="text-white/80 mb-2 block text-sm font-medium">
        Università
      </label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={!selectedCity}
        aria-label="Seleziona l'università"
      >
        <SelectTrigger 
          id="university-select"
          className="bg-white/10 border-white/20 text-white h-12 transition-colors hover:bg-white/20 focus:ring-2 focus:ring-primary/50"
        >
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 opacity-70" />
            <SelectValue placeholder="Seleziona l'università" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] border-white/20 max-h-[300px]">
          {selectedCity && universities[selectedCity]?.map((university) => (
            <SelectItem 
              key={university} 
              value={university} 
              className="text-white hover:bg-white/10"
            >
              {university}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

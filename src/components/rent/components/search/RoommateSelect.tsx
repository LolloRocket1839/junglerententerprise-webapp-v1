
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from 'lucide-react';

interface RoommateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const RoommateSelect = ({ value, onChange }: RoommateSelectProps) => {
  return (
    <div className="md:col-span-5">
      <label htmlFor="roommate-select" className="text-white/80 mb-2 block text-sm font-medium">
        Coinquilini
      </label>
      <Select
        value={value}
        onValueChange={onChange}
        aria-label="Seleziona numero di coinquilini"
      >
        <SelectTrigger 
          id="roommate-select"
          className="bg-white/10 border-white/20 text-white h-12 transition-colors hover:bg-white/20 focus:ring-2 focus:ring-primary/50"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 opacity-70" />
            <SelectValue placeholder="Numero di coinquilini" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] border-white/20 max-h-[300px]">
          <SelectItem value="solo" className="text-white hover:bg-white/10">
            Da soli
          </SelectItem>
          <SelectItem value="2" className="text-white hover:bg-white/10">
            Due coinquilini
          </SelectItem>
          <SelectItem value="3" className="text-white hover:bg-white/10">
            Tre coinquilini
          </SelectItem>
          <SelectItem value="4" className="text-white hover:bg-white/10">
            Quattro coinquilini
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

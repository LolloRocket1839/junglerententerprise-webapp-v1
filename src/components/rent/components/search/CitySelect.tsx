
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from 'lucide-react';
import { cities } from '../../data/mockData';
import { SearchParams } from '../../types';
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CitySelect = ({ value, onChange }: CitySelectProps) => {
  const { language } = useLanguage();
  const t = (key: keyof typeof rentalTranslations.en) => {
    return rentalTranslations[language as keyof typeof rentalTranslations]?.[key] || rentalTranslations.en[key];
  };

  return (
    <div className="md:col-span-5">
      <label htmlFor="city-select" className="text-white/80 mb-2 block text-sm font-medium">
        {t('city')}
      </label>
      <Select
        value={value}
        onValueChange={onChange}
        aria-label="Seleziona la città"
      >
        <SelectTrigger 
          id="city-select"
          className="bg-white/10 border-white/20 text-white h-12 transition-colors hover:bg-white/20 focus:ring-2 focus:ring-primary/50"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 opacity-70" />
            <SelectValue placeholder={t('selectCity')} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] border-white/20 max-h-[300px]">
          {cities.map((city) => (
            <SelectItem 
              key={city} 
              value={city} 
              className="text-white hover:bg-white/10"
            >
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

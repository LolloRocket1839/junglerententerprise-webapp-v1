
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School } from 'lucide-react';
import { universities } from '../../data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

interface UniversitySelectProps {
  value: string;
  onChange: (value: string) => void;
  selectedCity: string;
}

export const UniversitySelect = ({ value, onChange, selectedCity }: UniversitySelectProps) => {
  const { language } = useLanguage();
  const t = (key: keyof typeof rentalTranslations.en) => {
    return rentalTranslations[language as keyof typeof rentalTranslations]?.[key] || rentalTranslations.en[key];
  };

  return (
    <div className="md:col-span-5">
      <label htmlFor="university-select" className="text-white/80 mb-2 block text-sm font-medium">
        {t('university')}
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
            <SelectValue placeholder={t('selectUniversity')} />
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


import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

interface RoommateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const RoommateSelect = ({ value, onChange }: RoommateSelectProps) => {
  const { language } = useLanguage();
  const t = (key: keyof typeof rentalTranslations.en) => {
    return rentalTranslations[language as keyof typeof rentalTranslations]?.[key] || rentalTranslations.en[key];
  };

  return (
    <div className="md:col-span-5">
      <label htmlFor="roommate-select" className="text-white/80 mb-2 block text-sm font-medium">
        {t('roommates')}
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
            <SelectValue placeholder={t('numberOfRoommates')} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] border-white/20 max-h-[300px]">
          <SelectItem value="solo" className="text-white hover:bg-white/10">
            {t('houseForYou')}
          </SelectItem>
          <SelectItem value="2" className="text-white hover:bg-white/10">
            {t('houseFor2')}
          </SelectItem>
          <SelectItem value="3" className="text-white hover:bg-white/10">
            {t('houseFor3')}
          </SelectItem>
          <SelectItem value="4" className="text-white hover:bg-white/10">
            {t('houseFor4')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

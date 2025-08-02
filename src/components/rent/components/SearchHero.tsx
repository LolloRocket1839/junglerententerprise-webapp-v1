
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

export const SearchHero = () => {
  const { language } = useLanguage();
  const t = (key: keyof typeof rentalTranslations.en) => {
    return rentalTranslations[language as keyof typeof rentalTranslations]?.[key] || rentalTranslations.en[key];
  };

  return (
    <header className="flex min-h-[60vh] items-center justify-center flex-col py-12 md:py-20 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
      
      <div className="text-center space-y-6 max-w-3xl px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in">
          {t('findYourIdealHome')}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
          {t('saveUpTo20Percent')}
        </p>
      </div>
    </header>
  );
};

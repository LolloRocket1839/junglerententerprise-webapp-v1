
import React, { createContext, useContext, useState } from 'react';
import { translations } from '@/translations';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: keyof typeof translations.EN) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('IT');

  const t = (key: keyof typeof translations.EN): string => {
    if (!translations[language as keyof typeof translations]) {
      console.warn(`Translation for language ${language} not found`);
      return translations.IT[key] || key;
    }
    return translations[language as keyof typeof translations][key] || translations.IT[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

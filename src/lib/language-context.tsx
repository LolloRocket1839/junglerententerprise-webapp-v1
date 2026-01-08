"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Language = "it" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  it: {
    // Navigation
    "nav.invest": "Investi",
    "nav.rent": "Affitta",
    "nav.stay": "Soggiorna",
    "nav.properties": "Proprietà",
    "nav.dashboard": "Dashboard",
    "nav.login": "Accedi",
    "nav.logout": "Esci",

    // Landing
    "landing.title": "Jungle Rent",
    "landing.subtitle": "Investimenti immobiliari per studenti universitari",
    "landing.investor": "Sono un Investitore",
    "landing.student": "Sono uno Studente",
    "landing.tourist": "Sono un Turista",
    "landing.administrator": "Amministrazione",

    // Dashboard
    "dashboard.welcome": "Bentornato",
    "dashboard.overview": "Panoramica",
    
    // Investor
    "investor.title": "Dashboard Investitore",
    "investor.portfolio": "Il tuo Portfolio",
    "investor.returns": "Rendimenti",
    "investor.properties": "Proprietà",
    "totalInvestment": "Investimento Totale",
    "annualRevenue": "Ricavo Annuale",
    "netOperatingIncome": "Reddito Operativo Netto",
    "investorDashboard": "Dashboard Investitore",
    "welcomeBack": "Bentornato",
    "exportReport": "Esporta Report",
    "portfolioGrowth": "Crescita Portfolio",
    "assetAllocation": "Allocazione Asset",
    "portfolioValue": "Valore Portfolio",
    "revenue": "Ricavo",
    "month": "Mese",
    "year": "Anno",

    // Student
    "student.title": "Alloggi per Studenti",
    "student.browse": "Cerca Alloggio",
    "student.applications": "Le mie Candidature",
    "student.rent": "Il mio Affitto",
    "student.requestVisit": "Richiedi Visita",

    // Tourist
    "tourist.title": "Soggiorni Turistici",
    "tourist.browse": "Cerca Alloggio",
    "tourist.bookings": "Le mie Prenotazioni",
    "tourist.bookNow": "Prenota Ora",

    // Properties
    "properties.available": "Disponibile",
    "properties.occupied": "Occupato",
    "properties.perMonth": "/mese",
    "properties.perNight": "/notte",

    // Common
    "common.search": "Cerca",
    "common.filter": "Filtra",
    "common.save": "Salva",
    "common.cancel": "Annulla",
    "common.confirm": "Conferma",
    "common.back": "Indietro",
    "common.next": "Avanti",
    "common.loading": "Caricamento...",
  },
  en: {
    // Navigation
    "nav.invest": "Invest",
    "nav.rent": "Rent",
    "nav.stay": "Stay",
    "nav.properties": "Properties",
    "nav.dashboard": "Dashboard",
    "nav.login": "Login",
    "nav.logout": "Logout",

    // Landing
    "landing.title": "Jungle Rent",
    "landing.subtitle": "Real estate investments for university students",
    "landing.investor": "I'm an Investor",
    "landing.student": "I'm a Student",
    "landing.tourist": "I'm a Tourist",
    "landing.administrator": "Administration",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.overview": "Overview",
    
    // Investor
    "investor.title": "Investor Dashboard",
    "investor.portfolio": "Your Portfolio",
    "investor.returns": "Returns",
    "investor.properties": "Properties",
    "totalInvestment": "Total Investment",
    "annualRevenue": "Annual Revenue",
    "netOperatingIncome": "Net Operating Income",
    "investorDashboard": "Investor Dashboard",
    "welcomeBack": "Welcome back",
    "exportReport": "Export Report",
    "portfolioGrowth": "Portfolio Growth",
    "assetAllocation": "Asset Allocation",
    "portfolioValue": "Portfolio Value",
    "revenue": "Revenue",
    "month": "Month",
    "year": "Year",

    // Student
    "student.title": "Student Housing",
    "student.browse": "Browse Housing",
    "student.applications": "My Applications",
    "student.rent": "My Rent",
    "student.requestVisit": "Request Visit",

    // Tourist
    "tourist.title": "Tourist Stays",
    "tourist.browse": "Browse Stays",
    "tourist.bookings": "My Bookings",
    "tourist.bookNow": "Book Now",

    // Properties
    "properties.available": "Available",
    "properties.occupied": "Occupied",
    "properties.perMonth": "/month",
    "properties.perNight": "/night",

    // Common
    "common.search": "Search",
    "common.filter": "Filter",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.next": "Next",
    "common.loading": "Loading...",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function JungleLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("it");

  useEffect(() => {
    const stored = localStorage.getItem("jungle-language") as Language;
    if (stored && (stored === "it" || stored === "en")) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("jungle-language", lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || translations.en[key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a JungleLanguageProvider");
  }
  return context;
}

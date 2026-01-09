import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, GraduationCap, TreePalm } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroLanding = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-6 py-8 md:py-12 lg:py-16">
        {/* Logo Section */}
        <div className="mb-6 md:mb-8 lg:mb-10 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-5">
            <img 
              src="/jungle-rent-logo.svg" 
              alt="Jungle Rent" 
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </div>
          
          {/* Brand Name */}
          <h2 className="text-base md:text-lg font-medium text-primary tracking-widest uppercase mb-1">
            Jungle Rent
          </h2>
          <p className="text-xs text-muted-foreground tracking-wider uppercase">
            Il Tuo Mondo Sicuro
          </p>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-2xl lg:max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-4 md:mb-5">
            <span className="text-primary font-medium">Investi</span>
            <span className="text-foreground"> negli alloggi studenteschi a Torino</span>
          </h1>
          
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-light leading-relaxed max-w-xl lg:max-w-2xl mx-auto">
            Investi a partire da €100 in Jungle Rent. Noi acquistiamo e gestiamo, tu guadagni.
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => navigate('/invest')}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 md:px-10 py-5 md:py-6 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          Inizia a investire
          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Institutional Badge */}
        <div className="mt-8 md:mt-10 lg:mt-12 flex flex-col items-center">
          <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-card rounded-full border border-border shadow-sm">
            <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm text-muted-foreground">
              Incubatore Imprese UniTO • Startup Innovativa
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 md:mt-12 lg:mt-16 grid grid-cols-3 gap-4 md:gap-8 lg:gap-16 text-center">
          <div>
            <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-primary mb-1 md:mb-2">589K</div>
            <div className="text-xs md:text-sm text-muted-foreground">Studenti fuorisede</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-primary mb-1 md:mb-2">12.6%</div>
            <div className="text-xs md:text-sm text-muted-foreground">Domanda coperta</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-primary mb-1 md:mb-2">€4B</div>
            <div className="text-xs md:text-sm text-muted-foreground">Potenziale di mercato</div>
          </div>
        </div>
      </div>
    </div>
  );
};

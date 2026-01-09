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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Logo Section */}
        <div className="mb-12 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/jungle-rent-logo.svg" 
              alt="Jungle Rent" 
              className="h-24 w-auto"
            />
          </div>
          
          {/* Brand Name */}
          <h2 className="text-lg font-medium text-primary tracking-widest uppercase mb-1">
            Jungle Rent
          </h2>
          <p className="text-xs text-muted-foreground tracking-wider uppercase">
            Il Tuo Mondo Sicuro
          </p>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            <span className="text-primary font-medium">Investi</span>
            <span className="text-foreground"> negli alloggi studenteschi a Torino</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Investi a partire da €100 in Jungle Rent. Noi acquistiamo e gestiamo, tu guadagni.
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => navigate('/invest')}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          Inizia a investire
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Institutional Badge */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-card rounded-full border border-border shadow-sm">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Incubatore Imprese UniTO • Startup Innovativa
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-light text-primary mb-2">589K</div>
            <div className="text-sm text-muted-foreground">Studenti fuorisede</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-light text-primary mb-2">12.6%</div>
            <div className="text-sm text-muted-foreground">Domanda coperta</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-light text-primary mb-2">€4B</div>
            <div className="text-sm text-muted-foreground">Potenziale di mercato</div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, GraduationCap, Plane, Building2, ArrowRight, Shield, Users, Clock } from "lucide-react";
import type { UserMode, AdminMode } from "@/lib/types";

interface LandingViewProps {
  onSelectMode: (mode: UserMode | AdminMode) => void;
}

export function LandingView({ onSelectMode }: LandingViewProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative">
          <div className="text-center max-w-3xl lg:max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-6 lg:mb-8">
              <img 
                src="/jungle-rent-logo.svg" 
                alt="Jungle Rent" 
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              />
            </div>

            <Badge className="mb-4 lg:mb-5 bg-primary/10 text-primary border-primary/20 text-xs lg:text-sm">
              <Shield className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              Incubato da 2i3T - Università di Torino
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground mb-4 lg:mb-5 leading-tight">
              Jungle Rent
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 lg:mb-8 max-w-xl lg:max-w-2xl mx-auto">
              Investimenti immobiliari innovativi per studenti universitari.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-6 mb-8 lg:mb-10">
              <div className="flex items-center gap-1.5 text-xs md:text-sm lg:text-base text-muted-foreground">
                <Clock className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-primary" />
                <span>Campagna in arrivo</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs md:text-sm lg:text-base text-muted-foreground">
                <Users className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-primary" />
                <span>Waitlist aperta</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs md:text-sm lg:text-base text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-primary" />
                <span>Torino</span>
              </div>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl lg:max-w-6xl mx-auto">
            {/* Investor Card */}
            <Card 
              className="p-5 md:p-6 lg:p-8 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("investor")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 lg:mb-5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-2xl font-serif font-bold text-foreground mb-2 lg:mb-3">
                  Investitore
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-5">
                  Rendimenti stabili e agevolazioni fiscali fino al 65%.
                </p>
                <ul className="text-xs lg:text-sm text-muted-foreground space-y-1.5 lg:space-y-2 mb-4 lg:mb-5 w-full">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Investimento minimo €100
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Detrazione IRPEF 65%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Portfolio diversificato
                  </li>
                </ul>
                <Button className="w-full h-10 lg:h-11 text-sm lg:text-base group-hover:bg-primary/90">
                  Mostra Interesse
                  <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 ml-1.5" />
                </Button>
              </div>
            </Card>

            {/* Student Card */}
            <Card 
              className="p-5 md:p-6 lg:p-8 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("student")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 lg:mb-5 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-2xl font-serif font-bold text-foreground mb-2 lg:mb-3">
                  Studente
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-5">
                  Alloggi vicino all'università con sconti dedicati.
                </p>
                <ul className="text-xs lg:text-sm text-muted-foreground space-y-1.5 lg:space-y-2 mb-4 lg:mb-5 w-full">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Sconti studenti
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Vicino alle università
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Contratti flessibili
                  </li>
                </ul>
                <Button className="w-full h-10 lg:h-11 text-sm lg:text-base group-hover:bg-primary/90">
                  Cerca Alloggio
                  <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 ml-1.5" />
                </Button>
              </div>
            </Card>

            {/* Tourist Card */}
            <Card 
              className="p-5 md:p-6 lg:p-8 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("tourist")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 lg:mb-5 group-hover:scale-110 transition-transform">
                  <Plane className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-amber-600" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-2xl font-serif font-bold text-foreground mb-2 lg:mb-3">
                  Turista
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-5">
                  Soggiorni brevi nel centro di Torino.
                </p>
                <ul className="text-xs lg:text-sm text-muted-foreground space-y-1.5 lg:space-y-2 mb-4 lg:mb-5 w-full">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Appartamenti verificati
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Check-in flessibile
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Supporto 24/7
                  </li>
                </ul>
                <Button className="w-full h-10 lg:h-11 text-sm lg:text-base group-hover:bg-primary/90">
                  Prenota Ora
                  <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 ml-1.5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 lg:py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs lg:text-sm text-muted-foreground">
            © 2025 Jungle Rent SRL. Incubato da 2i3T - Università di Torino.
          </p>
        </div>
      </footer>
    </div>
  );
}

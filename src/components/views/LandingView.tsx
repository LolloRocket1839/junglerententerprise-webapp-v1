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
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <img 
                src="/jungle-rent-logo.svg" 
                alt="Jungle Rent" 
                className="w-14 h-14 md:w-16 md:h-16"
              />
            </div>

            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Incubato da 2i3T - Università di Torino
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 leading-tight">
              Jungle Rent
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-xl mx-auto">
              Investimenti immobiliari innovativi per studenti universitari.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Campagna in arrivo</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span>Waitlist aperta</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>Torino</span>
              </div>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
            {/* Investor Card */}
            <Card 
              className="p-5 md:p-6 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("investor")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
                  Investitore
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Rendimenti stabili e agevolazioni fiscali fino al 65%.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5 mb-4 w-full">
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
                <Button className="w-full h-10 text-sm group-hover:bg-primary/90">
                  Mostra Interesse
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </Card>

            {/* Student Card */}
            <Card 
              className="p-5 md:p-6 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("student")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
                  Studente
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Alloggi vicino all'università con sconti dedicati.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5 mb-4 w-full">
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
                <Button className="w-full h-10 text-sm group-hover:bg-primary/90">
                  Cerca Alloggio
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </Card>

            {/* Tourist Card */}
            <Card 
              className="p-5 md:p-6 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("tourist")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plane className="h-6 w-6 md:h-7 md:w-7 text-amber-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
                  Turista
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Soggiorni brevi nel centro di Torino.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5 mb-4 w-full">
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
                <Button className="w-full h-10 text-sm group-hover:bg-primary/90">
                  Prenota Ora
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Jungle Rent SRL. Incubato da 2i3T - Università di Torino.
          </p>
        </div>
      </footer>
    </div>
  );
}

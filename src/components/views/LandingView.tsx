import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, GraduationCap, Plane, Building2, ArrowRight, Shield, Users, Percent } from "lucide-react";
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
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <img 
                src="/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png" 
                alt="Jungle Rent" 
                className="w-20 h-20 rounded-2xl"
              />
            </div>

            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Incubato da 2i3T - Università di Torino
            </Badge>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              Jungle Rent
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Investimenti immobiliari innovativi per studenti universitari.
              Rendimenti stabili per investitori, affitti accessibili per studenti.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Percent className="h-4 w-4 text-primary" />
                <span>8.5% rendimento annuo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>1,247 utenti attivi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                <span>3 proprietà a Torino</span>
              </div>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Investor Card */}
            <Card 
              className="p-8 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("investor")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                  Investitore
                </h3>
                <p className="text-muted-foreground mb-6">
                  Investi in immobili studenteschi con rendimenti stabili del 7-9% annuo.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Investimento minimo €100
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Rendimenti trimestrali
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Diversificazione portfolio
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-primary/90">
                  Inizia a Investire
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Student Card */}
            <Card 
              className="p-8 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("student")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                  Studente
                </h3>
                <p className="text-muted-foreground mb-6">
                  Trova il tuo alloggio ideale vicino all'università con il 25% di sconto.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    25% sconto garantito
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
                <Button className="w-full group-hover:bg-primary/90">
                  Cerca Alloggio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Tourist Card */}
            <Card 
              className="p-8 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onSelectMode("tourist")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Plane className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                  Turista
                </h3>
                <p className="text-muted-foreground mb-6">
                  Prenota soggiorni brevi in appartamenti confortevoli nel centro di Torino.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
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
                <Button className="w-full group-hover:bg-primary/90">
                  Prenota Ora
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Removed Admin Link - managed via Lovable */}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            Come Funziona
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Modello Dual-Revenue</h3>
              <p className="text-muted-foreground">
                Affitti a studenti durante l'anno accademico (9 mesi) e soggiorni turistici durante le vacanze (3 mesi).
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Sconto 25% Studenti</h3>
              <p className="text-muted-foreground">
                Gli studenti pagano il 25% in meno rispetto al mercato grazie ai rendimenti turistici estivi.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Rendimenti Stabili</h3>
              <p className="text-muted-foreground">
                Gli investitori ricevono rendimenti trimestrali del 7-9% annuo con occupazione media del 95%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Jungle Rent SRL. Incubato da 2i3T - Università di Torino.
          </p>
        </div>
      </footer>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Shield, TrendingUp, Users, ArrowRight } from "lucide-react";
import { useInvestorPortfolio } from "@/hooks/useInvestorPortfolio";
import { useAuth } from "@/hooks/useAuth";

export function TokenizationView() {
  const { session } = useAuth();
  const { data: portfolio } = useInvestorPortfolio();

  const totalSeeds = portfolio?.investments.reduce((sum, inv) => sum + inv.tokens, 0) || 0;
  const totalValue = portfolio?.totalInvested || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Jungle Seeds</h1>
        <p className="text-muted-foreground">Come funzionano i Jungle Seeds</p>
      </div>

      {/* User Seeds */}
      {session && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">I Tuoi Jungle Seeds</p>
                <p className="text-4xl font-bold text-primary">{totalSeeds}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Valore: €{totalValue.toLocaleString()}
                </p>
              </div>
              <Coins className="h-16 w-16 text-primary/20" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* How it works */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Cos'è un Jungle Seed?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Un Jungle Seed rappresenta una quota di proprietà in un immobile. 
              Ogni Jungle Seed ha un valore fisso di <strong>€100</strong> e ti dà diritto 
              a una parte proporzionale della proprietà.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">1 Jungle Seed = €100</Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline">Quota proporzionale della proprietà</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">Come Funzionano i Jungle Seeds?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              I Jungle Seeds rappresentano la tua quota di proprietà. 
              Più Seeds possiedi, maggiore è la tua partecipazione nell'immobile.
            </p>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">
                <strong>Esempio:</strong> Con 100 Jungle Seeds (€10.000) possiedi 
                una quota significativa della proprietà.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Sicurezza</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Ogni investimento è garantito da un immobile reale. I Jungle Seeds sono 
              registrati in modo sicuro e trasparente, con tracciabilità completa.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Immobili verificati e assicurati
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Contratti legali trasparenti
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Report trimestrali dettagliati
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle className="text-lg">Prossimamente</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Stiamo lavorando su funzionalità avanzate per i Jungle Seeds:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coming Soon</Badge>
                Marketplace secondario per scambio Jungle Seeds
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coming Soon</Badge>
                Jungle Seeds su blockchain per trasparenza
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coming Soon</Badge>
                Bonus per i possessori di Seeds
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

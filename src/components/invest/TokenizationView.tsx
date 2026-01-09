import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Shield, TrendingUp, Users, ArrowRight } from "lucide-react";
import { useInvestorPortfolio } from "@/hooks/useInvestorPortfolio";
import { useAuth } from "@/hooks/useAuth";

export function TokenizationView() {
  const { session } = useAuth();
  const { data: portfolio } = useInvestorPortfolio();

  const totalTokens = portfolio?.investments.reduce((sum, inv) => sum + inv.tokens, 0) || 0;
  const totalValue = portfolio?.totalInvested || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tokenizzazione</h1>
        <p className="text-muted-foreground">Come funziona la tokenizzazione degli investimenti</p>
      </div>

      {/* User Tokens */}
      {session && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">I Tuoi Token</p>
                <p className="text-4xl font-bold text-primary">{totalTokens}</p>
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
              <CardTitle className="text-lg">Cos'è un Token?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Un token rappresenta una quota di proprietà in un immobile. 
              Ogni token ha un valore fisso di <strong>€100</strong> e ti dà diritto 
              a una parte proporzionale dei rendimenti.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">1 Token = €100</Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline">Quota proporzionale dei rendimenti</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">Come Funzionano i Rendimenti?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              I rendimenti vengono distribuiti trimestralmente in base al numero 
              di token posseduti. Il ROI medio è del <strong>7-9% annuo</strong>.
            </p>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">
                <strong>Esempio:</strong> Con 100 token (€10.000) e ROI 8.5%, 
                riceverai circa €850/anno in dividendi.
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
              Ogni investimento è garantito da un immobile reale. I token sono 
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
              Stiamo lavorando su funzionalità avanzate per i token:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coming Soon</Badge>
                Marketplace secondario per scambio token
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coming Soon</Badge>
                Token su blockchain per trasparenza
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary">Coming Soon</Badge>
                Staking per rendimenti bonus
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

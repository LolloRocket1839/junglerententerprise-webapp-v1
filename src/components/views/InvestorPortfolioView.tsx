import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Euro, Calendar } from "lucide-react";
import { useInvestorPortfolio } from "@/hooks/useInvestorPortfolio";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export function InvestorPortfolioView() {
  const { session } = useAuth();
  const { data: portfolio, isLoading } = useInvestorPortfolio();

  if (!session) {
    return (
      <div className="text-center py-20">
        <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Accedi per vedere il tuo portfolio</h2>
        <p className="text-muted-foreground mb-6">Effettua il login per visualizzare i tuoi investimenti</p>
        <Button>Accedi</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const { totalInvested, propertiesCount, investments } = portfolio || {
    totalInvested: 0,
    propertiesCount: 0,
    investments: [],
  };

  if (investments.length === 0) {
    return (
      <div className="text-center py-20">
        <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Nessun investimento</h2>
        <p className="text-muted-foreground mb-6">Non hai ancora effettuato investimenti. Esplora le opportunità disponibili!</p>
        <Button>
          Esplora Opportunità
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Il Tuo Portfolio</h1>
        <p className="text-muted-foreground">Panoramica dettagliata dei tuoi investimenti</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Euro className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Totale Investito</p>
                <p className="text-xl font-bold">€{totalInvested.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proprietà</p>
                <p className="text-xl font-bold">{propertiesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investments List */}
      <Card>
        <CardHeader>
          <CardTitle>I Tuoi Investimenti</CardTitle>
          <CardDescription>Lista completa dei tuoi investimenti in proprietà</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {investment.property?.images?.[0] ? (
                  <img 
                    src={investment.property.images[0]} 
                    alt={investment.property.title || ''} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {investment.property?.title || 'Proprietà'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {investment.property?.address}, {investment.property?.city}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                    {investment.status === 'active' ? 'Attivo' : investment.status === 'pending' ? 'In attesa' : investment.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(investment.created_at), 'd MMM yyyy', { locale: it })}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">€{investment.amount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{investment.tokens} token</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

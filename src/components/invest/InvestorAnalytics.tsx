import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, PieChart } from "lucide-react";
import { useInvestorPortfolio } from "@/hooks/useInvestorPortfolio";
import { useAuth } from "@/hooks/useAuth";

export function InvestorAnalytics() {
  const { session } = useAuth();
  const { data: portfolio, isLoading } = useInvestorPortfolio();

  if (!session) {
    return (
      <div className="text-center py-20">
        <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Accedi per vedere le analytics</h2>
        <p className="text-muted-foreground">Effettua il login per visualizzare le statistiche del tuo portfolio</p>
      </div>
    );
  }

  const { totalInvested, propertiesCount, investments } = portfolio || {
    totalInvested: 0,
    propertiesCount: 0,
    investments: [],
  };

  // Calculate distribution by property
  const propertyDistribution: Record<string, number> = {};
  investments.forEach((inv) => {
    const propertyName = inv.property?.title || 'Altro';
    propertyDistribution[propertyName] = (propertyDistribution[propertyName] || 0) + inv.amount;
  });

  // Mock monthly data for chart visualization
  const monthlyData = [
    { month: 'Gen', invested: 0 },
    { month: 'Feb', invested: 0 },
    { month: 'Mar', invested: totalInvested * 0.3 },
    { month: 'Apr', invested: totalInvested * 0.5 },
    { month: 'Mag', invested: totalInvested * 0.7 },
    { month: 'Giu', invested: totalInvested },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Analisi dettagliata del tuo portfolio</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">€{totalInvested.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Totale Investito</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">{propertiesCount}</p>
            <p className="text-sm text-muted-foreground">Proprietà</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Distribution by Property */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <CardTitle>Distribuzione per Proprietà</CardTitle>
            </div>
            <CardDescription>Come sono distribuiti i tuoi investimenti</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(propertyDistribution).length > 0 ? (
              Object.entries(propertyDistribution).map(([property, amount]) => (
                <div key={property}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="truncate">{property}</span>
                    <span className="font-medium">€{amount.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(amount / (totalInvested || 1)) * 100} 
                    className="h-2"
                  />
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nessun investimento da visualizzare
              </p>
            )}
          </CardContent>
        </Card>

        {/* Performance Over Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Investimenti nel Tempo</CardTitle>
            </div>
            <CardDescription>Andamento degli investimenti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyData.slice(-4).map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-10">{data.month}</span>
                  <div className="flex-1">
                    <div className="h-4">
                      <div 
                        className="bg-primary/60 rounded-sm h-full" 
                        style={{ width: `${(data.invested / (totalInvested || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 text-xs text-muted-foreground mt-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary/60 rounded-sm" />
                  <span>Investito</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";
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

  const { totalInvested, totalReturns, propertiesCount, averageROI, investments } = portfolio || {
    totalInvested: 0,
    totalReturns: 0,
    propertiesCount: 0,
    averageROI: 0,
    investments: [],
  };

  // Calculate distribution by property
  const propertyDistribution = investments.reduce((acc, inv) => {
    const propertyName = inv.property?.title || 'Altro';
    acc[propertyName] = (acc[propertyName] || 0) + inv.amount;
    return acc;
  }, {} as Record<string, number>);

  // Mock monthly data for chart visualization
  const monthlyData = [
    { month: 'Gen', invested: 0, returns: 0 },
    { month: 'Feb', invested: 0, returns: 0 },
    { month: 'Mar', invested: totalInvested * 0.3, returns: totalReturns * 0.1 },
    { month: 'Apr', invested: totalInvested * 0.5, returns: totalReturns * 0.2 },
    { month: 'Mag', invested: totalInvested * 0.7, returns: totalReturns * 0.4 },
    { month: 'Giu', invested: totalInvested, returns: totalReturns },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Analisi dettagliata delle performance del tuo portfolio</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">€{totalInvested.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Totale Investito</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">€{totalReturns.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Rendimenti Stimati</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">{propertiesCount}</p>
            <p className="text-sm text-muted-foreground">Proprietà</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">{averageROI.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">ROI Medio</p>
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
                    value={(amount / totalInvested) * 100} 
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
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle>Performance nel Tempo</CardTitle>
            </div>
            <CardDescription>Andamento degli investimenti e rendimenti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyData.slice(-4).map((data, index) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-10">{data.month}</span>
                  <div className="flex-1">
                    <div className="flex gap-2 h-4">
                      <div 
                        className="bg-primary/60 rounded-sm" 
                        style={{ width: `${(data.invested / (totalInvested || 1)) * 100}%` }}
                      />
                      <div 
                        className="bg-green-500/60 rounded-sm" 
                        style={{ width: `${(data.returns / (totalReturns || 1)) * 30}%` }}
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
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500/60 rounded-sm" />
                  <span>Rendimenti</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Comparison */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-600" />
              <CardTitle>Confronto ROI</CardTitle>
            </div>
            <CardDescription>Il tuo rendimento rispetto agli altri investimenti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Jungle Rent (il tuo portfolio)</span>
                  <span className="text-green-600 font-bold">{averageROI.toFixed(1)}%</span>
                </div>
                <Progress value={averageROI * 10} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Immobiliare tradizionale</span>
                  <span>4.5%</span>
                </div>
                <Progress value={45} className="h-3 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Conto deposito</span>
                  <span>2.0%</span>
                </div>
                <Progress value={20} className="h-3 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>BOT Italia</span>
                  <span>3.5%</span>
                </div>
                <Progress value={35} className="h-3 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

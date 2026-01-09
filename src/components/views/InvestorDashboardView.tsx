import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  Wallet, 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  Bell,
  ChevronRight,
  Euro
} from "lucide-react";
import { useInvestorPortfolio } from "@/hooks/useInvestorPortfolio";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import type { ViewType } from "@/lib/types";

interface InvestorDashboardViewProps {
  onViewChange?: (view: ViewType) => void;
}

export function InvestorDashboardView({ onViewChange }: InvestorDashboardViewProps) {
  const { session } = useAuth();
  const { data: portfolio, isLoading } = useInvestorPortfolio();
  
  const stats = {
    totalInvested: portfolio?.totalInvested || 0,
    totalReturns: portfolio?.totalReturns || 0,
    propertiesCount: portfolio?.propertiesCount || 0,
    averageROI: portfolio?.averageROI || 8.5,
  };

  const investments = portfolio?.investments || [];

  // Generate recent activity from investments
  const recentActivity = investments.slice(0, 3).map(inv => ({
    type: "investment" as const,
    amount: inv.amount,
    property: inv.property?.title || "Proprietà",
    date: format(new Date(inv.created_at), "d MMM", { locale: it }),
  }));

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-64 md:col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Investitore</h1>
          <p className="text-muted-foreground">Panoramica del tuo portafoglio immobiliare</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifiche
          </Button>
          <Button size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Investi Ora
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="jungle-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valore Portafoglio</p>
                <p className="text-xl font-bold">€{stats.totalInvested.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              +12.5% questo mese
            </div>
          </CardContent>
        </Card>

        <Card className="jungle-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proprietà</p>
                <p className="text-xl font-bold">{stats.propertiesCount}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.propertiesCount} attive
            </p>
          </CardContent>
        </Card>

        <Card className="jungle-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <PieChart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ROI Medio</p>
                <p className="text-xl font-bold">{stats.averageROI}%</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              vs 3.5% mercato
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <Card className="jungle-card md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Il Tuo Portafoglio</CardTitle>
                <CardDescription>Proprietà in cui hai investito</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Vedi tutto
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {investments.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Non hai ancora investimenti</p>
                <Button className="mt-4" size="sm" onClick={() => onViewChange?.("invest")}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Esplora Opportunità
                </Button>
              </div>
            ) : (
              investments.slice(0, 3).map((investment) => (
                <div 
                  key={investment.id} 
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {investment.property?.images?.[0] ? (
                      <img src={investment.property.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{investment.property?.title || 'Proprietà'}</p>
                    <p className="text-sm text-muted-foreground">
                      {investment.property?.address}, {investment.property?.city}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        €{investment.amount.toLocaleString()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {investment.tokens} token
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      +{investment.property?.investor_share_percentage || 8.5}%
                    </p>
                    <p className="text-sm text-muted-foreground">annuo</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="jungle-card">
          <CardHeader>
            <CardTitle className="text-lg">Attività Recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Nessuna attività recente</p>
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nuovo investimento</p>
                    <p className="text-xs text-muted-foreground">{activity.property}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    €{activity.amount.toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

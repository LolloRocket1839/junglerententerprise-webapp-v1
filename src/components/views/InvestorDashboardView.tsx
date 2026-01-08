import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Wallet, 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  Calendar,
  Bell,
  ChevronRight,
  Euro
} from "lucide-react";
import { properties } from "@/lib/mock-data";

// Investor stats derived from properties
const investorStats = {
  totalInvested: 25000,
  totalReturns: 2125,
  propertiesCount: 3,
  activeProperties: 3,
  averageROI: 8.5,
  pendingDividends: 245,
};

export function InvestorDashboardView() {
  const stats = investorStats;
  
  const portfolioProperties = properties.slice(0, 3);
  
  const recentActivity = [
    { type: "dividend", amount: 245.00, property: "Via Roma 45", date: "2 giorni fa" },
    { type: "investment", amount: 5000.00, property: "Corso Vittorio 12", date: "1 settimana fa" },
    { type: "dividend", amount: 180.50, property: "Via Garibaldi 8", date: "2 settimane fa" },
  ];

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <div className="p-2 bg-green-100 rounded-lg">
                <Euro className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rendimenti Totali</p>
                <p className="text-xl font-bold">€{stats.totalReturns.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              +8.2% YoY
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
              {stats.activeProperties} attive
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
            {portfolioProperties.map((property) => (
              <div 
                key={property.id} 
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{property.name}</p>
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {property.currentMode === "student" ? "Studenti" : property.currentMode === "tourist" ? "Turisti" : "Ibrido"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Occupazione: {property.occupancy}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{((property.noi / property.price) * 100).toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">annuo</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="jungle-card">
          <CardHeader>
            <CardTitle className="text-lg">Attività Recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  activity.type === "dividend" 
                    ? "bg-green-100 text-green-600" 
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {activity.type === "dividend" ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.type === "dividend" ? "Dividendo ricevuto" : "Nuovo investimento"}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.property}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <p className={`text-sm font-semibold ${
                  activity.type === "dividend" ? "text-green-600" : "text-foreground"
                }`}>
                  {activity.type === "dividend" ? "+" : ""}€{activity.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card className="jungle-card">
        <CardHeader>
          <CardTitle>Distribuzione Rendimenti</CardTitle>
          <CardDescription>Ripartizione delle entrate per fonte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Affitti Studenteschi (70%)</span>
                  <span className="font-medium">€{(stats.totalReturns * 0.7).toLocaleString()}</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Affitti Turistici (30%)</span>
                  <span className="font-medium">€{(stats.totalReturns * 0.3).toLocaleString()}</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{stats.averageROI}%</p>
                <p className="text-sm text-muted-foreground">Rendimento annuo medio</p>
                <p className="text-xs text-green-600 mt-1">+2.5% rispetto all'anno scorso</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

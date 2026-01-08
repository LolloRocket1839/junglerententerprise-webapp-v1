import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  Calendar, 
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Euro,
  FileText,
  MessageSquare
} from "lucide-react";
import { mockPlatformAnalytics, mockProperties, mockApplications, mockBookings } from "@/lib/mock-data";

export function AdminDashboardView() {
  const analytics = mockPlatformAnalytics;
  const pendingApplications = mockApplications.filter(a => a.status === "pending").slice(0, 3);
  const recentBookings = mockBookings.slice(0, 3);

  const quickStats = [
    { 
      label: "Proprietà Totali", 
      value: analytics.totalProperties, 
      change: "+3 questo mese",
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      label: "Utenti Attivi", 
      value: analytics.activeUsers, 
      change: "+12% vs mese scorso",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      label: "Prenotazioni Attive", 
      value: analytics.activeBookings, 
      change: `${analytics.pendingBookings} in attesa`,
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    { 
      label: "Revenue Mensile", 
      value: `€${analytics.monthlyRevenue.toLocaleString()}`, 
      change: "+8.5% vs mese scorso",
      icon: Euro,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Amministratore</h1>
          <p className="text-muted-foreground">Panoramica della piattaforma JungleRent</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Report
          </Button>
          <Button size="sm">
            <Building2 className="h-4 w-4 mr-2" />
            Nuova Proprietà
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="jungle-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="jungle-card border-amber-200 bg-amber-50/50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">{analytics.pendingApplications} candidature in attesa</p>
              <p className="text-sm text-amber-600">Richiede revisione</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="jungle-card border-blue-200 bg-blue-50/50">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">{analytics.pendingPayments} pagamenti in sospeso</p>
              <p className="text-sm text-blue-600">€{analytics.pendingPaymentsAmount.toLocaleString()} totale</p>
            </div>
          </CardContent>
        </Card>

        <Card className="jungle-card border-green-200 bg-green-50/50">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Occupazione: {analytics.occupancyRate}%</p>
              <p className="text-sm text-green-600">Sopra la media del mercato</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Applications */}
        <Card className="jungle-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidature in Attesa</CardTitle>
                <CardDescription>Richieste di affitto da approvare</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Vedi tutte
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApplications.map((app) => (
              <div 
                key={app.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{app.studentName}</p>
                    <p className="text-sm text-muted-foreground">{app.propertyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-amber-200 text-amber-700">
                    In attesa
                  </Badge>
                  <Button size="sm" variant="outline">Rivedi</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="jungle-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Prenotazioni Recenti</CardTitle>
                <CardDescription>Ultime prenotazioni turistiche</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Vedi tutte
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.map((booking) => (
              <div 
                key={booking.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{booking.guestName}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.checkIn} - {booking.checkOut}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">€{booking.totalPrice}</p>
                  <Badge 
                    variant="outline" 
                    className={
                      booking.status === "confirmed" 
                        ? "border-green-200 text-green-700" 
                        : "border-amber-200 text-amber-700"
                    }
                  >
                    {booking.status === "confirmed" ? "Confermata" : "In attesa"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview */}
      <Card className="jungle-card">
        <CardHeader>
          <CardTitle>Distribuzione Revenue</CardTitle>
          <CardDescription>Entrate per categoria questo mese</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                    Affitti Studenteschi
                  </span>
                  <span className="font-medium">€{(analytics.monthlyRevenue * 0.65).toLocaleString()}</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent rounded-full"></span>
                    Affitti Turistici
                  </span>
                  <span className="font-medium">€{(analytics.monthlyRevenue * 0.30).toLocaleString()}</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    Servizi Aggiuntivi
                  </span>
                  <span className="font-medium">€{(analytics.monthlyRevenue * 0.05).toLocaleString()}</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">€{analytics.monthlyRevenue.toLocaleString()}</p>
                <p className="text-muted-foreground">Revenue totale del mese</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  +8.5% rispetto al mese scorso
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

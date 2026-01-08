import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Calendar, 
  CreditCard, 
  FileText, 
  Bell, 
  MapPin,
  Clock,
  Euro,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { leaseInfo, rentPayments, rentBreakdowns, properties } from "@/lib/mock-data";

export function StudentDashboardView() {
  const lease = leaseInfo[0];
  const property = properties.find(p => p.id === lease?.propertyId);
  const payments = rentPayments.slice(0, 3);
  const breakdown = rentBreakdowns[1];

  const nextPayment = payments.find(p => p.status === "due");
  const paidPayments = payments.filter(p => p.status === "paid").length;
  const totalPayments = 12;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ciao, Marco! 👋</h1>
          <p className="text-muted-foreground">Ecco la panoramica del tuo alloggio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifiche
          </Button>
          <Button size="sm">
            <CreditCard className="h-4 w-4 mr-2" />
            Paga Affitto
          </Button>
        </div>
      </div>

      {/* Current Housing Card */}
      <Card className="jungle-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
              <Home className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">{property?.name || "Appartamento"}</h2>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {property?.address || "Torino"}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Contratto Attivo
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Canone Mensile</p>
                  <p className="font-semibold">€{lease?.monthlyRent || 450}/mese</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inizio Contratto</p>
                  <p className="font-semibold">{lease?.startDate || "2025-09-01"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fine Contratto</p>
                  <p className="font-semibold">{lease?.endDate || "2026-06-30"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Camera</p>
                  <p className="font-semibold">{property?.type || "Studio"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="jungle-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pagamenti Effettuati</p>
                <p className="text-xl font-bold">{paidPayments}/{totalPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="jungle-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Euro className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prossimo Pagamento</p>
                <p className="text-xl font-bold">€{nextPayment?.amount || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="jungle-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scadenza</p>
                <p className="text-xl font-bold">{nextPayment?.dueDate || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="jungle-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documenti</p>
                <p className="text-xl font-bold">4 disponibili</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Payment History */}
        <Card className="jungle-card md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Storico Pagamenti</CardTitle>
                <CardDescription>I tuoi pagamenti recenti</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Vedi tutto
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {payments.map((payment) => (
              <div 
                key={payment.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    payment.status === "paid" 
                      ? "bg-green-100 text-green-600" 
                      : payment.status === "due"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {payment.status === "paid" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{payment.month}</p>
                    <p className="text-sm text-muted-foreground">{payment.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">€{payment.amount}</p>
                  <Badge variant="outline" className={`text-xs ${
                    payment.status === "paid" 
                      ? "border-green-200 text-green-700" 
                      : payment.status === "due"
                      ? "border-amber-200 text-amber-700"
                      : "border-muted text-muted-foreground"
                  }`}>
                    {payment.status === "paid" ? "Pagato" : payment.status === "due" ? "Da pagare" : "Prossimo"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Rent Breakdown */}
        <Card className="jungle-card">
          <CardHeader>
            <CardTitle className="text-lg">Dettaglio Canone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Affitto base</span>
                <span className="font-medium">€{breakdown.baseRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Spese condominiali</span>
                <span className="font-medium">€{breakdown.utilities}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Internet</span>
                <span className="font-medium">€{breakdown.internet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pulizie comuni</span>
                <span className="font-medium">€{breakdown.cleaning}</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Totale Mensile</span>
                <span className="text-primary">€{breakdown.total}</span>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Progresso Anno Accademico</p>
              <Progress value={(paidPayments / totalPayments) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {paidPayments} di {totalPayments} mesi pagati
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="jungle-card">
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Paga Affitto</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <FileText className="h-5 w-5" />
              <span>Documenti</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>Segnala Problema</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span>Calendario</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

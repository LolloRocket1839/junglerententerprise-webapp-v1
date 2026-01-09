import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Euro, 
  Calendar, 
  FileText, 
  CreditCard,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
  Phone
} from "lucide-react";
import { rentPayments, rentBreakdowns, leaseInfo, properties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const paymentStatusConfig = {
  paid: { label: "Pagato", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  due: { label: "Da pagare", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  upcoming: { label: "Prossimo", color: "bg-blue-100 text-blue-800", icon: Calendar },
  overdue: { label: "Scaduto", color: "bg-red-100 text-red-800", icon: AlertTriangle },
  late: { label: "In ritardo", color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
};

export function StudentRentView() {
  // Mock: use first lease as current
  const currentLease = leaseInfo[0];
  const property = properties.find(p => p.id === currentLease?.propertyId);
  const breakdown = rentBreakdowns[currentLease?.propertyId || 0];
  const payments = rentPayments.filter(p => p.studentId === currentLease?.studentId);

  const nextPayment = payments.find(p => p.status === "due" || p.status === "upcoming");
  const paidCount = payments.filter(p => p.status === "paid").length;
  const totalPayments = payments.length;

  if (!currentLease || !property) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Home className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Il Mio Affitto</h1>
            <p className="text-muted-foreground">Gestisci il tuo contratto e pagamenti</p>
          </div>
        </div>
        <Card className="jungle-card">
          <CardContent className="py-16 text-center">
            <Home className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Nessun contratto attivo</h3>
            <p className="text-muted-foreground mb-6">
              Non hai ancora un affitto attivo. Cerca un alloggio e invia la tua candidatura!
            </p>
            <Button>Cerca alloggio</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Home className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Il Mio Affitto</h1>
          <p className="text-muted-foreground">Gestisci il tuo contratto e pagamenti</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Property */}
          <Card className="jungle-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{property.name}</CardTitle>
                  <CardDescription>{property.address}</CardDescription>
                </div>
                <Badge variant="default">Attivo</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Inizio</p>
                  <p className="font-medium">{currentLease.startDate}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Fine</p>
                  <p className="font-medium">{currentLease.endDate}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Euro className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Affitto mensile</p>
                  <p className="font-medium">€{currentLease.monthlyRent}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Euro className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Deposito</p>
                  <p className="font-medium">€{currentLease.deposit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Payment */}
          {nextPayment && (
            <Card className="jungle-card border-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Prossimo pagamento</p>
                    <p className="text-3xl font-bold">€{nextPayment.amount}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scadenza: {nextPayment.dueDate}
                    </p>
                  </div>
                  <Button size="lg" className="gap-2">
                    <CreditCard className="h-5 w-5" />
                    Paga ora
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment History */}
          <Card className="jungle-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Storico Pagamenti</CardTitle>
                  <CardDescription>
                    {paidCount} di {totalPayments} rate pagate
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Progress value={(paidCount / totalPayments) * 100} className="w-24 h-2" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payments.map((payment) => {
                  const status = paymentStatusConfig[payment.status];
                  const StatusIcon = status.icon;
                  
                  return (
                    <div 
                      key={payment.id} 
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <StatusIcon className={cn(
                          "h-5 w-5",
                          payment.status === "paid" && "text-green-600",
                          payment.status === "due" && "text-yellow-600",
                          payment.status === "overdue" && "text-red-600"
                        )} />
                        <div>
                          <p className="font-medium">{payment.month}</p>
                          <p className="text-sm text-muted-foreground">
                            Scadenza: {payment.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={status.color}>{status.label}</Badge>
                        <p className="font-semibold">€{payment.amount}</p>
                        {payment.status === "paid" && (
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rent Breakdown */}
          {breakdown && (
            <Card className="jungle-card">
              <CardHeader>
                <CardTitle className="text-lg">Dettaglio Canone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Affitto base</span>
                  <span>€{breakdown.baseRent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Utenze</span>
                  <span>€{breakdown.utilities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Internet</span>
                  <span>€{breakdown.internet}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pulizie</span>
                  <span>€{breakdown.cleaning}</span>
                </div>
                {breakdown.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Sconto</span>
                    <span>-€{breakdown.discount}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Totale</span>
                  <span>€{breakdown.total}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-lg">Documenti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Contratto di locazione
                <Download className="h-4 w-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Inventario
                <Download className="h-4 w-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Regolamento casa
                <Download className="h-4 w-4 ml-auto" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-lg">Azioni Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Wrench className="h-4 w-4" />
                Segnala problema
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Phone className="h-4 w-4" />
                Contatta proprietario
              </Button>
            </CardContent>
          </Card>

          {/* Guarantor Info */}
          <Card className="jungle-card">
            <CardHeader>
              <CardTitle className="text-lg">Garante</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{currentLease.guarantorName}</p>
              <p className="text-sm text-muted-foreground">{currentLease.guarantorContact}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

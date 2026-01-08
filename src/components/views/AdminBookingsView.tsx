import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminBookings, useUpdateBookingStatus } from "@/hooks/useAdminBookings";
import { CalendarCheck, Building2, Users, Euro, MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format, differenceInDays } from "date-fns";
import { it } from "date-fns/locale";

export function AdminBookingsView() {
  const { data: bookings, isLoading } = useAdminBookings();
  const updateStatus = useUpdateBookingStatus();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredBookings = bookings?.filter(b => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesType = typeFilter === "all" || b.booking_type === typeFilter;
    return matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode; label: string }> = {
      confirmed: { variant: "default", icon: <CheckCircle className="h-3 w-3" />, label: "Confermata" },
      pending: { variant: "outline", icon: <Clock className="h-3 w-3" />, label: "In attesa" },
      cancelled: { variant: "destructive", icon: <XCircle className="h-3 w-3" />, label: "Cancellata" },
      completed: { variant: "secondary", icon: <CheckCircle className="h-3 w-3" />, label: "Completata" }
    };
    const cfg = config[status] || config.pending;
    return (
      <Badge variant={cfg.variant} className="flex items-center gap-1">
        {cfg.icon}
        {cfg.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      student: "🎓 Studente",
      tourist: "✈️ Turista"
    };
    return <Badge variant="secondary">{labels[type] || type}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const pendingCount = bookings?.filter(b => b.status === 'pending').length || 0;
  const totalRevenue = filteredBookings?.reduce((sum, b) => sum + Number(b.total_price), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Totale Prenotazioni</p>
                <p className="text-2xl font-bold">{bookings?.length || 0}</p>
              </div>
              <CalendarCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Attesa</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Totale</p>
                <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
              </div>
              <Euro className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-6 w-6 text-primary" />
            Prenotazioni
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="pending">In attesa</SelectItem>
                <SelectItem value="confirmed">Confermate</SelectItem>
                <SelectItem value="completed">Completate</SelectItem>
                <SelectItem value="cancelled">Cancellate</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i tipi</SelectItem>
                <SelectItem value="student">Studenti</SelectItem>
                <SelectItem value="tourist">Turisti</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Ospite</TableHead>
                  <TableHead>Proprietà</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Totale</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings?.map((booking) => {
                  const nights = differenceInDays(new Date(booking.check_out), new Date(booking.check_in));
                  return (
                    <TableRow key={booking.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="font-medium">
                          {booking.guest?.first_name} {booking.guest?.last_name}
                        </div>
                        {booking.number_of_guests && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {booking.number_of_guests} ospiti
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{booking.property?.title || 'N/A'}</div>
                            <div className="text-sm text-muted-foreground">{booking.property?.city}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(booking.booking_type)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{format(new Date(booking.check_in), 'dd MMM', { locale: it })}</div>
                          <div className="text-muted-foreground">
                            → {format(new Date(booking.check_out), 'dd MMM', { locale: it })}
                          </div>
                          <div className="text-xs text-muted-foreground">{nights} notti</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium flex items-center gap-1">
                          <Euro className="h-3 w-3" />
                          {Number(booking.total_price).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => updateStatus.mutate({ id: booking.id, status: 'confirmed' })}
                            >
                              ✅ Conferma
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateStatus.mutate({ id: booking.id, status: 'completed' })}
                            >
                              🏁 Completa
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateStatus.mutate({ id: booking.id, status: 'cancelled' })}
                              className="text-red-600"
                            >
                              ❌ Cancella
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredBookings?.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <CalendarCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nessuna prenotazione trovata</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

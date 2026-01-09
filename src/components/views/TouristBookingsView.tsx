import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Euro,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  MessageCircle,
  Phone,
  Navigation,
  Download
} from "lucide-react";
import { bookings, properties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: { label: "In attesa", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Confermata", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  cancelled: { label: "Cancellata", color: "bg-red-100 text-red-800", icon: XCircle },
  completed: { label: "Completata", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
};

export function TouristBookingsView() {
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const getProperty = (propertyId: number) => 
    properties.find(p => p.id === propertyId);

  const upcomingBookings = bookings.filter(b => 
    b.status === "confirmed" || b.status === "pending"
  );
  const pastBookings = bookings.filter(b => 
    b.status === "completed" || b.status === "cancelled"
  );

  const handleCancelBooking = (booking: typeof bookings[0]) => {
    // In production, this would update the booking in Supabase
    console.log("Cancelling booking:", booking.id);
    setSelectedBooking(null);
  };

  const handleSubmitReview = () => {
    // In production, this would create a review in Supabase
    console.log("Submitting review:", { rating, review });
    setShowReviewDialog(false);
    setRating(0);
    setReview("");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Le Mie Prenotazioni</h1>
          <p className="text-muted-foreground">Gestisci i tuoi soggiorni</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{bookings.length}</p>
            <p className="text-sm text-muted-foreground">Totale prenotazioni</p>
          </CardContent>
        </Card>
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{upcomingBookings.length}</p>
            <p className="text-sm text-muted-foreground">Prossime</p>
          </CardContent>
        </Card>
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">
              {pastBookings.filter(b => b.status === "completed").length}
            </p>
            <p className="text-sm text-muted-foreground">Completate</p>
          </CardContent>
        </Card>
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">
              {bookings.reduce((acc, b) => acc + b.nights, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Notti totali</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">
            Prossime ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Passate ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingBookings.length === 0 ? (
            <Card className="jungle-card">
              <CardContent className="py-12 text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nessuna prenotazione</h3>
                <p className="text-muted-foreground mb-4">
                  Non hai prenotazioni in arrivo. Inizia a pianificare il tuo prossimo viaggio!
                </p>
                <Button>Cerca alloggio</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => {
                const property = getProperty(booking.propertyId);
                const status = statusConfig[booking.status];
                const StatusIcon = status.icon;

                return (
                  <Card key={booking.id} className="jungle-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-48 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-primary/30" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{property?.name}</h3>
                            <Badge className={status.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {property?.address}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.checkIn} → {booking.checkOut}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {booking.guestCount} ospiti
                            </span>
                            <span className="flex items-center gap-1">
                              <Euro className="h-4 w-4" />
                              €{booking.total}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" onClick={() => setSelectedBooking(booking)}>
                              Dettagli
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Contatta host
                            </Button>
                            <Button variant="outline" size="sm">
                              <Navigation className="h-4 w-4 mr-2" />
                              Indicazioni
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastBookings.length === 0 ? (
            <Card className="jungle-card">
              <CardContent className="py-12 text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nessun soggiorno passato</h3>
                <p className="text-muted-foreground">
                  I tuoi soggiorni completati appariranno qui
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => {
                const property = getProperty(booking.propertyId);
                const status = statusConfig[booking.status];

                return (
                  <Card key={booking.id} className="jungle-card opacity-90">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold">{property?.name}</h3>
                            <Badge className={status.color}>{status.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {booking.checkIn} → {booking.checkOut} · {booking.nights} notti · €{booking.total}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {booking.status === "completed" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowReviewDialog(true);
                              }}
                            >
                              <Star className="h-4 w-4 mr-2" />
                              Lascia recensione
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Ricevuta
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking && !showReviewDialog} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Dettagli Prenotazione</DialogTitle>
                <DialogDescription>
                  Prenotazione #{selectedBooking.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">{getProperty(selectedBooking.propertyId)?.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getProperty(selectedBooking.propertyId)?.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in</p>
                    <p className="font-medium">{selectedBooking.checkIn}</p>
                    <p className="text-xs text-muted-foreground">Dalle ore 15:00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Check-out</p>
                    <p className="font-medium">{selectedBooking.checkOut}</p>
                    <p className="text-xs text-muted-foreground">Entro le ore 10:00</p>
                  </div>
                </div>

                <div className="flex justify-between p-3 border rounded-lg">
                  <span>Totale pagato</span>
                  <span className="font-semibold">€{selectedBooking.total}</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Chiama host
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Navigation className="h-4 w-4 mr-2" />
                    Apri in Maps
                  </Button>
                </div>
              </div>

              <DialogFooter>
                {selectedBooking.status === "confirmed" && (
                  <Button 
                    variant="destructive" 
                    onClick={() => handleCancelBooking(selectedBooking)}
                  >
                    Cancella prenotazione
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Chiudi
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lascia una recensione</DialogTitle>
            <DialogDescription>
              Racconta la tua esperienza
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star 
                    className={cn(
                      "h-8 w-8 transition-colors",
                      star <= rating 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-muted-foreground"
                    )} 
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Scrivi la tua recensione..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmitReview} disabled={rating === 0}>
              Pubblica recensione
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

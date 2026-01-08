import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Star, 
  Heart, 
  ChevronRight,
  Plane,
  Clock,
  Users,
  Bed
} from "lucide-react";
import { mockBookings, mockProperties } from "@/lib/mock-data";

export function TouristDashboardView() {
  const upcomingBookings = mockBookings.filter(b => b.status === "confirmed").slice(0, 2);
  const featuredProperties = mockProperties.filter(p => p.currentMode === "tourist").slice(0, 3);

  const popularDestinations = [
    { city: "Torino", properties: 24, avgPrice: 85 },
    { city: "Milano", properties: 18, avgPrice: 95 },
    { city: "Bologna", properties: 15, avgPrice: 75 },
    { city: "Firenze", properties: 12, avgPrice: 90 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Search Section */}
      <Card className="jungle-card bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Trova il tuo soggiorno perfetto
            </h1>
            <p className="text-muted-foreground">
              Esplora alloggi unici nelle città universitarie italiane
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Dove vuoi andare?"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Check-in"
                  className="w-32 pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Check-out"
                  className="w-32 pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <Button size="lg" className="gap-2">
              <Search className="h-5 w-5" />
              Cerca
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <Card className="jungle-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  Le Tue Prenotazioni
                </CardTitle>
                <CardDescription>Prossimi soggiorni confermati</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Vedi tutte
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="flex gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                    <Bed className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{booking.propertyName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {booking.address}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {booking.checkIn} - {booking.checkOut}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {booking.guests} ospiti
                      </span>
                    </div>
                    <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
                      Confermata
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Destinazioni Popolari</h2>
          <Button variant="ghost" size="sm">
            Vedi tutte
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularDestinations.map((dest) => (
            <Card 
              key={dest.city}
              className="jungle-card-interactive overflow-hidden"
            >
              <div className="h-24 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{dest.city}</h3>
                <p className="text-sm text-muted-foreground">{dest.properties} alloggi</p>
                <p className="text-sm font-medium text-primary mt-1">
                  da €{dest.avgPrice}/notte
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Consigliati per Te</h2>
          <Button variant="ghost" size="sm">
            Esplora
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredProperties.map((property) => (
            <Card 
              key={property.id}
              className="jungle-card-interactive overflow-hidden"
            >
              <div className="relative h-40 bg-muted flex items-center justify-center">
                <Bed className="h-12 w-12 text-muted-foreground" />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{property.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {property.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>{property.beds} letti</span>
                  <span>•</span>
                  <span>{property.baths} bagni</span>
                  <span>•</span>
                  <span>{property.sqm}m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">
                    €{property.pricePerNight}
                    <span className="text-sm font-normal text-muted-foreground">/notte</span>
                  </p>
                  <Button size="sm" variant="outline">Prenota</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why JungleRent */}
      <Card className="jungle-card">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Perché scegliere JungleRent?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Qualità Garantita</h3>
              <p className="text-sm text-muted-foreground">
                Tutti gli alloggi sono verificati e mantenuti agli standard più alti.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Posizioni Centrali</h3>
              <p className="text-sm text-muted-foreground">
                Vicino alle università, ai trasporti e alle attrazioni principali.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Check-in Flessibile</h3>
              <p className="text-sm text-muted-foreground">
                Self check-in disponibile 24/7 per la massima comodità.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

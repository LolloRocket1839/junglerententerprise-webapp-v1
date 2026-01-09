import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
  Search, 
  MapPin, 
  Calendar,
  Users,
  Star,
  Heart,
  Wifi,
  Car,
  Coffee,
  Waves
} from "lucide-react";
import { properties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TouristBrowseView() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProperties = properties.filter(p => {
    const matchesDestination = !destination || 
      p.address.toLowerCase().includes(destination.toLowerCase()) ||
      p.name.toLowerCase().includes(destination.toLowerCase());
    return matchesDestination;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleBook = (property: typeof properties[0]) => {
    // In production, this would create a booking in Supabase
    console.log("Booking property:", property.id, { checkIn, checkOut, guests });
    setSelectedProperty(null);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Cerca Alloggio</h1>
          <p className="text-muted-foreground">Trova il soggiorno perfetto per la tua vacanza</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="jungle-card mb-6">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <Label className="text-xs text-muted-foreground">Destinazione</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Dove vuoi andare?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Check-in</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Check-out</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Ospiti</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted-foreground">
          {filteredProperties.length} alloggi disponibili
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card 
            key={property.id} 
            className="jungle-card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedProperty(property)}
          >
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <Waves className="h-16 w-16 text-primary/30" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
              >
                <Heart className={cn(
                  "h-5 w-5",
                  favorites.includes(property.id) && "fill-red-500 text-red-500"
                )} />
              </Button>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                <MapPin className="h-4 w-4" />
                {property.address}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {property.wifi && (
                  <Badge variant="secondary" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    WiFi
                  </Badge>
                )}
                {property.parking && (
                  <Badge variant="secondary" className="text-xs">
                    <Car className="h-3 w-3 mr-1" />
                    Parcheggio
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  <Coffee className="h-3 w-3 mr-1" />
                  Colazione
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">€{property.nightlyRate}</span>
                  <span className="text-muted-foreground">/notte</span>
                </div>
                <Button size="sm">Prenota</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nessun risultato</h3>
          <p className="text-muted-foreground">
            Prova a modificare la destinazione o le date
          </p>
        </div>
      )}

      {/* Property Detail Dialog */}
      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProperty.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedProperty.address}
                  <span className="flex items-center gap-1 ml-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    4.8 (124 recensioni)
                  </span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                  <Waves className="h-20 w-20 text-primary/30" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.amenities.map((amenity, i) => (
                    <Badge key={i} variant="secondary">{amenity}</Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Check-in</Label>
                    <Input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Check-out</Label>
                    <Input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>

                {nights > 0 && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>€{selectedProperty.nightlyRate} x {nights} notti</span>
                      <span>€{selectedProperty.nightlyRate * nights}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Pulizie</span>
                      <span>€50</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Tasse di soggiorno</span>
                      <span>€{nights * 3}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Totale</span>
                      <span>€{selectedProperty.nightlyRate * nights + 50 + nights * 3}</span>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedProperty(null)}>
                  Chiudi
                </Button>
                <Button onClick={() => handleBook(selectedProperty)} disabled={nights === 0}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Prenota ora
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

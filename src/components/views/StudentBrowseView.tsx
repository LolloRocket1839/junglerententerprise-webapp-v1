import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
  Search, 
  MapPin, 
  Euro, 
  Bed, 
  Bath,
  Wifi,
  Car,
  Heart,
  GraduationCap,
  Filter,
  X
} from "lucide-react";
import { properties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const cities = ["Milano", "Roma", "Bologna", "Firenze", "Torino", "Napoli"];

export function StudentBrowseView() {
  const [searchCity, setSearchCity] = useState("");
  const [priceRange, setPriceRange] = useState([300, 800]);
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter(p => {
    const matchesCity = !searchCity || p.address.toLowerCase().includes(searchCity.toLowerCase());
    const matchesPrice = p.monthlyRate >= priceRange[0] && p.monthlyRate <= priceRange[1];
    return matchesCity && matchesPrice;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleApply = (property: typeof properties[0]) => {
    // In production, this would create an application in Supabase
    console.log("Applying to property:", property.id);
    setSelectedProperty(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Cerca Alloggio</h1>
          <p className="text-muted-foreground">Trova la tua stanza ideale vicino all'università</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="jungle-card mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label className="sr-only">Città</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select value={searchCity} onValueChange={setSearchCity}>
                  <SelectTrigger className="pl-9">
                    <SelectValue placeholder="Seleziona città" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex-1">
              <Label className="sr-only">Budget</Label>
              <div className="px-3 py-2 border rounded-md">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Budget mensile</span>
                  <span className="font-medium">€{priceRange[0]} - €{priceRange[1]}</span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={200}
                  max={1500}
                  step={50}
                />
              </div>
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtri
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Cerca
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted-foreground">
          {filteredProperties.length} alloggi trovati
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
                <Bed className="h-16 w-16 text-primary/30" />
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
              <Badge className="absolute bottom-2 left-2">
                {property.type}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                <MapPin className="h-4 w-4" />
                {property.address}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {property.bedrooms} camere
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {property.distance}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">€{property.monthlyRate}</span>
                  <span className="text-muted-foreground">/mese</span>
                </div>
                <div className="flex gap-1">
                  {property.wifi && <Wifi className="h-4 w-4 text-muted-foreground" />}
                  {property.parking && <Car className="h-4 w-4 text-muted-foreground" />}
                </div>
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
            Prova a modificare i filtri di ricerca
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
                <DialogDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedProperty.address}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                  <Bed className="h-20 w-20 text-primary/30" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Bed className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">{selectedProperty.bedrooms} Camere</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <GraduationCap className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">{selectedProperty.distance}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Euro className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">€{selectedProperty.monthlyRate}/mese</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Bath className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">1 Bagno</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Servizi inclusi</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities.map((amenity, i) => (
                      <Badge key={i} variant="secondary">{amenity}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedProperty(null)}>
                  Chiudi
                </Button>
                <Button onClick={() => handleApply(selectedProperty)}>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Candidati ora
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

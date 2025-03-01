
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Users, Star, MapPin, Wifi, Wind, DoorClosed, Coffee } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PropertyListing {
  id: string;
  title: string;
  location: string;
  distance: string;
  price: number;
  rating: number;
  features: string[];
  imagePlaceholder: string;
  description: string;
  availability: {
    start: string;
    end: string;
  };
}

const StaySection = () => {
  const [dateRange, setDateRange] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);
  const [searchLocation, setSearchLocation] = useState('');
  const { toast } = useToast();

  const mockListings: PropertyListing[] = [
    {
      id: '1',
      title: 'Appartamento nel Centro di Roma',
      location: 'Via Sallustiana, Roma',
      distance: 'Centro Storico',
      price: 95,
      rating: 4.8,
      features: ['Wi-Fi', 'A/C', '2 camere', 'Terrazza'],
      imagePlaceholder: 'photo-1487958449943-2429e8be8625',
      description: 'Splendido appartamento completamente ristrutturato nel cuore di Roma, a pochi passi dai principali monumenti.',
      availability: {
        start: '2024-06-01',
        end: '2024-08-31'
      }
    },
    {
      id: '2',
      title: 'Appartamento Vicino Colosseo',
      location: 'Via Capo d\'Africa, Roma',
      distance: 'Colosseo',
      price: 120,
      rating: 4.9,
      features: ['Wi-Fi', 'A/C', '1 camera', 'Vista Colosseo'],
      imagePlaceholder: 'photo-1506744038136-46273834b3fb',
      description: 'Accogliente appartamento con vista diretta sul Colosseo, perfetto per brevi soggiorni estivi.',
      availability: {
        start: '2024-06-01',
        end: '2024-08-31'
      }
    }
  ];

  const handleSearch = () => {
    if (!dateRange.checkIn || !dateRange.checkOut) {
      toast({
        title: "Date richieste",
        description: "Per favore seleziona le date di check-in e check-out",
        variant: "destructive"
      });
      return;
    }
    // Implementazione della ricerca da completare
  };

  const getAmenityIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wi-fi':
        return <Wifi className="h-4 w-4" />;
      case 'a/c':
        return <Wind className="h-4 w-4" />;
      case '1 camera':
      case '2 camere':
        return <DoorClosed className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Trova il tuo alloggio estivo perfetto</h1>
        <p className="text-gray-600 mb-8">Appartamenti disponibili da giugno ad agosto nel cuore delle città italiane</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Cerca per città o zona..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <Input
                type="date"
                value={dateRange.checkIn}
                min="2024-06-01"
                max="2024-08-31"
                onChange={(e) => setDateRange({ ...dateRange, checkIn: e.target.value })}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Input
                type="date"
                value={dateRange.checkOut}
                min="2024-06-01"
                max="2024-08-31"
                onChange={(e) => setDateRange({ ...dateRange, checkOut: e.target.value })}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <Input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="pl-10"
              placeholder="Ospiti"
            />
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <Button 
            className="bg-green-500 hover:bg-green-600 text-white w-full"
            onClick={handleSearch}
          >
            Cerca
          </Button>
        </div>
      </div>

      {/* Property Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Property Image */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={`https://images.unsplash.com/${listing.imagePlaceholder}`}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{listing.rating}</span>
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{listing.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.location} • {listing.distance}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
              <div className="flex flex-wrap gap-2">
                {listing.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md flex items-center gap-1"
                  >
                    {getAmenityIcon(feature)}
                    {feature}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">€{listing.price}</span>
                <span className="text-gray-500"> /notte</span>
              </div>
              <Button variant="outline">Dettagli</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StaySection;


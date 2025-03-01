
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Users, Star, MapPin } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface PropertyListing {
  id: string;
  title: string;
  location: string;
  distance: string;
  price: number;
  rating: number;
  features: string[];
  imagePlaceholder: string;
}

const StaySection = () => {
  const [dateRange, setDateRange] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);

  const mockListings: PropertyListing[] = [
    {
      id: '1',
      title: 'Appartamento nel Centro di Roma',
      location: 'Via Sallustiana, Roma',
      distance: 'Centro Storico',
      price: 95,
      rating: 4.8,
      features: ['2 camere', 'Wi-Fi', 'A/C'],
      imagePlaceholder: 'photo-1487958449943-2429e8be8625'
    },
    {
      id: '2',
      title: 'Appartamento Vicino Colosseo',
      location: 'Via Capo d\'Africa, Roma',
      distance: 'Colosseo',
      price: 120,
      rating: 4.9,
      features: ['1 camera', 'Wi-Fi', 'Terrazza'],
      imagePlaceholder: 'photo-1506744038136-46273834b3fb'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Cerca per città o zona..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <Input
                type="date"
                value={dateRange.checkIn}
                onChange={(e) => setDateRange({ ...dateRange, checkIn: e.target.value })}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Input
                type="date"
                value={dateRange.checkOut}
                onChange={(e) => setDateRange({ ...dateRange, checkOut: e.target.value })}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
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
            <Button className="bg-green-500 hover:bg-green-600">
              Cerca
            </Button>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            {/* Property Image */}
            <div className="h-48 bg-gray-200 relative">
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
              <div className="flex flex-wrap gap-2">
                {listing.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md"
                  >
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

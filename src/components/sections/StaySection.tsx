import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import SearchBar from '../stay/SearchBar';
import PropertyCard from '../stay/PropertyCard';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  features: string[];
  description: string;
  imageUrl: string;
}

const StaySection = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [dateRange, setDateRange] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);
  const { toast } = useToast();

  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Appartamento nel Centro di Roma',
      location: 'Via Sallustiana, Roma',
      price: 95,
      rating: 4.8,
      features: ['Wi-Fi', 'Aria Condizionata', 'Camera Doppia', 'Terrazza'],
      description: 'Splendido appartamento completamente ristrutturato nel cuore di Roma, a pochi passi dai principali monumenti.',
      imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625'
    },
    {
      id: '2',
      title: 'Appartamento Vicino Colosseo',
      location: 'Via Capo d\'Africa, Roma',
      price: 120,
      rating: 4.9,
      features: ['Wi-Fi', 'Aria Condizionata', 'Camera Singola', 'Vista Colosseo'],
      description: 'Accogliente appartamento con vista diretta sul Colosseo, perfetto per brevi soggiorni estivi.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
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

    // Qui implementeremo la logica di ricerca effettiva
    console.log('Searching with:', { searchLocation, dateRange, guests });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Trova il tuo alloggio estivo perfetto
          </h1>
          <p className="text-white/80 text-lg">
            Appartamenti disponibili da giugno ad agosto nel cuore delle città italiane
          </p>
        </div>

        {/* Search Section */}
        <SearchBar
          onSearch={handleSearch}
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          dateRange={dateRange}
          setDateRange={setDateRange}
          guests={guests}
          setGuests={setGuests}
        />

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaySection;

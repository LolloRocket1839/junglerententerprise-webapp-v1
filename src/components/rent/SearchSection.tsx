import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import SearchHero from './search/SearchHero';
import RoomGrid from './search/RoomGrid';

const SearchSection = () => {
  const [city, setCity] = useState('');
  const [roomType, setRoomType] = useState('');
  const { toast } = useToast();

  const mockRooms = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      hub: "Villa Roma Nord",
      room: "Wolfgang Amadeus Mozart Suite",
      price: 650,
      rating: 4.8,
      reviews: 24,
      features: ["Balcony", "Private Bathroom", "Study Desk"],
      tags: ["Same Price", "Immediate", "Nightlife", "City Center"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      hub: "Villa Roma Sud",
      room: "Ludwig van Beethoven Studio",
      price: 750,
      rating: 4.5,
      reviews: 18,
      features: ["Corner Room", "City View", "Shared Kitchen"],
      tags: ["Price Difference", "Flexible Move", "Near University"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      hub: "Student House Milano",
      room: "Isaac Newton Suite",
      price: 850,
      rating: 4.9,
      reviews: 32,
      features: ["Private Kitchen", "Double Bed", "Work Area"],
      tags: ["Premium", "Student Area", "Transport Hub"]
    }
  ];

  const handleSearch = () => {
    if (!city.trim()) {
      toast({
        title: "Inserisci una città",
        description: "Abbiamo bisogno di sapere dove vuoi alloggiare",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ricerca avviata",
      description: `Ricerca di ${roomType || 'tutte le stanze'} a ${city}`,
    });
  };

  return (
    <div className="text-center mb-20">
      <SearchHero
        city={city}
        onCityChange={setCity}
        roomType={roomType}
        onRoomTypeChange={setRoomType}
        onSearch={handleSearch}
      />
      <RoomGrid rooms={mockRooms} />
    </div>
  );
};

export default SearchSection;

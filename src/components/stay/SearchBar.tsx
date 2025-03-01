
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Users } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchParams: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => void;
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  dateRange: {
    checkIn: string;
    checkOut: string;
  };
  setDateRange: (dates: { checkIn: string; checkOut: string }) => void;
  guests: number;
  setGuests: (guests: number) => void;
}

const SearchBar = ({
  onSearch,
  searchLocation,
  setSearchLocation,
  dateRange,
  setDateRange,
  guests,
  setGuests
}: SearchBarProps) => {
  const handleSearch = () => {
    onSearch({
      location: searchLocation,
      checkIn: dateRange.checkIn,
      checkOut: dateRange.checkOut,
      guests: guests
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Città o zona..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Input
              type="date"
              value={dateRange.checkIn}
              min="2024-06-01"
              max="2024-08-31"
              onChange={(e) => setDateRange({ ...dateRange, checkIn: e.target.value })}
              className="pl-10 bg-white/10 border-white/20 text-white"
            />
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          </div>
          <div className="relative">
            <Input
              type="date"
              value={dateRange.checkOut}
              min="2024-06-01"
              max="2024-08-31"
              onChange={(e) => setDateRange({ ...dateRange, checkOut: e.target.value })}
              className="pl-10 bg-white/10 border-white/20 text-white"
            />
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          </div>
        </div>

        <div className="relative">
          <Input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="pl-10 bg-white/10 border-white/20 text-white"
            placeholder="Ospiti"
          />
          <Users className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        </div>

        <Button 
          onClick={handleSearch}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Cerca
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

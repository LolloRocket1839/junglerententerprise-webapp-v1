import React from 'react';
import { MapPin, Home, Search } from 'lucide-react';

const SearchSection = () => {
  return (
    <div className="text-center mb-8 sm:mb-20 animate-fade-in">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Find Your Student
          <span className="block text-primary animate-pulse">Home</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto px-4">
          Long-term rentals verified and managed by Jungle Rent
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card p-3">
          <div className="flex flex-col sm:grid sm:grid-cols-7 gap-3">
            <div className="sm:col-span-3 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="University City"
                className="glass-input w-full pl-10"
              />
            </div>
            <div className="sm:col-span-3 relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <select className="glass-input w-full pl-10 appearance-none">
                <option>Room Type</option>
                <option>Single Room</option>
                <option>Double Room</option>
                <option>Studio</option>
              </select>
            </div>
            <button className="glass-button flex items-center justify-center gap-2 w-full">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
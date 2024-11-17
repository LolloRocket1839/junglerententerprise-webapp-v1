import React from 'react';
import { MapPin, Home, Search } from 'lucide-react';

const SearchSection = () => {
  return (
    <div className="text-center mb-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Student
          <span className="block text-primary animate-pulse">Home</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Long-term rentals verified and managed by Jungle Rent
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card p-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-3 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="University City"
                className="glass-input w-full pl-12"
                aria-label="University City"
              />
            </div>
            
            <div className="md:col-span-3 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                <Home className="w-5 h-5" />
              </div>
              <select 
                className="glass-input w-full pl-12 appearance-none bg-transparent text-white cursor-pointer"
                aria-label="Room Type"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em'
                }}
              >
                <option value="" className="bg-[#111111] text-white">Room Type</option>
                <option value="single" className="bg-[#111111] text-white">Single Room</option>
                <option value="double" className="bg-[#111111] text-white">Double Room</option>
                <option value="studio" className="bg-[#111111] text-white">Studio</option>
              </select>
            </div>

            <button 
              className="glass-button flex items-center justify-center gap-3 w-full"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
import React from 'react';
import { MapPin, Home, Search } from 'lucide-react';

const SearchSection = () => {
  return (
    <div className="text-center mb-20">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Student
          <span className="block text-green-400">Home</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Long-term rentals verified and managed by Jungle Rent
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            <div className="md:col-span-3 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="University City"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="md:col-span-3 relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white/60 focus:outline-none focus:border-green-500 appearance-none">
                <option>Room Type</option>
                <option>Single Room</option>
                <option>Double Room</option>
                <option>Studio</option>
              </select>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 px-6 transition-all hover:scale-105 flex items-center justify-center gap-2">
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
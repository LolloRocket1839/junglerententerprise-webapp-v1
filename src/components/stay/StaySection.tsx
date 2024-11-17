import React, { useState } from 'react';
import { 
  Search, 
  Calendar,
  Users,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Book,
  ArrowRight,
  Shield
} from 'lucide-react';

const StaySection = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    dates: '',
    guests: 1,
    purpose: 'exam'
  });

  return (
    <div className="min-h-screen">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      {/* Hero Search Section */}
      <div className="relative py-20 px-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Find your perfect short-term stay
          </h1>
          <p className="text-xl text-white/80 animate-fade-in">
            Book verified accommodations near where you need to be
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <MapPin className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="University City"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Calendar className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="Check-in - Check-out"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Users className="h-5 w-5 text-white/60" />
                </div>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white/60 focus:outline-none focus:border-green-500 appearance-none"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                </select>
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 transition-colors flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="premium-card"
            >
              {/* Property Image */}
              <div className="relative h-48 bg-white/5">
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verified
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Student Loft Roma
                    </h3>
                    <p className="text-white/60 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      5 min from La Sapienza
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <Star className="w-4 h-4 fill-current" />
                    4.8
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <Wifi className="w-4 h-4" />
                    <span>WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Coffee className="w-4 h-4" />
                    <span>Kitchen</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Book className="w-4 h-4" />
                    <span>Study Area</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-end justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-2xl font-bold text-white">€45</p>
                    <p className="text-white/60">per night</p>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaySection;
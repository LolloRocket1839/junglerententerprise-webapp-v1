import React from 'react';
import { MapPin, Home, Search, Star } from 'lucide-react';

const SearchSection = () => {
  const mockRooms = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      hub: "Villa Roma Nord",
      room: "Marie Curie Suite",
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
      room: "Leonardo da Vinci Studio",
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
      room: "Christine Lagarde Suite",
      price: 850,
      rating: 4.9,
      reviews: 32,
      features: ["Private Kitchen", "Double Bed", "Work Area"],
      tags: ["Premium", "Student Area", "Transport Hub"]
    }
  ];

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

      <div className="max-w-4xl mx-auto px-4 mb-16">
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

      {/* Room Listings */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRooms.map((room) => (
            <div key={room.id} className="glass-card overflow-hidden group">
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={`${room.hub} - ${room.room}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{room.rating}</span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{room.hub}</h3>
                  <p className="text-white/60">{room.room}</p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price and Reviews */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-2xl font-bold text-white">€{room.price}</p>
                    <p className="text-white/60">per month</p>
                  </div>
                  <p className="text-white/60 text-sm">
                    {room.reviews} reviews
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
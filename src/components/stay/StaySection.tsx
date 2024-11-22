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

  const stayListings = [
    {
      id: 1,
      title: "Student Loft Roma",
      location: "5 min from La Sapienza",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      rating: 4.8,
      price: 45,
      amenities: ["WiFi", "Kitchen", "Study Area"]
    },
    {
      id: 2,
      title: "Academia Milano",
      location: "Near Politecnico",
      image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a",
      rating: 4.7,
      price: 55,
      amenities: ["WiFi", "Kitchen", "Study Area"]
    },
    {
      id: 3,
      title: "Galileo's View Florence",
      location: "10 min from University of Florence",
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace",
      rating: 4.9,
      price: 50,
      amenities: ["WiFi", "Kitchen", "Study Area"]
    },
    {
      id: 4,
      title: "Da Vinci Residence",
      location: "Central Turin",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      rating: 4.6,
      price: 40,
      amenities: ["WiFi", "Kitchen", "Study Area"]
    },
    {
      id: 5,
      title: "Archimedes House",
      location: "Syracuse Historic Center",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
      rating: 4.7,
      price: 35,
      amenities: ["WiFi", "Kitchen", "Study Area"]
    },
    {
      id: 6,
      title: "Pythagoras Garden",
      location: "Bologna University Area",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      rating: 4.8,
      price: 45,
      amenities: ["WiFi", "Kitchen", "Study Area"]
    }
  ];

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
          {stayListings.map((listing) => (
            <div 
              key={listing.id} 
              className="premium-card group"
            >
              {/* Property Image */}
              <div className="relative h-48 bg-white/5 overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
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
                      {listing.title}
                    </h3>
                    <p className="text-white/60 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {listing.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <Star className="w-4 h-4 fill-current" />
                    {listing.rating}
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
                    <p className="text-2xl font-bold text-white">€{listing.price}</p>
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
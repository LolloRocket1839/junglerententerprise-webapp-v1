import { Search, MapPin, Home } from 'lucide-react';

const SearchSection = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Find Your Student Home
      </h1>
      <p className="text-xl text-white/80 mb-8">
        Long-term rentals verified and managed by Jungle Rent
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="University City"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60"
              />
            </div>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
              <select className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white/60 appearance-none">
                <option>Room Type</option>
                <option>Single Room</option>
                <option>Double Room</option>
                <option>Studio</option>
              </select>
            </div>
            <button className="bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white rounded-lg py-2 px-4 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Search Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
import { MapPin, Home, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SearchHeroProps {
  city: string;
  onCityChange: (value: string) => void;
  roomType: string;
  onRoomTypeChange: (value: string) => void;
  onSearch: () => void;
}

const SearchHero = ({ 
  city, 
  onCityChange, 
  roomType, 
  onRoomTypeChange, 
  onSearch 
}: SearchHeroProps) => {
  return (
    <div className="relative z-10 text-center mt-8 md:mt-16 mb-20 animate-fade-in">
      <div className="mb-12 relative z-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          Trova la Tua Casa
          <span className="block text-primary animate-pulse mt-2">Studentesca</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mt-4">
          Affitti a lungo termine verificati e gestiti da Jungle Rent
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-16 relative z-30">
        <div className="glass-card p-6 backdrop-blur-lg transform transition-all duration-300 hover:scale-[1.02]">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-6">
            <div className="md:col-span-3 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Città Universitaria"
                className="glass-input w-full pl-12"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                aria-label="Città Universitaria"
              />
            </div>
            
            <div className="md:col-span-3 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                <Home className="w-5 h-5" />
              </div>
              <select 
                className="glass-input w-full pl-12 appearance-none bg-transparent text-white cursor-pointer"
                value={roomType}
                onChange={(e) => onRoomTypeChange(e.target.value)}
                aria-label="Tipo di Stanza"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em'
                }}
              >
                <option value="" className="bg-[#111111] text-white">Tipo di Stanza</option>
                <option value="single" className="bg-[#111111] text-white">Camera Singola</option>
                <option value="double" className="bg-[#111111] text-white">Camera Doppia</option>
                <option value="studio" className="bg-[#111111] text-white">Monolocale</option>
              </select>
            </div>

            <button 
              className="glass-button flex items-center justify-center gap-3 w-full hover:bg-primary/20
                       transform transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={onSearch}
              aria-label="Cerca"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Cerca</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
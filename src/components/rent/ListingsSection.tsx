import { Shield, Star, Wifi, Coffee, Book, ArrowRight } from 'lucide-react';

const ListingsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {[1, 2, 3, 4].map((item) => (
        <div 
          key={item} 
          className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-green-500/50 transition-all hover:scale-[1.02] duration-300"
        >
          <div className="relative h-48 bg-white/5">
            <div className="absolute top-3 left-3">
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verified
              </span>
            </div>
          </div>

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
  );
};

export default ListingsSection;
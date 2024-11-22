import { Tag, ArrowLeftRight, MessageCircle, Home, PlusCircle, MinusCircle, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SwapCardProps {
  swap: any; // We'll keep the existing type for now
  onContactClick: (swapId: number) => void;
}

const SwapCard = ({ swap, onContactClick }: SwapCardProps) => {
  const renderRoomReview = () => {
    if (swap.category === 'room' && swap.currentHub.rating) {
      return (
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < swap.currentHub.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400'
              }`}
            />
          ))}
          <span className="text-sm text-white/60 ml-2">
            ({swap.currentHub.reviews || 0} reviews)
          </span>
        </div>
      );
    }
    return null;
  };

  const renderSwapContent = () => {
    if (swap.category === 'room') {
      return (
        <>
          <div className="mt-4 space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              {/* Room Image */}
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <img 
                  src={swap.currentHub.image || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                  alt={`${swap.currentHub.name} - ${swap.currentHub.room}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{swap.currentHub.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-white/90 mb-2">
                <div className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Current Room:</span>
                </div>
                {renderRoomReview()}
              </div>
              <div className="space-y-2">
                <p className="text-white/90">{swap.currentHub.name} - {swap.currentHub.room}</p>
                <p className="text-primary font-medium">€{swap.currentHub.price}/month</p>
                <div className="flex flex-wrap gap-2">
                  {swap.currentHub.features.map((feature: string, index: number) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-3">
                <ArrowLeftRight className="w-5 h-5 text-primary" />
                {swap.currentHub.price !== swap.lookingFor.priceRange && (
                  <>
                    {swap.lookingFor.priceRange > swap.currentHub.price ? (
                      <div className="flex items-center text-green-500">
                        <PlusCircle className="w-4 h-4 mr-1" />
                        <span>€{swap.lookingFor.priceRange - swap.currentHub.price}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <MinusCircle className="w-4 h-4 mr-1" />
                        <span>€{swap.currentHub.price - swap.lookingFor.priceRange}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2 text-white/90 mb-2">
                <Home className="w-4 h-4" />
                <span className="font-medium">Looking For:</span>
              </div>
              <div className="space-y-2">
                <p className="text-white/90">{swap.lookingFor.hub}</p>
                <p className="text-primary font-medium">Up to €{swap.lookingFor.priceRange}/month</p>
                <div className="flex flex-wrap gap-2">
                  {swap.lookingFor.features.map((feature: string, index: number) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="mt-4">
          <p className="text-white/90">Offering: {swap.item}</p>
          <p className="text-white/90 mt-2">Looking for: {swap.lookingFor}</p>
        </div>
      );
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold">
            {swap.author.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">{swap.author}</h3>
              <p className="text-white/60 text-sm">{swap.timestamp}</p>
            </div>
          </div>
          
          {renderSwapContent()}

          <div className="flex flex-wrap gap-2 mt-4">
            {swap.tags.map((tag: string, index: number) => (
              <span 
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary"
              >
                <Tag className="w-3 h-3 inline-block mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => onContactClick(swap.id)}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Owner</span>
            </Button>
            {swap.category === 'room' && swap.currentHub.rating && (
              <div className="text-sm text-white/60">
                Last updated: {swap.lastUpdated || 'Recently'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
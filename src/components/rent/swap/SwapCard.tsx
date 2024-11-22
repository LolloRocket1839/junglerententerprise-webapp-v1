import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeftRight, Tag, Home, Bath, PlusCircle, MinusCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  icon: React.ReactNode;
}

interface SwapCardProps {
  currentHub: {
    name: string;
    room: string;
    price: number;
    features: string[];
    image?: string;
  };
  lookingFor: {
    hub: string;
    priceRange: number;
    features: string[];
  };
  matchPercentage?: number;
  author: string;
  timestamp: string;
  tags: string[];
}

const SwapCard: React.FC<SwapCardProps> = ({
  currentHub,
  lookingFor,
  matchPercentage,
  author,
  timestamp,
  tags,
}) => {
  const getFeatureIcon = (feature: string): Feature => {
    if (feature.toLowerCase().includes('balcony')) {
      return { name: feature, icon: <Home className="w-4 h-4" /> };
    }
    if (feature.toLowerCase().includes('bathroom')) {
      return { name: feature, icon: <Bath className="w-4 h-4" /> };
    }
    return { name: feature, icon: <Home className="w-4 h-4" /> };
  };

  const priceDifference = lookingFor.priceRange - currentHub.price;

  return (
    <Card className="glass-card p-6 animate-fade-in hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold">{author.charAt(0)}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">{author}</h3>
              <p className="text-white/60 text-sm">{timestamp}</p>
            </div>
            {matchPercentage && (
              <Badge variant="outline" className="bg-primary/20 text-primary">
                {matchPercentage}% Match
              </Badge>
            )}
          </div>

          <div className="mt-4 space-y-6">
            {/* Current Room */}
            <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                {currentHub.image && (
                  <img 
                    src={currentHub.image} 
                    alt={`Room at ${currentHub.name}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-white/90 mb-2">
                    <Home className="w-4 h-4" />
                    <span className="font-medium">Current Room:</span>
                  </div>
                  <p className="text-white/90">{currentHub.name} - {currentHub.room}</p>
                  <p className="text-primary font-medium">€{currentHub.price}/month</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentHub.features.map((feature, index) => {
                      const { name, icon } = getFeatureIcon(feature);
                      return (
                        <span 
                          key={index}
                          className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/80 flex items-center gap-1"
                        >
                          {icon}
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-3">
                <ArrowLeftRight className="w-5 h-5 text-primary animate-pulse-gentle" />
                {priceDifference !== 0 && (
                  <>
                    {priceDifference > 0 ? (
                      <div className="flex items-center text-green-500">
                        <PlusCircle className="w-4 h-4 mr-1" />
                        <span>€{priceDifference}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <MinusCircle className="w-4 h-4 mr-1" />
                        <span>€{Math.abs(priceDifference)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Looking For Section */}
            <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-2 text-white/90 mb-2">
                <Home className="w-4 h-4" />
                <span className="font-medium">Looking For:</span>
              </div>
              <p className="text-white/90">{lookingFor.hub}</p>
              <p className="text-primary font-medium">Up to €{lookingFor.priceRange}/month</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {lookingFor.features.map((feature, index) => {
                  const { name, icon } = getFeatureIcon(feature);
                  return (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/80 flex items-center gap-1"
                    >
                      {icon}
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className={cn(
                  "px-2 py-1 rounded-full text-xs flex items-center gap-1",
                  "bg-primary/20 text-primary"
                )}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-white/10">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 text-white/60 hover:text-white hover:bg-white/10"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Contact for Swap</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SwapCard;
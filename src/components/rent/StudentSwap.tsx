import { Tag, ArrowLeftRight, MessageSquare, Home, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import SwapFilters, { SwapCategory } from './SwapFilters';

const StudentSwap = () => {
  const [selectedCategory, setSelectedCategory] = useState<SwapCategory>('room');

  const mockSwaps = [
    {
      id: 1,
      author: "Marco B.",
      category: "room",
      currentHub: {
        name: "Villa Roma Nord",
        room: "Room 304",
        price: 650,
        features: ["Balcony", "Private Bathroom"]
      },
      lookingFor: {
        hub: "Villa Roma Sud",
        priceRange: 650,
        features: ["Any Room Type"]
      },
      timestamp: "1 hour ago",
      tags: ["Same Price", "Immediate"]
    },
    {
      id: 2,
      author: "Sarah K.",
      category: "room",
      currentHub: {
        name: "Villa Roma Sud",
        room: "Room 215",
        price: 750,
        features: ["Corner Room", "City View"]
      },
      lookingFor: {
        hub: "Villa Roma Nord",
        priceRange: 650,
        features: ["Ground Floor"]
      },
      timestamp: "3 hours ago",
      tags: ["Price Difference", "Flexible Move"]
    },
    {
      id: 3,
      author: "David L.",
      category: "electronics",
      item: "MacBook Pro 2021",
      lookingFor: "Gaming Laptop",
      timestamp: "1 day ago",
      tags: ["Electronics", "Laptops"]
    },
    {
      id: 4,
      author: "Emma R.",
      category: "books",
      item: "Computer Science Textbooks",
      lookingFor: "Economics Books",
      timestamp: "2 days ago",
      tags: ["Academic", "Textbooks"]
    }
  ];

  const filteredSwaps = mockSwaps.filter(swap => swap.category === selectedCategory);

  const renderSwapContent = (swap: any) => {
    if (swap.category === 'room') {
      return (
        <>
          <div className="mt-4 space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2 text-white/90 mb-2">
                <Home className="w-4 h-4" />
                <span className="font-medium">Current Room:</span>
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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Swap Opportunities</h3>
        <Button variant="default" className="glass-button">
          List New Item
        </Button>
      </div>

      <SwapFilters 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      {filteredSwaps.map((swap) => (
        <div key={swap.id} className="glass-card p-6 animate-fade-in">
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
              
              {renderSwapContent(swap)}

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
        </div>
      ))}
    </div>
  );
};

export default StudentSwap;
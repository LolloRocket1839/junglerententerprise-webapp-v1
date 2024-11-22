import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import SwapFilters, { SwapCategory } from './swap/SwapFilters';
import SwapList from './swap/SwapList';

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
        features: ["Balcony", "Private Bathroom"],
        image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=500&auto=format"
      },
      lookingFor: {
        hub: "Villa Roma Sud",
        priceRange: 650,
        features: ["Any Room Type"]
      },
      timestamp: "1 hour ago",
      tags: ["Same Price", "Immediate"],
      matchPercentage: 95
    },
    {
      id: 2,
      author: "Sarah K.",
      category: "room",
      currentHub: {
        name: "Villa Roma Sud",
        room: "Room 215",
        price: 750,
        features: ["Corner Room", "City View"],
        image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format"
      },
      lookingFor: {
        hub: "Villa Roma Nord",
        priceRange: 650,
        features: ["Ground Floor"]
      },
      timestamp: "3 hours ago",
      tags: ["Price Difference", "Flexible Move"],
      matchPercentage: 85
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
      
      <SwapList 
        swaps={mockSwaps}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default StudentSwap;
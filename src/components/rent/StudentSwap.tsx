import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import SwapFilters, { SwapCategory } from './SwapFilters';
import SwapCard from './SwapCard';
import FileUploadDialog from '../ui/FileUploadDialog';

const StudentSwap = () => {
  const [selectedCategory, setSelectedCategory] = useState<SwapCategory>('room');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { toast } = useToast();

  const mockSwaps = [
    {
      id: 1,
      author: "Marco B.",
      category: "room",
      currentHub: {
        name: "Villa Roma Nord",
        room: "Galileo Galilei Suite",
        price: 650,
        features: ["Balcony", "Private Bathroom"],
        rating: 4,
        reviews: 12,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      lookingFor: {
        hub: "Villa Roma Sud",
        priceRange: 650,
        features: ["Any Room Type"]
      },
      timestamp: "1 hour ago",
      lastUpdated: "2 days ago",
      tags: ["Same Price", "Immediate", "Nightlife", "City Center", "Student Area"]
    },
    {
      id: 2,
      author: "Sarah K.",
      category: "room",
      currentHub: {
        name: "Villa Roma Sud",
        room: "Johann Sebastian Bach Studio",
        price: 750,
        features: ["Corner Room", "City View"],
        rating: 5,
        reviews: 8,
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      },
      lookingFor: {
        hub: "Villa Roma Nord",
        priceRange: 650,
        features: ["Ground Floor"]
      },
      timestamp: "3 hours ago",
      lastUpdated: "1 day ago",
      tags: ["Price Difference", "Flexible Move", "Near University", "Quiet Area"]
    },
    {
      id: 3,
      author: "Emma S.",
      category: "clothes",
      item: "Designer Winter Coat",
      description: "Barely worn designer winter coat, size M",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3",
      lookingFor: "Summer Dresses or Accessories",
      timestamp: "2 hours ago",
      tags: ["Premium", "Designer", "Winter Wear"]
    },
    {
      id: 4,
      author: "Marco R.",
      category: "clothes",
      item: "Vintage Leather Jacket",
      description: "Classic style, great condition, size L",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      lookingFor: "Modern Streetwear",
      timestamp: "5 hours ago",
      tags: ["Vintage", "Leather", "Classic"]
    },
    {
      id: 5,
      author: "Sofia L.",
      category: "services",
      item: "Italian Language Lessons",
      description: "Native speaker offering language exchange",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      lookingFor: "Web Development Help",
      timestamp: "1 day ago",
      tags: ["Language", "Education", "Exchange"]
    },
    {
      id: 6,
      author: "Alex K.",
      category: "services",
      item: "Photography Sessions",
      description: "Professional portrait photography",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      lookingFor: "Graphic Design Work",
      timestamp: "2 days ago",
      tags: ["Creative", "Photography", "Professional"]
    },
    {
      id: 7,
      author: "Lena M.",
      category: "electronics",
      item: "Gaming Console",
      description: "Latest model with 2 controllers",
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
      lookingFor: "Laptop or Tablet",
      timestamp: "3 days ago",
      tags: ["Gaming", "Electronics", "Entertainment"]
    },
    {
      id: 8,
      author: "David P.",
      category: "books",
      item: "Computer Science Collection",
      description: "Complete set of programming books",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
      lookingFor: "Art & Design Books",
      timestamp: "4 days ago",
      tags: ["Education", "Programming", "Technical"]
    },
    {
      id: 9,
      author: "Maria C.",
      category: "collectibles",
      item: "Vintage Vinyl Records",
      description: "Classic rock collection from the 70s",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
      lookingFor: "Comic Book Collection",
      timestamp: "5 days ago",
      tags: ["Music", "Vintage", "Collection"]
    },
    {
      id: 10,
      author: "Yugi M.",
      category: "collectibles",
      item: "Blue-Eyes White Dragon",
      description: "First Edition, Near Mint Condition",
      image: "https://images.unsplash.com/photo-1610631787813-9eeb1a2386cc",
      lookingFor: "Dark Magician or Exodia Pieces",
      timestamp: "2 days ago",
      tags: ["Yu-Gi-Oh", "Rare", "Trading Card"]
    },
    {
      id: 11,
      author: "John C.",
      category: "collectibles",
      item: "Ancient Roman Coins",
      description: "Collection of authenticated denarii",
      image: "https://images.unsplash.com/photo-1620678494671-07d27bbe0ba6",
      lookingFor: "Greek Coins or Medieval Coins",
      timestamp: "1 week ago",
      tags: ["Numismatics", "Ancient", "Historical"]
    }
  ];

  const handleContactClick = (swapId: number) => {
    toast({
      title: "Contact Request Sent",
      description: "The owner will be notified of your interest.",
    });
  };

  const handleFilesUploaded = (files: File[]) => {
    console.log('Files uploaded:', files);
    toast({
      title: "Files Uploaded Successfully",
      description: "Your swap listing will be reviewed shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Swap Opportunities</h3>
        <div className="flex gap-2">
          <Button 
            variant="default" 
            className="glass-button"
            onClick={() => setIsUploadOpen(true)}
          >
            Upload Files
          </Button>
          <Button variant="default" className="glass-button" asChild>
            <Link to="/list-room">List New Item</Link>
          </Button>
        </div>
      </div>

      <FileUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onFilesUploaded={handleFilesUploaded}
      />

      <SwapFilters 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSwaps
          .filter(swap => swap.category === selectedCategory)
          .map((swap) => (
            <SwapCard 
              key={swap.id} 
              swap={swap}
              onContactClick={handleContactClick}
            />
          ))}
      </div>
    </div>
  );
};

export default StudentSwap;
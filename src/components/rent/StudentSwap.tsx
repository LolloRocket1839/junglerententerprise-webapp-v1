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

  const handleContactClick = (swapId: number) => {
    toast({
      title: "Contact Request Sent",
      description: "The owner will be notified of your interest.",
    });
  };

  const handleFilesUploaded = (files: File[]) => {
    // Here you would typically handle the uploaded files
    console.log('Files uploaded:', files);
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
  );
};

export default StudentSwap;
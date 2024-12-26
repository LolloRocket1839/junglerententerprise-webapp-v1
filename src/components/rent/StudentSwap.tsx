import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import SwapFilters, { SwapCategory } from './SwapFilters';
import SwapCard from './SwapCard';
import SwapHeader from './swap/SwapHeader';
import { mockSwaps } from './swap/mockData';

const StudentSwap = () => {
  const [selectedCategory, setSelectedCategory] = useState<SwapCategory>('room');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { toast } = useToast();

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
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <SwapHeader 
          isUploadOpen={isUploadOpen}
          setIsUploadOpen={setIsUploadOpen}
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
    </div>
  );
};

export default StudentSwap;
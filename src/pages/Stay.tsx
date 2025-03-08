
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TouristProperty } from '@/types/tourist';
import { TouristPropertyCard } from '@/components/stay/TouristPropertyCard';
import { BookingSteps } from '@/components/stay/BookingSteps';
import { BookingForm } from '@/components/stay/BookingForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Stay = () => {
  const [selectedProperty, setSelectedProperty] = useState<TouristProperty | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const { data: properties, isLoading } = useQuery({
    queryKey: ['tourist-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tourist_properties')
        .select('*');
      
      if (error) throw error;
      return data as TouristProperty[];
    },
  });

  const handlePropertySelect = (property: TouristProperty) => {
    setSelectedProperty(property);
    setCurrentStep(2);
  };

  const handleBook = async (dates: { checkIn: Date; checkOut: Date }) => {
    // In the future this will handle the booking process
    setCurrentStep(4);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <BookingSteps currentStep={currentStep} />
      
      <h1 className="text-4xl font-bold mb-8 gradient-text">Soggiorna</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties?.map((property) => (
          <TouristPropertyCard
            key={property.id}
            property={property}
            onSelect={handlePropertySelect}
          />
        ))}
      </div>

      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="sm:max-w-[900px] bg-[#1a1a1a] border-white/10">
          {selectedProperty && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedProperty.images[0]} 
                  alt={selectedProperty.title}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProperty.title}</h2>
                  <p className="text-white/70">{selectedProperty.description}</p>
                </div>
              </div>
              <BookingForm 
                property={selectedProperty} 
                onBook={handleBook}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Stay;

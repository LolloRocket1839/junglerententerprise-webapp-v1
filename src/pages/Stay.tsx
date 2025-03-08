import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TouristProperty } from '@/types/tourist';
import { TouristPropertyCard } from '@/components/stay/TouristPropertyCard';
import { BookingSteps } from '@/components/stay/BookingSteps';
import { BookingForm } from '@/components/stay/BookingForm';
import { GuestInfoForm } from '@/components/stay/GuestInfoForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const Stay = () => {
  const [selectedProperty, setSelectedProperty] = useState<TouristProperty | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<any>(null);
  const { toast } = useToast();

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

  const handleDateSelection = async (dates: { checkIn: Date; checkOut: Date, guests: number }) => {
    setBookingData({
      ...dates,
      propertyId: selectedProperty?.id,
      totalPrice: selectedProperty ? 
        (dates.guests * selectedProperty.price_per_night + selectedProperty.cleaning_fee) : 0
    });
    setCurrentStep(3);
  };

  const handleGuestInfo = async (guestInfo: any) => {
    try {
      const { data: booking, error: bookingError } = await supabase
        .from('tourist_bookings')
        .insert({
          property_id: selectedProperty?.id,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut,
          number_of_guests: bookingData.guests,
          total_price: bookingData.totalPrice,
          special_requests: guestInfo.specialRequests
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      await supabase.functions.invoke('send-booking-confirmation', {
        body: { bookingId: booking.id }
      });

      toast({
        title: "Prenotazione confermata!",
        description: "Ti abbiamo inviato una email di conferma.",
      });

      setCurrentStep(4);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la prenotazione.",
        variant: "destructive"
      });
    }
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
              {currentStep === 2 && (
                <BookingForm 
                  property={selectedProperty} 
                  onBook={handleDateSelection}
                />
              )}
              {currentStep === 3 && (
                <GuestInfoForm 
                  onSubmit={handleGuestInfo}
                  bookingData={bookingData}
                />
              )}
              {currentStep === 4 && (
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-green-500 mb-4">Prenotazione Confermata!</h3>
                  <p className="text-gray-300">
                    Grazie per aver scelto di soggiornare con noi. Ti abbiamo inviato una email con tutti i dettagli.
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Stay;

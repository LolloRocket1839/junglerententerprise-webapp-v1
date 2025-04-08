
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TouristProperty } from '@/types/tourist';
import { TouristPropertyCard } from '@/components/stay/TouristPropertyCard';
import { BookingSteps } from '@/components/stay/BookingSteps';
import { BookingForm } from '@/components/stay/BookingForm';
import { GuestInfoForm } from '@/components/stay/GuestInfoForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from "sonner";
import { FilterX, Loader2, Search } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Stay = () => {
  const [selectedProperty, setSelectedProperty] = useState<TouristProperty | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ capacity: 0 });

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['tourist-properties'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('tourist_properties')
          .select('*');
        
        if (error) throw error;
        return data as TouristProperty[];
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Errore nel caricamento delle proprietà");
        return [];
      }
    },
  });

  const filteredProperties = properties?.filter(property => {
    const matchesSearch = searchTerm === '' || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCapacity = filters.capacity === 0 || property.capacity >= filters.capacity;
    
    return matchesSearch && matchesCapacity;
  });

  const handlePropertySelect = (property: TouristProperty) => {
    setSelectedProperty(property);
    setCurrentStep(2);
  };

  const handleDateSelection = (dates: { checkIn: Date; checkOut: Date, guests: number }) => {
    setBookingData({
      ...dates,
      propertyId: selectedProperty?.id,
      totalPrice: selectedProperty ? 
        (dates.guests * selectedProperty.price_per_night * Math.max(1, Math.floor((dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24))) + selectedProperty.cleaning_fee) : 0
    });
    setCurrentStep(3);
  };

  const handleGuestInfo = async (guestInfo: any) => {
    try {
      toast.loading("Elaborazione della prenotazione in corso...");

      const { data: booking, error: bookingError } = await supabase
        .from('tourist_bookings')
        .insert({
          property_id: selectedProperty?.id,
          check_in: bookingData.checkIn.toISOString(),
          check_out: bookingData.checkOut.toISOString(),
          number_of_guests: bookingData.guests,
          total_price: bookingData.totalPrice,
          guest_name: guestInfo.fullName,
          guest_email: guestInfo.email,
          guest_phone: guestInfo.phone,
          special_requests: guestInfo.specialRequests
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      try {
        await supabase.functions.invoke('send-booking-confirmation', {
          body: { bookingId: booking.id }
        });
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
      }

      toast.dismiss();
      toast.success("Prenotazione confermata! Ti abbiamo inviato una email di conferma.");
      setCurrentStep(4);
    } catch (error) {
      console.error("Booking error:", error);
      toast.dismiss();
      toast.error("Si è verificato un errore durante la prenotazione.");
    }
  };

  const handleCloseDialog = () => {
    setSelectedProperty(null);
    setCurrentStep(1);
    setBookingData(null);
  };

  const handleFilterChange = (capacity: number) => {
    setFilters(prev => ({ ...prev, capacity }));
  };

  const clearFilters = () => {
    setFilters({ capacity: 0 });
    setSearchTerm('');
  };

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <div className="text-red-500 text-xl">Errore nel caricamento delle proprietà</div>
          <Button onClick={() => window.location.reload()}>Riprova</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <BookingSteps currentStep={currentStep} />
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Soggiorna</h1>
        
        <div className="flex w-full md:w-auto flex-1 md:flex-initial gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <Input
              type="text"
              placeholder="Cerca per città o nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border-white/10 text-white pl-10 w-full"
            />
          </div>
          
          <select
            className="bg-white/5 border border-white/10 rounded-md text-white p-2 text-sm"
            value={filters.capacity}
            onChange={(e) => handleFilterChange(parseInt(e.target.value))}
            aria-label="Filtro per numero di ospiti"
          >
            <option value={0}>Ospiti</option>
            <option value={1}>1+ ospiti</option>
            <option value={2}>2+ ospiti</option>
            <option value={4}>4+ ospiti</option>
            <option value={6}>6+ ospiti</option>
          </select>
          
          {(searchTerm || filters.capacity > 0) && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={clearFilters}
              className="bg-white/5 hover:bg-white/10"
              aria-label="Cancella filtri"
            >
              <FilterX size={18} />
            </Button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-white/70">Caricamento alloggi...</p>
          </div>
        </div>
      ) : (
        <>
          {filteredProperties && filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProperties.map((property) => (
                <TouristPropertyCard
                  key={property.id}
                  property={property}
                  onSelect={handlePropertySelect}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-3 text-center py-16 bg-white/5 rounded-xl border border-white/10">
              <div className="max-w-md mx-auto space-y-4">
                <h3 className="text-xl font-semibold text-white">Nessun alloggio trovato</h3>
                <p className="text-white/70">
                  {searchTerm || filters.capacity > 0 ? 
                    "Nessun alloggio corrisponde ai filtri selezionati. Prova a modificare la tua ricerca." :
                    "Attualmente non ci sono alloggi disponibili. Ti invitiamo a controllare nuovamente più tardi."}
                </p>
                {(searchTerm || filters.capacity > 0) && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="mt-4 bg-white/5 hover:bg-white/10 border-white/20"
                  >
                    <FilterX className="mr-2 h-4 w-4" />
                    Cancella filtri
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="sm:max-w-[900px] bg-[#1a1a1a] border-white/10 max-h-[90vh] overflow-y-auto">
          {selectedProperty && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={selectedProperty.images[0]} 
                    alt={selectedProperty.title}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  {selectedProperty.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                      +{selectedProperty.images.length - 1} foto
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProperty.title}</h2>
                  <div className="flex items-center gap-2 text-white/70 mb-3">
                    <MapPin size={16} />
                    {selectedProperty.address}, {selectedProperty.city}
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-1 text-white/80">
                      <Users size={16} />
                      <span>{selectedProperty.capacity} ospiti</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80">
                      <Bed size={16} />
                      <span>{selectedProperty.bedrooms} {selectedProperty.bedrooms === 1 ? 'camera' : 'camere'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80">
                      <Bath size={16} />
                      <span>{selectedProperty.bathrooms} {selectedProperty.bathrooms === 1 ? 'bagno' : 'bagni'}</span>
                    </div>
                  </div>
                  <p className="text-white/70">{selectedProperty.description}</p>
                  
                  {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-2">Servizi</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProperty.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-white/80 text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                <div className="bg-white/5 rounded-lg p-6 border border-green-500/20 text-center flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-500 mb-4">Prenotazione Confermata!</h3>
                  <p className="text-gray-300 mb-6">
                    Grazie per aver scelto di soggiornare con noi. Ti abbiamo inviato una email con tutti i dettagli.
                  </p>
                  <Button 
                    onClick={handleCloseDialog}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    Torna agli alloggi
                  </Button>
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

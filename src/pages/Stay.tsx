import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TouristProperty } from '@/types/tourist';
import { TouristPropertyCard } from '@/components/stay/TouristPropertyCard';
import { BookingSteps } from '@/components/stay/BookingSteps';
import { BookingForm } from '@/components/stay/BookingForm';
import { GuestInfoForm } from '@/components/stay/GuestInfoForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { FilterX, Loader2, Search, MapPin, Users, Bed, Bath, Check, Sparkles, TreePine, Home } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { stayTranslations } from '@/translations/stay';

const FeatureHighlight = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center space-x-2 text-white/80">
    <div className="p-1 rounded-full bg-emerald-500/20">
      {icon}
    </div>
    <span className="text-sm">{text}</span>
  </div>
);

const Stay = () => {
  const { language } = useLanguage();
  const t = (key: string) => stayTranslations[language]?.[key] || key;
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
        toast.error(t('errorLoadingProperties'));
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
      toast.loading(t('loading'));

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
      toast.success(t('bookingConfirmed'));
      setCurrentStep(4);
    } catch (error) {
      console.error("Booking error:", error);
      toast.dismiss();
      toast.error(t('error'));
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
      <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <div className="text-red-400 text-xl mb-4">{t('errorLoadingProperties')}</div>
          <Button onClick={() => window.location.reload()} className="glass-button">
            {t('retry')}
          </Button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-green-400/10 rounded-full blur-xl animate-float-slower" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-pulse-gentle" />
        <TreePine className="absolute top-1/4 right-1/4 w-16 h-16 text-emerald-400/20 animate-leaf-float" />
        <Home className="absolute bottom-1/4 left-1/4 w-12 h-12 text-emerald-400/15 animate-pulse-gentle" />
      </div>

      <div className="relative z-10 container mx-auto p-4 md:p-8 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-emerald-400 mr-3 animate-pulse-gentle" />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                {t('stayInStyle')}
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed">
            {t('discoverAccommodations')}
            <br />
            <span className="text-emerald-400 font-medium">{t('transparentPricing')}</span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <FeatureHighlight 
              icon={<Check className="w-4 h-4 text-emerald-400" />} 
              text={t('verified100')} 
            />
            <FeatureHighlight 
              icon={<Users className="w-4 h-4 text-emerald-400" />} 
              text={t('selectedHosts')} 
            />
            <FeatureHighlight 
              icon={<MapPin className="w-4 h-4 text-emerald-400" />} 
              text={t('premiumLocations')} 
            />
          </div>
        </div>

        <BookingSteps currentStep={currentStep} />
        
        {/* Enhanced Search Section */}
        <GlassCard className="p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold text-white">{t('findAccommodation')}</h2>
              <Badge className="bg-emerald-500/20 text-emerald-100">
                {filteredProperties?.length || 0} {t('available')}
              </Badge>
            </div>
            
            <div className="flex w-full md:w-auto flex-1 md:flex-initial gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <Input
                  type="text"
                  placeholder={t('searchCityName')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input pl-10 w-full"
                />
              </div>
              
              <select
                className="glass-input text-white p-2 text-sm min-w-[120px]"
                value={filters.capacity}
                onChange={(e) => handleFilterChange(parseInt(e.target.value))}
                aria-label={t('guests')}
              >
                <option value={0}>{t('guests')}</option>
                <option value={1}>1+ {t('guests').toLowerCase()}</option>
                <option value={2}>2+ {t('guests').toLowerCase()}</option>
                <option value={4}>4+ {t('guests').toLowerCase()}</option>
                <option value={6}>6+ {t('guests').toLowerCase()}</option>
              </select>
              
              {(searchTerm || filters.capacity > 0) && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={clearFilters}
                  className="glass-button"
                  aria-label={t('clearFilters')}
                >
                  <FilterX size={18} />
                </Button>
              )}
            </div>
          </div>
        </GlassCard>
        
        {isLoading ? (
          <GlassCard className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-400" />
              <p className="text-white/70">{t('loadingPremium')}</p>
            </div>
          </GlassCard>
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
              <GlassCard className="text-center py-16">
                <div className="max-w-md mx-auto space-y-4">
                  <h3 className="text-xl font-semibold text-white">{t('noAccommodationFound')}</h3>
                  <p className="text-white/70">
                    {searchTerm || filters.capacity > 0 ? 
                      t('noMatchFilters') :
                      t('noCurrentlyAvailable')}
                  </p>
                  {(searchTerm || filters.capacity > 0) && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="mt-4 glass-button"
                    >
                      <FilterX className="mr-2 h-4 w-4" />
                      {t('clearFilters')}
                    </Button>
                  )}
                </div>
              </GlassCard>
            )}
          </>
        )}

        <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && handleCloseDialog()}>
          <DialogContent className="sm:max-w-[900px] glass-premium max-h-[90vh] overflow-y-auto">
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
                      <Badge className="absolute bottom-2 right-2 bg-black/60 text-white">
                        +{selectedProperty.images.length - 1} {t('photos')}
                      </Badge>
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
                        <span>{selectedProperty.capacity} {selectedProperty.capacity === 1 ? t('guest') : t('guestsPlural')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80">
                        <Bed size={16} />
                        <span>{selectedProperty.bedrooms} {selectedProperty.bedrooms === 1 ? t('room') : t('rooms')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80">
                        <Bath size={16} />
                        <span>{selectedProperty.bathrooms} {selectedProperty.bathrooms === 1 ? t('bathroom') : t('bathrooms')}</span>
                      </div>
                    </div>
                    <p className="text-white/70">{selectedProperty.description}</p>
                    
                    {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">{t('services')}</h3>
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
                  <GlassCard className="text-center p-6 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-500/30 flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-400 mb-4">{t('bookingConfirmed')}</h3>
                    <p className="text-white/70 mb-6">
                      {t('thankYouBooking')}
                    </p>
                    <Button 
                      onClick={handleCloseDialog}
                      className="glass-button"
                    >
                      {t('backToAccommodations')}
                    </Button>
                  </GlassCard>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Stay;
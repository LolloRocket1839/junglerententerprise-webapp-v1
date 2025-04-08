
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TouristProperty } from "@/types/tourist";
import { toast } from "sonner";
import { DateRangePicker } from "./DateRangePicker";
import { PricingSummary } from "./PricingSummary";
import { useBookingAvailability } from "@/hooks/useBookingAvailability";
import { Loader2, Users } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BookingFormProps {
  property: TouristProperty;
  onBook: (dates: { checkIn: Date; checkOut: Date; guests: number }) => void;
}

export const BookingForm = ({ property, onBook }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const { isAvailable, nights, isLoading } = useBookingAvailability({
    property,
    checkIn,
    checkOut
  });

  const handleSubmit = () => {
    if (!checkIn || !checkOut) {
      toast.error("Seleziona le date di check-in e check-out");
      return;
    }
    
    if (!isAvailable) {
      toast.error("Le date selezionate non sono disponibili");
      return;
    }
    
    onBook({ checkIn, checkOut, guests });
  };

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= property.capacity) {
      setGuests(value);
    }
  };

  // Calculate if we can proceed (has dates and availability check is complete)
  const canProceed = checkIn && checkOut && !isLoading && isAvailable;

  return (
    <Card className="p-6 bg-white/5 border-white/10 shadow-lg transition-all">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Seleziona le date
          </h3>
          <div className="grid gap-4">
            <DateRangePicker
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
            />

            <div className="mt-2">
              <label htmlFor="guests" className="text-sm text-white/70 mb-1 block">
                Ospiti
              </label>
              <div className="relative">
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  max={property.capacity}
                  value={guests}
                  onChange={handleGuestChange}
                  className="bg-white/5 border-white/10 text-white pl-9 py-6"
                  aria-label="Numero di ospiti"
                />
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-white/50">
                  Max: {property.capacity}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Collapsible 
          open={isDetailOpen} 
          onOpenChange={setIsDetailOpen}
          className="border border-white/10 rounded-md overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between py-4 text-white/90 hover:text-white hover:bg-white/5"
            >
              <span>Dettagli prezzo</span>
              <span className="text-xl font-bold">
                {nights > 0 ? `€${(property.price_per_night * nights) + property.cleaning_fee}` : '€0'}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-white/5 p-4">
            <PricingSummary property={property} nights={nights} />
          </CollapsibleContent>
        </Collapsible>

        <Button
          className="w-full bg-primary hover:bg-primary/90 py-6 text-base transition-all duration-300"
          disabled={!canProceed}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verificando...
            </>
          ) : !checkIn || !checkOut ? (
            'Seleziona le date'
          ) : isAvailable ? (
            'Prenota ora'
          ) : (
            'Non disponibile'
          )}
        </Button>
      </div>
    </Card>
  );
};

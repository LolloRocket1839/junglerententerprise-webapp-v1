
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TouristProperty } from "@/types/tourist";
import { toast } from "sonner";
import { DateRangePicker } from "./DateRangePicker";
import { PricingSummary } from "./PricingSummary";
import { useBookingAvailability } from "@/hooks/useBookingAvailability";

interface BookingFormProps {
  property: TouristProperty;
  onBook: (dates: { checkIn: Date; checkOut: Date; guests: number }) => void;
}

export const BookingForm = ({ property, onBook }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  
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

  return (
    <Card className="p-6 bg-white/5 border-white/10">
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

            <div>
              <label className="text-sm text-white/70 mb-1 block">Ospiti</label>
              <Input
                type="number"
                min={1}
                max={property.capacity}
                value={guests}
                onChange={handleGuestChange}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        <PricingSummary property={property} nights={nights} />

        <Button
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!checkIn || !checkOut || isLoading || !isAvailable}
          onClick={handleSubmit}
        >
          {isLoading ? 'Verificando...' : isAvailable ? 'Prenota ora' : 'Non disponibile'}
        </Button>
      </div>
    </Card>
  );
};

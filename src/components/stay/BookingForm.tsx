
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TouristProperty } from "@/types/tourist";
import { useToast } from "@/components/ui/use-toast";
import { DateRangePicker } from "./DateRangePicker";
import { PricingSummary } from "./PricingSummary";

interface BookingFormProps {
  property: TouristProperty;
  onBook: (dates: { checkIn: Date; checkOut: Date; guests: number }) => void;
}

export const BookingForm = ({ property, onBook }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const { toast } = useToast();

  const { data: existingBookings } = useQuery({
    queryKey: ['bookings', property.id, checkIn, checkOut],
    queryFn: async () => {
      if (!checkIn || !checkOut) return [];
      
      const { data, error } = await supabase
        .from('tourist_bookings')
        .select('check_in, check_out')
        .eq('property_id', property.id)
        .neq('status', 'canceled')
        .or(`check_in.overlaps.[${checkIn.toISOString()},${checkOut.toISOString()}],check_out.overlaps.[${checkIn.toISOString()},${checkOut.toISOString()}]`);

      if (error) throw error;
      return data;
    },
    enabled: !!checkIn && !!checkOut && !!property.id
  });

  const isAvailable = !existingBookings?.length;
  const nights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleSubmit = () => {
    if (!isAvailable) {
      toast({
        title: "Non disponibile",
        description: "Le date selezionate non sono disponibili",
        variant: "destructive"
      });
      return;
    }
    onBook({ checkIn: checkIn!, checkOut: checkOut!, guests });
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
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        <PricingSummary property={property} nights={nights} />

        <Button
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!checkIn || !checkOut || nights < 1 || !isAvailable}
          onClick={handleSubmit}
        >
          {isAvailable ? 'Prenota ora' : 'Non disponibile'}
        </Button>
      </div>
    </Card>
  );
};

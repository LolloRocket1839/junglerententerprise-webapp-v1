import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TouristProperty } from "@/types/tourist";
import { useToast } from "@/components/ui/use-toast";

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

  const total = nights * property.price_per_night + property.cleaning_fee;

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
          <h3 className="text-lg font-semibold text-white mb-2">
            Seleziona le date
          </h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70 mb-1 block">Check-in</label>
                <Input
                  type="date"
                  value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setCheckIn(new Date(e.target.value))}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">Check-out</label>
                <Input
                  type="date"
                  value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setCheckOut(new Date(e.target.value))}
                  min={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            
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

        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex justify-between text-white/70">
            <span>€{property.price_per_night} × {nights} notti</span>
            <span>€{property.price_per_night * nights}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Pulizie</span>
            <span>€{property.cleaning_fee}</span>
          </div>
          <div className="flex justify-between text-white font-semibold pt-3 border-t border-white/10">
            <span>Totale</span>
            <span>€{total}</span>
          </div>
        </div>

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

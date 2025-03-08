import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { it } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TouristProperty } from "@/types/tourist";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  property: TouristProperty;
  onBook: (dates: { checkIn: Date; checkOut: Date; guests: number }) => void;
}

export const BookingForm = ({ property, onBook }: BookingFormProps) => {
  const today = startOfToday();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const { toast } = useToast();

  const handleCheckInChange = (date: Date | undefined) => {
    setCheckIn(date);
    if (date && checkOut && isBefore(checkOut, date)) {
      setCheckOut(undefined);
    }
  };

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
          <h3 className="text-lg font-semibold text-white mb-4">
            Seleziona le date
          </h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70 mb-1 block">Check-in</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                        !checkIn && "text-white/50"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "d MMMM yyyy", { locale: it }) : <span>Scegli data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={handleCheckInChange}
                      disabled={(date) => isBefore(date, today)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto bg-white")}
                      fromDate={today}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm text-white/70 mb-1 block">Check-out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                        !checkOut && "text-white/50"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "d MMMM yyyy", { locale: it }) : <span>Scegli data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => (checkIn ? isBefore(date, addDays(checkIn, 1)) : isBefore(date, addDays(today, 1)))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto bg-white")}
                      fromDate={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
                    />
                  </PopoverContent>
                </Popover>
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

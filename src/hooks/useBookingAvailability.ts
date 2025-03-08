
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TouristProperty } from "@/types/tourist";

interface UseBookingAvailabilityProps {
  property: TouristProperty;
  checkIn?: Date;
  checkOut?: Date;
}

export function useBookingAvailability({ 
  property, 
  checkIn, 
  checkOut 
}: UseBookingAvailabilityProps) {
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

  return {
    isAvailable,
    nights,
    existingBookings
  };
}

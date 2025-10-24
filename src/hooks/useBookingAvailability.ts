
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedProperty } from "@/hooks/useUnifiedProperties";
import { differenceInDays } from "date-fns";

interface UseBookingAvailabilityProps {
  property: UnifiedProperty;
  checkIn?: Date;
  checkOut?: Date;
}

export function useBookingAvailability({ 
  property, 
  checkIn, 
  checkOut 
}: UseBookingAvailabilityProps) {
  const nights = checkIn && checkOut 
    ? Math.max(1, differenceInDays(checkOut, checkIn))
    : 0;

  const { data: existingBookings = [], isLoading } = useQuery({
    queryKey: ['bookings', property.id, checkIn?.toISOString(), checkOut?.toISOString()],
    queryFn: async () => {
      if (!checkIn || !checkOut) return [];
      
      try {
        const { data, error } = await supabase
          .from('unified_bookings')
          .select('check_in, check_out')
          .eq('property_id', property.id)
          .neq('status', 'canceled')
          .or(`check_in.overlaps.[${checkIn.toISOString()},${checkOut.toISOString()}],check_out.overlaps.[${checkIn.toISOString()},${checkOut.toISOString()}]`);

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error checking availability:", error);
        return [];
      }
    },
    enabled: !!checkIn && !!checkOut && !!property.id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const isAvailable = !isLoading && existingBookings.length === 0;

  return {
    isAvailable,
    nights,
    existingBookings,
    isLoading
  };
}

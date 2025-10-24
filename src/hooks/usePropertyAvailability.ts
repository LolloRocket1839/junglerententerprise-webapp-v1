import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AvailabilityCheck {
  isAvailable: boolean;
  conflictingBookings: number;
  nextAvailableDate: string | null;
}

/**
 * Hook to check property availability for given dates
 * Prevents double-booking across both student and tourist bookings
 */
export const usePropertyAvailability = (
  propertyId: string | null,
  checkIn: Date | null,
  checkOut: Date | null,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['property-availability', propertyId, checkIn?.toISOString(), checkOut?.toISOString()],
    queryFn: async (): Promise<AvailabilityCheck> => {
      if (!propertyId || !checkIn || !checkOut) {
        return { isAvailable: false, conflictingBookings: 0, nextAvailableDate: null };
      }

      if (checkOut <= checkIn) {
        toast.error("Check-out date must be after check-in date");
        return { isAvailable: false, conflictingBookings: 0, nextAvailableDate: null };
      }

      try {
        // Check for conflicting bookings (both student and tourist)
        const { data: conflicts, error } = await supabase
          .from('unified_bookings')
          .select('id, check_in, check_out, booking_type, status')
          .eq('property_id', propertyId)
          .neq('status', 'cancelled')
          .or(`and(check_in.lte.${checkOut.toISOString()},check_out.gte.${checkIn.toISOString()})`);

        if (error) {
          console.error('Error checking availability:', error);
          throw error;
        }

        const conflictingBookings = conflicts?.length || 0;
        const isAvailable = conflictingBookings === 0;

        // Find next available date if not available
        let nextAvailableDate: string | null = null;
        if (!isAvailable && conflicts && conflicts.length > 0) {
          // Sort conflicts by check_out date
          const sortedConflicts = conflicts.sort((a, b) => 
            new Date(a.check_out).getTime() - new Date(b.check_out).getTime()
          );
          // Next available is after the last conflict
          nextAvailableDate = sortedConflicts[sortedConflicts.length - 1].check_out;
        }

        return { isAvailable, conflictingBookings, nextAvailableDate };
      } catch (error) {
        console.error('Error in availability check:', error);
        toast.error("Error checking availability");
        return { isAvailable: false, conflictingBookings: 0, nextAvailableDate: null };
      }
    },
    enabled: enabled && !!propertyId && !!checkIn && !!checkOut,
    retry: 1,
    staleTime: 1000 * 30, // 30 seconds
  });
};

/**
 * Hook to get property's booked dates for calendar display
 */
export const usePropertyBookedDates = (propertyId: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['property-booked-dates', propertyId],
    queryFn: async () => {
      if (!propertyId) return [];

      try {
        const { data: bookings, error } = await supabase
          .from('unified_bookings')
          .select('check_in, check_out, booking_type')
          .eq('property_id', propertyId)
          .neq('status', 'cancelled')
          .order('check_in', { ascending: true });

        if (error) {
          console.error('Error fetching booked dates:', error);
          throw error;
        }

        return bookings || [];
      } catch (error) {
        console.error('Error in booked dates query:', error);
        toast.error("Error loading booking calendar");
        return [];
      }
    },
    enabled: enabled && !!propertyId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

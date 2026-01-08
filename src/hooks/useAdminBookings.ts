import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AdminBooking {
  id: string;
  property_id: string;
  guest_id: string;
  booking_type: string;
  check_in: string;
  check_out: string;
  total_price: number;
  number_of_guests: number | null;
  status: string;
  payment_status: string;
  created_at: string;
  guest?: {
    first_name: string | null;
    last_name: string | null;
  };
  property?: {
    title: string;
    city: string;
  };
}

export function useAdminBookings() {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async (): Promise<AdminBooking[]> => {
      const { data, error } = await supabase
        .from('unified_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      // Fetch guest and property info
      const bookingsWithDetails = await Promise.all(
        (data || []).map(async (booking) => {
          const [guestRes, propertyRes] = await Promise.all([
            supabase.from('profiles').select('first_name, last_name').eq('id', booking.guest_id).single(),
            supabase.from('unified_properties').select('title, city').eq('id', booking.property_id).single()
          ]);
          
          return {
            ...booking,
            guest: guestRes.data,
            property: propertyRes.data
          };
        })
      );

      return bookingsWithDetails;
    }
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('unified_bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('Prenotazione aggiornata');
    },
    onError: (error) => {
      console.error('Error updating booking:', error);
      toast.error('Errore nell\'aggiornamento');
    }
  });
}

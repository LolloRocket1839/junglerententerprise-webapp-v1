import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AdminProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  usage_mode: string;
  status: string;
  student_price_monthly: number | null;
  tourist_price_nightly: number | null;
  rooms: number | null;
  bathrooms: number | null;
  size_sqm: number | null;
  images: string[] | null;
  created_at: string;
}

export function useAdminProperties() {
  return useQuery({
    queryKey: ['admin-properties'],
    queryFn: async (): Promise<AdminProperty[]> => {
      const { data, error } = await supabase
        .from('unified_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      return data || [];
    }
  });
}

export function useUpdatePropertyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('unified_properties')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast.success('Stato proprietà aggiornato');
    },
    onError: (error) => {
      console.error('Error updating property:', error);
      toast.error('Errore nell\'aggiornamento');
    }
  });
}

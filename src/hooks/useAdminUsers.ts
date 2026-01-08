import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AdminUser {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  user_type: string | null;
  kyc_status: string | null;
  created_at: string;
  current_city: string | null;
  phone_number: string | null;
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async (): Promise<AdminUser[]> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, avatar_url, user_type, kyc_status, created_at, current_city, phone_number')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      return data || [];
    }
  });
}

export function useUpdateUserKyc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, kyc_status }: { id: string; kyc_status: 'pending' | 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ kyc_status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Stato KYC aggiornato');
    },
    onError: (error) => {
      console.error('Error updating KYC:', error);
      toast.error('Errore nell\'aggiornamento KYC');
    }
  });
}

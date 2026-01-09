import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WaitlistEntry {
  property_id: string;
  email: string;
  name: string;
  phone?: string;
  investment_amount: number;
  notes?: string;
}

export function useJoinWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: WaitlistEntry) => {
      // Get current user if authenticated
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('investment_waitlist')
        .insert({
          ...entry,
          user_id: user?.id || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlist-count'] });
      queryClient.invalidateQueries({ queryKey: ['my-waitlist'] });
    },
    onError: (error: Error) => {
      console.error('Error joining waitlist:', error);
      toast.error('Errore durante l\'iscrizione alla waitlist');
    }
  });
}

export function useWaitlistCount(propertyId: string) {
  return useQuery({
    queryKey: ['waitlist-count', propertyId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('investment_waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('property_id', propertyId)
        .eq('status', 'pending');

      if (error) throw error;
      return count || 0;
    },
    enabled: !!propertyId
  });
}

export function useMyWaitlistEntries() {
  return useQuery({
    queryKey: ['my-waitlist'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return [];

      const { data, error } = await supabase
        .from('investment_waitlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });
}

export function useTotalWaitlistInterest(propertyId: string) {
  return useQuery({
    queryKey: ['waitlist-interest', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investment_waitlist')
        .select('investment_amount')
        .eq('property_id', propertyId)
        .eq('status', 'pending');

      if (error) throw error;
      
      const total = data?.reduce((sum, entry) => sum + Number(entry.investment_amount), 0) || 0;
      return total;
    },
    enabled: !!propertyId
  });
}

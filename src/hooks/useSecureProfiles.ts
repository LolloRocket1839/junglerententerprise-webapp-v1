import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Secure profile data for roommate matching - only non-sensitive fields
export interface SecureProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  current_city: string | null;
  future_city: string | null;
  budget_min: number | null;
  budget_max: number | null;
  move_in_date: string | null;
  preferences: any;
  created_at: string;
}

// Hook for getting safe profile summaries via secure RPC function
export function useSecureProfiles() {
  return useQuery<SecureProfile[]>({
    queryKey: ['secure-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_public_profile_summaries');

      if (error) {
        throw error;
      }
      return data || [];
    },
  });
}
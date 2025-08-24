
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables } from '@/integrations/supabase/types';

// Use the actual Supabase type for profiles
type ProfileRow = Tables<'profiles'>;

export function useProfile() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  return useQuery<ProfileRow | null>({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // Remove sensitive logging in production
        throw error;
      }
      return data;
    },
    enabled: !!userId,
  });
}

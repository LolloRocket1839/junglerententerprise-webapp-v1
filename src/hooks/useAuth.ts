
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery<Session | null>({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
    staleTime: 1000 * 60 * 60, // 1 hour, session is kept fresh by listener
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(['session'], session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);
  
  return { session, isLoading, isAuthenticated: !!session?.user };
}

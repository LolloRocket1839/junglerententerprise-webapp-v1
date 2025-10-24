
import { useCallback, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useInvestmentStatsSubscription = (refetchStats: () => void) => {
  const setupRealtimeSubscription = useCallback(async () => {
    const channel = supabase.channel('investment-stats-v2', {
      config: {
        broadcast: { self: true },
        presence: { key: 'investment-stats' },
      }
    });

    try {
      channel
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'unified_properties'
          },
          () => {
            console.log('Received realtime update, refetching stats...');
            refetchStats();
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'investments'
          },
          () => {
            console.log('Received investment update, refetching stats...');
            refetchStats();
          }
        )
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to realtime changes');
            await channel.track({ online: true });
          }
        });

      return () => {
        console.log('Cleaning up realtime subscription...');
        channel.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up realtime subscription:', error);
      return () => {};
    }
  }, [refetchStats]);

  useEffect(() => {
    const cleanup = setupRealtimeSubscription();
    return () => {
      cleanup.then(cleanupFn => cleanupFn());
    };
  }, [setupRealtimeSubscription]);
};

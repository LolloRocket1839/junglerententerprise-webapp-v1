import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateInvestmentParams {
  propertyId: string;
  amount: number;
}

export function useCreateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ propertyId, amount }: CreateInvestmentParams) => {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Devi effettuare il login per investire');
      }

      // Calculate tokens (1 token = €100)
      const tokens = Math.floor(amount / 100);

      // Insert investment
      const { data: investment, error: investError } = await supabase
        .from('investments')
        .insert({
          profile_id: user.id,
          property_id: propertyId,
          amount,
          tokens,
          status: 'pending',
          payment_status: 'pending',
        })
        .select()
        .single();

      if (investError) {
        console.error('Error creating investment:', investError);
        throw new Error('Errore durante la creazione dell\'investimento');
      }

      // Update amount_raised on property (direct update)
      const { data: property } = await supabase
        .from('unified_properties')
        .select('amount_raised')
        .eq('id', propertyId)
        .single();

      if (property) {
        await supabase
          .from('unified_properties')
          .update({ amount_raised: (property.amount_raised || 0) + amount })
          .eq('id', propertyId);
      }

      return investment;
    },
    onSuccess: () => {
      toast.success('Investimento registrato con successo!', {
        description: 'Vai alla sezione "I miei investimenti" per vedere i dettagli.',
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['investment-properties'] });
      queryClient.invalidateQueries({ queryKey: ['user-investments'] });
      queryClient.invalidateQueries({ queryKey: ['investment-stats'] });
      queryClient.invalidateQueries({ queryKey: ['investor-portfolio'] });
    },
    onError: (error: Error) => {
      toast.error('Errore', {
        description: error.message,
      });
    },
  });
}

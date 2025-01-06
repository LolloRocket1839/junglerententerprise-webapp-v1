import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Property } from './types';
import PropertyCard from './PropertyCard';
import InvestmentDialog from './InvestmentDialog';
import InvestmentOpportunityDialog from './InvestmentOpportunityDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mockProperties } from './mockData';

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const queryClient = useQueryClient();

  const { data: properties, isLoading, error: queryError } = useQuery({
    queryKey: ['investment-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hubs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching properties:', error);
        throw new Error('Failed to load investment opportunities');
      }

      if (!data || data.length === 0) {
        return mockProperties;
      }

      return data as Property[];
    }
  });

  const createInvestment = useMutation({
    mutationFn: async ({ hubId, amount }: { hubId: string, amount: number }) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error('You must be logged in to invest');
      }

      const { data, error } = await supabase
        .from('investments')
        .insert([
          {
            profile_id: session.session.user.id,
            hub_id: hubId,
            amount: amount,
            tokens: Math.floor(amount / 100),
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Investment error:', error);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Investment submitted successfully!");
      setSelectedProperty(null);
      setInvestmentAmount('');
      setError('');
      queryClient.invalidateQueries({ queryKey: ['investment-properties'] });
    },
    onError: (error: Error) => {
      setError(error.message);
      toast.error("Investment failed. Please try again.");
    }
  });

  const handleInvest = (property: Property) => {
    setError('');
    setSelectedProperty(property);
  };

  const handleSubmitInvestment = async (amount: number) => {
    if (!selectedProperty) return;

    if (isNaN(amount) || amount < 100) {
      setError("Please enter a valid investment amount (minimum €100)");
      return;
    }

    createInvestment.mutate({
      hubId: selectedProperty.id,
      amount: amount
    });
  };

  const handleInfo = (property: Property) => {
    setSelectedProperty(property);
    setShowDetails(true);
  };

  if (queryError) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertDescription>
          Failed to load investment opportunities. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <PropertyCard
              key={i}
              property={{
                id: i.toString(),
                name: '',
                location: '',
                description: null,
                price_per_night: 0,
                amenities: null,
                images: null,
                rating: null,
                reviews_count: null
              }}
              onInvest={() => {}}
              onInfo={() => {}}
              className="glass-card backdrop-blur-md bg-black/40 border-white/10 animate-pulse"
            />
          ))
        ) : (
          properties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onInvest={handleInvest}
              onInfo={() => handleInfo(property)}
              className="glass-card backdrop-blur-md bg-black/40 border-white/10"
            />
          ))
        )}
      </div>

      <Dialog 
        open={!!selectedProperty && !showDetails} 
        onOpenChange={(open) => !open && setSelectedProperty(null)}
      >
        {selectedProperty && (
          <InvestmentDialog
            property={selectedProperty}
            investmentAmount={investmentAmount}
            setInvestmentAmount={setInvestmentAmount}
            onSubmit={() => handleSubmitInvestment(parseFloat(investmentAmount))}
            isSubmitting={createInvestment.isPending}
            error={error}
          />
        )}
      </Dialog>

      {selectedProperty && (
        <InvestmentOpportunityDialog
          property={selectedProperty}
          open={showDetails}
          onOpenChange={setShowDetails}
          onInvest={handleSubmitInvestment}
        />
      )}
    </div>
  );
};

export default InvestmentOpportunities;
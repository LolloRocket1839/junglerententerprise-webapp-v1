import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Property } from './types';
import PropertyCard from './PropertyCard';
import InvestmentOpportunityDialog from './InvestmentOpportunityDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mockProperties } from './mockData';

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetails, setShowDetails] = useState(false);
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

      return data.map(hub => ({
        ...hub,
        investment_goal: hub.investment_goal || 100000,
        amount_raised: hub.amount_raised || 0
      })) as Property[];
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
      setShowDetails(false);
      queryClient.invalidateQueries({ queryKey: ['investment-properties'] });
    },
    onError: (error: Error) => {
      toast.error("Investment failed. Please try again.");
    }
  });

  const handleInvest = (amount: number) => {
    if (!selectedProperty) return;
    createInvestment.mutate({
      hubId: selectedProperty.id,
      amount: amount
    });
  };

  const handlePropertyClick = (property: Property) => {
    console.log("Property clicked:", property);
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
                reviews_count: null,
                investment_goal: 100000,
                amount_raised: 0
              }}
              onInvest={handlePropertyClick}
              onInfo={handlePropertyClick}
              className="glass-card backdrop-blur-md bg-black/40 border-white/10 animate-pulse"
            />
          ))
        ) : (
          properties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onInvest={handlePropertyClick}
              onInfo={handlePropertyClick}
              className="glass-card backdrop-blur-md bg-black/40 border-white/10"
            />
          ))
        )}
      </div>

      {selectedProperty && (
        <InvestmentOpportunityDialog
          property={selectedProperty}
          open={showDetails}
          onOpenChange={setShowDetails}
          onInvest={handleInvest}
        />
      )}
    </div>
  );
};

export default InvestmentOpportunities;

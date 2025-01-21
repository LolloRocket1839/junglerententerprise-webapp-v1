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
      try {
        const { data, error } = await supabase
          .from('hubs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error loading properties:', error);
          throw new Error('Unable to load investment opportunities');
        }

        if (!data || data.length === 0) {
          console.log('No properties found, using mock data');
          return mockProperties;
        }

        return data.map((hub: any) => ({
          id: hub.id,
          name: hub.name,
          location: hub.location,
          description: hub.description || '',
          price_per_night: hub.price_per_night,
          amenities: hub.amenities || [],
          images: hub.images || [],
          rating: hub.rating || null,
          reviews_count: hub.reviews_count || 0,
          investment_goal: hub.investment_goal || 100000,
          amount_raised: hub.amount_raised || 0
        })) as Property[];
      } catch (error) {
        console.error('Error in queryFn:', error);
        throw error;
      }
    },
    retry: 1,
    retryDelay: 1000
  });

  const createInvestment = useMutation({
    mutationFn: async ({ hubId, amount }: { hubId: string, amount: number }) => {
      const { data, error } = await supabase
        .from('investments')
        .insert([
          {
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
      toast.error("Investment failed. Please try again later.");
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
    console.log("Selected property:", property);
    setSelectedProperty(property);
    setShowDetails(true);
  };

  if (queryError) {
    console.error('Query error:', queryError);
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertDescription>
          Unable to load investment opportunities. Please try again later.
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-2 text-xs">{JSON.stringify(queryError, null, 2)}</pre>
          )}
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
                description: '',
                price_per_night: 0,
                amenities: [],
                images: [],
                rating: null,
                reviews_count: 0,
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

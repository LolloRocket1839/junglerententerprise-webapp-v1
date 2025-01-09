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
        console.error('Errore nel caricamento delle proprietà:', error);
        throw new Error('Impossibile caricare le opportunità di investimento');
      }

      if (!data || data.length === 0) {
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
    }
  });

  const createInvestment = useMutation({
    mutationFn: async ({ hubId, amount }: { hubId: string, amount: number }) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error('Devi essere loggato per investire');
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
        console.error('Errore di investimento:', error);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Investimento inviato con successo!");
      setSelectedProperty(null);
      setShowDetails(false);
      queryClient.invalidateQueries({ queryKey: ['investment-properties'] });
    },
    onError: (error: Error) => {
      toast.error("Investimento fallito. Riprova più tardi.");
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
    console.log("Proprietà selezionata:", property);
    setSelectedProperty(property);
    setShowDetails(true);
  };

  if (queryError) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertDescription>
          Impossibile caricare le opportunità di investimento. Riprova più tardi.
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
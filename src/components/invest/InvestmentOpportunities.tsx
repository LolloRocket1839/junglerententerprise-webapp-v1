import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Property } from './types';
import PropertyCard from './PropertyCard';
import InvestmentDialog from './InvestmentDialog';

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const queryClient = useQueryClient();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['investment-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hubs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        toast.error("Failed to load investment opportunities");
        throw error;
      }

      if (!data || data.length === 0) {
        return [
          {
            id: '1',
            name: 'Jungle Villa',
            location: 'Bali, Indonesia',
            description: 'Luxury villa in the heart of the jungle',
            price_per_night: 250,
            amenities: ['Pool', 'Spa', 'Gym'],
            images: ['/placeholder.svg'],
            rating: 8.5,
            reviews_count: 24
          },
          {
            id: '2',
            name: 'Beach House',
            location: 'Maldives',
            description: 'Beachfront property with stunning views',
            price_per_night: 350,
            amenities: ['Private Beach', 'Pool', 'Butler'],
            images: ['/placeholder.svg'],
            rating: 9.0,
            reviews_count: 32
          },
          {
            id: '3',
            name: 'Mountain Retreat',
            location: 'Swiss Alps',
            description: 'Cozy retreat with panoramic mountain views',
            price_per_night: 200,
            amenities: ['Fireplace', 'Sauna', 'Ski Storage'],
            images: ['/placeholder.svg'],
            rating: 8.8,
            reviews_count: 18
          }
        ] as Property[];
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Investment submitted successfully!");
      setSelectedProperty(null);
      setInvestmentAmount('');
      queryClient.invalidateQueries({ queryKey: ['investment-properties'] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleInvest = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleSubmitInvestment = async () => {
    if (!selectedProperty || !investmentAmount) return;

    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid investment amount");
      return;
    }

    createInvestment.mutate({
      hubId: selectedProperty.id,
      amount: amount
    });
  };

  const handleInfo = (propertyId: string) => {
    toast.info("Detailed property information coming in Phase 2");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-0 mb-20">
        {[1, 2, 3].map((i) => (
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
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-0 pb-20 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {properties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onInvest={handleInvest}
            onInfo={handleInfo}
          />
        ))}
      </div>

      <Dialog 
        open={!!selectedProperty} 
        onOpenChange={(open) => !open && setSelectedProperty(null)}
      >
        {selectedProperty && (
          <InvestmentDialog
            property={selectedProperty}
            investmentAmount={investmentAmount}
            setInvestmentAmount={setInvestmentAmount}
            onSubmit={handleSubmitInvestment}
            isSubmitting={createInvestment.isPending}
          />
        )}
      </Dialog>
    </div>
  );
};

export default InvestmentOpportunities;
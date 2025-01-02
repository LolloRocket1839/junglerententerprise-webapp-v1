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
            name: 'Luxury Villa Bali',
            location: 'Ubud, Bali, Indonesia',
            description: 'Stunning villa with private pool and jungle views',
            price_per_night: 250,
            amenities: ['Private Pool', 'Spa', 'Gym', 'Garden'],
            images: ['https://images.unsplash.com/photo-1518005020951-eccb494ad742'],
            rating: 8.5,
            reviews_count: 24
          },
          {
            id: '2',
            name: 'Oceanfront Paradise',
            location: 'Maafushi, Maldives',
            description: 'Beachfront property with panoramic ocean views',
            price_per_night: 350,
            amenities: ['Private Beach', 'Pool', 'Butler', 'Water Sports'],
            images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2'],
            rating: 9.0,
            reviews_count: 32
          },
          {
            id: '3',
            name: 'Alpine Lodge',
            location: 'Zermatt, Swiss Alps',
            description: 'Luxury mountain retreat with Matterhorn views',
            price_per_night: 200,
            amenities: ['Fireplace', 'Sauna', 'Ski Storage', 'Mountain Views'],
            images: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'],
            rating: 8.8,
            reviews_count: 18
          },
          {
            id: '4',
            name: 'Urban Penthouse',
            location: 'Manhattan, New York',
            description: 'Luxurious penthouse with city skyline views',
            price_per_night: 500,
            amenities: ['Terrace', 'Gym', 'Concierge', 'City Views'],
            images: ['https://images.unsplash.com/photo-1496307653780-42ee777d4833'],
            rating: 9.2,
            reviews_count: 45
          },
          {
            id: '5',
            name: 'Tuscan Villa',
            location: 'Florence, Italy',
            description: 'Historic villa with vineyard and olive grove',
            price_per_night: 300,
            amenities: ['Wine Cellar', 'Pool', 'Garden', 'Vineyard'],
            images: ['https://images.unsplash.com/photo-1533387520709-752d83de3630'],
            rating: 8.9,
            reviews_count: 29
          },
          {
            id: '6',
            name: 'Santorini Haven',
            location: 'Oia, Santorini',
            description: 'Traditional cave house with caldera views',
            price_per_night: 400,
            amenities: ['Private Pool', 'Terrace', 'Butler', 'Sunset Views'],
            images: ['https://images.unsplash.com/photo-1469796466635-455ede028aca'],
            rating: 9.5,
            reviews_count: 52
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
            className="glass-card backdrop-blur-md bg-black/40 border-white/10"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {properties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onInvest={handleInvest}
            onInfo={handleInfo}
            className="glass-card backdrop-blur-md bg-black/40 border-white/10"
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
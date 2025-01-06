import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Property } from './types';
import PropertyCard from './PropertyCard';
import InvestmentDialog from './InvestmentDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
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
        return [
          {
            id: '1',
            name: 'Palazzo Madama Suite',
            location: 'Via Roma 18, Torino',
            description: 'Elegante appartamento storico nel cuore di Torino',
            price_per_night: 180,
            amenities: ['Terrazza', 'Vista Palazzo', 'Ascensore', 'Aria Condizionata'],
            images: ['https://images.unsplash.com/photo-1577975882846-431adc8c2009'],
            rating: 8.9,
            reviews_count: 28
          },
          {
            id: '2',
            name: 'Residenza Po',
            location: 'Corso Vittorio Emanuele II 76, Torino',
            description: 'Lussuoso appartamento con vista sul fiume Po',
            price_per_night: 220,
            amenities: ['Vista Fiume', 'Garage', 'Palestra', 'Concierge'],
            images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd'],
            rating: 9.2,
            reviews_count: 35
          },
          {
            id: '3',
            name: 'Villa della Mole',
            location: 'Via Montebello 20, Torino',
            description: 'Esclusiva villa con vista sulla Mole Antonelliana',
            price_per_night: 300,
            amenities: ['Giardino Privato', 'Vista Mole', 'Piscina', 'Sauna'],
            images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'],
            rating: 9.5,
            reviews_count: 42
          },
          {
            id: '4',
            name: 'Attico San Carlo',
            location: 'Piazza San Carlo 197, Torino',
            description: 'Prestigioso attico nel salotto di Torino',
            price_per_night: 250,
            amenities: ['Terrazza Panoramica', 'Spa', 'Servizio in Camera', 'Wine Cellar'],
            images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
            rating: 9.0,
            reviews_count: 31
          },
          {
            id: '5',
            name: 'Residenza Quadrilatero',
            location: 'Via Maria Vittoria 35, Torino',
            description: 'Elegante appartamento nel quartiere romano',
            price_per_night: 190,
            amenities: ['Design Storico', 'Biblioteca', 'Cortile Interno', 'Biciclette'],
            images: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b'],
            rating: 8.7,
            reviews_count: 24
          },
          {
            id: '6',
            name: 'Suite Valentino',
            location: 'Corso Vittorio Emanuele II 127, Torino',
            description: 'Lussuoso appartamento vicino al Parco del Valentino',
            price_per_night: 210,
            amenities: ['Vista Parco', 'Balcone', 'Smart Home', 'Colazione Inclusa'],
            images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d'],
            rating: 9.3,
            reviews_count: 39
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

  const handleSubmitInvestment = async () => {
    if (!selectedProperty || !investmentAmount) return;

    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount < 100) {
      setError("Please enter a valid investment amount (minimum $100)");
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
              onInfo={handleInfo}
              className="glass-card backdrop-blur-md bg-black/40 border-white/10"
            />
          ))
        )}
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
            error={error}
          />
        )}
      </Dialog>
    </div>
  );
};

export default InvestmentOpportunities;

import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useUnifiedProperties, UnifiedProperty } from '@/hooks/useUnifiedProperties';
import PropertyCard from './PropertyCard';
import InvestmentOpportunityDialog from './InvestmentOpportunityDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<UnifiedProperty | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch properties available for investment (with investment_goal > 0)
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['investment-properties'],
    throwOnError: false,
    queryFn: async () => {
      console.log('[InvestmentOpportunities] Fetching properties from unified_properties...');
      const { data, error } = await supabase
        .from('unified_properties')
        .select('*')
        .eq('status', 'active')
        .gt('investment_goal', 0)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[InvestmentOpportunities] Error fetching properties:', error);
        throw error;
      }

      console.log('[InvestmentOpportunities] Fetched properties:', data?.length || 0);
      return data as UnifiedProperty[];
    },
    retry: 1,
    retryDelay: 1000
  });

  const handlePropertyClick = (property: UnifiedProperty) => {
    console.log("Selected property:", property);
    setSelectedProperty(property);
    setShowDetails(true);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Failed to load investment opportunities. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && properties?.length === 0 && (
        <Alert className="mb-4">
          <AlertDescription>
            No investment opportunities available at the moment. Check back soon!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <PropertyCard
              key={i}
              property={{
                id: i.toString(),
                title: '',
                address: '',
                city: '',
                description: '',
                images: [],
                investment_goal: 100000,
                amount_raised: 0,
                investor_share_percentage: 0,
                tokens_issued: 0,
                status: 'active',
                source: 'direct',
                rooms: 0,
                has_kitchen: false,
                has_living_room: false,
                has_balcony: false,
                is_furnished: false,
                appliances: [],
                amenities: [],
                utilities: [],
                internet_available: false,
                utilities_included: false,
                usage_mode: 'hybrid',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
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
          onInvest={(amount) => {
            toast.success("Investment simulated successfully!");
            setShowDetails(false);
          }}
        />
      )}
    </div>
  );
};

export default InvestmentOpportunities;
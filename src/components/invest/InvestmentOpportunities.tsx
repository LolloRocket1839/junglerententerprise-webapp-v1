import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Property } from './types';
import PropertyCard from './PropertyCard';
import InvestmentOpportunityDialog from './InvestmentOpportunityDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mockProperties } from './mockData';

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Using mock data directly instead of Supabase query
  const { data: properties, isLoading } = useQuery({
    queryKey: ['investment-properties'],
    queryFn: async () => {
      // Return mock data
      return mockProperties;
    },
    retry: 1,
    retryDelay: 1000
  });

  const handlePropertyClick = (property: Property) => {
    console.log("Selected property:", property);
    setSelectedProperty(property);
    setShowDetails(true);
  };

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
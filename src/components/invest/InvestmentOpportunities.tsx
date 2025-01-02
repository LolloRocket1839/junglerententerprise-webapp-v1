import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const InvestmentOpportunities = () => {
  // Fetch investment opportunities (hubs)
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

      return data || [];
    }
  });

  const handleInvest = (propertyId: string) => {
    // This would open a detailed investment flow in production
    toast.info("Investment flow coming in Phase 2");
  };

  const handleInfo = (propertyId: string) => {
    // This would show detailed property information in production
    toast.info("Detailed property information coming in Phase 2");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <Card 
            key={i}
            className="animate-pulse bg-white/5 backdrop-blur-sm border-white/10 h-[400px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-6">
        {properties?.map((property) => (
          <Card 
            key={property.id} 
            className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300"
          >
            <div className="aspect-video relative">
              {property.images?.[0] ? (
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-white/5" />
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{property.name}</h3>
                <p className="text-sm text-white/60">{property.location}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-white/60">Price per night</p>
                  <p className="text-base font-semibold text-white">
                    ${property.price_per_night}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">Expected ROI</p>
                  <p className="text-base font-semibold text-primary">
                    {property.rating ? `${property.rating}%` : 'TBD'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 py-5 text-sm"
                  onClick={() => handleInvest(property.id)}
                >
                  Invest Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-[42px] w-[42px] bg-white/5 border-white/10"
                  onClick={() => handleInfo(property.id)}
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestmentOpportunities;
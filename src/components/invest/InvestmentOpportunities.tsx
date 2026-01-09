import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import { useAuth } from '@/hooks/useAuth';
import { useCreateInvestment } from '@/hooks/useCreateInvestment';
import PropertyCard from './PropertyCard';
import InvestmentOpportunityDialog from './InvestmentOpportunityDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<UnifiedProperty | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { session } = useAuth();
  const createInvestment = useCreateInvestment();

  const { data: properties, isLoading, error, refetch, isRefetching } = useQuery({
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

  const handleRefresh = async () => {
    await refetch();
    toast.success("Opportunità aggiornate");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Opportunità di Investimento</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefetching}
          className="h-10 w-10 touch-manipulation"
        >
          <RefreshCw className={`h-5 w-5 ${isRefetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Impossibile caricare le opportunità. Riprova più tardi.
          </AlertDescription>
        </Alert>
      )}

      {/* Empty state */}
      {!isLoading && properties?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Building2 className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nessuna opportunità disponibile
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Al momento non ci sono proprietà disponibili per l'investimento. Torna presto per nuove opportunità!
          </p>
        </div>
      )}

      {/* Property grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
              <Skeleton className="aspect-[4/3] sm:aspect-video w-full" />
              <div className="p-4 sm:p-6 space-y-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-3">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 w-12" />
                </div>
              </div>
            </div>
          ))
        ) : (
          properties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onInvest={handlePropertyClick}
              onInfo={handlePropertyClick}
            />
          ))
        )}
      </div>

      {selectedProperty && (
        <InvestmentOpportunityDialog
          property={selectedProperty}
          open={showDetails}
          onOpenChange={setShowDetails}
          onInvest={() => {
            // Waitlist system - no payment needed
            toast.success("Grazie per il tuo interesse!");
            setShowDetails(false);
          }}
        />
      )}
    </div>
  );
};

export default InvestmentOpportunities;

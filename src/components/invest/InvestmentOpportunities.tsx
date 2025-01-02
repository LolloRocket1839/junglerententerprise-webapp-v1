import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InvestmentOpportunities = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const queryClient = useQueryClient();

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

  // Create investment mutation
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
            tokens: Math.floor(amount / 100), // Example: 1 token per $100
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

  const handleInvest = (property: any) => {
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
                  onClick={() => handleInvest(property)}
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

      {/* Investment Dialog */}
      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && setSelectedProperty(null)}>
        <DialogContent className="sm:max-w-[425px] bg-background">
          <DialogHeader>
            <DialogTitle>Invest in {selectedProperty?.name}</DialogTitle>
            <DialogDescription>
              Enter the amount you'd like to invest in this property.
              Minimum investment is $100.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                min="100"
                step="100"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Enter amount..."
              />
              <p className="text-sm text-muted-foreground">
                You will receive {investmentAmount ? Math.floor(parseFloat(investmentAmount) / 100) : 0} tokens
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmitInvestment}
              disabled={createInvestment.isPending}
            >
              {createInvestment.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Confirm Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvestmentOpportunities;
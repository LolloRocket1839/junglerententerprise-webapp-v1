import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCalculateReturns } from '@/hooks/useCalculateReturns';
import { usePropertyRevenue, useAllPropertiesRevenue } from '@/hooks/usePropertyRevenue';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Calendar,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend?: { value: number; label: string };
}) => (
  <GlassCard className="p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-white/60">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    {trend && (
      <div className={`text-xs flex items-center ${trend.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        <TrendingUp className="w-3 h-3 mr-1" />
        {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
      </div>
    )}
  </GlassCard>
);

const PropertyRevenueCard = ({ propertyId }: { propertyId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRevenueForm, setShowRevenueForm] = useState(false);
  const { calculateReturns, isCalculating } = useCalculateReturns();
  const { data: revenue, isLoading, refetch } = usePropertyRevenue(propertyId);
  
  const { data: property } = useQuery({
    queryKey: ['property-detail', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('unified_properties')
        .select('title, city, investment_goal, amount_raised, investor_share_percentage')
        .eq('id', propertyId)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const handleCalculateReturns = async () => {
    // Create sample revenue data for current month
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const revenueData = {
      property_id: propertyId,
      period_start: periodStart.toISOString().split('T')[0],
      period_end: periodEnd.toISOString().split('T')[0],
      student_revenue: 2500,
      tourist_revenue: 1500,
      other_revenue: 0,
      mortgage_payment: 800,
      property_tax: 100,
      insurance: 50,
      utilities: 150,
      maintenance: 200,
      platform_fees: 100,
      management_fees: 150,
    };
    
    try {
      await calculateReturns(revenueData);
      toast.success('Returns calculated successfully!');
      refetch();
    } catch (error) {
      console.error('Error calculating returns:', error);
      toast.error('Failed to calculate returns');
    }
  };

  if (isLoading || !property) {
    return (
      <Card className="glass-card p-6 animate-pulse">
        <div className="h-20 bg-white/5 rounded" />
      </Card>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="glass-card">
        <CollapsibleTrigger asChild>
          <div className="p-6 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{property.title}</h3>
                  <Badge variant="outline" className="text-emerald-400 border-emerald-400/50">
                    {property.city}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-white/60">Total Revenue</p>
                    <p className="text-lg font-bold text-white">
                      €{revenue?.totalRevenue.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Net Income</p>
                    <p className="text-lg font-bold text-green-400">
                      €{revenue?.netIncome.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Investor Share</p>
                    <p className="text-lg font-bold text-blue-400">
                      €{revenue?.investorShare.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">ROI</p>
                    <p className="text-lg font-bold text-purple-400">
                      {revenue?.roi.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="ml-4">
                {isOpen ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-6 pb-6 border-t border-white/10 pt-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Revenue Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Student Revenue:</span>
                    <span className="text-white font-medium">€{revenue?.studentRevenue.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Tourist Revenue:</span>
                    <span className="text-white font-medium">€{revenue?.touristRevenue.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Other Revenue:</span>
                    <span className="text-white font-medium">€{revenue?.otherRevenue.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Expenses & Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Total Expenses:</span>
                    <span className="text-red-400 font-medium">€{revenue?.totalExpenses.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Jungle Rent Share:</span>
                    <span className="text-emerald-400 font-medium">€{revenue?.jungleRentShare.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t border-white/10 pt-2 mt-2">
                    <span className="text-white">Investor Distribution:</span>
                    <span className="text-blue-400">€{revenue?.investorShare.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleCalculateReturns}
              disabled={isCalculating}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Calculate & Distribute Returns
                </>
              )}
            </Button>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export const RevenueTracker = () => {
  const { data: allRevenue, isLoading: isLoadingAll } = useAllPropertiesRevenue();
  
  const { data: investmentProperties, isLoading: isLoadingProperties } = useQuery({
    queryKey: ['investment-properties-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('unified_properties')
        .select('id, title, city')
        .gt('investment_goal', 0)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Aggregate stats
  const totalRevenue = allRevenue?.reduce((sum, r) => sum + (r.total_revenue || 0), 0) || 0;
  const totalInvestorShare = allRevenue?.reduce((sum, r) => sum + (r.investor_distribution || 0), 0) || 0;
  const totalJungleShare = allRevenue?.reduce((sum, r) => sum + (r.jungle_rent_share || 0), 0) || 0;
  const avgROI = allRevenue?.length && totalRevenue > 0
    ? ((totalInvestorShare / totalRevenue) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Revenue Tracking & Returns</h2>
          <p className="text-white/60 text-sm mt-1">
            Monitor property performance and calculate investor returns
          </p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-100">
          {investmentProperties?.length || 0} Properties
        </Badge>
      </div>

      {/* Aggregate Stats */}
      {!isLoadingAll && allRevenue && allRevenue.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Platform Revenue"
            value={`€${totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
            trend={{ value: 12.5, label: 'vs last month' }}
          />
          <StatCard
            title="Investor Distributions"
            value={`€${totalInvestorShare.toLocaleString()}`}
            icon={<PieChart className="w-5 h-5 text-blue-400" />}
            trend={{ value: 8.3, label: 'vs last month' }}
          />
          <StatCard
            title="Platform Revenue"
            value={`€${totalJungleShare.toLocaleString()}`}
            icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
            trend={{ value: 15.2, label: 'vs last month' }}
          />
          <StatCard
            title="Average ROI"
            value={`${avgROI.toFixed(2)}%`}
            icon={<Calendar className="w-5 h-5 text-yellow-400" />}
          />
        </div>
      )}

      {/* Property List */}
      {isLoadingProperties ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="glass-card p-6 animate-pulse">
              <div className="h-20 bg-white/5 rounded" />
            </Card>
          ))}
        </div>
      ) : investmentProperties && investmentProperties.length > 0 ? (
        <div className="space-y-4">
          {investmentProperties.map(property => (
            <PropertyRevenueCard key={property.id} propertyId={property.id} />
          ))}
        </div>
      ) : (
        <GlassCard className="p-12 text-center">
          <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No Investment Properties Found
          </h3>
          <p className="text-white/60">
            Create properties with investment goals to start tracking revenue.
          </p>
        </GlassCard>
      )}
    </div>
  );
};

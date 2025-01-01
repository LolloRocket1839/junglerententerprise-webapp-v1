import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RoommateProfilePreview from "./RoommateProfilePreview";
import RoommateFilters, { FilterOptions } from "./RoommateFilters";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const RoommateProfileGrid = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterOptions>({
    budget: 'all',
    moveInDate: 'all',
    preference: 'all'
  });

  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['roommate-profiles', filters],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .not('id', 'eq', (await supabase.auth.getUser()).data.user?.id);

      // Apply filters
      if (filters.budget !== 'all') {
        const [min, max] = filters.budget.split('-');
        if (min && max) {
          query = query
            .gte('budget_min', parseInt(min))
            .lte('budget_max', parseInt(max));
        } else if (min === '801+') {
          query = query.gte('budget_min', 801);
        }
      }

      if (filters.moveInDate !== 'all') {
        const today = new Date();
        let futureDate = new Date();
        switch (filters.moveInDate) {
          case '1month':
            futureDate.setMonth(today.getMonth() + 1);
            break;
          case '3months':
            futureDate.setMonth(today.getMonth() + 3);
            break;
          case '6months':
            futureDate.setMonth(today.getMonth() + 6);
            break;
        }
        query = query.lte('move_in_date', futureDate.toISOString());
      }

      if (filters.preference !== 'all') {
        query = query.contains('preferences', { [filters.preference]: true });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Updating roommate list with selected filters.",
    });
  };

  const handleViewProfile = (id: string) => {
    toast({
      title: "Profile View",
      description: "Full profile view will be available in the next update!",
    });
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error loading profiles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RoommateFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="glass-card h-[400px] animate-pulse">
              <div className="p-6 space-y-4">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-white/10" />
                  <div className="mt-4 space-y-2">
                    <div className="h-6 w-32 bg-white/10 rounded" />
                    <div className="h-4 w-48 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-white/10 rounded-full" />
                  <div className="h-6 w-20 bg-white/10 rounded-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles?.map((profile) => (
            <RoommateProfilePreview
              key={profile.id}
              profile={profile}
              onViewProfile={handleViewProfile}
            />
          ))}
          {profiles?.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-white/60">No matching roommates found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoommateProfileGrid;
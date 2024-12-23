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
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    // Refetch with new filters
    toast({
      title: "Filters Applied",
      description: "Updating roommate list with selected filters.",
    });
  };

  const handleViewProfile = (id: string) => {
    toast({
      title: "Coming Soon",
      description: "Full profile view will be available soon!",
    });
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error">Error loading profiles. Please try again later.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton loading cards
          Array.from({ length: 6 }).map((_, i) => (
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
                <div className="h-10 w-full bg-white/10 rounded" />
              </div>
            </Card>
          ))
        ) : (
          profiles?.map((profile) => (
            <RoommateProfilePreview
              key={profile.id}
              profile={profile}
              onViewProfile={handleViewProfile}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoommateProfileGrid;
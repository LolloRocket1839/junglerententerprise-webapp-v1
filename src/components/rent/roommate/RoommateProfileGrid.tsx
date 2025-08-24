import { useState, useMemo } from "react";
import { useSecureProfiles } from "@/hooks/useSecureProfiles";
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

  const { data: allProfiles, isLoading, error } = useSecureProfiles();

  // Apply filters client-side to the secure profile data
  const profiles = useMemo(() => {
    if (!allProfiles || !Array.isArray(allProfiles)) return [];

    return allProfiles.filter(profile => {
      // Budget filter
      if (filters.budget !== 'all') {
        const [min, max] = filters.budget.split('-');
        if (min && max) {
          const minBudget = parseInt(min);
          const maxBudget = parseInt(max);
          if (!profile.budget_min || !profile.budget_max ||
              profile.budget_min < minBudget || profile.budget_max > maxBudget) {
            return false;
          }
        } else if (min === '801+') {
          if (!profile.budget_min || profile.budget_min < 801) {
            return false;
          }
        }
      }

      // Move-in date filter
      if (filters.moveInDate !== 'all' && profile.move_in_date) {
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
        if (new Date(profile.move_in_date) > futureDate) {
          return false;
        }
      }

      return true;
    });
  }, [allProfiles, filters]);

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
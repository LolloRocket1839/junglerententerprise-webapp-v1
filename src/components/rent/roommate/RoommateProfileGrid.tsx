import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RoommateProfilePreview from "./RoommateProfilePreview";
import { useToast } from "@/components/ui/use-toast";

const RoommateProfileGrid = () => {
  const { toast } = useToast();

  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['roommate-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleViewProfile = (id: string) => {
    toast({
      title: "Coming Soon",
      description: "Full profile view will be available soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card h-64" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error">Error loading profiles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles?.map((profile) => (
        <RoommateProfilePreview
          key={profile.id}
          profile={profile}
          onViewProfile={handleViewProfile}
        />
      ))}
    </div>
  );
};

export default RoommateProfileGrid;
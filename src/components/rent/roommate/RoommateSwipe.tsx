
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  bio?: string;
  current_city?: string;
}

export const RoommateSwipe = () => {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleSwipe = async (liked: boolean) => {
    if (!currentProfile) return;

    try {
      const { error } = await supabase
        .from('roommate_swipes')
        .insert({
          swiper_id: (await supabase.auth.getUser()).data.user?.id,
          target_id: currentProfile.id,
          liked
        });

      if (error) throw error;

      // Show feedback
      toast({
        title: liked ? "Great!" : "No problem!",
        description: liked ? "We'll let them know if it's a match!" : "Let's find someone else.",
        duration: 2000
      });

      // Load next profile
      loadNextProfile();

    } catch (error) {
      console.error('Error recording swipe:', error);
      toast({
        title: "Error",
        description: "Failed to record your choice. Please try again.",
        variant: "destructive"
      });
    }
  };

  const loadNextProfile = async () => {
    try {
      setLoading(true);
      
      // Get current user's swipes
      const { data: existingSwipes } = await supabase
        .from('roommate_swipes')
        .select('target_id')
        .eq('swiper_id', (await supabase.auth.getUser()).data.user?.id);

      const swipedIds = existingSwipes?.map(swipe => swipe.target_id) || [];

      // Get next profile that hasn't been swiped
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .not('id', 'in', `(${swipedIds.join(',')})`)
        .limit(1)
        .single();

      if (error) throw error;
      setCurrentProfile(profiles);

    } catch (error) {
      console.error('Error loading next profile:', error);
      toast({
        title: "Error",
        description: "Failed to load next profile. Please refresh the page.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadNextProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold mb-4">No More Profiles</h3>
        <p className="text-gray-500">Check back later for new potential roommates!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <AnimatePresence>
        <motion.div
          key={currentProfile.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20">
            {currentProfile.avatar_url && (
              <div className="relative pb-[100%]">
                <img
                  src={currentProfile.avatar_url}
                  alt={`${currentProfile.first_name}'s profile`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">
                {currentProfile.first_name} {currentProfile.last_name}
              </h3>
              {currentProfile.current_city && (
                <p className="text-gray-400 mb-4">{currentProfile.current_city}</p>
              )}
              <p className="text-gray-300">{currentProfile.bio || "No bio provided"}</p>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-16 h-16 bg-red-500/10 hover:bg-red-500/20 border-red-500/50"
          onClick={() => handleSwipe(false)}
        >
          <X className="w-8 h-8 text-red-500" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-16 h-16 bg-green-500/10 hover:bg-green-500/20 border-green-500/50"
          onClick={() => handleSwipe(true)}
        >
          <Heart className="w-8 h-8 text-green-500" />
        </Button>
      </div>
    </div>
  );
};

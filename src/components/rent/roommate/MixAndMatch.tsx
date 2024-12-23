import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Heart, Ban, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  bio: string | null;
  preferences: any;
  budget_min: number | null;
  budget_max: number | null;
}

export function MixAndMatch() {
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadProfiles();
    }
  }, [isOpen]);

  const loadProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(50);

      if (error) throw error;

      if (data) {
        setProfiles(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load profiles. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSwipe = async (liked: boolean) => {
    if (currentIndex >= profiles.length) return;

    const targetProfile = profiles[currentIndex];

    try {
      const { data: existingMatch, error: matchError } = await supabase
        .from('roommate_matches')
        .select('*')
        .eq('profile_id', targetProfile.id)
        .single();

      if (matchError && matchError.code !== 'PGNF') throw matchError;

      if (liked && existingMatch?.liked) {
        toast({
          title: "It's a match! 🎉",
          description: `You matched with ${targetProfile.first_name}!`,
        });
      }

      const { error: swipeError } = await supabase
        .from('roommate_matches')
        .upsert({
          profile_id: targetProfile.id,
          liked: liked,
        });

      if (swipeError) throw swipeError;

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error recording swipe:', error);
      toast({
        title: "Error",
        description: "Failed to record your choice. Please try again.",
        variant: "destructive",
      });
    }
  };

  const currentProfile = profiles[currentIndex];

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary transition-all duration-300"
      >
        Mix & Match
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="h-[600px] relative overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : currentIndex >= profiles.length ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">No more profiles!</h3>
                <p className="text-muted-foreground">Check back later for more potential matches.</p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setCurrentIndex(0);
                    loadProfiles();
                  }}
                >
                  Start Over
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProfile.id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="h-full"
                >
                  <div className="relative h-full glass-card rounded-none">
                    {currentProfile.avatar_url && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentProfile.avatar_url})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        {currentProfile.first_name}, {currentProfile.bio}
                      </h3>
                      <p className="text-sm opacity-90 mb-4">
                        Budget: €{currentProfile.budget_min} - €{currentProfile.budget_max}
                      </p>
                      
                      <div className="flex justify-center gap-4">
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full w-12 h-12 p-0 border-2 hover:bg-red-500/20"
                          onClick={() => handleSwipe(false)}
                        >
                          <Ban className="h-6 w-6 text-red-500" />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full w-12 h-12 p-0 border-2 hover:bg-green-500/20"
                          onClick={() => handleSwipe(true)}
                        >
                          <Heart className="h-6 w-6 text-green-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
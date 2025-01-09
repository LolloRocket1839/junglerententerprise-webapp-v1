import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";
import MatchDialog from './match/MatchDialog';
import ProfileCard from './match/ProfileCard';
import LoadingState from './match/LoadingState';
import NoMoreProfiles from './match/NoMoreProfiles';

export function MixAndMatch() {
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
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
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast({
          title: "Autenticazione richiesta",
          description: "Accedi per utilizzare la funzione Mix & Match.",
          variant: "destructive",
        });
        setIsOpen(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', userData.user.id)
        .limit(50);

      if (error) throw error;

      if (data) {
        setProfiles(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei profili:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i profili. Riprova più tardi.",
        variant: "destructive",
      });
    }
  };

  const handleSwipe = async (liked: boolean) => {
    if (currentIndex >= profiles.length) return;

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast({
        title: "Autenticazione richiesta",
        description: "Accedi per utilizzare questa funzione.",
        variant: "destructive",
      });
      return;
    }

    const targetProfile = profiles[currentIndex];

    try {
      const { data: existingMatch, error: matchError } = await supabase
        .from('roommate_matches')
        .select('*')
        .eq('profile_id', targetProfile.id)
        .eq('target_profile_id', userData.user.id)
        .eq('liked', true)
        .maybeSingle();

      if (matchError) throw matchError;

      const { error: swipeError } = await supabase
        .from('roommate_matches')
        .insert({
          profile_id: userData.user.id,
          target_profile_id: targetProfile.id,
          liked: liked,
        });

      if (swipeError) throw swipeError;

      if (liked && existingMatch) {
        toast({
          title: "È un match! 🎉",
          description: `Hai fatto match con ${targetProfile.first_name}!`,
        });
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Errore nel registrare la scelta:', error);
      toast({
        title: "Errore",
        description: "Impossibile registrare la tua scelta. Riprova.",
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

      <MatchDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {isLoading ? (
          <LoadingState />
        ) : currentIndex >= profiles.length ? (
          <NoMoreProfiles 
            onRestart={() => {
              setCurrentIndex(0);
              loadProfiles();
            }}
          />
        ) : (
          <AnimatePresence mode="wait">
            <ProfileCard
              profile={currentProfile}
              onSwipe={handleSwipe}
            />
          </AnimatePresence>
        )}
      </MatchDialog>
    </>
  );
}
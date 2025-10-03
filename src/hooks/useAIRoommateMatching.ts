import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface AIMatch {
  profileId: string;
  profile: any;
  matchScore: number;
  reasons: string[];
  compatibilityAreas: string[];
  concerns: string[];
}

export const useAIRoommateMatching = () => {
  const [matches, setMatches] = useState<AIMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const findMatches = async (profileId: string, isAnonymous: boolean = false) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-roommate-matching', {
        body: { 
          profileId,
          isAnonymous 
        }
      });

      if (error) throw error;

      if (data?.matches) {
        setMatches(data.matches);
        toast({
          title: "✨ Match AI Completati",
          description: `Trovati ${data.matches.length} match compatibili usando l'intelligenza artificiale!`,
        });
      }
    } catch (error: any) {
      console.error('AI matching error:', error);
      toast({
        title: "Errore AI Matching",
        description: error.message || "Impossibile trovare match con AI. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { matches, isLoading, findMatches };
};

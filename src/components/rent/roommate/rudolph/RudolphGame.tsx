import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RudolphComparison from './RudolphComparison';
import type { Choice } from './RudolphComparison';
import { Loader2 } from 'lucide-react';

export interface Comparison {
  id: string;
  component_a: string;
  component_b: string;
  category: string;
}

const RudolphGame = () => {
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchRandomComparison = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('rudolph_comparisons')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      setComparison(data);
    } catch (error) {
      console.error('Error fetching comparison:', error);
      toast({
        title: "Error",
        description: "Failed to load comparison. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomComparison();
  }, []);

  const handleChoice = async (choice: Choice, comparisonId: string) => {
    try {
      const { error } = await supabase
        .from('rudolph_progress')
        .insert({
          choice,
          comparison_id: comparisonId,
          rudolph_score: choice === 'component_a' ? 1 : -1,
        });

      if (error) throw error;

      toast({
        title: "Choice recorded!",
        description: `You chose ${choice === 'component_a' ? 'Component A' : 'Component B'}.`,
      });

      // Fetch next comparison
      fetchRandomComparison();
    } catch (error) {
      console.error('Error recording choice:', error);
      toast({
        title: "Error",
        description: "Failed to record your choice. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-white/80">No comparisons available.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <RudolphComparison
        comparison={comparison}
        onChoice={handleChoice}
      />
    </div>
  );
};

export default RudolphGame;
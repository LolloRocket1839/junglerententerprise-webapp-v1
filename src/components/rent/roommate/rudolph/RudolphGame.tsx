import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RudolphComparison from './RudolphComparison';
import type { Choice } from './RudolphComparison';
import { Loader2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export interface Comparison {
  id: string;
  component_a: string;
  component_b: string;
  category: string;
}

const RudolphGame = () => {
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  const fetchRandomComparison = async () => {
    setIsLoading(true);
    try {
      // Fetch a random comparison excluding already answered ones
      const { data, error } = await supabase
        .from('rudolph_comparisons')
        .select('*')
        .order('RANDOM()')
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

      setTotalAnswered(prev => prev + 1);
      setStreak(prev => prev + 1);

      // Show encouraging toast message
      if (streak > 0 && streak % 5 === 0) {
        toast({
          title: "🎉 Streak Bonus!",
          description: `You're on fire! ${streak} choices in a row!`,
        });
      } else {
        toast({
          title: "Choice recorded!",
          description: `Great choice! Let's see what's next...`,
        });
      }

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
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-white/60">Loading your next choice...</p>
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <p className="text-sm text-white/60">Total Choices Made</p>
          <p className="text-2xl font-bold text-white">{totalAnswered}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-white/60">Current Streak</p>
          <p className="text-2xl font-bold text-primary">{streak}</p>
        </div>
      </div>

      <Progress value={(totalAnswered % 10) * 10} className="h-2" />
      
      <RudolphComparison
        comparison={comparison}
        onChoice={handleChoice}
        totalAnswered={totalAnswered}
      />
    </div>
  );
};

export default RudolphGame;
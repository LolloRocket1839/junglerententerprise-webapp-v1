import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Scale, Brain, Share2 } from 'lucide-react';
import RudolphComparison from './RudolphComparison';
import RudolphResults from './RudolphResults';

export type Comparison = {
  id: string;
  category: string;
  component_a: string;
  component_b: string;
  rudolph_value: number;
};

const RudolphGame = () => {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadComparisons();
  }, []);

  const loadComparisons = async () => {
    try {
      const { data, error } = await supabase
        .from('rudolph_comparisons')
        .select('*')
        .order('created_at');

      if (error) throw error;
      setComparisons(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error loading comparisons",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleChoice = async (choice: 'component_a' | 'component_b', comparisonId: string) => {
    try {
      const comparison = comparisons[currentIndex];
      const rudolphScore = choice === 'component_a' ? comparison.rudolph_value : -comparison.rudolph_value;
      
      // Save progress
      const { error } = await supabase
        .from('rudolph_progress')
        .insert({
          comparison_id: comparisonId,
          choice,
          rudolph_score: rudolphScore,
          quantum_state: Math.random() < 0.001 // 0.1% chance of quantum state
        });

      if (error) throw error;

      // Update score and progress
      setScore(prev => prev + rudolphScore);
      
      if (currentIndex < comparisons.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }

      // Add some Rudolph coins for participation
      const { error: walletError } = await supabase.rpc('add_jungle_coins', {
        amount: 5,
        reason: 'Rudolph Measurement participation'
      });

      if (walletError) throw walletError;

    } catch (error) {
      toast({
        title: "Error saving progress",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </Card>
    );
  }

  if (isComplete) {
    return <RudolphResults score={score} />;
  }

  const progress = (currentIndex / comparisons.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                Current Rudolph Score: {score.toFixed(1)}R
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm text-white/60">
                Question {currentIndex + 1} of {comparisons.length}
              </span>
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          {comparisons[currentIndex] && (
            <RudolphComparison
              comparison={comparisons[currentIndex]}
              onChoice={handleChoice}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default RudolphGame;
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

export type Choice = 'component_a' | 'component_b';

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

  const handleChoice = async (choice: Choice, comparisonId: string) => {
    try {
      const comparison = comparisons[currentIndex];
      const rudolphScore = choice === 'component_a' ? comparison.rudolph_value : -comparison.rudolph_value;
      
      const { error } = await supabase
        .from('rudolph_progress')
        .insert({
          comparison_id: comparisonId,
          choice,
          rudolph_score: rudolphScore,
          quantum_state: Math.random() < 0.001
        });

      if (error) throw error;

      setScore(prev => prev + rudolphScore);
      
      if (currentIndex < comparisons.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }

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
      <Card className="p-8 animate-pulse bg-black/20 backdrop-blur-sm">
        <div className="h-64 bg-white/5 rounded-lg"></div>
      </Card>
    );
  }

  if (isComplete) {
    return <RudolphResults score={score} />;
  }

  const progress = (currentIndex / comparisons.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-8 bg-black/20 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium text-white">
                Rudolph Score: {score.toFixed(1)}R
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg text-white">
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
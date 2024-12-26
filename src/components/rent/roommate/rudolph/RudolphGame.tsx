import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import RudolphComparison from './RudolphComparison';

const RudolphGame = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalChoices, setTotalChoices] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // Persist counts and score in localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('rudolph_streak');
    const savedTotal = localStorage.getItem('rudolph_total');
    const savedScore = localStorage.getItem('rudolph_score');
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedTotal) setTotalChoices(parseInt(savedTotal));
    if (savedScore) setTotalScore(parseFloat(savedScore));
  }, []);

  // Save counts and score to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rudolph_streak', streak.toString());
    localStorage.setItem('rudolph_total', totalChoices.toString());
    localStorage.setItem('rudolph_score', totalScore.toString());
  }, [streak, totalChoices, totalScore]);

  const { data: comparisons, isLoading, error } = useQuery({
    queryKey: ['rudolph-comparisons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rudolph_comparisons')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const calculateScore = (choice: string, comparison: any) => {
    // Base score calculation on the rudolph_value from the comparison
    const baseScore = comparison.rudolph_value || 0;
    
    // Adjust score based on the choice (component_a is considered the baseline)
    if (choice === comparison.component_a) {
      return baseScore;
    } else {
      // For component_b, we invert the score effect
      return 1 - baseScore;
    }
  };

  const handleChoice = async (choice: string, comparisonId: string) => {
    if (!comparisons) return;
    
    const currentComparison = comparisons[currentIndex % comparisons.length];
    const choiceScore = calculateScore(choice, currentComparison);

    try {
      const { error } = await supabase
        .from('rudolph_progress')
        .insert([
          {
            comparison_id: comparisonId,
            choice,
            rudolph_score: choiceScore,
          }
        ]);

      if (error) throw error;

      setTotalChoices(prev => prev + 1);
      setStreak(prev => prev + 1);
      setTotalScore(prev => prev + choiceScore);
      setCurrentIndex(prev => prev + 1);

      // Provide feedback based on the choice
      const feedback = choiceScore > 0.7 
        ? "Excellent choice! 🌟" 
        : choiceScore > 0.4 
          ? "Good decision! ✨" 
          : "Interesting choice... 🤔";

      toast({
        title: feedback,
        description: `Score: +${choiceScore.toFixed(2)} | Total: ${(totalScore + choiceScore).toFixed(2)}`,
      });
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !comparisons) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Something went wrong. Please try again later.</p>
      </div>
    );
  }

  // If we've shown all comparisons, loop back to start
  const currentComparison = comparisons[currentIndex % comparisons.length];
  const progress = ((currentIndex % comparisons.length) / comparisons.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">The Rudolph Game</h2>
        <p className="text-white/60 mb-4">Choose between options to reveal your personality type</p>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-white/60 mt-2">
            Question {(currentIndex % comparisons.length) + 1} of {comparisons.length}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <motion.div 
            className="glass-card px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white/80">Streak: </span>
            <span className="text-primary font-bold">{streak}</span>
          </motion.div>
          <motion.div 
            className="glass-card px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white/80">Total Score: </span>
            <span className="text-primary font-bold">{totalScore.toFixed(2)}</span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <RudolphComparison
            comparison={currentComparison}
            onChoice={handleChoice}
            streak={streak}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RudolphGame;
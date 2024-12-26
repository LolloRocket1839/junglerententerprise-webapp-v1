import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import RudolphComparison from './RudolphComparison';

const RudolphGame = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalChoices, setTotalChoices] = useState(0);

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

  const handleChoice = async (choice: string, comparisonId: string) => {
    try {
      const { error } = await supabase
        .from('rudolph_progress')
        .insert([
          {
            comparison_id: comparisonId,
            choice,
            rudolph_score: Math.random(), // This would be replaced with actual scoring logic
          }
        ]);

      if (error) throw error;

      setTotalChoices(prev => prev + 1);
      setStreak(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);

      toast({
        title: "Choice recorded!",
        description: `Streak: ${streak + 1}`,
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">The Rudolph Game</h2>
        <p className="text-white/60">Choose between options to reveal your personality type</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="glass-card px-4 py-2 rounded-lg">
            <span className="text-white/80">Streak: </span>
            <span className="text-primary font-bold">{streak}</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-lg">
            <span className="text-white/80">Total Choices: </span>
            <span className="text-primary font-bold">{totalChoices}</span>
          </div>
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
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Share2, RefreshCw, Lightbulb, Timer, Star } from 'lucide-react';
import RudolphComparison from './RudolphComparison';

const RudolphGame = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [timer, setTimer] = useState(30);
  const [multiplier, setMultiplier] = useState(1);

  // Load comparisons from Supabase
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

  // Timer effect
  useEffect(() => {
    if (!comparisons) return;
    
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          handleChoice('timeout', comparisons[currentIndex].id);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, comparisons]);

  // Calculate score based on choice and timing
  const calculateScore = (choice: string, comparison: any) => {
    const baseScore = choice === comparison.component_a ? comparison.rudolph_value : 1 - comparison.rudolph_value;
    const timeBonus = timer / 30; // Time bonus factor
    return baseScore * multiplier * (0.5 + timeBonus * 0.5);
  };

  const handleChoice = async (choice: string, comparisonId: string) => {
    if (!comparisons) return;
    
    const currentComparison = comparisons[currentIndex];
    const score = calculateScore(choice, currentComparison);

    try {
      const { error } = await supabase
        .from('rudolph_progress')
        .insert([
          {
            comparison_id: comparisonId,
            choice,
            rudolph_score: score,
          }
        ]);

      if (error) throw error;

      // Update streak and score
      if (score > 0.6) {
        setStreak(prev => prev + 1);
        if (streak + 1 === 5) {
          setMultiplier(2);
          toast({
            title: "🌟 Streak Bonus!",
            description: "Double points activated for next 3 choices!",
          });
        }
      } else {
        setStreak(0);
        setMultiplier(1);
      }

      setTotalScore(prev => prev + score);
      setCurrentIndex(prev => prev + 1);
      setTimer(30);

      // Show feedback
      toast({
        title: score > 0.6 ? "Great choice! 🎯" : "Keep trying! 💪",
        description: `Score: +${score.toFixed(2)} | Streak: ${streak}`,
      });

    } catch (error) {
      console.error('Error recording choice:', error);
      toast({
        title: "Error",
        description: "Failed to record your choice",
        variant: "destructive",
      });
    }
  };

  const useHint = () => {
    if (hintsLeft <= 0) {
      toast({
        title: "No hints left!",
        description: "Keep playing to earn more hints",
        variant: "destructive",
      });
      return;
    }

    setHintsLeft(prev => prev - 1);
    toast({
      title: "💡 Hint Used",
      description: "Consider the long-term impact of your choice!",
    });
  };

  const shareResults = async () => {
    const text = `🦌 I scored ${totalScore.toFixed(2)} points in Rudolph Game with a ${streak} streak! Can you beat my score?`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Rudolph Game Score',
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Copied to clipboard!",
          description: "Share your score with friends",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !comparisons) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">Something went wrong. Please try again.</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Stats */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            className="glass-card p-4 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-white/60">Score</p>
            <p className="text-xl font-bold">{totalScore.toFixed(2)}</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-4 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-white/60">Streak</p>
            <p className="text-xl font-bold">{streak}</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-4 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <Timer className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-white/60">Time</p>
            <p className="text-xl font-bold">{timer}s</p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/60">
            <span>Progress</span>
            <span>{currentIndex + 1} / {comparisons.length}</span>
          </div>
          <Progress value={((currentIndex + 1) / comparisons.length) * 100} />
        </div>

        {/* Game Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RudolphComparison
              comparison={comparisons[currentIndex % comparisons.length]}
              onChoice={handleChoice}
              streak={streak}
            />
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={useHint}
            disabled={hintsLeft <= 0}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Hint ({hintsLeft})
          </Button>
          
          <Button onClick={shareResults} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Score
          </Button>
        </div>

        {/* Game Info */}
        <div className="text-center text-sm text-white/40 space-y-1">
          <p>No Rudolphs were harmed in this game</p>
          <p>Current multiplier: x{multiplier}</p>
        </div>
      </div>
    </div>
  );
};

export default RudolphGame;
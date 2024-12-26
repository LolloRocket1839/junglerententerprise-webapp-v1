import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import RudolphQuestion from './RudolphQuestion';
import RudolphResults from './RudolphResults';
import { Trophy, Brain } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  category: string;
  options: {
    text: string;
    dimension: string;
    value: number;
  }[];
  dimension_correlations?: {
    dimension: string;
    value: number;
  }[];
  information_gain?: number;
  complexity_level?: number;
  created_at?: string;
}

const RudolphGame = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScores, setUserScores] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('rudolph_questions')
        .select('*')
        .order('created_at');

      if (error) throw error;
      
      // Type cast the data to match our Question interface
      const typedQuestions = (data || []).map(q => ({
        id: q.id,
        question: q.question,
        category: q.category,
        options: q.options as Question['options'],
        dimension_correlations: q.dimension_correlations as Question['dimension_correlations'],
        information_gain: q.information_gain,
        complexity_level: q.complexity_level,
        created_at: q.created_at
      }));
      
      setQuestions(typedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAnswer = async (selectedOption: any) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update scores
    const newScores = { ...userScores };
    selectedOption.dimension_correlations?.forEach((correlation: any) => {
      const dimension = correlation.dimension;
      const value = correlation.value;
      newScores[dimension] = (newScores[dimension] || 0) + value;
    });
    setUserScores(newScores);

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
      // Save final scores
      try {
        // Get user ID first
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user?.id) {
          throw new Error('No authenticated user found');
        }

        const { error } = await supabase
          .from('rudolph_user_dimensions')
          .upsert(
            Object.entries(newScores).map(([dimension, score]) => ({
              dimension_id: dimension,
              score,
              profile_id: user.id,
            }))
          );

        if (error) throw error;
      } catch (error) {
        console.error('Error saving scores:', error);
        toast({
          title: "Error",
          description: "Failed to save your results. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-40 bg-gray-200 rounded animate-pulse" />
      </Card>
    );
  }

  if (isComplete) {
    return <RudolphResults scores={userScores} />;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Progress header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="text-sm text-primary font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm text-white/60">
                Personality Analysis
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <Progress value={progress} className="h-2" />

          {/* Question */}
          {questions[currentQuestionIndex] && (
            <RudolphQuestion
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default RudolphGame;
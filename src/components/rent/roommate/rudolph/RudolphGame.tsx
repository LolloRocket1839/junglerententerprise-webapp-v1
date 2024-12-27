import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RudolphQuestion from './RudolphQuestion';
import RudolphResults from './RudolphResults';
import { Trophy, Brain } from 'lucide-react';
import { RudolphQuestion as RudolphQuestionType } from './types';

const RudolphGame = () => {
  const [questions, setQuestions] = useState<RudolphQuestionType[]>([]);
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
      
      const typedQuestions = (data || []).map(q => ({
        id: q.id,
        question: q.question,
        category: q.category,
        options: Array.isArray(q.options) ? q.options : [],
        dimension_correlations: Array.isArray(q.dimension_correlations) ? q.dimension_correlations : [],
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save your progress.",
          variant: "destructive",
        });
        return;
      }

      const currentQuestion = questions[currentQuestionIndex];
      
      // Save progress
      const { error: progressError } = await supabase
        .from('rudolph_progress')
        .insert({
          profile_id: user.id,
          comparison_id: currentQuestion.id,
          choice: selectedOption.text,
          rudolph_score: selectedOption.value || 0
        });

      if (progressError) throw progressError;

      // Update dimension scores
      if (selectedOption.dimension_correlations) {
        const newScores = { ...userScores };
        selectedOption.dimension_correlations.forEach((correlation: any) => {
          const dimension = correlation.dimension;
          const value = correlation.value;
          newScores[dimension] = (newScores[dimension] || 0) + value;
        });
        setUserScores(newScores);

        // Save dimension scores
        const dimensionScores = Object.entries(newScores).map(([dimension, score]) => ({
          dimension_id: dimension,
          score,
          profile_id: user.id
        }));

        const { error: dimensionError } = await supabase
          .from('rudolph_user_dimensions')
          .upsert(dimensionScores);

        if (dimensionError) throw dimensionError;
      }

      // Move to next question or complete
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsComplete(true);
        toast({
          title: "Game Complete! 🎉",
          description: "Your personality profile has been generated.",
        });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
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
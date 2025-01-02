import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import RudolphQuestion from './RudolphQuestion';
import RudolphResults from './RudolphResults';
import { Trophy, Brain, Scale, Bug } from 'lucide-react';
import { RudolphQuestion as RudolphQuestionType } from './types';
import IncomparableChoice from './IncomparableChoice';

const RudolphGame = () => {
  const [questions, setQuestions] = useState<RudolphQuestionType[]>([]);
  const [incomparables, setIncomparables] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentIncomparableIndex, setCurrentIncomparableIndex] = useState(0);
  const [userScores, setUserScores] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showIncomparable, setShowIncomparable] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadQuestions();
    loadIncomparables();
  }, []);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('rudolph_questions')
        .select('*')
        .order('created_at');

      if (error) throw error;
      
      const typedQuestions: RudolphQuestionType[] = (data || []).map(q => ({
        id: q.id,
        question: q.question,
        category: q.category,
        options: Array.isArray(q.options) ? q.options.map((opt: any) => ({
          text: opt.text || '',
          value: opt.value || 0,
          dimension_correlations: Array.isArray(opt.dimension_correlations) 
            ? opt.dimension_correlations.map((corr: any) => ({
                dimension: corr.dimension || '',
                value: corr.value || 0
              }))
            : []
        })) : [],
        dimension_correlations: Array.isArray(q.dimension_correlations) 
          ? q.dimension_correlations.map((corr: any) => ({
              dimension: corr.dimension || '',
              value: corr.value || 0
            }))
          : [],
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

  const loadIncomparables = async () => {
    try {
      const { data, error } = await supabase
        .from('rudolph_incomparables')
        .select('*')
        .order('created_at');

      if (error) throw error;
      setIncomparables(data || []);
    } catch (error) {
      console.error('Error loading incomparables:', error);
    }
  };

  const toggleDevMode = () => {
    setDevMode(!devMode);
    toast({
      title: devMode ? "Development Mode Disabled" : "Development Mode Enabled",
      description: devMode ? "Switching to production mode" : "Debug information will be shown",
      variant: devMode ? "default" : "destructive",
    });
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
      
      // Generate UUID for the new progress entry
      const progressId = crypto.randomUUID();
      const now = new Date().toISOString();
      
      // Save progress with required fields
      const { error: progressError } = await supabase
        .from('rudolph_progress')
        .insert({
          id: progressId,
          created_at: now,
          profile_id: user.id,
          comparison_id: currentQuestion.id,
          choice: selectedOption.text,
          rudolph_score: selectedOption.value || 0,
          quantum_state: false
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

      // Show incomparable every 3 questions
      if ((currentQuestionIndex + 1) % 3 === 0 && incomparables.length > currentIncomparableIndex) {
        setShowIncomparable(true);
      } else {
        moveToNextQuestion();
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

  const handleIncomparableChoice = async (choice: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const currentIncomparable = incomparables[currentIncomparableIndex];
      
      // Generate UUID and timestamp for the new entry
      const progressId = crypto.randomUUID();
      const now = new Date().toISOString();
      
      await supabase
        .from('rudolph_progress')
        .insert({
          id: progressId,
          created_at: now,
          profile_id: user.id,
          choice: choice,
          quantum_state: true,
          rudolph_score: 0
        });

      setCurrentIncomparableIndex(prev => prev + 1);
      setShowIncomparable(false);
      moveToNextQuestion();
    } catch (error) {
      console.error('Error saving incomparable choice:', error);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
      toast({
        title: "Game Complete! 🎉",
        description: "Your personality profile has been generated.",
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
            <div className="flex items-center gap-4">
              <Button
                variant={devMode ? "destructive" : "outline"}
                size="sm"
                onClick={toggleDevMode}
                className="flex items-center gap-2"
              >
                <Bug className="h-4 w-4" />
                {devMode ? "Disable Dev Mode" : "Enable Dev Mode"}
              </Button>
              <div className="flex items-center gap-2">
                {showIncomparable ? (
                  <Scale className="h-5 w-5 text-primary" />
                ) : (
                  <Brain className="h-5 w-5 text-primary" />
                )}
                <span className="text-sm text-white/60">
                  {showIncomparable ? "Quantum Comparison" : "Personality Analysis"}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <Progress value={progress} className="h-2" />

          {/* Debug Information */}
          {devMode && (
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h4 className="text-sm font-medium text-destructive mb-2">Debug Information</h4>
              <div className="space-y-2 text-sm text-destructive/80">
                <p>Current Question Index: {currentQuestionIndex}</p>
                <p>Incomparable Index: {currentIncomparableIndex}</p>
                <p>Show Incomparable: {showIncomparable.toString()}</p>
                <p>User Scores: {JSON.stringify(userScores, null, 2)}</p>
              </div>
            </div>
          )}

          {/* Question or Incomparable Choice */}
          {showIncomparable ? (
            <IncomparableChoice
              incomparable={incomparables[currentIncomparableIndex]}
              onChoice={handleIncomparableChoice}
            />
          ) : (
            questions[currentQuestionIndex] && (
              <RudolphQuestion
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            )
          )}
        </div>
      </Card>
    </div>
  );
};

export default RudolphGame;
import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { measurePerformance } from '../../utils/performance';
import { supabase } from '../../lib/supabase/client';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
}

interface GameState {
  currentQuestion: number;
  answers: Record<number, string>;
  score: number;
  isComplete: boolean;
}

const RoommateGame: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    answers: {},
    score: 0,
    isComplete: false,
  });

  const questions = useMemo<Question[]>(() => [
    {
      id: 1,
      text: t('roommate.game.questions.lifestyle'),
      options: [
        { id: 'early_bird', text: t('roommate.game.options.earlyBird'), score: 1 },
        { id: 'night_owl', text: t('roommate.game.options.nightOwl'), score: 2 },
        { id: 'flexible', text: t('roommate.game.options.flexible'), score: 3 },
      ],
    },
    {
      id: 2,
      text: t('roommate.game.questions.cleanliness'),
      options: [
        { id: 'very_clean', text: t('roommate.game.options.veryClean'), score: 3 },
        { id: 'moderate', text: t('roommate.game.options.moderate'), score: 2 },
        { id: 'relaxed', text: t('roommate.game.options.relaxed'), score: 1 },
      ],
    },
    {
      id: 3,
      text: t('roommate.game.questions.social'),
      options: [
        { id: 'very_social', text: t('roommate.game.options.verySocial'), score: 3 },
        { id: 'moderate_social', text: t('roommate.game.options.moderateSocial'), score: 2 },
        { id: 'private', text: t('roommate.game.options.private'), score: 1 },
      ],
    },
    {
      id: 4,
      text: t('roommate.game.questions.noise'),
      options: [
        { id: 'quiet', text: t('roommate.game.options.quiet'), score: 1 },
        { id: 'moderate_noise', text: t('roommate.game.options.moderateNoise'), score: 2 },
        { id: 'lively', text: t('roommate.game.options.lively'), score: 3 },
      ],
    },
    {
      id: 5,
      text: t('roommate.game.questions.guests'),
      options: [
        { id: 'frequent', text: t('roommate.game.options.frequentGuests'), score: 3 },
        { id: 'occasional', text: t('roommate.game.options.occasionalGuests'), score: 2 },
        { id: 'rare', text: t('roommate.game.options.rareGuests'), score: 1 },
      ],
    },
  ], [t]);

  const handleAnswer = useCallback(async (questionId: number, optionId: string) => {
    measurePerformance('answerQuestion', async () => {
      const option = questions[gameState.currentQuestion].options.find(opt => opt.id === optionId);
      if (!option) return;

      const newAnswers = { ...gameState.answers, [questionId]: optionId };
      const newScore = gameState.score + option.score;
      const isLastQuestion = gameState.currentQuestion === questions.length - 1;

      setGameState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        currentQuestion: isLastQuestion ? prev.currentQuestion : prev.currentQuestion + 1,
        isComplete: isLastQuestion,
      }));

      if (isLastQuestion) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase
              .from('roommate_preferences')
              .upsert({
                user_id: user.id,
                preferences: newAnswers,
                compatibility_score: newScore,
                updated_at: new Date().toISOString(),
              });
          }
        } catch (error) {
          console.error('Error saving preferences:', error);
        }
      }
    });
  }, [gameState, questions]);

  const handleRestart = useCallback(() => {
    measurePerformance('restartGame', () => {
      setGameState({
        currentQuestion: 0,
        answers: {},
        score: 0,
        isComplete: false,
      });
    });
  }, []);

  const currentQuestion = questions[gameState.currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('roommate.game.title')}
        </h1>
        <p className="text-gray-600">
          {t('roommate.game.description')}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {t('roommate.game.question')} {gameState.currentQuestion + 1}/{questions.length}
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-primary-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((gameState.currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!gameState.isComplete ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion.text}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(currentQuestion.id, option.id)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      gameState.answers[currentQuestion.id] === option.id
                        ? 'border-primary-600 bg-primary-50 text-primary-900'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="text-4xl font-bold text-primary-600">
                {t('roommate.game.complete')}
              </div>
              <p className="text-gray-600">
                {t('roommate.game.score', { score: gameState.score })}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t('roommate.game.restart')}
                </button>
                <button
                  onClick={() => navigate('/roommate/matches')}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {t('roommate.game.viewMatches')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RoommateGame; 
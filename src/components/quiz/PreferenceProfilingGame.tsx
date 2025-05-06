import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface PreferenceQuestion {
  id: string;
  question_text: string;
  response_type: 'binary' | 'scale' | 'multi_option' | 'open_ended';
  response_options: string[];
  cognitive_dimensions: Record<string, number>;
  learning_style_correlations: Record<string, number>;
  metacognitive_indicators: string[];
  response_time_significance: number;
}

interface QuestionResponse {
  question_id: string;
  response_value: string;
  response_time: number;
}

const PreferenceProfilingGame: React.FC = () => {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Fetch questions
  const { data: questions, isLoading } = useQuery({
    queryKey: ['preferenceQuestions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('preference_questions')
        .select('*')
        .order('id');

      if (error) throw error;
      return data as PreferenceQuestion[];
    },
  });

  // Submit response mutation
  const submitResponseMutation = useMutation({
    mutationFn: async (response: QuestionResponse) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: studentProfile } = await supabase
        .from('student_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!studentProfile) throw new Error('Student profile not found');

      const { error } = await supabase
        .from('student_preference_responses')
        .insert({
          student_id: studentProfile.id,
          question_id: response.question_id,
          response_value: response.response_value,
          response_time: response.response_time,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentPreferenceResponses'] });
    },
  });

  // Start timer when question changes
  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleResponse = async (value: string) => {
    if (!questions) return;

    const responseTime = Date.now() - startTime;
    const currentQuestion = questions[currentQuestionIndex];

    const response: QuestionResponse = {
      question_id: currentQuestion.id,
      response_value: value,
      response_time: responseTime,
    };

    setResponses([...responses, response]);
    await submitResponseMutation.mutateAsync(response);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
      >
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('preferenceProfilingComplete')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('preferenceProfilingCompleteMessage')}
          </p>
          <button
            onClick={() => window.location.href = '/student/profile'}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t('returnToProfile')}
          </button>
        </div>
      </motion.div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('noQuestionsAvailable')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('pleaseTryAgainLater')}
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary-600"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
          </p>
        </div>

        {/* Question card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {currentQuestion.question_text}
            </h2>

            {/* Response options */}
            <div className="space-y-4">
              {currentQuestion.response_type === 'binary' && (
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.response_options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleResponse(option)}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.response_type === 'scale' && (
                <div className="flex justify-between items-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleResponse(value.toString())}
                      className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.response_type === 'multi_option' && (
                <div className="space-y-2">
                  {currentQuestion.response_options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleResponse(option)}
                      className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.response_type === 'open_ended' && (
                <div className="space-y-4">
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    rows={4}
                    placeholder={t('typeYourAnswer')}
                  />
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea) handleResponse(textarea.value);
                    }}
                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {t('submit')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreferenceProfilingGame; 
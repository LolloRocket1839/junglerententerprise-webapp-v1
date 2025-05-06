import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, queryWithCache, preparedQueries, handleQueryError } from '../../lib/supabase/client';
import { roommatePreferenceTranslations } from '../../translations/roommatePreferences';
import { Skeleton } from '../ui/skeleton';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

// Lazy load the form content
const FormContent = React.lazy(() => import('./FormContent'));

// Skeleton loader component
const FormSkeleton = () => (
  <div className="space-y-6">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
  </div>
);

const RoommatePreferencesForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Performance monitoring
  const { measurePerformance } = usePerformanceMonitor();

  // Memoize translations
  const currentLang = useMemo(() => i18n.language, [i18n.language]);
  const translations = useMemo(
    () => roommatePreferenceTranslations[currentLang as keyof typeof roommatePreferenceTranslations],
    [currentLang]
  );

  // Optimized fetch preferences with caching
  const fetchPreferences = useCallback(async () => {
    const startTime = performance.now();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await queryWithCache(
        `preferences-${user.id}`,
        () => preparedQueries.getRoommatePreferences.execute({ user_id: user.id })
      );

      if (error) throw error;
      if (data?.[0]?.preferences) {
        setPreferences(data[0].preferences);
      }
    } catch (err) {
      const errorResult = handleQueryError(err);
      setError(errorResult.error);
    } finally {
      setLoading(false);
      measurePerformance('fetchPreferences', performance.now() - startTime);
    }
  }, [navigate, measurePerformance]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  // Optimized preference change handler
  const handlePreferenceChange = useCallback((questionId: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  // Optimized form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const startTime = performance.now();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { error } = await preparedQueries.updateRoommatePreferences.execute({
        user_id: user.id,
        preferences,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;
      navigate('/student-profile');
    } catch (err) {
      const errorResult = handleQueryError(err);
      setError(errorResult.error);
    } finally {
      setIsSubmitting(false);
      measurePerformance('submitPreferences', performance.now() - startTime);
    }
  }, [preferences, navigate, measurePerformance]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-2xl font-bold mb-6">{t('roommatePreferences.title')}</h1>
      
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Suspense fallback={<FormSkeleton />}>
          <FormContent
            translations={translations}
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
            isSubmitting={isSubmitting}
          />
        </Suspense>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isSubmitting ? t('common.saving') : t('common.save')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default React.memo(RoommatePreferencesForm);

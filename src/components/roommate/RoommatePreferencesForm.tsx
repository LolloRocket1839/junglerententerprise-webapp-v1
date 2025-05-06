import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { roommatePreferenceTranslations } from '../../translations/roommatePreferences';
import { toast } from 'react-hot-toast';

// Lazy load the form content
const FormContent = React.lazy(() => import('./FormContent'));

interface RoommatePreferences {
  livingSpace: string;
  noiseLevel: string;
  guests: string;
  studyTime: string;
  studyStyle: string;
  socialLevel: string;
  foodSharing: string;
  sleepSchedule: string;
  pets: string;
  smoking: string;
  communication: string;
  conflict: string;
  cleaning: string;
  cleaningResponsibilities: string;
  temperature: string;
  personalItems: string;
}

// Initial state outside component to prevent recreation
const initialPreferences: Partial<RoommatePreferences> = {
  livingSpace: '',
  noiseLevel: '',
  guests: '',
  studyTime: '',
  studyStyle: '',
  socialLevel: '',
  foodSharing: '',
  sleepSchedule: '',
  pets: '',
  smoking: '',
  communication: '',
  conflict: '',
  cleaning: '',
  cleaningResponsibilities: '',
  temperature: '',
  personalItems: ''
};

const RoommatePreferencesForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [preferences, setPreferences] = useState<Partial<RoommatePreferences>>(initialPreferences);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Memoize translations to prevent unnecessary recalculations
  const currentLang = useMemo(() => i18n.language as keyof typeof roommatePreferenceTranslations, [i18n.language]);
  const translations = useMemo(() => roommatePreferenceTranslations[currentLang], [currentLang]);

  // Optimize fetch with caching
  const fetchPreferences = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Use cache-first strategy
      const cachedData = sessionStorage.getItem('roommatePreferences');
      if (cachedData) {
        setPreferences(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('roommate_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setPreferences(data.preferences);
        // Cache the data
        sessionStorage.setItem('roommatePreferences', JSON.stringify(data.preferences));
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast.error(t('errorLoadingPreferences'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const handlePreferenceChange = useCallback((key: keyof RoommatePreferences, value: string) => {
    setPreferences(prev => {
      const newPreferences = {
        ...prev,
        [key]: value
      };
      // Update cache
      sessionStorage.setItem('roommatePreferences', JSON.stringify(newPreferences));
      return newPreferences;
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('roommate_preferences')
        .upsert({
          user_id: user.id,
          preferences,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success(t('preferencesUpdated'));
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error(t('errorUpdatingPreferences'));
    } finally {
      setSaving(false);
    }
  }, [preferences, t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-8">{t('roommatePreferences')}</h1>
        
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <FormContent
            preferences={preferences}
            translations={translations}
            saving={saving}
            onPreferenceChange={handlePreferenceChange}
            onSubmit={handleSubmit}
            t={t}
          />
        </Suspense>
      </motion.div>
    </LazyMotion>
  );
};

export default React.memo(RoommatePreferencesForm);

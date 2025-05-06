import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { roommatePreferenceTranslations } from '../../translations/roommatePreferences';
import { toast } from 'react-hot-toast';

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

const RoommatePreferencesForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [preferences, setPreferences] = useState<Partial<RoommatePreferences>>({
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
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const currentLang = useMemo(() => i18n.language as keyof typeof roommatePreferenceTranslations, [i18n.language]);
  const translations = useMemo(() => roommatePreferenceTranslations[currentLang], [currentLang]);

  const fetchPreferences = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('roommate_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setPreferences(data.preferences);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast.error(t('errorLoadingPreferences'));
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const handlePreferenceChange = useCallback((key: keyof RoommatePreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
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
  }, [preferences, showToast, t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8">{t('roommatePreferences')}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {Object.entries(preferences).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-lg font-medium">
              {translations.questions[key as keyof typeof translations.questions]}
            </label>
            <select
              value={value || ''}
              onChange={(e) => handlePreferenceChange(key as keyof RoommatePreferences, e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            >
              <option value="">{t('selectOption')}</option>
              {Object.entries(translations.options).map(([optionKey, optionValue]) => (
                <option key={optionKey} value={optionKey}>
                  {optionValue}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                {t('saving')}
              </div>
            ) : (
              t('saveChanges')
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default React.memo(RoommatePreferencesForm);


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase/client';
import { roommatePreferenceTranslations } from '../../translations/roommatePreferences';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'react-hot-toast';

// Simplified component with fixes
const RoommatePreferencesForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Memoize translations
  const currentLang = useMemo(() => i18n.language, [i18n.language]);
  const translations = useMemo(
    () => roommatePreferenceTranslations[currentLang as keyof typeof roommatePreferenceTranslations],
    [currentLang]
  );

  // Fetch preferences
  const fetchPreferences = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('roommate_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (data?.preferences) {
        setPreferences(data.preferences);
      }
    } catch (err) {
      console.error('Error fetching preferences:', err);
      toast.error(t('errorLoadingPreferences'));
    } finally {
      setLoading(false);
    }
  }, [navigate, t]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  // Handle preference change
  const handlePreferenceChange = useCallback((key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('roommate_preferences')
        .upsert({
          user_id: user.id,
          preferences,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success(t('preferencesUpdated'));
    } catch (err) {
      console.error('Error saving preferences:', err);
      toast.error(t('errorUpdatingPreferences'));
    } finally {
      setSaving(false);
    }
  }, [preferences, navigate, t]);

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
              {translations?.questions?.[key] || key}
            </label>
            <select
              value={value}
              onChange={(e) => handlePreferenceChange(key, e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            >
              <option value="">{t('selectOption')}</option>
              {translations?.options && Object.entries(translations.options).map(([optionKey, optionValue]) => (
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

export default RoommatePreferencesForm;

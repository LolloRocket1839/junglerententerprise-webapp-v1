import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { User, Calendar, GraduationCap, Mail, Phone, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { roommateDescriptions } from '../translations/roommateDescriptions';

interface StudentProfile {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  university: string;
  field_of_study: string;
  year_of_study: number;
  bio: string;
  profile_image: string;
  contact_email: string;
  phone_number: string;
}

interface RoommatePreferences {
  id: string;
  preferred_gender: string;
  preferred_age_range_min: number;
  preferred_age_range_max: number;
  preferred_field_of_study: string[];
  preferred_year_of_study: number[];
  preferred_nationality: string[];
  smoking_preference: boolean;
  pet_preference: boolean;
  noise_preference: 'quiet' | 'moderate' | 'lively';
  study_habits: 'early_bird' | 'night_owl' | 'flexible';
  cleanliness_level: 'very_clean' | 'moderate' | 'relaxed';
  social_preference: 'very_social' | 'moderate' | 'private';
  additional_preferences: string;
}

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [profile, setProfile] = useState<Partial<StudentProfile>>({});
  const [preferences, setPreferences] = useState<Partial<RoommatePreferences>>({});

  const currentLang = useMemo(() => i18n.language as keyof typeof roommateDescriptions, [i18n.language]);
  const descriptions = useMemo(() => roommateDescriptions[currentLang], [currentLang]);

  // Fetch student profile with optimized query
  const { data: studentProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as StudentProfile;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Fetch roommate preferences with optimized query
  const { data: roommatePreferences, isLoading: isLoadingPreferences } = useQuery({
    queryKey: ['roommatePreferences'],
    queryFn: async () => {
      if (!studentProfile) return null;

      const { data, error } = await supabase
        .from('roommate_preferences')
        .select('*')
        .eq('student_id', studentProfile.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as RoommatePreferences;
    },
    enabled: !!studentProfile,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Update profile mutation with optimized error handling
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile: Partial<StudentProfile>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('student_profiles')
        .upsert({
          user_id: user.id,
          ...updatedProfile,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
      setIsEditing(false);
      toast.success(t('profileUpdated'));
    },
    onError: (error) => {
      toast.error(t('errorUpdatingProfile'));
    },
  });

  // Update preferences mutation with optimized error handling
  const updatePreferencesMutation = useMutation({
    mutationFn: async (updatedPreferences: Partial<RoommatePreferences>) => {
      if (!studentProfile) throw new Error('No profile found');

      const { data, error } = await supabase
        .from('roommate_preferences')
        .upsert({
          student_id: studentProfile.id,
          ...updatedPreferences,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roommatePreferences'] });
      setIsEditingPreferences(false);
      toast.success(t('preferencesUpdated'));
    },
    onError: (error) => {
      toast.error(t('errorUpdatingPreferences'));
    },
  });

  useEffect(() => {
    if (studentProfile) {
      setProfile(studentProfile);
    }
  }, [studentProfile]);

  useEffect(() => {
    if (roommatePreferences) {
      setPreferences(roommatePreferences);
    }
  }, [roommatePreferences]);

  const handleProfileSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profile);
  }, [profile, updateProfileMutation]);

  const handlePreferencesSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    updatePreferencesMutation.mutate(preferences);
  }, [preferences, updatePreferencesMutation]);

  const toggleEditing = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const toggleEditingPreferences = useCallback(() => {
    setIsEditingPreferences(prev => !prev);
  }, []);

  if (isLoadingProfile || isLoadingPreferences) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('studentProfile')}
              </h2>
              <button
                onClick={toggleEditing}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {isEditing ? <X size={20} /> : <Edit2 size={20} />}
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('firstName')}
                  </label>
                  <input
                    type="text"
                    value={profile.first_name || ''}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('lastName')}
                  </label>
                  <input
                    type="text"
                    value={profile.last_name || ''}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('dateOfBirth')}
                  </label>
                  <input
                    type="date"
                    value={profile.date_of_birth || ''}
                    onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('gender')}
                  </label>
                  <select
                    value={profile.gender || ''}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('selectGender')}</option>
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('university')}
                  </label>
                  <input
                    type="text"
                    value={profile.university || ''}
                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('fieldOfStudy')}
                  </label>
                  <input
                    type="text"
                    value={profile.field_of_study || ''}
                    onChange={(e) => setProfile({ ...profile, field_of_study: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('yearOfStudy')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={profile.year_of_study || ''}
                    onChange={(e) => setProfile({ ...profile, year_of_study: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contactEmail')}
                  </label>
                  <input
                    type="email"
                    value={profile.contact_email || ''}
                    onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('bio')}
                </label>
                <textarea
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Roommate Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('roommatePreferences')}
              </h2>
              <button
                onClick={toggleEditingPreferences}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {isEditingPreferences ? <X size={20} /> : <Edit2 size={20} />}
              </button>
            </div>

            <form onSubmit={handlePreferencesSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('preferredGender')}
                  </label>
                  <select
                    value={preferences.preferred_gender || ''}
                    onChange={(e) => setPreferences({ ...preferences, preferred_gender: e.target.value })}
                    disabled={!isEditingPreferences}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('anyGender')}</option>
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('ageRange')}
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      min="18"
                      max="99"
                      value={preferences.preferred_age_range_min || ''}
                      onChange={(e) => setPreferences({ ...preferences, preferred_age_range_min: parseInt(e.target.value) })}
                      disabled={!isEditingPreferences}
                      placeholder={t('min')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="number"
                      min="18"
                      max="99"
                      value={preferences.preferred_age_range_max || ''}
                      onChange={(e) => setPreferences({ ...preferences, preferred_age_range_max: parseInt(e.target.value) })}
                      disabled={!isEditingPreferences}
                      placeholder={t('max')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('noisePreference')}
                  </label>
                  <select
                    value={preferences.noise_preference || ''}
                    onChange={(e) => setPreferences({ ...preferences, noise_preference: e.target.value as any })}
                    disabled={!isEditingPreferences}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('selectNoisePreference')}</option>
                    <option value="quiet">{t('quiet')}</option>
                    <option value="moderate">{t('moderate')}</option>
                    <option value="lively">{t('lively')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('studyHabits')}
                  </label>
                  <select
                    value={preferences.study_habits || ''}
                    onChange={(e) => setPreferences({ ...preferences, study_habits: e.target.value as any })}
                    disabled={!isEditingPreferences}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('selectStudyHabits')}</option>
                    <option value="early_bird">{t('earlyBird')}</option>
                    <option value="night_owl">{t('nightOwl')}</option>
                    <option value="flexible">{t('flexible')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('cleanlinessLevel')}
                  </label>
                  <select
                    value={preferences.cleanliness_level || ''}
                    onChange={(e) => setPreferences({ ...preferences, cleanliness_level: e.target.value as any })}
                    disabled={!isEditingPreferences}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('selectCleanlinessLevel')}</option>
                    <option value="very_clean">{t('veryClean')}</option>
                    <option value="moderate">{t('moderate')}</option>
                    <option value="relaxed">{t('relaxed')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('socialPreference')}
                  </label>
                  <select
                    value={preferences.social_preference || ''}
                    onChange={(e) => setPreferences({ ...preferences, social_preference: e.target.value as any })}
                    disabled={!isEditingPreferences}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('selectSocialPreference')}</option>
                    <option value="very_social">{t('verySocial')}</option>
                    <option value="moderate">{t('moderate')}</option>
                    <option value="private">{t('private')}</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.smoking_preference || false}
                    onChange={(e) => setPreferences({ ...preferences, smoking_preference: e.target.checked })}
                    disabled={!isEditingPreferences}
                    className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{t('smokingOk')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.pet_preference || false}
                    onChange={(e) => setPreferences({ ...preferences, pet_preference: e.target.checked })}
                    disabled={!isEditingPreferences}
                    className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{t('petsOk')}</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('additionalPreferences')}
                </label>
                <textarea
                  value={preferences.additional_preferences || ''}
                  onChange={(e) => setPreferences({ ...preferences, additional_preferences: e.target.value })}
                  disabled={!isEditingPreferences}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {isEditingPreferences && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              )}
            </form>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/student/roommate-preferences"
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{t('roommatePreferences')}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {descriptions.roommatePreferencesDescription}
            </p>
          </Link>

          <Link
            to="/student/roommate-matching"
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{t('findRoommate')}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {descriptions.findRoommateDescription}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StudentProfile); 
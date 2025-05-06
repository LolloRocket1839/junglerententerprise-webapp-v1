import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MessageSquare, Star, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface StudentProfile {
  id: string;
  first_name: string;
  last_name: string;
  university: string;
  field_of_study: string;
  year_of_study: number;
  bio: string;
  profile_image: string;
  match_score?: number;
}

interface RoommateMatch {
  id: string;
  student1_id: string;
  student2_id: string;
  match_score: number;
  status: 'pending' | 'accepted' | 'rejected';
}

const RoommateMatching: React.FC = () => {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    university: '',
    fieldOfStudy: '',
    yearOfStudy: '',
    gender: '',
  });

  // Fetch potential matches
  const { data: potentialMatches, isLoading } = useQuery({
    queryKey: ['potentialMatches', filters],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get current user's profile
      const { data: currentProfile } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) throw new Error('Profile not found');

      // Get potential matches based on preferences
      const { data: matches, error } = await supabase
        .from('student_profiles')
        .select('*')
        .neq('user_id', user.id)
        .ilike('university', `%${filters.university}%`)
        .ilike('field_of_study', `%${filters.fieldOfStudy}%`)
        .eq('year_of_study', filters.yearOfStudy || currentProfile.year_of_study)
        .eq('gender', filters.gender || '');

      if (error) throw error;
      return matches as StudentProfile[];
    },
  });

  // Fetch existing matches
  const { data: existingMatches } = useQuery({
    queryKey: ['existingMatches'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: currentProfile } = await supabase
        .from('student_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) throw new Error('Profile not found');

      const { data: matches, error } = await supabase
        .from('roommate_matches')
        .select('*')
        .or(`student1_id.eq.${currentProfile.id},student2_id.eq.${currentProfile.id}`);

      if (error) throw error;
      return matches as RoommateMatch[];
    },
  });

  // Create match mutation
  const createMatchMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: currentProfile } = await supabase
        .from('student_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) throw new Error('Profile not found');

      const { data, error } = await supabase
        .from('roommate_matches')
        .insert({
          student1_id: currentProfile.id,
          student2_id: studentId,
          match_score: 0.8, // This would be calculated based on preferences
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['existingMatches'] });
      toast.success(t('matchRequestSent'));
    },
    onError: () => {
      toast.error(t('errorSendingMatchRequest'));
    },
  });

  // Update match status mutation
  const updateMatchStatusMutation = useMutation({
    mutationFn: async ({ matchId, status }: { matchId: string; status: 'accepted' | 'rejected' }) => {
      const { data, error } = await supabase
        .from('roommate_matches')
        .update({ status })
        .eq('id', matchId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['existingMatches'] });
      toast.success(t('matchStatusUpdated'));
    },
    onError: () => {
      toast.error(t('errorUpdatingMatchStatus'));
    },
  });

  const filteredMatches = potentialMatches?.filter(match => {
    const fullName = `${match.first_name} ${match.last_name}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    return fullName.includes(searchLower) ||
           match.university.toLowerCase().includes(searchLower) ||
           match.field_of_study.toLowerCase().includes(searchLower);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('findRoommate')}
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Filter size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300">{t('filters')}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchStudents')}
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('university')}
                    </label>
                    <input
                      type="text"
                      value={filters.university}
                      onChange={(e) => setFilters({ ...filters, university: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('fieldOfStudy')}
                    </label>
                    <input
                      type="text"
                      value={filters.fieldOfStudy}
                      onChange={(e) => setFilters({ ...filters, fieldOfStudy: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('yearOfStudy')}
                    </label>
                    <select
                      value={filters.yearOfStudy}
                      onChange={(e) => setFilters({ ...filters, yearOfStudy: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">{t('anyYear')}</option>
                      {[1, 2, 3, 4, 5, 6].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('gender')}
                    </label>
                    <select
                      value={filters.gender}
                      onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">{t('anyGender')}</option>
                      <option value="male">{t('male')}</option>
                      <option value="female">{t('female')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Potential Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))
          ) : (
            filteredMatches?.map((match) => {
              const existingMatch = existingMatches?.find(
                (m) => m.student1_id === match.id || m.student2_id === match.id
              );

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={match.profile_image || '/default-profile.jpg'}
                      alt={`${match.first_name} ${match.last_name}`}
                      className="w-full h-full object-cover"
                    />
                    {match.match_score && (
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round(match.match_score * 100)}% {t('match')}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {match.first_name} {match.last_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {match.university} • {match.field_of_study} • {t('year')} {match.year_of_study}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                      {match.bio}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {/* Implement chat functionality */}}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        <MessageSquare size={20} />
                        <span>{t('message')}</span>
                      </button>
                      {existingMatch ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {t(existingMatch.status)}
                          </span>
                          {existingMatch.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateMatchStatusMutation.mutate({ matchId: existingMatch.id, status: 'accepted' })}
                                className="text-green-600 hover:text-green-700"
                              >
                                {t('accept')}
                              </button>
                              <button
                                onClick={() => updateMatchStatusMutation.mutate({ matchId: existingMatch.id, status: 'rejected' })}
                                className="text-red-600 hover:text-red-700"
                              >
                                {t('reject')}
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => createMatchMutation.mutate(match.id)}
                          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                        >
                          <Star size={20} />
                          <span>{t('requestMatch')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RoommateMatching; 
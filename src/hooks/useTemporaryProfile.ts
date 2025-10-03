import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TemporaryProfile {
  tempId: string;
  isTemporary: boolean;
  answers: Array<{
    questionId: string;
    answer: string;
    trait: string;
  }>;
}

const STORAGE_KEY = 'jungle_temp_profile';

export function useTemporaryProfile() {
  const [tempProfile, setTempProfile] = useState<TemporaryProfile | null>(null);

  useEffect(() => {
    // Load or create temporary profile
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTempProfile(JSON.parse(stored));
    } else {
      // Create new temporary profile with UUID
      const newTempId = crypto.randomUUID();
      const newProfile: TemporaryProfile = {
        tempId: newTempId,
        isTemporary: true,
        answers: []
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setTempProfile(newProfile);
    }
  }, []);

  const saveAnswer = async (questionId: string, answer: string, trait: string) => {
    if (!tempProfile) return;

    // Add answer to localStorage
    const updatedAnswers = [...tempProfile.answers, { questionId, answer, trait }];
    const updatedProfile = { ...tempProfile, answers: updatedAnswers };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    setTempProfile(updatedProfile);

    // Also save to database with tempId as profile_id
    try {
      await supabase.from('roommate_answers').insert({
        profile_id: tempProfile.tempId,
        question_id: questionId,
        answer,
        trait
      });
    } catch (error) {
      console.error('Error saving anonymous answer:', error);
    }
  };

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTempProfile(null);
  };

  return {
    tempProfile,
    saveAnswer,
    clearProfile
  };
}

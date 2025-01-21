import { PostgrestError } from '@supabase/supabase-js';

export function handleSupabaseError(error: PostgrestError | null) {
  if (error) {
    console.error('Supabase error:', error);
    throw new Error(error.message);
  }
}

export function isSupabaseError(error: unknown): error is PostgrestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'details' in error
  );
}

import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database as DatabaseType } from '../types/database';

export type TypedSupabaseClient = SupabaseClient<DatabaseType>;

export type Tables<T extends keyof DatabaseType['public']['Tables']> = 
  DatabaseType['public']['Tables'][T]['Row'];
export type Enums<T extends keyof DatabaseType['public']['Enums']> = 
  DatabaseType['public']['Enums'][T];
export type TablesInsert<T extends keyof DatabaseType['public']['Tables']> = 
  DatabaseType['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof DatabaseType['public']['Tables']> = 
  DatabaseType['public']['Tables'][T]['Update'];

export type UserSession = Session;

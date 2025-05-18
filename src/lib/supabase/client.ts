
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Configure connection pooling
const poolConfig = {
  pool: {
    max: 20, // Maximum number of connections
    min: 4,  // Minimum number of connections
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    acquireTimeoutMillis: 30000, // Maximum time to acquire a connection
  },
  // Enable prepared statements
  prepare: true,
  // Configure retry logic
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
  },
  // Configure timeouts
  timeout: 10000, // 10 seconds timeout for queries
};

// Create the Supabase client with optimized configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-application-name': 'jungle-rent',
    },
  },
  db: poolConfig,
});

// Cache frequently accessed data
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Optimized query function with caching
export const queryWithCache = async <T>(
  key: string,
  queryFn: () => Promise<T>,
  ttl: number = CACHE_TTL
): Promise<T> => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await queryFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};

// Create a simple type for prepared queries to avoid errors
export const preparedQueries = {
  // Type-safe prepared queries will be added as needed
};

// Optimized error handling
export const handleQueryError = (error: any) => {
  console.error('Database query error:', error);
  if (error.code === 'PGRST301') {
    // Handle connection timeout
    return { error: 'Connection timeout. Please try again.' };
  }
  if (error.code === 'PGRST302') {
    // Handle connection pool exhaustion
    return { error: 'Server busy. Please try again in a moment.' };
  }
  return { error: 'An unexpected error occurred.' };
};

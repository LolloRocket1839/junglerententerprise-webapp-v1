import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database'

const supabaseUrl = 'https://jqvkodddhilbrbusyvzx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdmtvZGRkaGlsYnJidXN5dnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2ODk5NDcsImV4cCI6MjAyMTI2NTk0N30.JQCH6Vp4bycxHnUYn7Y4_WP8_FnNOm_Q9Gl1k0uuXhw'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
})
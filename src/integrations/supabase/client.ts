import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

const supabaseUrl = "https://jqvkodddhilbrbusyvzx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdmtvZGRkaGlsYnJidXN5dnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzMjY3NzcsImV4cCI6MjA0NzkwMjc3N30.Wl8bAISOJZUek6dsNgqKdh918YNG-g_3Cq0svZS_2FM";

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
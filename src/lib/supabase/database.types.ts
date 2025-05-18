
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Add the tables you need to access through the Supabase client
      // This is just a minimal example
      roommate_preferences: {
        Row: {
          id: string
          user_id: string
          preferences: Record<string, string>
          compatibility_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          preferences: Record<string, string>
          compatibility_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          preferences?: Record<string, string>
          compatibility_score?: number
          created_at?: string
          updated_at?: string
        }
      }
      student_profiles: {
        Row: {
          id: string
          user_id: string
          university: string | null
          study_program: string | null
          year_of_study: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          university?: string | null
          study_program?: string | null
          year_of_study?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          university?: string | null
          study_program?: string | null
          year_of_study?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      // Add more tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          hub_id: string | null
          id: string
          profile_id: string | null
          status: string
          total_price: number
          updated_at: string
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          hub_id?: string | null
          id?: string
          profile_id?: string | null
          status?: string
          total_price: number
          updated_at?: string
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          hub_id?: string | null
          id?: string
          profile_id?: string | null
          status?: string
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hubs: {
        Row: {
          amenities: string[] | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          location: string
          name: string
          price_per_night: number
          rating: number | null
          reviews_count: number | null
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          location: string
          name: string
          price_per_night: number
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          location?: string
          name?: string
          price_per_night?: number
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      jungle_wallet: {
        Row: {
          balance: number | null
          created_at: string
          id: string
          profile_id: string | null
          updated_at: string
        }
        Insert: {
          balance?: number | null
          created_at?: string
          id?: string
          profile_id?: string | null
          updated_at?: string
        }
        Update: {
          balance?: number | null
          created_at?: string
          id?: string
          profile_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jungle_wallet_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          budget_max: number | null
          budget_min: number | null
          created_at: string
          current_city: string | null
          date_of_birth: string | null
          first_name: string | null
          future_city: string | null
          id: string
          last_name: string | null
          move_in_date: string | null
          preferences: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          current_city?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          future_city?: string | null
          id: string
          last_name?: string | null
          move_in_date?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          current_city?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          future_city?: string | null
          id?: string
          last_name?: string | null
          move_in_date?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          hub_id: string | null
          id: string
          profile_id: string | null
          rating: number | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          hub_id?: string | null
          id?: string
          profile_id?: string | null
          rating?: number | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          hub_id?: string | null
          id?: string
          profile_id?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roommate_answers: {
        Row: {
          answer: string
          created_at: string
          id: string
          profile_id: string | null
          question_id: string | null
          trait: string | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          profile_id?: string | null
          question_id?: string | null
          trait?: string | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          profile_id?: string | null
          question_id?: string | null
          trait?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roommate_answers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roommate_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "roommate_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      roommate_questions: {
        Row: {
          category: string
          coin_reward: number | null
          created_at: string
          id: string
          options: Json
          question: string
        }
        Insert: {
          category: string
          coin_reward?: number | null
          created_at?: string
          id?: string
          options: Json
          question: string
        }
        Update: {
          category?: string
          coin_reward?: number | null
          created_at?: string
          id?: string
          options?: Json
          question?: string
        }
        Relationships: []
      }
      rudolph_comparisons: {
        Row: {
          category: string
          component_a: string
          component_b: string
          created_at: string
          id: string
          rudolph_value: number
        }
        Insert: {
          category: string
          component_a: string
          component_b: string
          created_at?: string
          id?: string
          rudolph_value?: number
        }
        Update: {
          category?: string
          component_a?: string
          component_b?: string
          created_at?: string
          id?: string
          rudolph_value?: number
        }
        Relationships: []
      }
      rudolph_personalities: {
        Row: {
          created_at: string
          description: string
          id: string
          max_score: number
          min_score: number
          name: string
          quote: string
          special_power: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          max_score: number
          min_score: number
          name: string
          quote: string
          special_power: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          max_score?: number
          min_score?: number
          name?: string
          quote?: string
          special_power?: string
        }
        Relationships: []
      }
      rudolph_progress: {
        Row: {
          choice: string
          comparison_id: string | null
          created_at: string
          id: string
          profile_id: string | null
          quantum_state: boolean | null
          rudolph_score: number
        }
        Insert: {
          choice: string
          comparison_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          quantum_state?: boolean | null
          rudolph_score: number
        }
        Update: {
          choice?: string
          comparison_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          quantum_state?: boolean | null
          rudolph_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "rudolph_progress_comparison_id_fkey"
            columns: ["comparison_id"]
            isOneToOne: false
            referencedRelation: "rudolph_comparisons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rudolph_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          created_at: string
          id: string
          student_id: string | null
          study_program: string | null
          university: string | null
          updated_at: string
          year_of_study: number | null
        }
        Insert: {
          created_at?: string
          id: string
          student_id?: string | null
          study_program?: string | null
          university?: string | null
          updated_at?: string
          year_of_study?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          student_id?: string | null
          study_program?: string | null
          university?: string | null
          updated_at?: string
          year_of_study?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          type: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          type: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          type?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "jungle_wallet"
            referencedColumns: ["id"]
          },
        ]
      }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

import { Json } from './common';

export type Database = {
  public: {
    Tables: {
      investments: {
        Row: {
          id: string;
          profile_id: string | null;
          hub_id: string | null;
          amount: number;
          tokens: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          hub_id?: string | null;
          amount: number;
          tokens: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string | null;
          hub_id?: string | null;
          amount?: number;
          tokens?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "investments_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ];
      };
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
      chat_messages: {
        Row: {
          attachments: string[] | null
          created_at: string
          id: string
          match_id: string | null
          message: string
          read_at: string | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string
          id?: string
          match_id?: string | null
          message: string
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          attachments?: string[] | null
          created_at?: string
          id?: string
          match_id?: string | null
          message?: string
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "roommate_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
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
      interest_nodes: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          position: Json | null
          profile_id: string | null
          resources: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          position?: Json | null
          profile_id?: string | null
          resources?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          position?: Json | null
          profile_id?: string | null
          resources?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interest_nodes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          created_at: string
          hub_id: string | null
          id: string
          profile_id: string | null
          status: string
          tokens: number
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          hub_id?: string | null
          id?: string
          profile_id?: string | null
          status: string
          tokens: number
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          hub_id?: string | null
          id?: string
          profile_id?: string | null
          status?: string
          tokens?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      marketplace_items: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          name: string
          price: number
          seller_id: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          name: string
          price: number
          seller_id?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          seller_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_items_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      node_connections: {
        Row: {
          created_at: string
          id: string
          source_node_id: string | null
          strength: number | null
          target_node_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          source_node_id?: string | null
          strength?: number | null
          target_node_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          source_node_id?: string | null
          strength?: number | null
          target_node_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "node_connections_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "interest_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "node_connections_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "interest_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          profile_id: string | null
          read_at: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          profile_id?: string | null
          read_at?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          profile_id?: string | null
          read_at?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
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
          id: string
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
      roommate_matches: {
        Row: {
          created_at: string
          id: string
          liked: boolean
          profile_id: string | null
          target_profile_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          liked: boolean
          profile_id?: string | null
          target_profile_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          liked?: boolean
          profile_id?: string | null
          target_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roommate_matches_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roommate_matches_target_profile_id_fkey"
            columns: ["target_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      rudolph_dimensions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          max_value: number | null
          min_value: number | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          max_value?: number | null
          min_value?: number | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          max_value?: number | null
          min_value?: number | null
          name?: string
        }
        Relationships: []
      }
      rudolph_incomparables: {
        Row: {
          category: string
          created_at: string
          id: string
          item_a: string
          item_b: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          item_a: string
          item_b: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          item_a?: string
          item_b?: string
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
      rudolph_questions: {
        Row: {
          category: string
          complexity_level: number | null
          created_at: string
          dimension_correlations: Json | null
          id: string
          information_gain: number | null
          options: Json
          question: string
        }
        Insert: {
          category: string
          complexity_level?: number | null
          created_at?: string
          dimension_correlations?: Json | null
          id?: string
          information_gain?: number | null
          options: Json
          question: string
        }
        Update: {
          category?: string
          complexity_level?: number | null
          created_at?: string
          dimension_correlations?: Json | null
          id?: string
          information_gain?: number | null
          options?: Json
          question?: string
        }
        Relationships: []
      }
      rudolph_user_dimensions: {
        Row: {
          created_at: string
          dimension_id: string | null
          id: string
          profile_id: string | null
          score: number
          uncertainty: number | null
        }
        Insert: {
          created_at?: string
          dimension_id?: string | null
          id?: string
          profile_id?: string | null
          score: number
          uncertainty?: number | null
        }
        Update: {
          created_at?: string
          dimension_id?: string | null
          id?: string
          profile_id?: string | null
          score?: number
          uncertainty?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rudolph_user_dimensions_dimension_id_fkey"
            columns: ["dimension_id"]
            isOneToOne: false
            referencedRelation: "rudolph_dimensions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rudolph_user_dimensions_profile_id_fkey"
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
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      create_notification: {
        Args: {
          profile_id: string;
          type: string;
          title: string;
          message: string;
          data?: Json;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

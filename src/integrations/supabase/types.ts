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
      dynamic_questions: {
        Row: {
          category_id: string | null
          created_at: string
          follow_up_logic: Json | null
          id: string
          is_premium: boolean | null
          options: Json | null
          question: string
          type: string
          weight: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          follow_up_logic?: Json | null
          id?: string
          is_premium?: boolean | null
          options?: Json | null
          question: string
          type: string
          weight?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          follow_up_logic?: Json | null
          id?: string
          is_premium?: boolean | null
          options?: Json | null
          question?: string
          type?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dynamic_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "question_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          average_rating: number | null
          created_at: string | null
          document_country: string | null
          document_expiry: string | null
          document_number: string | null
          document_type: Database["public"]["Enums"]["document_type"] | null
          email: string
          id: string
          name: string
          nationality: string | null
          phone: string | null
          previous_bookings: number | null
          profile_id: string | null
          updated_at: string | null
        }
        Insert: {
          average_rating?: number | null
          created_at?: string | null
          document_country?: string | null
          document_expiry?: string | null
          document_number?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          email: string
          id?: string
          name: string
          nationality?: string | null
          phone?: string | null
          previous_bookings?: number | null
          profile_id?: string | null
          updated_at?: string | null
        }
        Update: {
          average_rating?: number | null
          created_at?: string | null
          document_country?: string | null
          document_expiry?: string | null
          document_number?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          email?: string
          id?: string
          name?: string
          nationality?: string | null
          phone?: string | null
          previous_bookings?: number | null
          profile_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guests_profile_id_fkey"
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
          amount_raised: number
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          investment_goal: number
          location: string
          name: string
          price_per_night: number
          rating: number | null
          reviews_count: number | null
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          amount_raised?: number
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          investment_goal?: number
          location: string
          name: string
          price_per_night: number
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          amount_raised?: number
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          investment_goal?: number
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
          payment_id: string | null
          payment_status: string
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
          payment_id?: string | null
          payment_status?: string
          profile_id?: string | null
          status?: string
          tokens: number
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          hub_id?: string | null
          id?: string
          payment_id?: string | null
          payment_status?: string
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
      points_of_interest: {
        Row: {
          created_at: string | null
          distance: number
          id: string
          name: string
          property_id: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          distance: number
          id?: string
          name: string
          property_id?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          distance?: number
          id?: string
          name?: string
          property_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_of_interest_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "tourist_properties"
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
          is_premium: boolean | null
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
          is_premium?: boolean | null
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
          is_premium?: boolean | null
          last_name?: string | null
          move_in_date?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      question_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
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
      tourist_bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string | null
          guest_id: string | null
          id: string
          number_of_guests: number
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          property_id: string | null
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at: string | null
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string | null
          guest_id?: string | null
          id?: string
          number_of_guests: number
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          property_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at?: string | null
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string | null
          guest_id?: string | null
          id?: string
          number_of_guests?: number
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          property_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tourist_bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourist_bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "tourist_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      tourist_properties: {
        Row: {
          additional_rules: string[] | null
          address: string
          amenities: string[] | null
          availability_period_end: string | null
          availability_period_start: string | null
          bathrooms: number
          bedrooms: number
          capacity: number
          check_in_time: string | null
          check_out_time: string | null
          city: string
          cleaning_fee: number
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          latitude: number | null
          longitude: number | null
          parties_allowed: boolean | null
          pets_allowed: boolean | null
          postal_code: string | null
          price_per_night: number
          property_id: string | null
          short_description: string | null
          smoking_allowed: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          additional_rules?: string[] | null
          address: string
          amenities?: string[] | null
          availability_period_end?: string | null
          availability_period_start?: string | null
          bathrooms: number
          bedrooms: number
          capacity: number
          check_in_time?: string | null
          check_out_time?: string | null
          city: string
          cleaning_fee: number
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          parties_allowed?: boolean | null
          pets_allowed?: boolean | null
          postal_code?: string | null
          price_per_night: number
          property_id?: string | null
          short_description?: string | null
          smoking_allowed?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          additional_rules?: string[] | null
          address?: string
          amenities?: string[] | null
          availability_period_end?: string | null
          availability_period_start?: string | null
          bathrooms?: number
          bedrooms?: number
          capacity?: number
          check_in_time?: string | null
          check_out_time?: string | null
          city?: string
          cleaning_fee?: number
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          parties_allowed?: boolean | null
          pets_allowed?: boolean | null
          postal_code?: string | null
          price_per_night?: number
          property_id?: string | null
          short_description?: string | null
          smoking_allowed?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tourist_reviews: {
        Row: {
          accuracy: number | null
          booking_id: string | null
          check_in: number | null
          cleanliness: number | null
          comment: string | null
          communication: number | null
          created_at: string | null
          guest_id: string | null
          id: string
          location: number | null
          photos: string[] | null
          property_id: string | null
          rating: number | null
          response: string | null
          value: number | null
        }
        Insert: {
          accuracy?: number | null
          booking_id?: string | null
          check_in?: number | null
          cleanliness?: number | null
          comment?: string | null
          communication?: number | null
          created_at?: string | null
          guest_id?: string | null
          id?: string
          location?: number | null
          photos?: string[] | null
          property_id?: string | null
          rating?: number | null
          response?: string | null
          value?: number | null
        }
        Update: {
          accuracy?: number | null
          booking_id?: string | null
          check_in?: number | null
          cleanliness?: number | null
          comment?: string | null
          communication?: number | null
          created_at?: string | null
          guest_id?: string | null
          id?: string
          location?: number | null
          photos?: string[] | null
          property_id?: string | null
          rating?: number | null
          response?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tourist_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "tourist_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourist_reviews_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourist_reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "tourist_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_answers: {
        Row: {
          answer: Json
          created_at: string
          id: string
          profile_id: string | null
          question_id: string | null
        }
        Insert: {
          answer: Json
          created_at?: string
          id?: string
          profile_id?: string | null
          question_id?: string | null
        }
        Update: {
          answer?: Json
          created_at?: string
          id?: string
          profile_id?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "dynamic_questions"
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
      add_jungle_coins: {
        Args: {
          amount: number
          reason: string
        }
        Returns: undefined
      }
      create_notification: {
        Args: {
          profile_id: string
          type: string
          title: string
          message: string
          data?: Json
        }
        Returns: string
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "canceled" | "completed"
      document_type: "passport" | "id_card" | "driver_license"
      payment_status: "pending" | "partial" | "complete" | "refunded"
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

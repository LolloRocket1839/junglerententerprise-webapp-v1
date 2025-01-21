export interface Profile {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  current_city?: string | null;
  future_city?: string | null;
  date_of_birth?: string | null;
  budget_min?: number | null;
  budget_max?: number | null;
  move_in_date?: string | null;
  preferences?: Record<string, any> | null;
  is_premium?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  question: string;
  category: string;
  options: {
    text: string;
    trait: string;
  }[];
  coin_reward?: number;
  created_at: string;
}

export interface RoommateAnswer {
  id: string;
  profile_id: string;
  question_id: string;
  answer: string;
  trait?: string;
  created_at: string;
}

export interface RoommateMatch {
  id: string;
  profile_id: string;
  target_profile_id: string;
  liked: boolean;
  created_at: string;
}

export interface InterestNode {
  id: string;
  profile_id?: string;
  title: string;
  description?: string;
  category?: string;
  resources?: any[];
  position?: {
    x: number;
    y: number;
    z: number;
  };
  created_at: string;
  updated_at: string;
}

export interface NodeConnection {
  id: string;
  source_node_id: string;
  target_node_id: string;
  strength: number;
  created_at: string;
}

export interface RudolphProgress {
  id: string;
  profile_id?: string;
  comparison_id?: string;
  choice: string;
  rudolph_score: number;
  quantum_state?: boolean;
  created_at: string;
}

export interface RudolphUserDimension {
  id: string;
  profile_id?: string;
  dimension_id?: string;
  score: number;
  uncertainty?: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Profile>;
      };
      roommate_questions: {
        Row: Question;
        Insert: Omit<Question, 'id' | 'created_at'>;
        Update: Partial<Question>;
      };
      roommate_answers: {
        Row: RoommateAnswer;
        Insert: Omit<RoommateAnswer, 'id' | 'created_at'>;
        Update: Partial<RoommateAnswer>;
      };
      roommate_matches: {
        Row: RoommateMatch;
        Insert: Omit<RoommateMatch, 'id' | 'created_at'>;
        Update: Partial<RoommateMatch>;
      };
      interest_nodes: {
        Row: InterestNode;
        Insert: Omit<InterestNode, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<InterestNode>;
      };
      node_connections: {
        Row: NodeConnection;
        Insert: Omit<NodeConnection, 'id' | 'created_at'>;
        Update: Partial<NodeConnection>;
      };
      rudolph_progress: {
        Row: RudolphProgress;
        Insert: Omit<RudolphProgress, 'id' | 'created_at'>;
        Update: Partial<RudolphProgress>;
      };
      rudolph_user_dimensions: {
        Row: RudolphUserDimension;
        Insert: Omit<RudolphUserDimension, 'id' | 'created_at'>;
        Update: Partial<RudolphUserDimension>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
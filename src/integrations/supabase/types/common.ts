export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Investment {
  id: string;
  profile_id: string | null;
  hub_id: string | null;
  amount: number;
  tokens: number;
  status: string;
  created_at: string;
  updated_at: string;
}
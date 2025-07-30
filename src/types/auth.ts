
export type UserRole = 'student' | 'tourist' | 'investor' | 'admin';
export type UserType = 'student' | 'tourist' | 'investor';
export type KycStatus = 'pending' | 'approved' | 'rejected';

export interface UserRoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
}

export interface UserProfile {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  user_type: UserType;
  kyc_status: KycStatus;
  documento_identita?: string | null;
  phone_number?: string | null;
  address?: string | null;
  tax_code?: string | null;
  created_at: string;
  updated_at: string;
}

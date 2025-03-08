
export type UserRole = 'student' | 'tourist' | 'investor' | 'admin';

export interface UserRoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
}

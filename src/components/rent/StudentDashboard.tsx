import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from './dashboard/DashboardLayout';
import type { Session } from '@supabase/supabase-js';

const StudentDashboard = () => {
  // Mock session for development with all required Session properties
  const mockSession: Session = {
    user: {
      id: 'test-user-id',
      email: 'test@jungle.com',
      aud: 'authenticated',
      role: 'authenticated',
      app_metadata: {
        provider: 'email',
        providers: ['email']
      },
      user_metadata: { 
        email_verified: true 
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      identities: [],
      factors: [],
      last_sign_in_at: new Date().toISOString(),
      phone: '',
      confirmed_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      banned_until: null,
      reauthentication_token: null,
      recovery_token: null,
    },
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer'
  };

  return <DashboardLayout session={mockSession} isEmailVerified={true} />;
};

export default StudentDashboard;
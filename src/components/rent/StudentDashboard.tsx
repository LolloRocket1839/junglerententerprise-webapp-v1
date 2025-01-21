import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from './dashboard/DashboardLayout';

const StudentDashboard = () => {
  // Mock session for development with all required Session properties
  const mockSession = {
    user: {
      id: 'test-user-id',
      email: 'test@jungle.com',
      user_metadata: { email_verified: true }
    },
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'bearer'
  };

  return <DashboardLayout session={mockSession} isEmailVerified={true} />;
};

export default StudentDashboard;
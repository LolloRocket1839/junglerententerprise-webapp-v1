import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from './dashboard/DashboardLayout';

const StudentDashboard = () => {
  // Mock session for development
  const mockSession = {
    user: {
      id: 'test-user-id',
      email: 'test@jungle.com',
      user_metadata: { email_verified: true }
    }
  };

  return <DashboardLayout session={mockSession} isEmailVerified={true} />;
};

export default StudentDashboard;
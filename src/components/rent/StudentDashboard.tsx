
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from './dashboard/DashboardLayout';

const StudentDashboard = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate('/auth');
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to auth
  }

  // Check if email is verified (bypass for test account)
  const isEmailVerified = session.user.email === 'test@jungle.com' || !!session.user.email_confirmed_at;

  return <DashboardLayout session={session} isEmailVerified={isEmailVerified} />;
};

export default StudentDashboard;

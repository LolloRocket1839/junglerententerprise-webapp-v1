import DashboardLayout from './dashboard/DashboardLayout';

// Demo mode - no authentication required
const StudentDashboard = () => {
  // Demo session for public viewing
  const demoSession = {
    user: {
      id: 'demo-user',
      email: 'demo@jungle.com',
      email_confirmed_at: new Date().toISOString()
    }
  };

  return <DashboardLayout session={demoSession as any} isEmailVerified={true} />;
};

export default StudentDashboard;

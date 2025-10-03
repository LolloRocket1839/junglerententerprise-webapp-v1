import { SmartDashboard } from '@/components/smart/SmartDashboard';

// Demo dashboard - no authentication required
export default function Dashboard() {
  // Demo user state for public viewing
  const demoUserState = {
    id: 'demo-user',
    user_type: 'student' as const,
    first_name: 'Demo',
    last_name: 'User',
    email: 'demo@jungle.com',
    verification_status: 'verified' as const,
    bio: 'Exploring the Jungle Rent platform'
  };

  return <SmartDashboard userType="student" userState={demoUserState} />;
}
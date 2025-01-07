import { useToast } from "@/components/ui/use-toast";
import VerificationBanner from './VerificationBanner';
import RoommateFinder from '../roommate/RoommateFinder';
import type { View } from './DashboardSidebar';

interface DashboardContentProps {
  activeView: View;
  isEmailVerified: boolean;
}

const DashboardContent = ({ activeView, isEmailVerified }: DashboardContentProps) => {
  const { toast } = useToast();

  const handleStartVerification = () => {
    // Mock verification process - in real implementation, this would trigger email verification
    toast({
      title: "Verification Email Sent",
      description: "Please check your inbox and follow the verification link.",
    });
  };

  return (
    <div className="space-y-6">
      {!isEmailVerified && (
        <VerificationBanner 
          isEmailVerified={isEmailVerified}
          onStartVerification={handleStartVerification}
        />
      )}
      
      {activeView === 'roommate' && (
        <RoommateFinder />
      )}
      
      {/* Add other views here */}
    </div>
  );
};

export default DashboardContent;
import { useToast } from "@/components/ui/use-toast";
import VerificationBanner from './VerificationBanner';
import RoommateFinder from '../roommate/RoommateFinder';
import type { View } from './DashboardSidebar';
import { useState } from 'react';

interface DashboardContentProps {
  activeView: View;
  isEmailVerified: boolean;
}

const DashboardContent = ({ activeView, isEmailVerified: initialVerification }: DashboardContentProps) => {
  const { toast } = useToast();
  const [isEmailVerified, setIsEmailVerified] = useState(initialVerification);

  const handleStartVerification = () => {
    toast({
      title: "Verification Email Sent",
      description: "Please check your inbox and follow the verification link.",
    });
  };

  const handleBypassVerification = () => {
    setIsEmailVerified(true);
    toast({
      title: "Verification Bypassed",
      description: "Development mode: Verification has been bypassed.",
    });
  };

  return (
    <div className="space-y-6">
      {!isEmailVerified && (
        <VerificationBanner 
          isEmailVerified={isEmailVerified}
          onStartVerification={handleStartVerification}
          onBypassVerification={handleBypassVerification}
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
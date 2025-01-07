import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VerificationBannerProps {
  isEmailVerified: boolean;
  onStartVerification?: () => void;
}

const VerificationBanner = ({ isEmailVerified, onStartVerification }: VerificationBannerProps) => {
  if (isEmailVerified) {
    return (
      <Card className="p-4 bg-green-500/10 border-green-500/20">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <p className="text-green-500">Your account is verified! You can now access all features.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-yellow-500/10 border-yellow-500/20">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <div>
          <h3 className="font-semibold text-yellow-500">Verification Required</h3>
          <p className="text-sm text-yellow-500/80">
            To ensure the safety of our community, we need to verify your account.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="font-medium mb-2">Why verify?</h4>
            <ul className="text-sm space-y-2 text-white/60">
              <li>• Access to roommate matching</li>
              <li>• Message other users</li>
              <li>• View detailed profiles</li>
            </ul>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="font-medium mb-2">Requirements</h4>
            <ul className="text-sm space-y-2 text-white/60">
              <li>• Valid email address</li>
              <li>• Student ID or proof of enrollment</li>
              <li>• Profile picture</li>
            </ul>
          </div>
        </div>
        <Button 
          onClick={onStartVerification}
          className="w-full sm:w-auto"
        >
          Start Verification
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default VerificationBanner;
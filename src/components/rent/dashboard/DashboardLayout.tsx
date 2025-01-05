import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StudentHeader from '../StudentHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access the dashboard.",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      if (!session.user.email_confirmed_at) {
        setIsEmailVerified(false);
        toast({
          title: "Email verification required",
          description: "Please verify your email to access all features.",
          variant: "destructive"
        });
      } else {
        setIsEmailVerified(true);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setIsEmailVerified(!!session.user.email_confirmed_at);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]">
      <StudentHeader />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {!isEmailVerified && (
          <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertTitle className="text-yellow-500">Email Verification Required</AlertTitle>
            <AlertDescription className="text-yellow-500/90">
              Please verify your email address to access all features. Check your inbox for a verification link.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <DashboardSidebar isEmailVerified={isEmailVerified} />
          <DashboardContent isEmailVerified={isEmailVerified} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
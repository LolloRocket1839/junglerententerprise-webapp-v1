import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  MessageCircle,
  Settings,
  LayoutGrid,
  Newspaper,
  Heart,
  MessageSquare,
  Share2,
  ArrowLeftRight,
  Home,
  UserSearch,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import StudentSchedule from './StudentSchedule';
import StudentSwap from './StudentSwap';
import StudentHeader from './StudentHeader';
import DashboardStats from './DashboardStats';
import ActivityFeed from './ActivityFeed';
import RoommateFinder from './roommate/RoommateFinder';
import MarketplaceGrid from '../marketplace/MarketplaceGrid';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type View = "overview" | "schedule" | "messages" | "newsfeed" | "swap" | "roommate" | "marketplace" | "hub" | "settings";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<View>("overview");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

    // Subscribe to auth changes
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

      {/* Main Content */}
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
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="glass-card p-3 sm:p-4">
              <nav className="space-y-1 sm:space-y-2">
                {[
                  { icon: Home, label: 'Overview', id: 'overview' },
                  { icon: Calendar, label: 'Schedule', id: 'schedule' },
                  { icon: MessageCircle, label: 'Messages', id: 'messages', requiresVerification: true },
                  { icon: Newspaper, label: 'Newsfeed', id: 'newsfeed' },
                  { icon: ArrowLeftRight, label: 'Swap', id: 'swap', requiresVerification: true },
                  { icon: UserSearch, label: 'Find Roommate', id: 'roommate', requiresVerification: true },
                  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace', requiresVerification: true },
                  { icon: LayoutGrid, label: 'Hub', id: 'hub' },
                  { icon: Settings, label: 'Settings', id: 'settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.requiresVerification && !isEmailVerified) {
                        toast({
                          title: "Verification Required",
                          description: "Please verify your email to access this feature.",
                          variant: "destructive"
                        });
                        return;
                      }
                      setActiveTab(item.id as View);
                    }}
                    className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    } ${item.requiresVerification && !isEmailVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {isEmailVerified ? (
              <>
                {activeTab === 'overview' && (
                  <>
                    <DashboardStats />
                    <ActivityFeed />
                  </>
                )}
                
                {activeTab === 'schedule' && <StudentSchedule />}
                
                {activeTab === 'swap' && <StudentSwap />}
                
                {activeTab === 'roommate' && <RoommateFinder />}
                
                {activeTab === 'marketplace' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Jungle Exchange</h3>
                        <p className="text-white/60">Buy, sell, and trade items within your student community</p>
                      </div>
                      <Button variant="default" className="glass-button">
                        List New Item
                      </Button>
                    </div>
                    <MarketplaceGrid />
                  </div>
                )}
                
                {activeTab === 'messages' && (
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white">Messages</h3>
                    <p className="text-white/60 mt-2">No messages yet.</p>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white">Settings</h3>
                    <p className="text-white/60 mt-2">Settings panel coming soon.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="glass-card p-8 text-center">
                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Email Verification Required</h3>
                <p className="text-white/60 mb-6">
                  To access all features of the student dashboard, please verify your email address.
                  Check your inbox for a verification link.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/auth')}
                  className="bg-white/5 hover:bg-white/10"
                >
                  Back to Authentication
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
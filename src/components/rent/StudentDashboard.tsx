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
  ShoppingBag
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import StudentSchedule from './StudentSchedule';
import StudentSwap from './StudentSwap';
import StudentHeader from './StudentHeader';
import DashboardStats from './DashboardStats';
import ActivityFeed from './ActivityFeed';
import RoommateFinder from './roommate/RoommateFinder';
import MarketplaceGrid from '../marketplace/MarketplaceGrid';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access the dashboard.",
          variant: "destructive"
        });
        navigate('/auth');
      } else if (!session.user.email_confirmed_at) {
        toast({
          title: "Email verification required",
          description: "Please verify your email to access all features.",
          variant: "destructive"
        });
        navigate('/auth');
      }
    };

    checkAuth();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]">
      <StudentHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="glass-card p-3 sm:p-4">
              <nav className="space-y-1 sm:space-y-2">
                {[
                  { icon: Home, label: 'Overview', id: 'overview' },
                  { icon: Calendar, label: 'Schedule', id: 'schedule' },
                  { icon: MessageCircle, label: 'Messages', id: 'messages' },
                  { icon: Newspaper, label: 'Newsfeed', id: 'newsfeed' },
                  { icon: ArrowLeftRight, label: 'Swap', id: 'swap' },
                  { icon: UserSearch, label: 'Find Roommate', id: 'roommate' },
                  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
                  { icon: LayoutGrid, label: 'Hub', id: 'hub' },
                  { icon: Settings, label: 'Settings', id: 'settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

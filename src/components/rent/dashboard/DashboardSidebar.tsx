import { useState } from 'react';
import { 
  Home, Calendar, MessageCircle, Newspaper, ArrowLeftRight,
  UserSearch, ShoppingBag, LayoutGrid, Settings
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

type View = "overview" | "schedule" | "messages" | "newsfeed" | "swap" | "roommate" | "marketplace" | "hub" | "settings";

interface DashboardSidebarProps {
  isEmailVerified: boolean;
  onViewChange: (view: View) => void;
  activeView: View;
}

const DashboardSidebar = ({ isEmailVerified, onViewChange, activeView }: DashboardSidebarProps) => {
  const { toast } = useToast();

  const navigationItems = [
    { icon: Home, label: 'Overview', id: 'overview' as View, tooltip: 'View your dashboard summary' },
    { icon: Calendar, label: 'Schedule', id: 'schedule' as View, tooltip: 'Manage your appointments and deadlines' },
    { icon: MessageCircle, label: 'Messages', id: 'messages' as View, requiresVerification: true, tooltip: 'Chat with other students' },
    { icon: Newspaper, label: 'Newsfeed', id: 'newsfeed' as View, tooltip: 'Stay updated with latest news' },
    { icon: ArrowLeftRight, label: 'Swap', id: 'swap' as View, requiresVerification: true, tooltip: 'Exchange your room with others' },
    { icon: UserSearch, label: 'Find Roommate', id: 'roommate' as View, requiresVerification: true, tooltip: 'Find your perfect roommate match' },
    { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' as View, requiresVerification: true, tooltip: 'Buy and sell items' },
    { icon: LayoutGrid, label: 'Hub', id: 'hub' as View, tooltip: 'Access community features' },
    { icon: Settings, label: 'Settings', id: 'settings' as View, tooltip: 'Manage your preferences' },
  ];

  const handleTabChange = (item: typeof navigationItems[0]) => {
    if (item.requiresVerification && !isEmailVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your email to access this feature.",
        variant: "destructive"
      });
      return;
    }
    onViewChange(item.id);
  };

  return (
    <div className="lg:col-span-3">
      <div className="glass-card p-3 sm:p-4">
        <nav className="space-y-1 sm:space-y-2">
          <TooltipProvider>
            {navigationItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleTabChange(item)}
                    className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 ${
                      activeView === item.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-white/60 hover:bg-white/10 hover:text-white hover:shadow-md'
                    } ${item.requiresVerification && !isEmailVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black/90 text-white border-white/10">
                  <p>{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
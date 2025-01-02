import { Bell, Settings, LogOut, User, Settings2, Moon, Leaf, TreePalm } from 'lucide-react';
import { useState, useEffect } from 'react';
import PersonalInfoWizard from './PersonalInfoWizard';
import JungleWallet from './JungleWallet';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StudentHeader = () => {
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const { toast } = useToast();
  
  // Mock data for demonstration - in a real app, this would come from your backend
  const mockTransactions = [
    { type: "Daily Jungle Quest", amount: 10, timestamp: new Date().toISOString() },
    { type: "Eco-friendly Bonus", amount: 50, timestamp: new Date().toISOString() },
    { type: "Community Challenge", amount: 100, timestamp: new Date().toISOString() },
    { type: "Jungle Shop Purchase", amount: -150, timestamp: new Date().toISOString() },
  ];

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        toast({
          title: "Error fetching notifications",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
  });

  // Listen for new notifications
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          toast({
            title: payload.new.title,
            description: payload.new.message,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read_at).length;

  // Mark notifications as read
  const markAsRead = async () => {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .is('read_at', null);

    if (error) {
      toast({
        title: "Error marking notifications as read",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="glass-nav relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Leaf className="absolute top-2 left-4 h-4 w-4 text-primary/20 animate-float-slow" />
        <TreePalm className="absolute bottom-2 right-4 h-4 w-4 text-primary/20 animate-float-slower" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors group"
              onClick={() => setIsPersonalInfoOpen(true)}
            >
              <span className="text-primary text-sm sm:text-base font-bold group-hover:scale-110 transition-transform">MS</span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-white text-sm sm:text-base font-medium">Marco Studente</h2>
              <p className="text-white/60 text-xs sm:text-sm flex items-center gap-1">
                <Leaf className="h-3 w-3" />
                Villa Roma Centrale
              </p>
            </div>
          </div>

          {/* Jungle Wallet */}
          <div className="flex-1 flex justify-center">
            <JungleWallet balance={210} transactions={mockTransactions} />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="p-1.5 sm:p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors relative group"
                  onClick={markAsRead}
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full group-hover:animate-pulse" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 glass" align="end">
                <DropdownMenuLabel className="text-white/80">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-4 px-2 text-center text-white/60">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 py-2 cursor-default">
                      <div className="font-medium text-white">{notification.title}</div>
                      <div className="text-sm text-white/60">{notification.message}</div>
                      <div className="text-xs text-white/40">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1.5 sm:p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass">
                <DropdownMenuLabel className="text-white/80">Jungle Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white/60 hover:text-white focus:text-white cursor-pointer group">
                  <User className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Explorer Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white/60 hover:text-white focus:text-white cursor-pointer group">
                  <Settings2 className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Jungle Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white/60 hover:text-white focus:text-white cursor-pointer group">
                  <Moon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Night Mode</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Leave Jungle</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <PersonalInfoWizard 
        open={isPersonalInfoOpen} 
        onOpenChange={setIsPersonalInfoOpen}
      />
    </nav>
  );
};

export default StudentHeader;
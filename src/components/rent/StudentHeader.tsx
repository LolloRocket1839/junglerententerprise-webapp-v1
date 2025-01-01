import { Bell, Settings, LogOut, User, Settings2, Moon, Leaf, TreePalm } from 'lucide-react';
import { useState } from 'react';
import PersonalInfoWizard from './PersonalInfoWizard';
import JungleWallet from './JungleWallet';
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
  
  // Mock data for demonstration - in a real app, this would come from your backend
  const mockTransactions = [
    { type: "Daily Jungle Quest", amount: 10, timestamp: new Date().toISOString() },
    { type: "Eco-friendly Bonus", amount: 50, timestamp: new Date().toISOString() },
    { type: "Community Challenge", amount: 100, timestamp: new Date().toISOString() },
    { type: "Jungle Shop Purchase", amount: -150, timestamp: new Date().toISOString() },
  ];

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
            <button className="p-1.5 sm:p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors relative group">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full group-hover:animate-pulse" />
            </button>
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
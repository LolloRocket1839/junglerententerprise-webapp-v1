import { Bell, Settings, LogOut, User, Settings2, Moon } from 'lucide-react';
import { useState } from 'react';
import PersonalInfoWizard from './PersonalInfoWizard';
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

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors"
              onClick={() => setIsPersonalInfoOpen(true)}
            >
              <span className="text-primary text-sm sm:text-base font-bold">MS</span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-white text-sm sm:text-base font-medium">Marco Studente</h2>
              <p className="text-white/60 text-xs sm:text-sm">Villa Roma Centrale</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-1.5 sm:p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1.5 sm:p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass">
                <DropdownMenuLabel className="text-white/80">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white/60 hover:text-white focus:text-white cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>User Information</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white/60 hover:text-white focus:text-white cursor-pointer">
                  <Settings2 className="mr-2 h-4 w-4" />
                  <span>Modify Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white/60 hover:text-white focus:text-white cursor-pointer">
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Vacation Mode</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
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
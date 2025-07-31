import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Building2, User, Palmtree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface TabItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
  userTypes?: string[];
}

export function MobileTabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();
  const { data: profile } = useProfile();

  const tabs: TabItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Dashboard',
      path: session ? '/dashboard' : '/'
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: 'Discover',
      path: '/rent',
      userTypes: ['student', 'tourist']
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: 'Investi',
      path: '/invest',
      userTypes: ['investor']
    },
    {
      icon: <Palmtree className="h-5 w-5" />,
      label: 'Viaggi',
      path: '/stay',
      userTypes: ['tourist']
    },
    {
      icon: <User className="h-5 w-5" />,
      label: 'Profilo',
      path: session ? '/dashboard' : '/auth'
    }
  ];

  const getVisibleTabs = () => {
    if (!session || !profile) {
      return tabs.filter(tab => !tab.userTypes || tab.label === 'Profilo');
    }

    return tabs.filter(tab => 
      !tab.userTypes || 
      tab.userTypes.includes(profile.user_type) ||
      tab.label === 'Dashboard' || 
      tab.label === 'Profilo'
    );
  };

  const visibleTabs = getVisibleTabs();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {visibleTabs.map((tab) => (
          <Button
            key={tab.path}
            variant="ghost"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 px-1 rounded-xl transition-all duration-200 ${
              isActive(tab.path)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            onClick={() => navigate(tab.path)}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge && tab.badge > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
                >
                  {tab.badge > 99 ? '99+' : tab.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium leading-none">
              {tab.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
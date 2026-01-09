import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Calendar,
  CreditCard,
  MessageSquare,
  Bell,
  Users,
  TrendingUp,
  Home,
  Search,
  ClipboardList,
  Settings,
} from "lucide-react";
import type { UserMode, AdminMode, ViewType } from "@/lib/types";

interface JungleNavigationProps {
  userMode: UserMode | AdminMode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function JungleNavigation({ userMode, activeView, onViewChange }: JungleNavigationProps) {
  const getNavItems = () => {
    switch (userMode) {
      case "investor":
        return [
          { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard },
          { id: "invest" as ViewType, label: "Investi", icon: TrendingUp },
          { id: "portfolio" as ViewType, label: "Portfolio", icon: Building2 },
          { id: "messages" as ViewType, label: "Messaggi", icon: MessageSquare },
        ];
      case "student":
        return [
          { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard },
          { id: "browse" as ViewType, label: "Cerca Alloggio", icon: Search },
          { id: "applications" as ViewType, label: "Candidature", icon: FileText },
          { id: "rent" as ViewType, label: "Il mio Affitto", icon: Home },
          { id: "messages" as ViewType, label: "Messaggi", icon: MessageSquare },
        ];
      case "tourist":
        return [
          { id: "dashboard" as ViewType, label: "Dashboard", icon: LayoutDashboard },
          { id: "browse" as ViewType, label: "Cerca Alloggio", icon: Search },
          { id: "bookings" as ViewType, label: "Prenotazioni", icon: Calendar },
          { id: "messages" as ViewType, label: "Messaggi", icon: MessageSquare },
        ];
      // Administrator mode removed - managed via Lovable
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`flex-shrink-0 gap-2 ${
                  isActive ? "" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}

          {/* Notifications */}
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => onViewChange("notifications")}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from '@/lib/react-query';
import { JungleLanguageProvider } from '@/lib/language-context';
import { JungleHeader } from '@/components/jungle/JungleHeader';
import { JungleNavigation } from '@/components/jungle/JungleNavigation';
import { JungleFooter } from '@/components/jungle/JungleFooter';
import { LandingView } from '@/components/views/LandingView';
import { DashboardView } from '@/components/views/DashboardView';
import { InvestorDashboardView } from '@/components/views/InvestorDashboardView';
import { InvestorPortfolioView } from '@/components/views/InvestorPortfolioView';
import { StudentDashboardView } from '@/components/views/StudentDashboardView';
import { TouristDashboardView } from '@/components/views/TouristDashboardView';
import Invest from '@/pages/Invest';
import type { UserMode, AdminMode, ViewType } from '@/lib/types';
import './App.css';

function App() {
  const [userMode, setUserMode] = useState<UserMode | AdminMode | null>(null);
  const [activeView, setActiveView] = useState<ViewType>("dashboard");

  const handleModeChange = (mode: UserMode | AdminMode | null) => {
    setUserMode(mode);
    setActiveView("dashboard");
  };

  // If no userMode selected, show landing page
  if (!userMode) {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <JungleLanguageProvider>
            <LandingView onSelectMode={handleModeChange} />
            <Toaster />
          </JungleLanguageProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  }

  // Render dashboard based on user mode
  const renderDashboard = () => {
    switch (userMode) {
      case "investor":
        return <InvestorDashboardView onViewChange={setActiveView} />;
      case "student":
        return <StudentDashboardView />;
      case "tourist":
        return <TouristDashboardView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <JungleLanguageProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <JungleHeader userMode={userMode} onModeChange={handleModeChange} />
            <JungleNavigation 
              userMode={userMode} 
              activeView={activeView} 
              onViewChange={setActiveView} 
            />
            
            <main className="flex-1 container mx-auto px-4 py-6">
              {/* Dashboard views based on user mode */}
              {activeView === "dashboard" && renderDashboard()}
              
              {/* Investor specific views */}
              {activeView === "invest" && userMode === "investor" && <Invest />}
              {activeView === "portfolio" && userMode === "investor" && <InvestorPortfolioView />}
              
              {/* Placeholder for other views */}
              {!["dashboard", "invest", "portfolio"].includes(activeView) && (
                <div className="text-center py-20 animate-fade-in">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {activeView.charAt(0).toUpperCase() + activeView.slice(1).replace("-", " ")}
                  </h2>
                  <p className="text-muted-foreground">
                    Questa vista sarà implementata nel prossimo step.
                  </p>
                </div>
              )}
            </main>

            <JungleFooter />
          </div>
          <Toaster />
        </JungleLanguageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

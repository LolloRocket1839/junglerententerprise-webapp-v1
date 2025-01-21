import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentDashboard from '@/components/rent/StudentDashboard';
import SearchSection from '@/components/rent/SearchSection';
import ProcessSteps from '@/components/rent/ProcessSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

const Rent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
    // Simulate content loading
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [location.search]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/rent?tab=${value}`, { replace: true });
  };

  // Memoize the tab triggers to prevent unnecessary re-renders
  const tabTriggers = useMemo(() => (
    <TabsList className="grid w-full grid-cols-2 bg-black/10 backdrop-blur-sm p-1.5 gap-1.5 rounded-2xl">
      <TabsTrigger 
        value="search" 
        className="data-[state=active]:bg-[#3C9D6F]/90 data-[state=active]:text-white/90 
                 px-6 py-3 text-white/80 hover:text-white transition-all duration-300 
                 flex items-center justify-center gap-3 text-base font-medium rounded-xl
                 min-h-[3.5rem] hover:bg-[#3C9D6F]/20 backdrop-blur-sm
                 data-[state=active]:shadow-lg data-[state=active]:backdrop-blur-md"
      >
        <Home className="w-5 h-5 flex-shrink-0" />
        <span className="whitespace-nowrap">Find Accommodation</span>
      </TabsTrigger>
      <TabsTrigger 
        value="profile" 
        className="data-[state=active]:bg-[#2E7D32]/90 data-[state=active]:text-white/90 
                 px-6 py-3 text-white/80 hover:text-white transition-all duration-300 
                 flex items-center justify-center gap-3 text-base font-medium rounded-xl
                 min-h-[3.5rem] hover:bg-[#2E7D32]/20 backdrop-blur-sm
                 data-[state=active]:shadow-lg data-[state=active]:backdrop-blur-md"
      >
        <User className="w-5 h-5 flex-shrink-0" />
        <span className="whitespace-nowrap">Student Profile</span>
      </TabsTrigger>
    </TabsList>
  ), []);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="relative pt-16">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-1.5 rounded-2xl bg-gradient-to-br from-[#1a472a]/40 via-[#2d5a3f]/40 to-[#3d6b52]/40 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-1.5">
                <Skeleton className="h-14 bg-white/10" />
                <Skeleton className="h-14 bg-white/10" />
              </div>
            </div>
            <div className="mt-8">
              <Skeleton className="h-[400px] bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      <div className="relative pt-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="p-1.5 rounded-2xl bg-gradient-to-br from-[#1a472a]/40 via-[#2d5a3f]/40 to-[#3d6b52]/40 backdrop-blur-sm">
              {tabTriggers}
            </div>

            <div className="mt-8">
              <TabsContent value="search" className="animate-fade-in">
                <SearchSection />
                <ProcessSteps />
              </TabsContent>

              <TabsContent value="profile" className="animate-fade-in">
                <StudentDashboard />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Rent);
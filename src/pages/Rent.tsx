import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentDashboard from '@/components/rent/StudentDashboard';
import SearchSection from '@/components/rent/SearchSection';
import ProcessSteps from '@/components/rent/ProcessSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User } from 'lucide-react';

const Rent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/rent?tab=${value}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 animate-gradient-slow">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      {/* Main Content */}
      <div className="relative pt-24 md:pt-32">
        <div className="sticky top-0 z-50 bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm py-6">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 gap-4 p-2 bg-black/40 backdrop-blur-lg border 
                                border-white/10 rounded-xl shadow-xl">
                <TabsTrigger 
                  value="search" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3 text-white/80 
                           hover:text-white transition-all duration-300 flex items-center justify-center gap-3 
                           text-base font-medium rounded-lg shadow-lg hover:shadow-xl active:scale-95 
                           hover:bg-white/10 h-12"
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Find Accommodation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3 text-white/80 
                           hover:text-white transition-all duration-300 flex items-center justify-center gap-3 
                           text-base font-medium rounded-lg shadow-lg hover:shadow-xl active:scale-95 
                           hover:bg-white/10 h-12"
                >
                  <User className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Student Profile</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsContent value="search" className="mt-0 animate-fade-in">
              <SearchSection />
              <ProcessSteps />
            </TabsContent>

            <TabsContent value="profile" className="mt-0 animate-fade-in">
              <StudentDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Rent;
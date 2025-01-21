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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      {/* Main Content */}
      <div className="relative pt-24">
        <div className="sticky top-[88px] z-50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 bg-black/20 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                <TabsTrigger 
                  value="search" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-4 
                           text-white/80 hover:text-white transition-all duration-300 flex items-center 
                           justify-center gap-3 text-lg font-medium rounded-xl h-16"
                >
                  <Home className="w-6 h-6 flex-shrink-0" />
                  <span className="whitespace-nowrap">Find Accommodation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-4 
                           text-white/80 hover:text-white transition-all duration-300 flex items-center 
                           justify-center gap-3 text-lg font-medium rounded-xl h-16"
                >
                  <User className="w-6 h-6 flex-shrink-0" />
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
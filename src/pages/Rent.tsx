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
      <div className="relative pt-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-green-700/20 rounded-2xl p-1.5 gap-2">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white 
                         px-8 py-4 text-white/90 hover:text-white transition-all duration-300 
                         flex items-center justify-center gap-3 text-lg font-medium rounded-xl
                         min-h-[4rem] hover:bg-green-600/20"
              >
                <Home className="w-6 h-6 flex-shrink-0" />
                <span className="whitespace-nowrap">Find Accommodation</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white 
                         px-8 py-4 text-white/90 hover:text-white transition-all duration-300 
                         flex items-center justify-center gap-3 text-lg font-medium rounded-xl
                         min-h-[4rem] hover:bg-green-600/20"
              >
                <User className="w-6 h-6 flex-shrink-0" />
                <span className="whitespace-nowrap">Student Profile</span>
              </TabsTrigger>
            </TabsList>

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

export default Rent;
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentDashboard from '@/components/rent/StudentDashboard';
import LoginOverlay from '@/components/auth/LoginOverlay';
import { useToast } from "@/components/ui/use-toast";
import SearchSection from '@/components/rent/SearchSection';
import ProcessSteps from '@/components/rent/ProcessSteps';
import { useLocation } from 'react-router-dom';

const Rent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleTabChange = (value: string) => {
    if (value === "profile") {
      setShowLogin(true);
      toast({
        title: "Authentication Required",
        description: "Please log in to access your student profile",
      });
    }
    setActiveTab(value);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {showLogin && <LoginOverlay onClose={() => setShowLogin(false)} />}
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-md border border-white/20">
            <TabsTrigger value="search" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Find Accommodation
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Student Profile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search">
            <SearchSection />
            <ProcessSteps />
          </TabsContent>

          <TabsContent value="profile">
            <StudentDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rent;
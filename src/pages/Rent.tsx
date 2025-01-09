import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentDashboard from '@/components/rent/StudentDashboard';
import { useToast } from "@/components/ui/use-toast";
import SearchSection from '@/components/rent/SearchSection';
import ProcessSteps from '@/components/rent/ProcessSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Rent = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');

  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setActiveTab('search');
        navigate('/rent?tab=search');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleTabChange = (value: string) => {
    if (value === 'profile' && !session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access your profile.",
        variant: "destructive"
      });
      return;
    }
    setActiveTab(value);
    navigate(`/rent?tab=${value}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
          <div className="sticky top-20 z-50 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
            <TabsList className="grid w-full grid-cols-2 gap-2 p-1 bg-black/60 backdrop-blur-lg border border-white/20 rounded-lg">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Find Accommodation
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Student Profile
              </TabsTrigger>
            </TabsList>
          </div>
          
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
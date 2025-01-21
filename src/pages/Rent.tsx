import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentDashboard from '@/components/rent/StudentDashboard';
import { useToast } from "@/hooks/use-toast";
import SearchSection from '@/components/rent/SearchSection';
import ProcessSteps from '@/components/rent/ProcessSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Home, User } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 animate-gradient-slow">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="sticky top-20 z-50 bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 gap-4 p-2 bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl">
                <TabsTrigger 
                  value="search" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white py-4 text-white/80 hover:text-white 
                           transition-all duration-300 flex items-center gap-2 text-base font-medium rounded-lg
                           shadow-lg hover:shadow-xl"
                >
                  <Home className="w-5 h-5" />
                  Find Accommodation
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white py-4 text-white/80 hover:text-white 
                           transition-all duration-300 flex items-center gap-2 text-base font-medium rounded-lg
                           shadow-lg hover:shadow-xl"
                >
                  <User className="w-5 h-5" />
                  Student Profile
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
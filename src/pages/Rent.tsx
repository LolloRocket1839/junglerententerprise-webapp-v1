import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentDashboard from '@/components/rent/StudentDashboard';
import LoginOverlay from '@/components/auth/LoginOverlay';
import { useToast } from "@/components/ui/use-toast";
import SearchSection from '@/components/rent/SearchSection';
import ProcessSteps from '@/components/rent/ProcessSteps';

const Rent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    if (value === "profile") {
      setShowLogin(true);
      toast({
        title: "Authentication Required",
        description: "Please log in to access your student profile",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {showLogin && <LoginOverlay />}
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Tabs defaultValue="search" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-md border border-white/20">
            <TabsTrigger 
              value="search" 
              className="flex items-center justify-center data-[state=active]:bg-green-500 data-[state=active]:text-white py-3 text-center"
            >
              Find Accommodation
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center justify-center data-[state=active]:bg-green-500 data-[state=active]:text-white py-3 text-center"
            >
              Student Profile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-8">
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
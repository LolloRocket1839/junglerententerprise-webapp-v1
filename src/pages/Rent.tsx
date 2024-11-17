import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentDashboard from '@/components/rent/StudentDashboard';
import LoginOverlay from '@/components/auth/LoginOverlay';
import { useToast } from "@/components/ui/use-toast";
import SearchSection from '@/components/rent/SearchSection';
import ListingsSection from '@/components/rent/ListingsSection';

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
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-emerald-900">
      {showLogin && <LoginOverlay />}
      
      <div className="max-w-7xl mx-auto px-8 py-12">
        <Tabs defaultValue="search" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="search">Find Accommodation</TabsTrigger>
            <TabsTrigger value="profile">Student Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search">
            <SearchSection />
            <ListingsSection />
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
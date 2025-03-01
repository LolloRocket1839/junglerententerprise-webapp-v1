import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Home, User, Building, BellRing, Banknote } from 'lucide-react';
import InvestmentDashboard from './invest/analytics/InvestmentDashboard';
import RentSection from './sections/RentSection';
import StaySection from './sections/StaySection';
import { useLanguage } from '@/contexts/LanguageContext';

const JungleRentApp = () => {
  const [activeTab, setActiveTab] = useState("invest");
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with logo */}
      <header className="bg-yellow-300 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-navy-900 rounded-full"></div>
          </div>
          <h1 className="text-xl font-bold">Jungle Rent</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <BellRing className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="invest" className="flex flex-col items-center py-2">
              <Banknote className="h-5 w-5 mb-1" />
              <span>Investi</span>
            </TabsTrigger>
            <TabsTrigger value="rent" className="flex flex-col items-center py-2">
              <Home className="h-5 w-5 mb-1" />
              <span>Affitta</span>
            </TabsTrigger>
            <TabsTrigger value="stay" className="flex flex-col items-center py-2">
              <Building className="h-5 w-5 mb-1" />
              <span>Soggiorna</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invest">
            <InvestmentDashboard />
          </TabsContent>

          <TabsContent value="rent">
            <RentSection />
          </TabsContent>

          <TabsContent value="stay">
            <StaySection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom navigation menu */}
      <footer className="bg-white border-t p-4">
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2" 
            onClick={() => setActiveTab("invest")}
          >
            <Banknote className="h-5 w-5 mb-1" />
            <span className="text-xs">Investi</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2" 
            onClick={() => setActiveTab("rent")}
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Affitta</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2" 
            onClick={() => setActiveTab("stay")}
          >
            <Building className="h-5 w-5 mb-1" />
            <span className="text-xs">Soggiorna</span>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default JungleRentApp;

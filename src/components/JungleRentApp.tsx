import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Home, User, Building, Search, BarChart3, Calendar, MapPin, BellRing, Banknote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import InvestmentDashboard from './invest/analytics/InvestmentDashboard';
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

          {/* Investment Section */}
          <TabsContent value="invest">
            <InvestmentDashboard />
          </TabsContent>

          {/* Rent Section */}
          <TabsContent value="rent">
            <div className="space-y-4">
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Cerca per università o zona..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex overflow-x-auto py-2 space-x-2 mb-4">
                <Button variant="outline" className="whitespace-nowrap">
                  Vicino UniTO
                </Button>
                <Button variant="outline" className="whitespace-nowrap">
                  Vicino Sapienza
                </Button>
                <Button variant="outline" className="whitespace-nowrap">
                  Vicino LUISS
                </Button>
                <Button variant="outline" className="whitespace-nowrap">
                  Vicino Bocconi
                </Button>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>Appartamento Sapienza Via Nomentana</CardTitle>
                    </div>
                    <CardDescription>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>350m dalla Sapienza</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Prezzo mensile</p>
                        <p className="font-bold">€450 <span className="text-sm font-normal text-gray-500 line-through">€600</span></p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Risparmio</p>
                        <p className="font-bold text-green-600">25%</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">4 stanze</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Wi-Fi</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Riscaldamento</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Dettagli</Button>
                    <Button>Prenota Visita</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>Stanza in Via Tiburtina</CardTitle>
                    </div>
                    <CardDescription>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>500m dalla Sapienza</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Prezzo mensile</p>
                        <p className="font-bold">€375 <span className="text-sm font-normal text-gray-500 line-through">€500</span></p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Risparmio</p>
                        <p className="font-bold text-green-600">25%</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Stanza singola</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Wi-Fi</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Cucina condivisa</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Dettagli</Button>
                    <Button>Prenota Visita</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Stay Section */}
          <TabsContent value="stay">
            <div className="space-y-4">
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Cerca per città o zona..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Check-in</label>
                  <div className="flex items-center border rounded-md p-2">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">10 Giu 2025</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Check-out</label>
                  <div className="flex items-center border rounded-md p-2">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">20 Giu 2025</span>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Appartamento nel Centro di Roma</CardTitle>
                  </div>
                  <CardDescription>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Via Sallustiana, Roma</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Prezzo per notte</p>
                    <p className="font-bold">€95</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">2 camere</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Wi-Fi</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">A/C</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Prenota Ora</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Appartamento Vicino Colosseo</CardTitle>
                  </div>
                  <CardDescription>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Via Capo d'Africa, Roma</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Prezzo per notte</p>
                    <p className="font-bold">€120</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">1 camera</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Wi-Fi</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">Terrazza</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Prenota Ora</Button>
                </CardFooter>
              </Card>
            </div>
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

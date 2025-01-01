import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import StatsCard from './StatsCard';
import {
  Building2,
  TrendingUp,
  Users,
  Wallet,
  ArrowRight,
  Info
} from 'lucide-react';

const InvestmentOpportunities = () => {
  const stats = [
    {
      title: "Total Properties",
      value: "2,345",
      change: "+12.5%",
      icon: Building2,
      trend: "up" as const
    },
    {
      title: "Average ROI",
      value: "10%",
      change: "+3.2%",
      icon: TrendingUp,
      trend: "up" as const
    },
    {
      title: "Active Investors",
      value: "12.5K",
      change: "+23.1%",
      icon: Users,
      trend: "up" as const
    },
    {
      title: "Total Investment",
      value: "$45.2M",
      change: "+8.9%",
      icon: Wallet,
      trend: "up" as const
    }
  ];

  const properties = [
    {
      id: 1,
      title: "Villa Roma Centrale",
      location: "Rome, Italy",
      price: "$850,000",
      roi: "12.5%",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511"
    },
    {
      id: 2,
      title: "Student Housing Complex",
      location: "Berlin, Germany",
      price: "$1,200,000",
      roi: "15.2%",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
    },
    {
      id: 3,
      title: "Modern Apartments",
      location: "Paris, France",
      price: "$950,000",
      roi: "11.8%",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A2F3C] to-[#3A3F4C] px-4 py-6 md:p-8">
      {/* Stats Grid - Mobile optimized */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.slice(0, 2).map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
        <div className="col-span-2">
          <StatsCard
            title={stats[2].title}
            value={stats[2].value}
            change={stats[2].change}
            icon={stats[2].icon}
            trend={stats[2].trend}
          />
        </div>
      </div>

      {/* Investment Tabs - Enhanced mobile experience */}
      <Tabs defaultValue="all" className="w-full">
        <div className="sticky top-16 z-10 bg-[#1A1F2C]/80 backdrop-blur-md py-2">
          <ScrollArea className="w-full">
            <TabsList className="w-full flex justify-start p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              {["Opportunities", "My Investments", "Tokenization", "Analytics"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(" ", "-")}
                  className="flex-1 px-4 py-3 text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="opacity-0" />
          </ScrollArea>
        </div>

        <TabsContent value="opportunities" className="mt-4 focus-visible:outline-none">
          <div className="grid grid-cols-1 gap-4">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{property.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{property.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xs text-white/60">Price</p>
                      <p className="text-base font-semibold text-white">{property.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60">Expected ROI</p>
                      <p className="text-base font-semibold text-primary">{property.roi}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 py-5 text-sm">
                      Invest Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-[42px] w-[42px] bg-white/5 border-white/10">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-investments" className="mt-4 focus-visible:outline-none">
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                trend={stat.trend}
                className="w-full"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tokenization" className="mt-4">
          <Card className="glass p-4">
            <div className="text-white/60">Coming soon in Phase 2</div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card className="glass p-4">
            <div className="text-white/60">Coming soon in Phase 2</div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentOpportunities;
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
      {/* Stats Grid - Improved mobile spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Investment Tabs - Enhanced mobile experience */}
      <Tabs defaultValue="all" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-lg mb-6 px-1">
          <TabsList className="inline-flex h-12 p-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            {["All Properties", "Student Housing", "Apartments", "Villas"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(" ", "-")}
                className="px-6 py-3 text-base rounded-md data-[state=active]:bg-primary data-[state=active]:text-white min-w-[120px] h-10"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </ScrollArea>

        <TabsContent value="all" className="mt-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
                  <p className="text-base text-white/60 mb-4">{property.location}</p>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-white/60">Price</p>
                      <p className="text-lg font-semibold text-white">{property.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60">Expected ROI</p>
                      <p className="text-lg font-semibold text-primary">{property.roi}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 text-base py-6 group">
                      Invest Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 bg-white/5 border-white/10 hover:bg-white/10">
                      <Info className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentOpportunities;
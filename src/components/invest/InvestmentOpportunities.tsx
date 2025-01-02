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
    <div className="space-y-6">
      {/* Stats Grid - Mobile optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* Properties Grid - Mobile optimized */}
      <div className="grid grid-cols-1 gap-6">
        {properties.map((property) => (
          <Card 
            key={property.id} 
            className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{property.title}</h3>
                <p className="text-sm text-white/60">{property.location}</p>
              </div>
              <div className="flex justify-between items-center">
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
    </div>
  );
};

export default InvestmentOpportunities;
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { StatsSection } from "@/components/invest/StatsSection";
import { InvestmentTabs } from "@/components/invest/InvestmentTabs";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Shield, Zap, Users, Building2 } from "lucide-react";

const PremiumFeatureCard = ({ icon, title, description, badge }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) => (
  <GlassCard className="interactive-card group">
    <div className="flex items-start space-x-4">
      <div className="p-3 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {badge && (
            <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30">
              {badge}
            </Badge>
          )}
        </div>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  </GlassCard>
);

const Invest = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      title: "Rendimenti Garantiti",
      description: "Investimenti immobiliari con rendimento annuo del 8-12%",
      badge: "8-12%"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Investimenti Sicuri",
      description: "Tutti gli immobili sono verificati e assicurati",
      badge: "Verificato"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Community di Investitori",
      description: "Unisciti a oltre 1000+ investitori attivi",
      badge: "1000+"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Floating Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Floating Animations */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-green-400/10 rounded-full blur-xl animate-float-slower" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-pulse-gentle" />
        
        {/* Decorative Icons */}
        <DollarSign className="absolute top-1/4 right-1/4 w-16 h-16 text-emerald-400/20 animate-leaf-float" />
        <Building2 className="absolute bottom-1/4 left-1/4 w-12 h-12 text-emerald-400/15 animate-pulse-gentle" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 space-y-8 md:space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-8 h-8 text-emerald-400 mr-3 animate-pulse-gentle" />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                Investi nel
              </span>
              <span className="text-emerald-400 ml-2">Futuro</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed">
            Investimenti immobiliari intelligenti con rendimenti garantiti
            <br />
            <span className="text-emerald-400 font-medium">Inizia da €100</span>
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <PremiumFeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="glass-premium rounded-3xl p-1">
          <StatsSection />
        </div>

        {/* Enhanced Investment Tabs */}
        <div className="glass-premium rounded-3xl p-6">
          <InvestmentTabs />
        </div>

        {/* Call to Action */}
        <GlassCard className="text-center p-8 bg-gradient-to-r from-emerald-500/20 to-green-600/20 border-emerald-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            Pronto a Investire?
          </h3>
          <p className="text-white/70 mb-6">
            Unisciti a migliaia di investitori che stanno già guadagnando con noi
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-white/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-gentle" />
              <span>Commissioni 0%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-gentle" />
              <span>Liquidità immediata</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-gentle" />
              <span>Supporto 24/7</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Invest;
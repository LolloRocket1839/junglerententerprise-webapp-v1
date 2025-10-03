import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Home, Users, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { GlassCard } from "@/components/ui/glass-card";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  gradient: string;
  onClick: () => void;
  popular?: boolean;
}

const ActionCard = ({ icon, title, description, badge, gradient, onClick, popular }: ActionCardProps) => {
  const { t } = useLanguage();
  
  return (
    <GlassCard 
      className={`p-6 cursor-pointer group hover:scale-105 transform transition-all duration-300 hover:shadow-2xl ${gradient} relative overflow-hidden`}
      onClick={onClick}
    >
      {popular && (
        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
          ⭐ {t('popular')}
        </Badge>
      )}
    <div className="flex items-start space-x-4">
      <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-white/70 text-sm mb-3">{description}</p>
        {badge && (
          <Badge variant="secondary" className="bg-white/20 text-white">
            {badge}
          </Badge>
        )}
      </div>
      <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
    </div>
    </GlassCard>
  );
};

export const HeroLanding = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: t('searchStarted'),
        description: `${t('searching')} "${searchQuery}"...`,
      });
      navigate(`/rent?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/rent');
    }
  };

  const actionCards = [
    {
      icon: <Home className="w-6 h-6 text-white" />,
      title: t('findHome'),
      description: t('findHomeDesc'),
      badge: t('saveUpTo'),
      gradient: "hover:bg-gradient-to-br hover:from-emerald-500/20 hover:to-green-600/20",
      onClick: () => navigate('/rent'),
      popular: true
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t('findRoommate'),
      description: t('findRoommateDesc'),
      badge: t('aiMatch'),
      gradient: "hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-600/20",
      onClick: () => navigate('/rent?tab=roommate')
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: t('exploreAreas'),
      description: t('exploreAreasDesc'),
      gradient: "hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-600/20",
      onClick: () => navigate('/properties')
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-green-400/10 rounded-full blur-xl animate-float-slower" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-pulse-gentle" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-emerald-400 mr-3 animate-pulse-gentle" />
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                Jungle
              </span>
              <span className="text-emerald-400 ml-2">Rent</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed">
            {t('platformTagline')}
            <br />
            <span className="text-emerald-400 font-medium">{t('saveMoneyTime')}</span>
          </p>

          {/* Smart Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <GlassCard className="p-2">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-white/60 ml-4" />
                <Input
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent border-none text-white placeholder:text-white/50 focus:ring-0"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6"
                >
                  {t('search')}
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {actionCards.map((card, index) => (
              <ActionCard
                key={index}
                {...card}
              />
            ))}
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center items-center space-x-8 text-center">
            <div className="text-white/60">
              <div className="text-2xl font-bold text-emerald-400">1000+</div>
              <div className="text-sm">{t('properties')}</div>
            </div>
            <div className="text-white/60">
              <div className="text-2xl font-bold text-emerald-400">500+</div>
              <div className="text-sm">{t('students')}</div>
            </div>
            <div className="text-white/60">
              <div className="text-2xl font-bold text-emerald-400">95%</div>
              <div className="text-sm">{t('satisfaction')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
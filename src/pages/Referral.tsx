import { useEffect, useState } from "react";
import ReferralDashboard from "@/components/referral/ReferralDashboard";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Users, Gift, DollarSign, TreePine, Building2, Sparkles, TrendingUp } from "lucide-react";

const StatCard = ({ icon, title, stat, description }: { 
  icon: React.ReactNode; 
  title: string; 
  stat: string; 
  description: string; 
}) => (
  <GlassCard className="interactive-card text-center p-6">
    <div className="p-3 rounded-full bg-emerald-500/20 w-fit mx-auto mb-4">
      {icon}
    </div>
    <div className="text-3xl font-bold text-white mb-2">{stat}</div>
    <div className="text-lg font-semibold text-white mb-1">{title}</div>
    <div className="text-sm text-white/60">{description}</div>
  </GlassCard>
);

const Referral = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-green-400/10 rounded-full blur-xl animate-float-slower" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-pulse-gentle" />
        <TreePine className="absolute top-1/4 right-1/4 w-16 h-16 text-emerald-400/20 animate-leaf-float" />
        <Building2 className="absolute bottom-1/4 left-1/4 w-12 h-12 text-emerald-400/15 animate-pulse-gentle" />
        <Gift className="absolute top-1/3 left-1/6 w-10 h-10 text-emerald-400/10 animate-wave" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3 animate-pulse-gentle" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                  Programma
                </span>
                <span className="text-emerald-400 ml-2">Referral</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed">
              Guadagna invitando i tuoi amici su Jungle Rent
              <br />
              <span className="text-emerald-400 font-medium">Fino a €50 per ogni referral</span>
            </p>

            {/* Benefits Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <StatCard 
                icon={<DollarSign className="w-8 h-8 text-emerald-400" />}
                title="Guadagno Medio"
                stat="€35"
                description="Per ogni amico che si iscrive"
              />
              <StatCard 
                icon={<Users className="w-8 h-8 text-blue-400" />}
                title="Referral Attivi"
                stat="1,200+"
                description="Utenti che stanno guadagnando"
              />
              <StatCard 
                icon={<TrendingUp className="w-8 h-8 text-purple-400" />}
                title="Payout Totale"
                stat="€42,000"
                description="Pagati agli utenti questo mese"
              />
            </div>

            {/* How It Works */}
            <GlassCard className="p-8 max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Come Funziona</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-400">1</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Invita Amici</h4>
                  <p className="text-white/60 text-sm">Condividi il tuo link referral unico</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-400">2</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Si Iscrivono</h4>
                  <p className="text-white/60 text-sm">I tuoi amici creano un account</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-400">3</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Guadagni</h4>
                  <p className="text-white/60 text-sm">Ricevi il tuo bonus referral</p>
                </div>
              </div>
            </GlassCard>

            {/* Bonus Tiers */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30 transition-all">
                🥉 5 Referral = Bonus €50
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 transition-all">
                🥈 10 Referral = Bonus €150
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 transition-all">
                🥇 25 Referral = Bonus €500
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-100 hover:bg-yellow-500/30 transition-all">
                💎 50 Referral = Bonus €1,500
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Dashboard with Glass Container */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <GlassCard className="p-6 rounded-3xl">
            <ReferralDashboard />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Referral;
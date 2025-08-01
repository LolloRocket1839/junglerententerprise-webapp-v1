import React from 'react';
import MarketplaceGrid from '@/components/marketplace/MarketplaceGrid';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Users, Zap, TreePine, Building2, Sparkles, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon, title, stat }: { icon: React.ReactNode; title: string; stat: string }) => (
  <GlassCard className="interactive-card text-center p-4">
    <div className="p-3 rounded-full bg-emerald-500/20 w-fit mx-auto mb-3">
      {icon}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{stat}</div>
    <div className="text-sm text-white/60">{title}</div>
  </GlassCard>
);

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-green-400/10 rounded-full blur-xl animate-float-slower" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-pulse-gentle" />
        <TreePine className="absolute top-1/4 right-1/4 w-16 h-16 text-emerald-400/20 animate-leaf-float" />
        <Building2 className="absolute bottom-1/4 left-1/4 w-12 h-12 text-emerald-400/15 animate-pulse-gentle" />
        <ShoppingBag className="absolute top-1/3 left-1/6 w-10 h-10 text-emerald-400/10 animate-wave" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3 animate-pulse-gentle" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                  Jungle
                </span>
                <span className="text-emerald-400 ml-2">Marketplace</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed">
              La piattaforma di scambio per studenti e giovani professionali
              <br />
              <span className="text-emerald-400 font-medium">Vendi, Compra, Scambia in sicurezza</span>
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <FeatureCard 
                icon={<ShoppingBag className="w-6 h-6 text-emerald-400" />}
                title="Prodotti Attivi"
                stat="150+"
              />
              <FeatureCard 
                icon={<Users className="w-6 h-6 text-blue-400" />}
                title="Utenti Verificati"
                stat="300+"
              />
              <FeatureCard 
                icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
                title="Transazioni"
                stat="500+"
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-yellow-400" />}
                title="Valutazione"
                stat="4.9★"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30 transition-all cursor-pointer">
                📚 Libri di Studio
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 transition-all cursor-pointer">
                💻 Elettronica
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 transition-all cursor-pointer">
                🏠 Casa & Arredo
              </Badge>
              <Badge className="bg-pink-500/20 text-pink-100 hover:bg-pink-500/30 transition-all cursor-pointer">
                👕 Abbigliamento
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-100 hover:bg-orange-500/30 transition-all cursor-pointer">
                🚲 Mobilità
              </Badge>
            </div>

            {/* Features */}
            <GlassCard className="p-6 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="p-3 rounded-full bg-emerald-500/20 w-fit mx-auto mb-3">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Transazioni Sicure</h3>
                  <p className="text-white/60 text-sm">Pagamenti protetti e verifiche identità</p>
                </div>
                <div>
                  <div className="p-3 rounded-full bg-blue-500/20 w-fit mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Community Verificata</h3>
                  <p className="text-white/60 text-sm">Solo studenti e professionali verificati</p>
                </div>
                <div>
                  <div className="p-3 rounded-full bg-purple-500/20 w-fit mx-auto mb-3">
                    <ShoppingBag className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Prezzi Giusti</h3>
                  <p className="text-white/60 text-sm">Valutazioni automatiche e prezzi equi</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Marketplace Grid with Glass Container */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <GlassCard className="p-6 rounded-3xl">
            <MarketplaceGrid />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
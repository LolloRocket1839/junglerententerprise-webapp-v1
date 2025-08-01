import React from 'react';
import UnifiedPropertyGrid from '@/components/properties/UnifiedPropertyGrid';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Home, MapPin, Search, TreePine, Building2, Sparkles } from 'lucide-react';

const Properties = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-green-400/10 rounded-full blur-xl animate-float-slower" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-pulse-gentle" />
        <TreePine className="absolute top-1/4 right-1/4 w-16 h-16 text-emerald-400/20 animate-leaf-float" />
        <Building2 className="absolute bottom-1/4 left-1/4 w-12 h-12 text-emerald-400/15 animate-pulse-gentle" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3 animate-pulse-gentle" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                  Tutte le
                </span>
                <span className="text-emerald-400 ml-2">Proprietà</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed">
              Esplora la nostra collezione completa di immobili
              <br />
              <span className="text-emerald-400 font-medium">Vendita, Affitto, Investimenti</span>
            </p>

            {/* Quick Stats */}
            <GlassCard className="inline-flex items-center space-x-6 p-4 mb-8">
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-emerald-400" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">500+</div>
                  <div className="text-xs text-white/60">Proprietà</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">20+</div>
                  <div className="text-xs text-white/60">Città</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-emerald-400" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">98%</div>
                  <div className="text-xs text-white/60">Soddisfazione</div>
                </div>
              </div>
            </GlassCard>

            {/* Property Types */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30">
                🏠 Residenziali
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-100 hover:bg-blue-500/30">
                🏢 Commerciali
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-100 hover:bg-purple-500/30">
                🏗️ Nuove Costruzioni
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-100 hover:bg-yellow-500/30">
                💰 Investimenti
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid with Glass Container */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <GlassCard className="p-6 rounded-3xl">
            <UnifiedPropertyGrid />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Properties;
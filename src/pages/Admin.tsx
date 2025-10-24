import React, { useState } from 'react';
import SimplePropertyManager from '@/components/admin/SimplePropertyManager';
import { DealflowManager } from '@/components/admin/DealflowManager';
import { RevenueTracker } from '@/components/admin/RevenueTracker';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, Database, Users, TreePine, Building2, Sparkles, Shield, Activity, ClipboardList, DollarSign } from 'lucide-react';

const AdminStatCard = ({ icon, title, stat, status }: { 
  icon: React.ReactNode; 
  title: string; 
  stat: string; 
  status: 'success' | 'warning' | 'error'; 
}) => {
  const statusColors = {
    success: 'bg-emerald-500/20 border-emerald-500/30',
    warning: 'bg-yellow-500/20 border-yellow-500/30',
    error: 'bg-red-500/20 border-red-500/30'
  };

  return (
    <GlassCard className={`interactive-card text-center p-6 ${statusColors[status]}`}>
      <div className="p-3 rounded-full bg-white/10 w-fit mx-auto mb-4">
        {icon}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{stat}</div>
      <div className="text-sm text-white/60">{title}</div>
    </GlassCard>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'dealflow' | 'revenue'>('properties');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-green-400/10 rounded-full blur-xl animate-float-slower" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-lime-400/10 rounded-full blur-xl animate-pulse-gentle" />
        <TreePine className="absolute top-1/4 right-1/4 w-16 h-16 text-emerald-400/20 animate-leaf-float" />
        <Building2 className="absolute bottom-1/4 left-1/4 w-12 h-12 text-emerald-400/15 animate-pulse-gentle" />
        <Settings className="absolute top-1/3 left-1/6 w-10 h-10 text-emerald-400/10 animate-wave" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3 animate-pulse-gentle" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                  Admin
                </span>
                <span className="text-emerald-400 ml-2">Panel</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed">
              Gestione completa della piattaforma Jungle Rent
              <br />
              <span className="text-emerald-400 font-medium">Dashboard di amministrazione</span>
            </p>

            {/* System Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <AdminStatCard 
                icon={<Database className="w-6 h-6 text-emerald-400" />}
                title="Database"
                stat="Online"
                status="success"
              />
              <AdminStatCard 
                icon={<Users className="w-6 h-6 text-blue-400" />}
                title="Utenti Attivi"
                stat="1,247"
                status="success"
              />
              <AdminStatCard 
                icon={<Activity className="w-6 h-6 text-purple-400" />}
                title="Sistema"
                stat="99.9%"
                status="success"
              />
              <AdminStatCard 
                icon={<Shield className="w-6 h-6 text-yellow-400" />}
                title="Sicurezza"
                stat="Alta"
                status="warning"
              />
            </div>

            {/* Quick Actions */}
            <GlassCard className="p-6 max-w-4xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Accesso Rapido</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer">
                  <Database className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-white font-semibold">Gestione Proprietà</h4>
                  <p className="text-white/60 text-sm">Aggiungi, modifica, elimina proprietà</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-pointer">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="text-white font-semibold">Gestione Utenti</h4>
                  <p className="text-white/60 text-sm">Amministra account e permessi</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-pointer">
                  <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-white font-semibold">Analytics</h4>
                  <p className="text-white/60 text-sm">Monitora performance e metriche</p>
                </div>
              </div>
            </GlassCard>

            {/* Permissions */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-100">
                🔐 Super Admin
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-100">
                📊 Analytics Access
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-100">
                🏠 Property Management
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-100">
                👥 User Management
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel with Glass Container */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setActiveTab('properties')}
              variant={activeTab === 'properties' ? 'default' : 'outline'}
              className="gap-2"
            >
              <Building2 size={16} />
              Property Management
            </Button>
            <Button
              onClick={() => setActiveTab('dealflow')}
              variant={activeTab === 'dealflow' ? 'default' : 'outline'}
              className="gap-2"
            >
              <ClipboardList size={16} />
              Dealflow
            </Button>
            <Button
              onClick={() => setActiveTab('revenue')}
              variant={activeTab === 'revenue' ? 'default' : 'outline'}
              className="gap-2"
            >
              <DollarSign size={16} />
              Revenue & Returns
            </Button>
          </div>
          
          <GlassCard className="p-6 rounded-3xl">
            {activeTab === 'properties' && <SimplePropertyManager />}
            {activeTab === 'dealflow' && <DealflowManager />}
            {activeTab === 'revenue' && <RevenueTracker />}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import { Building2, Users, TrendingUp } from "lucide-react";
import StatsCard from "@/components/invest/StatsCard";
import { useInvestmentStats } from "@/hooks/useInvestmentStats";
import { useInvestmentStatsSubscription } from "@/hooks/useInvestmentStatsSubscription";
import { useLanguage } from "@/contexts/LanguageContext";

export const StatsSection = () => {
  const { t } = useLanguage();
  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats
  } = useInvestmentStats();

  useInvestmentStatsSubscription(refetchStats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <StatsCard 
        title={t('totalProperties')} 
        value={statsLoading ? t('loading') : stats?.totalProperties.toString() || "0"} 
        icon={Building2} 
        trend="up" 
        className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
      />
      <StatsCard 
        title={t('averageROI')} 
        value={statsLoading ? t('loading') : stats?.averageRoi || "0%"} 
        icon={TrendingUp} 
        trend="up" 
        className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
      />
      <StatsCard 
        title={t('activeInvestors')} 
        value={statsLoading ? t('loading') : stats?.activeInvestors || "0"} 
        icon={Users} 
        trend="up" 
        className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
      />
    </div>
  );
};

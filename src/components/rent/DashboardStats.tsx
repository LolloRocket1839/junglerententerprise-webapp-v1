import { Clock, BellDot, Calendar, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  index: number;
}

const StatCard = ({ icon: Icon, label, value, index }: StatCardProps) => (
  <div
    className="glass-card p-4 sm:p-6 animate-fade-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
      <div className="p-2 sm:p-3 rounded-lg bg-primary/20">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </div>
      <div>
        <p className="text-white/60 text-xs sm:text-sm">{label}</p>
        <p className="text-white text-sm sm:text-base font-medium mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const DashboardStats = () => {
  const { language } = useLanguage();
  const t = (key: keyof typeof rentalTranslations.en) => {
    return rentalTranslations[language as keyof typeof rentalTranslations]?.[key] || rentalTranslations.en[key];
  };

  const stats = [
    {
      icon: Clock,
      label: t('nextHouseMeeting'),
      value: `${t('tomorrow')}, 18:00`,
    },
    {
      icon: BellDot,
      label: t('notifications'),
      value: `3 ${t('new')}`,
    },
    {
      icon: Calendar,
      label: t('nextEvent'),
      value: t('houseDinner'),
    },
    {
      icon: Home,
      label: t('roomStatus'),
      value: t('allGood'),
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} index={index} />
      ))}
    </div>
  );
};

export default DashboardStats;
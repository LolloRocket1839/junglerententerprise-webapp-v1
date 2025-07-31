import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TouchButton } from '@/components/mobile/TouchButton';
import { 
  User, 
  Bell, 
  Settings, 
  Shield,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeHeaderProps {
  profile: any;
  userType: string;
}

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buongiorno';
  if (hour < 18) return 'Buon pomeriggio';
  return 'Buonasera';
};

const getUserTypeLabel = (userType: string) => {
  switch (userType) {
    case 'student': return 'Studente';
    case 'investor': return 'Investitore';
    case 'tourist': return 'Viaggiatore';
    default: return 'Utente';
  }
};

const getVerificationStatus = (profile: any) => {
  if (profile.kyc_status === 'approved') {
    return {
      label: 'Verificato',
      icon: <CheckCircle className="w-4 h-4" />,
      variant: 'default' as const,
      color: 'text-green-600'
    };
  }
  if (profile.kyc_status === 'pending') {
    return {
      label: 'In Verifica',
      icon: <Clock className="w-4 h-4" />,
      variant: 'secondary' as const,
      color: 'text-orange-600'
    };
  }
  return {
    label: 'Da Verificare',
    icon: <AlertCircle className="w-4 h-4" />,
    variant: 'outline' as const,
    color: 'text-red-600'
  };
};

export function WelcomeHeader({ profile, userType }: WelcomeHeaderProps) {
  const navigate = useNavigate();
  const greeting = getTimeBasedGreeting();
  const userTypeLabel = getUserTypeLabel(userType);
  const verificationStatus = getVerificationStatus(profile);

  const initials = profile.first_name && profile.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : profile.first_name?.[0] || 'U';

  return (
    <motion.div
      className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-6 border border-primary/20"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/30">
            <AvatarImage src={profile.avatar_url} alt={profile.first_name} />
            <AvatarFallback className="bg-primary/20 text-primary font-semibold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {greeting}, {profile.first_name || 'Utente'}!
              </h1>
              <p className="text-muted-foreground">
                Benvenuto nella tua dashboard {userTypeLabel.toLowerCase()}
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-primary/10 border-primary/30">
                <User className="w-3 h-3 mr-1" />
                {userTypeLabel}
              </Badge>
              
              <Badge 
                variant={verificationStatus.variant}
                className={`${verificationStatus.color} border-current/30`}
              >
                {verificationStatus.icon}
                <span className="ml-1">{verificationStatus.label}</span>
              </Badge>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <TouchButton
            variant="ghost"
            size="sm"
            icon={<Bell className="h-4 w-4" />}
            onClick={() => {}}
            className="relative"
          >
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </TouchButton>
          
          <TouchButton
            variant="ghost"
            size="sm"
            icon={<Settings className="h-4 w-4" />}
            onClick={() => navigate('/dashboard')}
          >
            ""
          </TouchButton>
        </div>
      </div>

      {profile.kyc_status !== 'approved' && (
        <motion.div
          className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-orange-800 dark:text-orange-200">
            <Shield className="h-4 w-4" />
            <span>
              Completa la verifica del profilo per accedere a tutte le funzionalità
            </span>
            <TouchButton
              size="sm"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="ml-auto"
            >
              Verifica Ora
            </TouchButton>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
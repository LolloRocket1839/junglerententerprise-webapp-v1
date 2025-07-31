import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { TouchButton } from '@/components/mobile/TouchButton';
import { 
  Award, 
  Star, 
  Trophy, 
  Target,
  X,
  Coins,
  Zap
} from 'lucide-react';

interface AchievementBannerProps {
  profile: any;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  coins: number;
  unlocked: boolean;
  type: 'daily' | 'milestone' | 'special';
}

const bannerVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.5
    }
  })
};

export function AchievementBanner({ profile }: AchievementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  // Mock achievements based on profile state
  const getActiveAchievements = (): Achievement[] => {
    const achievements: Achievement[] = [
      {
        id: 'welcome',
        title: 'Benvenuto su Jungle!',
        description: 'Primo accesso completato',
        icon: <Star className="h-5 w-5" />,
        progress: 100,
        maxProgress: 100,
        coins: 50,
        unlocked: true,
        type: 'milestone'
      },
      {
        id: 'profile_completion',
        title: 'Profilo Completo',
        description: 'Completa tutte le informazioni del profilo',
        icon: <Target className="h-5 w-5" />,
        progress: profile.kyc_status === 'approved' ? 100 : 60,
        maxProgress: 100,
        coins: 100,
        unlocked: profile.kyc_status === 'approved',
        type: 'milestone'
      },
      {
        id: 'daily_login',
        title: 'Accesso Giornaliero',
        description: 'Accedi per 3 giorni consecutivi',
        icon: <Zap className="h-5 w-5" />,
        progress: 1,
        maxProgress: 3,
        coins: 25,
        unlocked: false,
        type: 'daily'
      }
    ];

    // Show only active (not fully completed) achievements or newly unlocked ones
    return achievements.filter(achievement => 
      achievement.progress < achievement.maxProgress || 
      (achievement.unlocked && achievement.progress === achievement.maxProgress)
    ).slice(0, 1); // Show only one at a time
  };

  const achievements = getActiveAchievements();

  if (dismissed || achievements.length === 0) {
    return null;
  }

  const achievement = achievements[0];
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'daily': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'milestone': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'special': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      default: return 'from-primary/20 to-primary-light/20 border-primary/30';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`relative bg-gradient-to-r ${getAchievementColor(achievement.type)} rounded-2xl p-4 border overflow-hidden`}
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  {achievement.title}
                  {achievement.unlocked && (
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700 border-yellow-400/30">
                <Coins className="w-3 h-3 mr-1" />
                +{achievement.coins}
              </Badge>
              
              <TouchButton
                variant="ghost"
                size="sm"
                icon={<X className="h-3 w-3" />}
                onClick={() => setDismissed(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                ""
              </TouchButton>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">
                Progresso: {achievement.progress}/{achievement.maxProgress}
              </span>
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            <div className="h-2 bg-background/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                custom={progressPercentage}
              />
            </div>
          </div>

          {achievement.unlocked && (
            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Badge variant="default" className="bg-green-500/20 text-green-700 border-green-400/30">
                <Award className="w-3 h-3 mr-1" />
                Achievement Sbloccato!
              </Badge>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { ContextualCard } from './ContextualCard';
import { QuickActions } from './QuickActions';
import { ActivityFeed } from './ActivityFeed';
import { AchievementBanner } from './AchievementBanner';
import { WelcomeHeader } from './WelcomeHeader';

interface SmartDashboardProps {
  userType?: string;
  userState?: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export function SmartDashboard({ userType, userState }: SmartDashboardProps) {
  const { session } = useAuth();
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session || !profile) {
    return null;
  }

  const currentUserType = userType || profile.user_type;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-6 space-y-6">
        <motion.div variants={itemVariants}>
          <WelcomeHeader profile={profile} userType={currentUserType} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <AchievementBanner profile={profile} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <QuickActions userType={currentUserType} profile={profile} />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <ContextualCard
            userType={currentUserType}
            profile={profile}
            cardType="primary"
          />
          <ContextualCard
            userType={currentUserType}
            profile={profile}
            cardType="secondary"
          />
          <ContextualCard
            userType={currentUserType}
            profile={profile}
            cardType="tertiary"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ActivityFeed userType={currentUserType} />
        </motion.div>
      </div>
    </motion.div>
  );
}
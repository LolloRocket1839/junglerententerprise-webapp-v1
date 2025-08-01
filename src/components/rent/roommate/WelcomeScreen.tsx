import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { ClipboardCheck, Users, MessageSquare } from "lucide-react";
import { SuccessStories } from './SuccessStories';
import { PlatformStats } from './PlatformStats';
import { useLanguage } from '@/contexts/LanguageContext';

interface WelcomeScreenProps {
  onStart: () => void;
  onViewMatches: () => void;
}

const WelcomeScreen = ({ onStart, onViewMatches }: WelcomeScreenProps) => {
  const { t } = useLanguage();
  
  const steps = [
    { icon: <ClipboardCheck className="w-5 h-5" />, text: t('shortQuiz') },
    { icon: <Users className="w-5 h-5" />, text: t('seeMatches') },
    { icon: <MessageSquare className="w-5 h-5" />, text: t('connect') }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Platform Stats */}
      <PlatformStats />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white"
            >
              {t('roommateTitle')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80"
            >
              {t('roommateSubtitle')}
            </motion.p>
          </motion.div>
          
          <SuccessStories />
        </div>
        
        <div className="space-y-6">

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4"
          >
            <Button 
              onClick={onStart}
              className="glass-button bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              {t('startQuiz')}
            </Button>
            <Button 
              onClick={onViewMatches}
              variant="outline"
              size="lg"
              className="glass-button"
            >
              {t('viewMatches')}
            </Button>
          </motion.div>

          <div className="text-center p-6 glass-premium rounded-lg">
            <h4 className="font-semibold text-white mb-2">{t('quickStartGuide')}</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>{t('step1')}</p>
              <p>{t('step2')}</p>
              <p>{t('step3')}</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-white">3 {t('quickStartGuide')}</h3>
            <div className="grid grid-cols-1 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium text-white">{step.text}</span>
                </motion.div>
              ))}
            </div>
            <Progress value={0} className="h-2" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
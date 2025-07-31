import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TouchCard } from '@/components/mobile/TouchCard';
import { TouchButton } from '@/components/mobile/TouchButton';
import { 
  Home, 
  Building2, 
  Palmtree, 
  TrendingUp, 
  Users, 
  Star,
  MapPin,
  Calendar,
  Coins,
  Award,
  Bell,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ContextualCardProps {
  userType: string;
  profile: any;
  cardType: 'primary' | 'secondary' | 'tertiary';
}

interface CardContent {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  action: string;
  onClick: () => void;
  gradient: string;
  urgency?: string;
}

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export function ContextualCard({ userType, profile, cardType }: ContextualCardProps) {
  const navigate = useNavigate();

  const getCardContent = (): CardContent => {
    switch (userType) {
      case 'student':
        return getStudentCardContent();
      case 'investor':
        return getInvestorCardContent();
      case 'tourist':
        return getTouristCardContent();
      default:
        return getDefaultCardContent();
    }
  };

  const getStudentCardContent = () => {
    switch (cardType) {
      case 'primary':
        return {
          icon: <Home className="h-6 w-6" />,
          title: 'Trova Casa',
          description: 'Scopri alloggi perfetti per studenti',
          value: '15+ proprietà disponibili',
          action: 'Cerca Ora',
          onClick: () => navigate('/rent'),
          gradient: 'from-primary to-primary-light',
          urgency: profile.kyc_status !== 'approved' ? 'Completa profilo per sconti' : undefined
        };
      case 'secondary':
        return {
          icon: <Users className="h-6 w-6" />,
          title: 'Coinquilini',
          description: 'Trova coinquilini compatibili',
          value: 'Match intelligente',
          action: 'Inizia Quiz',
          onClick: () => navigate('/rent?tab=roommate'),
          gradient: 'from-secondary to-secondary/80'
        };
      case 'tertiary':
        return {
          icon: <Coins className="h-6 w-6" />,
          title: 'JungleCoins',
          description: 'Guadagna completando azioni',
          value: '120 coins disponibili',
          action: 'Scopri Come',
          onClick: () => {},
          gradient: 'from-accent to-accent/80'
        };
    }
  };

  const getInvestorCardContent = () => {
    switch (cardType) {
      case 'primary':
        return {
          icon: <TrendingUp className="h-6 w-6" />,
          title: 'Portfolio',
          description: 'Il tuo rendimento annuale',
          value: '8.4% APY',
          action: 'Vedi Dettagli',
          onClick: () => navigate('/invest'),
          gradient: 'from-primary to-primary-light'
        };
      case 'secondary':
        return {
          icon: <Building2 className="h-6 w-6" />,
          title: 'Nuove Opportunità',
          description: 'Investimenti disponibili',
          value: '3 proprietà',
          action: 'Esplora',
          onClick: () => navigate('/invest'),
          gradient: 'from-secondary to-secondary/80'
        };
      case 'tertiary':
        return {
          icon: <Award className="h-6 w-6" />,
          title: 'Stato KYC',
          description: profile.kyc_status === 'approved' ? 'Verificato' : 'In attesa',
          value: profile.kyc_status === 'approved' ? '✓ Completo' : 'Documenti richiesti',
          action: profile.kyc_status === 'approved' ? 'Gestisci' : 'Completa',
          onClick: () => navigate('/dashboard'),
          gradient: 'from-accent to-accent/80'
        };
    }
  };

  const getTouristCardContent = () => {
    switch (cardType) {
      case 'primary':
        return {
          icon: <Palmtree className="h-6 w-6" />,
          title: 'Prossimo Viaggio',
          description: 'Pianifica la tua vacanza',
          value: 'Destinazioni uniche',
          action: 'Prenota',
          onClick: () => navigate('/stay'),
          gradient: 'from-primary to-primary-light'
        };
      case 'secondary':
        return {
          icon: <MapPin className="h-6 w-6" />,
          title: 'Esplora',
          description: 'Scopri nuove destinazioni',
          value: '25+ città',
          action: 'Vedi Tutte',
          onClick: () => navigate('/stay'),
          gradient: 'from-secondary to-secondary/80'
        };
      case 'tertiary':
        return {
          icon: <Star className="h-6 w-6" />,
          title: 'Le Tue Recensioni',
          description: 'Condividi esperienze',
          value: '0 recensioni',
          action: 'Scrivi',
          onClick: () => {},
          gradient: 'from-accent to-accent/80'
        };
    }
  };

  const getDefaultCardContent = () => ({
    icon: <Bell className="h-6 w-6" />,
    title: 'Inizia',
    description: 'Scegli il tuo percorso',
    value: 'Studente, Investitore o Turista',
    action: 'Scegli',
    onClick: () => navigate('/auth'),
    gradient: 'from-muted to-muted/80'
  });

  const content = getCardContent();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <TouchCard
        className={`relative overflow-hidden border-0 bg-gradient-to-br ${content.gradient} text-white hover:shadow-lg transition-all duration-300`}
        onClick={content.onClick}
        pressable
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {content.icon}
              </div>
              <div>
                <CardTitle className="text-lg text-white">{content.title}</CardTitle>
                <CardDescription className="text-white/80 text-sm">
                  {content.description}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            {content.urgency && (
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-100 border-orange-400/30">
                <Bell className="w-3 h-3 mr-1" />
                {content.urgency}
              </Badge>
            )}
            
            <div className="text-xl font-bold text-white">
              {content.value}
            </div>
            
            <TouchButton
              variant="secondary"
              size="sm"
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={(e) => {
                e.stopPropagation();
                content.onClick();
              }}
            >
              {content.action}
            </TouchButton>
          </div>
        </CardContent>
      </TouchCard>
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { TouchButton } from '@/components/mobile/TouchButton';
import { 
  Search, 
  Building2, 
  Users, 
  Palmtree, 
  TrendingUp,
  Camera,
  MessageCircle,
  Plus,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  userType: string;
  profile: any;
}

const actionVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: i * 0.1
    }
  })
};

export function QuickActions({ userType, profile }: QuickActionsProps) {
  const navigate = useNavigate();

  const getQuickActions = () => {
    switch (userType) {
      case 'student':
        return [
          {
            icon: <Search className="h-5 w-5" />,
            label: 'Cerca Casa',
            onClick: () => navigate('/rent'),
            primary: true
          },
          {
            icon: <Users className="h-5 w-5" />,
            label: 'Coinquilini',
            onClick: () => navigate('/rent?tab=roommate')
          },
          {
            icon: <Camera className="h-5 w-5" />,
            label: 'Documenti',
            onClick: () => navigate('/dashboard')
          },
          {
            icon: <MessageCircle className="h-5 w-5" />,
            label: 'Chat',
            onClick: () => {}
          }
        ];
      case 'investor':
        return [
          {
            icon: <TrendingUp className="h-5 w-5" />,
            label: 'Portfolio',
            onClick: () => navigate('/invest'),
            primary: true
          },
          {
            icon: <Building2 className="h-5 w-5" />,
            label: 'Investi',
            onClick: () => navigate('/invest')
          },
          {
            icon: <Star className="h-5 w-5" />,
            label: 'Analisi',
            onClick: () => navigate('/invest')
          },
          {
            icon: <Plus className="h-5 w-5" />,
            label: 'KYC',
            onClick: () => navigate('/dashboard')
          }
        ];
      case 'tourist':
        return [
          {
            icon: <Palmtree className="h-5 w-5" />,
            label: 'Prenota',
            onClick: () => navigate('/stay'),
            primary: true
          },
          {
            icon: <Search className="h-5 w-5" />,
            label: 'Esplora',
            onClick: () => navigate('/stay')
          },
          {
            icon: <Star className="h-5 w-5" />,
            label: 'Recensioni',
            onClick: () => {}
          },
          {
            icon: <Camera className="h-5 w-5" />,
            label: 'Profilo',
            onClick: () => navigate('/dashboard')
          }
        ];
      default:
        return [
          {
            icon: <Search className="h-5 w-5" />,
            label: 'Esplora',
            onClick: () => navigate('/'),
            primary: true
          }
        ];
    }
  };

  const actions = getQuickActions();

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Azioni Rapide</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            variants={actionVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <TouchButton
              variant={action.primary ? "default" : "outline"}
              size="lg"
              fullWidth
              icon={action.icon}
              onClick={action.onClick}
              className="h-20 flex-col gap-2"
            >
              {action.label}
            </TouchButton>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
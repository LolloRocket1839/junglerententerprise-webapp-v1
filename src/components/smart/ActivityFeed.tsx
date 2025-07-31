import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TouchCard } from '@/components/mobile/TouchCard';
import { 
  Bell, 
  Home, 
  TrendingUp, 
  Users, 
  Star,
  Calendar,
  Coins,
  MessageCircle,
  Award,
  CheckCircle
} from 'lucide-react';

interface ActivityFeedProps {
  userType: string;
}

interface Activity {
  id: string;
  type: 'notification' | 'achievement' | 'transaction' | 'match' | 'booking';
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  action?: () => void;
  coins?: number;
}

const activityVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: i * 0.1
    }
  })
};

export function ActivityFeed({ userType }: ActivityFeedProps) {
  const getActivities = (): Activity[] => {
    const baseActivities: Activity[] = [
      {
        id: '1',
        type: 'achievement',
        icon: <Award className="h-5 w-5" />,
        title: 'Primo Accesso!',
        description: 'Benvenuto su Jungle Rent',
        time: '2 min',
        priority: 'high',
        coins: 50
      },
      {
        id: '2',
        type: 'notification',
        icon: <Bell className="h-5 w-5" />,
        title: 'Completa il tuo profilo',
        description: 'Aggiungi foto e documenti per sconti esclusivi',
        time: '1 ora',
        priority: 'medium'
      }
    ];

    switch (userType) {
      case 'student':
        return [
          ...baseActivities,
          {
            id: '3',
            type: 'match',
            icon: <Users className="h-5 w-5" />,
            title: 'Nuovo match coinquilino',
            description: 'Sara ha il 95% di compatibilità con te',
            time: '3 ore',
            priority: 'high'
          },
          {
            id: '4',
            type: 'notification',
            icon: <Home className="h-5 w-5" />,
            title: '5 nuove case disponibili',
            description: 'Trova la tua casa ideale vicino alla Bocconi',
            time: '1 giorno',
            priority: 'medium'
          }
        ];
      case 'investor':
        return [
          ...baseActivities,
          {
            id: '3',
            type: 'transaction',
            icon: <TrendingUp className="h-5 w-5" />,
            title: 'Dividendo ricevuto',
            description: '+€125 dal tuo portfolio immobiliare',
            time: '2 ore',
            priority: 'high'
          },
          {
            id: '4',
            type: 'notification',
            icon: <Bell className="h-5 w-5" />,
            title: 'Nuova opportunità',
            description: 'Investimento da €10k con 9.2% APY disponibile',
            time: '5 ore',
            priority: 'high'
          }
        ];
      case 'tourist':
        return [
          ...baseActivities,
          {
            id: '3',
            type: 'booking',
            icon: <Calendar className="h-5 w-5" />,
            title: 'Prenotazione confermata',
            description: 'Villa a Tuscany per il 15-22 Agosto',
            time: '1 ora',
            priority: 'high'
          },
          {
            id: '4',
            type: 'notification',
            icon: <Star className="h-5 w-5" />,
            title: 'Lascia una recensione',
            description: 'Come è stato il tuo soggiorno a Roma?',
            time: '2 giorni',
            priority: 'medium'
          }
        ];
      default:
        return baseActivities;
    }
  };

  const activities = getActivities();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'transaction': return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'match': return 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-500/30';
      case 'booking': return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      default: return 'bg-muted/50 border-border';
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Attività Recenti
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            variants={activityVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <TouchCard
              className={`p-4 ${getActivityColor(activity.type)} hover:shadow-md transition-all duration-200`}
              onClick={activity.action}
              pressable={!!activity.action}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getPriorityColor(activity.priority)} bg-background/80`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">
                      {activity.title}
                    </h4>
                    {activity.coins && (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700 border-yellow-400/30">
                        <Coins className="w-3 h-3 mr-1" />
                        +{activity.coins}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.description}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {activity.time} fa
                  </span>
                </div>
                {activity.type === 'achievement' && (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                )}
              </div>
            </TouchCard>
          </motion.div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna attività recente</p>
            <p className="text-sm">Le tue attività appariranno qui</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
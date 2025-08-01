import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowRight, Lightbulb, Users, Home, Zap } from 'lucide-react';

interface SmartRecommendationProps {
  type: 'roommate-suggestion' | 'property-match' | 'price-alert' | 'location-tip';
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
  priority?: 'low' | 'medium' | 'high';
}

const SmartRecommendation = ({ 
  type, 
  title, 
  description, 
  action, 
  onAction, 
  priority = 'medium' 
}: SmartRecommendationProps) => {
  const getIcon = () => {
    switch (type) {
      case 'roommate-suggestion': return <Users className="w-5 h-5" />;
      case 'property-match': return <Home className="w-5 h-5" />;
      case 'price-alert': return <Zap className="w-5 h-5" />;
      case 'location-tip': return <Lightbulb className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'from-red-500/20 to-orange-500/20 border-red-500/30';
      case 'medium': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'low': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      default: return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
    }
  };

  return (
    <GlassCard className={`p-4 bg-gradient-to-r ${getPriorityColor()} hover:scale-105 transition-all duration-300`}>
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-full bg-white/10">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
          <p className="text-white/70 text-xs mb-3">{description}</p>
          {action && onAction && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={onAction}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
            >
              {action}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>
        {priority === 'high' && (
          <Badge className="bg-red-500/20 text-red-100 text-xs">Urgente</Badge>
        )}
      </div>
    </GlassCard>
  );
};

interface SmartRecommendationsProps {
  searchContext?: any;
  userPreferences?: any;
}

export const SmartRecommendations = ({ searchContext, userPreferences }: SmartRecommendationsProps) => {
  const recommendations = [
    {
      type: 'roommate-suggestion' as const,
      title: 'Trova prima un coinquilino',
      description: 'Stai cercando casa condivisa? Trova prima il coinquilino perfetto!',
      action: 'Inizia Matching',
      priority: 'high' as const,
      onAction: () => console.log('Navigate to roommate finder')
    },
    {
      type: 'price-alert' as const,
      title: 'Prezzo ottimale trovato',
      description: 'Abbiamo trovato 3 case nel tuo budget in zona universitaria',
      action: 'Visualizza',
      priority: 'medium' as const,
      onAction: () => console.log('Show price matches')
    },
    {
      type: 'location-tip' as const,
      title: 'Zona consigliata',
      description: 'Porta Romana: 15 min dall\'università, vita notturna attiva',
      priority: 'low' as const
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-400" />
        <h3 className="text-white font-semibold">Suggerimenti AI</h3>
      </div>
      
      {recommendations.map((rec, index) => (
        <SmartRecommendation
          key={index}
          {...rec}
        />
      ))}
    </div>
  );
};
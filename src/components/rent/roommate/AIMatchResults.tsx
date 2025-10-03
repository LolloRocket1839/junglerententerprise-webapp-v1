import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Sparkles, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { AIMatch } from '@/hooks/useAIRoommateMatching';
import { useNavigate } from 'react-router-dom';

interface AIMatchResultsProps {
  matches: AIMatch[];
  isLoading: boolean;
}

export const AIMatchResults: React.FC<AIMatchResultsProps> = ({ matches, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="glass-card p-12 text-center animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Sparkles className="w-16 h-16 text-primary animate-pulse-gentle" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-gentle" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              🧠 AI sta analizzando...
            </h3>
            <p className="text-white/70">
              Stiamo usando l'intelligenza artificiale per trovare i tuoi match perfetti
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <p className="text-white/70">Nessun match trovato al momento</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Match AI ({matches.length})
        </h2>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          Powered by Gemini 2.5
        </Badge>
      </div>

      <div className="grid gap-6">
        {matches.map((match, index) => (
          <Card 
            key={match.profileId}
            className="glass-card p-6 hover:-translate-y-1 transition-all duration-[350ms] shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)] hover:shadow-[0_16px_32px_hsl(0_0%_0%_/_0.16)]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Match Score */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {match.matchScore}%
                    </span>
                  </div>
                  {match.matchScore >= 80 && (
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {match.profile.first_name} {match.profile.last_name}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {match.profile.current_city} • Budget: €{match.profile.budget_min}-{match.profile.budget_max}
                  </p>
                </div>
              </div>
              <Badge 
                variant={match.matchScore >= 80 ? "default" : match.matchScore >= 60 ? "secondary" : "outline"}
                className="ml-2"
              >
                {match.matchScore >= 80 ? "🔥 Match Eccellente" : 
                 match.matchScore >= 60 ? "✨ Buon Match" : "👍 Match Potenziale"}
              </Badge>
            </div>

            {/* AI Analysis */}
            <div className="space-y-4">
              {/* Compatibility Areas */}
              {match.compatibilityAreas.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">Compatibilità:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.compatibilityAreas.map((area, i) => (
                      <Badge key={i} variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Reasons */}
              {match.reasons.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-white">Perché è un buon match:</span>
                  </div>
                  <ul className="space-y-1">
                    {match.reasons.map((reason, i) => (
                      <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concerns */}
              {match.concerns.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-white">Da considerare:</span>
                  </div>
                  <ul className="space-y-1">
                    {match.concerns.map((concern, i) => (
                      <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button 
                className="flex-1 luxury-button"
                onClick={() => navigate(`/dashboard?tab=chat&match=${match.profileId}`)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Inizia Chat
              </Button>
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => navigate(`/rent?profile=${match.profileId}`)}
              >
                Vedi Profilo
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

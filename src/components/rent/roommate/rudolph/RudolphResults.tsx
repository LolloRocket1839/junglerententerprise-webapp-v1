import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trophy, Share2, RefreshCw } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface Props {
  score: number;
}

interface Personality {
  name: string;
  description: string;
  special_power: string;
  quote: string;
}

const RudolphResults = ({ score }: Props) => {
  const [personality, setPersonality] = useState<Personality | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPersonality();
  }, [score]);

  const loadPersonality = async () => {
    try {
      const { data, error } = await supabase
        .from('rudolph_personalities')
        .select('*')
        .lte('max_score', score)
        .gte('min_score', score)
        .single();

      if (error) throw error;
      setPersonality(data);
    } catch (error) {
      toast({
        title: "Error loading personality",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (!personality) return;
    
    const text = `I just discovered my Rudolph Personality: ${personality.name}! My Rudolph score is ${score.toFixed(1)}R 🦌✨`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Rudolph Personality',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Share your results with friends",
      });
    }
  };

  if (!personality) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <Trophy className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-white">{personality.name}</h2>
        <p className="text-lg text-white/80">Score: {score.toFixed(1)}R</p>
      </div>

      <div className="space-y-4 text-center">
        <p className="text-lg text-white/80">{personality.description}</p>
        <p className="text-primary font-medium">{personality.special_power}</p>
        <p className="italic text-white/60">"{personality.quote}"</p>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={handleShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Results
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Play Again
        </Button>
      </div>

      <div className="text-center text-sm text-white/40 space-y-1">
        <p>No Rudolphs were harmed in the measurement process</p>
        <p>Any resemblance to actual logic is purely coincidental</p>
        <p>Rudolph measurements are non-transferable and void where prohibited by physics</p>
      </div>
    </Card>
  );
};

export default RudolphResults;

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import QuestionPool from "./QuestionPool";
import RoommateProfileGrid from "./RoommateProfileGrid";
import WelcomeScreen from "./WelcomeScreen";
import { AIMatchResults } from "./AIMatchResults";
import { useProfile } from "@/hooks/useProfile";
import { useAIRoommateMatching } from "@/hooks/useAIRoommateMatching";
import { useTemporaryProfile } from "@/hooks/useTemporaryProfile";
import { useLanguage } from "@/contexts/LanguageContext";

type View = "welcome" | "questions" | "matches" | "ai-matches";

const RoommateFinder = () => {
  const [currentView, setCurrentView] = useState<View>("welcome");
  const { toast } = useToast();
  const { t } = useLanguage();

  const { data: profile } = useProfile();
  const { tempProfile } = useTemporaryProfile();
  const { matches, isLoading, findMatches } = useAIRoommateMatching();

  const handleStart = () => {
    setCurrentView("questions");
  };

  const handleViewMatches = () => {
    setCurrentView("matches");
  };

  const handleAIMatching = async () => {
    const profileId = profile?.id || tempProfile?.tempId;
    if (!profileId) {
      toast({
        title: t('rentalTranslations.profileRequired'),
        description: t('rentalTranslations.completeProfileForAI'),
        variant: "destructive"
      });
      return;
    }
    
    setCurrentView("ai-matches");
    await findMatches(profileId, !profile?.id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* AI Matching Button - Always visible */}
      {currentView !== "welcome" && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setCurrentView("welcome")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            ← {t('rentalTranslations.backToStart')}
          </Button>
          <Button
            onClick={handleAIMatching}
            className="luxury-button bg-gradient-to-r from-primary to-primary/80"
            disabled={isLoading}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isLoading ? t('rentalTranslations.aiAnalyzing') : `🧠 ${t('rentalTranslations.aiMatch')}`}
          </Button>
        </div>
      )}

      {currentView === "welcome" && (
        <WelcomeScreen 
          onStart={handleStart} 
          onViewMatches={handleViewMatches} 
        />
      )}
      {currentView === "questions" && <QuestionPool />}
      {currentView === "matches" && <RoommateProfileGrid />}
      {currentView === "ai-matches" && (
        <AIMatchResults matches={matches} isLoading={isLoading} />
      )}
    </div>
  );
};

export default RoommateFinder;

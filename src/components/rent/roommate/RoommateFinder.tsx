
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import QuestionPool from "./QuestionPool";
import RoommateProfileGrid from "./RoommateProfileGrid";
import WelcomeScreen from "./WelcomeScreen";
import { AIMatchResults } from "./AIMatchResults";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useAIRoommateMatching } from "@/hooks/useAIRoommateMatching";

type View = "welcome" | "questions" | "matches" | "ai-matches";

const RoommateFinder = () => {
  const [currentView, setCurrentView] = useState<View>("welcome");
  const { toast } = useToast();

  const { session } = useAuth();
  const { data: profile } = useProfile();
  const { matches, isLoading, findMatches } = useAIRoommateMatching();

  const handleStart = () => {
    if (!session) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to start the questionnaire.",
        variant: "destructive"
      });
      return;
    }
    setCurrentView("questions");
  };

  const handleViewMatches = () => {
    if (!session) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to view your matches.",
        variant: "destructive"
      });
      return;
    }
    setCurrentView("matches");
  };

  const handleAIMatching = async () => {
    if (!session || !profile?.id) {
      toast({
        title: "Profilo Richiesto",
        description: "Completa il tuo profilo per usare l'AI matching.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentView("ai-matches");
    await findMatches(profile.id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {!session && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-500">Please sign in to access all roommate matching features.</p>
        </div>
      )}

      {session && !profile && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-500">Please complete your profile to start matching with roommates.</p>
        </div>
      )}

      {session && profile && (
        <>
          {/* AI Matching Button - Always visible */}
          {currentView !== "welcome" && (
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setCurrentView("welcome")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                ← Torna all'inizio
              </Button>
              <Button
                onClick={handleAIMatching}
                className="luxury-button bg-gradient-to-r from-primary to-primary/80"
                disabled={isLoading}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isLoading ? "Analisi AI in corso..." : "🧠 Match con AI"}
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
        </>
      )}
    </div>
  );
};

export default RoommateFinder;

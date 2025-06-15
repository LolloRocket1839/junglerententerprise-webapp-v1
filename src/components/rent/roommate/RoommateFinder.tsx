
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import QuestionPool from "./QuestionPool";
import RoommateProfileGrid from "./RoommateProfileGrid";
import WelcomeScreen from "./WelcomeScreen";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

type View = "welcome" | "questions" | "matches";

const RoommateFinder = () => {
  const [currentView, setCurrentView] = useState<View>("welcome");
  const { toast } = useToast();

  const { session } = useAuth();
  const { data: profile } = useProfile();

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
          {currentView === "welcome" && (
            <WelcomeScreen 
              onStart={handleStart} 
              onViewMatches={handleViewMatches} 
            />
          )}
          {currentView === "questions" && <QuestionPool />}
          {currentView === "matches" && <RoommateProfileGrid />}
        </>
      )}
    </div>
  );
};

export default RoommateFinder;

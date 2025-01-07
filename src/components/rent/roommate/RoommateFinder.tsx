import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import QuestionPool from "./QuestionPool";
import RoommateProfileGrid from "./RoommateProfileGrid";
import WelcomeScreen from "./WelcomeScreen";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type View = "welcome" | "questions" | "matches";

const RoommateFinder = () => {
  const [currentView, setCurrentView] = useState<View>("welcome");
  const { toast } = useToast();

  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session error:', error);
        toast({
          title: "Authentication Error",
          description: "Please sign in to access all features.",
          variant: "destructive"
        });
        throw error;
      }
      return session;
    }
  });

  const { data: profile } = useQuery({
    queryKey: ['user-profile', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();

      if (error) {
        console.error('Profile error:', error);
        toast({
          title: "Profile Error",
          description: "Unable to load your profile. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
      return data;
    }
  });

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
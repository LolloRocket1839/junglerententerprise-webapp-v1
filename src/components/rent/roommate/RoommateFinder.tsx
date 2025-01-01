import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import QuestionPool from "./QuestionPool";
import RoommateProfileGrid from "./RoommateProfileGrid";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type View = "questions" | "matches";

const RoommateFinder = () => {
  const [currentView, setCurrentView] = useState<View>("matches");
  const { toast } = useToast();

  // Verify database connection and auth status
  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
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

  // Check if user has a profile
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Find Your Perfect Roommate</h2>
          <p className="text-white/60">Answer questions and match with compatible roommates</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={currentView === "questions" ? "default" : "outline"}
            onClick={() => setCurrentView("questions")}
            className="gap-2"
          >
            <ClipboardCheck className="w-4 h-4" />
            Questionnaire
          </Button>
          <Button
            variant={currentView === "matches" ? "default" : "outline"}
            onClick={() => setCurrentView("matches")}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            View Matches
          </Button>
        </div>
      </div>

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
          {currentView === "questions" && <QuestionPool />}
          {currentView === "matches" && <RoommateProfileGrid />}
        </>
      )}
    </div>
  );
};

export default RoommateFinder;
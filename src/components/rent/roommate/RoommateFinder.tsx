import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import RoommateProfile from "./RoommateProfile";
import QuestionPool from "./QuestionPool";
import RoommateProfileGrid from "./RoommateProfileGrid";
import { MixAndMatch } from "./MixAndMatch";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Users, Brain } from "lucide-react";
import NeuralMatch from "./neural/NeuralMatch";

type View = "questions" | "matches" | "neural";

const RoommateFinder = () => {
  const [currentView, setCurrentView] = useState<View>("matches");
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Find Your Roommate</h2>
        <div className="flex gap-2">
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
          <Button
            variant={currentView === "neural" ? "default" : "outline"}
            onClick={() => setCurrentView("neural")}
            className="gap-2"
          >
            <Brain className="w-4 h-4" />
            Neural Match
          </Button>
        </div>
      </div>

      {currentView === "questions" && <QuestionPool />}
      {currentView === "matches" && <RoommateProfileGrid />}
      {currentView === "neural" && <NeuralMatch />}
    </div>
  );
};

export default RoommateFinder;
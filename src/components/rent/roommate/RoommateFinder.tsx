import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import RoommateProfile from "./RoommateProfile";
import QuestionPool from "./QuestionPool";
import RudolphGame from "./rudolph/RudolphGame";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Users, Scale } from "lucide-react";

type View = "questions" | "matches" | "rudolph";

const RoommateFinder = () => {
  const [currentView, setCurrentView] = useState<View>("questions");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  const handleAccept = (id: string) => {
    toast({
      title: "Match Request Sent!",
      description: "We'll notify you when they respond.",
    });
    showNextProfile();
  };

  const handleReject = (id: string) => {
    showNextProfile();
  };

  const handleMessage = (id: string) => {
    toast({
      title: "Coming Soon",
      description: "The messaging feature will be available soon!",
    });
  };

  const showNextProfile = () => {
    if (currentIndex < MOCK_PROFILES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      toast({
        title: "No More Profiles",
        description: "You've seen all available profiles. Check back later!",
      });
    }
  };

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
            variant={currentView === "rudolph" ? "default" : "outline"}
            onClick={() => setCurrentView("rudolph")}
            className="gap-2"
          >
            <Scale className="w-4 h-4" />
            Rudolph Game
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

      {currentView === "questions" && <QuestionPool />}
      
      {currentView === "rudolph" && <RudolphGame />}
      
      {currentView === "matches" && (
        <div className="p-6">
          {currentIndex >= MOCK_PROFILES.length ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <h3 className="text-xl font-semibold text-white mb-2">No More Profiles</h3>
              <p className="text-white/60">Check back later for new potential roommates!</p>
            </div>
          ) : (
            <RoommateProfile
              profile={MOCK_PROFILES[currentIndex]}
              onAccept={handleAccept}
              onReject={handleReject}
              onMessage={handleMessage}
            />
          )}
        </div>
      )}
    </div>
  );
};

// Mock data - In a real app, this would come from your backend
const MOCK_PROFILES = [
  {
    id: "1",
    name: "Sarah Chen",
    age: 22,
    occupation: "Computer Science Student",
    bio: "Looking for a quiet roommate who enjoys occasional movie nights. I'm clean, organized, and respect personal space.",
    interests: ["Reading", "Coding", "Hiking", "Photography"],
    matchScore: 95,
    badges: ["Early Bird", "Clean Champion", "Quiet Zone"],
  },
  {
    id: "2",
    name: "Marco Silva",
    age: 23,
    occupation: "Design Student",
    bio: "Creative soul seeking like-minded roommates. I love cooking and sharing meals. Always up for good conversations!",
    interests: ["Art", "Cooking", "Music", "Travel"],
    matchScore: 88,
    badges: ["Chef Master", "Social Butterfly", "Night Owl"],
  },
];

export default RoommateFinder;
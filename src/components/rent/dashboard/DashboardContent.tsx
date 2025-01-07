import { View } from "./DashboardSidebar";
import RoommateFinder from "../roommate/RoommateFinder";
import { MixAndMatch } from "../roommate/MixAndMatch";
import QuestionPool from "../QuestionPool";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Brain, UserPlus } from "lucide-react";

interface DashboardContentProps {
  activeView: View;
  isEmailVerified: boolean;
}

const DashboardContent = ({ activeView, isEmailVerified }: DashboardContentProps) => {
  if (activeView === "roommate") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Find Your Match</h3>
            <p className="text-sm text-white/60">
              Browse through potential roommates and find your perfect match based on compatibility.
            </p>
            <MixAndMatch />
          </Card>

          <Card className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Personality Quiz</h3>
            <p className="text-sm text-white/60">
              Take our personality quiz to help us find your ideal roommate match.
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary transition-all duration-300"
              onClick={() => document.getElementById('question-pool')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Quiz
            </Button>
          </Card>

          <Card className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
              <UserPlus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Your Profile</h3>
            <p className="text-sm text-white/60">
              Complete your profile to increase your chances of finding the perfect roommate.
            </p>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </Card>
        </div>

        <div id="question-pool" className="pt-8">
          <QuestionPool />
        </div>

        <div className="pt-8">
          <RoommateFinder />
        </div>
      </div>
    );
  }

  if (activeView === "overview") {
    return (
      <div>
        {/* Overview content goes here */}
      </div>
    );
  }

  if (activeView === "schedule") {
    return (
      <div>
        {/* Schedule content goes here */}
      </div>
    );
  }

  if (activeView === "messages") {
    return (
      <div>
        {/* Messages content goes here */}
      </div>
    );
  }

  if (activeView === "newsfeed") {
    return (
      <div>
        {/* Newsfeed content goes here */}
      </div>
    );
  }

  if (activeView === "roommate") {
    return (
      <div>
        {/* Roommate content goes here */}
      </div>
    );
  }

  if (activeView === "settings") {
    return (
      <div>
        {/* Settings content goes here */}
      </div>
    );
  }

  return null;
};

export default DashboardContent;

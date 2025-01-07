import { View } from "./DashboardSidebar";
import RoommateFinder from "../roommate/RoommateFinder";
import { MixAndMatch } from "../roommate/MixAndMatch";
import QuestionPool from "../QuestionPool";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Brain, UserPlus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DashboardContentProps {
  activeView: View;
  isEmailVerified: boolean;
}

const DashboardContent = ({ activeView, isEmailVerified }: DashboardContentProps) => {
  if (activeView === "roommate") {
    return (
      <div className="space-y-8">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            <CarouselItem>
              <Card className="glass-card bg-gradient-to-b from-gray-800 to-gray-900 p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Find Your Match</h3>
                <p className="text-lg text-gray-300">
                  Start your journey to find the perfect roommate
                </p>
                <p className="text-base text-gray-400 leading-relaxed">
                  Browse through potential roommates and find your perfect match based on compatibility.
                </p>
                <MixAndMatch />
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="glass-card bg-gradient-to-b from-gray-800 to-gray-900 p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Personality Quiz</h3>
                <p className="text-lg text-gray-300">
                  Discover your perfect match through our quiz
                </p>
                <p className="text-base text-gray-400 leading-relaxed">
                  Take our personality quiz to help us find your ideal roommate match.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary transition-all duration-300"
                  onClick={() => document.getElementById('question-pool')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Quiz
                </Button>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="glass-card bg-gradient-to-b from-gray-800 to-gray-900 p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Your Profile</h3>
                <p className="text-lg text-gray-300">
                  Make your profile stand out
                </p>
                <p className="text-base text-gray-400 leading-relaxed">
                  Complete your profile to increase your chances of finding the perfect roommate.
                </p>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

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
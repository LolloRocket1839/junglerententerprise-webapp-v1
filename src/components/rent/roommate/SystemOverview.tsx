import { Card } from "@/components/ui/card";
import { Brain, Users, MessageSquare, Sparkles } from "lucide-react";

const SystemOverview = () => {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      <h3 className="text-xl font-semibold text-white mb-6">How Our Matching System Works</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <MessageSquare className="h-5 w-5" />
            <h4 className="font-medium">Smart Questions</h4>
          </div>
          <p className="text-white/80 text-sm">
            Our system uses dynamic questions that adapt based on your previous answers,
            helping us understand your preferences better.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Brain className="h-5 w-5" />
            <h4 className="font-medium">Pattern Analysis</h4>
          </div>
          <p className="text-white/80 text-sm">
            We analyze patterns in responses to identify compatible roommates based on
            lifestyle, habits, and preferences.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            <h4 className="font-medium">Smart Matching</h4>
          </div>
          <p className="text-white/80 text-sm">
            Our algorithm considers both similarities and complementary traits to suggest
            the most compatible roommates.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <h4 className="font-medium">Earn Rewards</h4>
          </div>
          <p className="text-white/80 text-sm">
            Earn Jungle Coins for answering questions and providing detailed responses.
            More thoughtful answers lead to better matches!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SystemOverview;
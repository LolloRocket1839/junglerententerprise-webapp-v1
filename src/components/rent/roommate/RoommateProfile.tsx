import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MessageCircle, UserPlus, X } from "lucide-react";

interface RoommateProfileProps {
  profile: {
    id: string;
    name: string;
    age: number;
    occupation: string;
    bio: string;
    interests: string[];
    matchScore: number;
    avatar?: string;
    badges: string[];
  };
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onMessage: (id: string) => void;
}

const RoommateProfile = ({ profile, onAccept, onReject, onMessage }: RoommateProfileProps) => {
  return (
    <Card className="glass-card w-full max-w-md mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <img 
            src={profile.avatar || "https://api.dicebear.com/7.x/avataaars/svg"} 
            alt={profile.name} 
            className="object-cover"
          />
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
          <p className="text-white/60">{profile.age} • {profile.occupation}</p>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-white/80">Match Score: {profile.matchScore}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-white/80">{profile.bio}</p>
        
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <Badge key={index} variant="secondary" className="bg-primary/20 text-primary">
              {interest}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.badges.map((badge, index) => (
            <Badge key={index} variant="outline" className="border-primary/50">
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-white/10">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
          onClick={() => onReject(profile.id)}
        >
          <X className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
          onClick={() => onMessage(profile.id)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500"
          onClick={() => onAccept(profile.id)}
        >
          <UserPlus className="w-6 h-6" />
        </Button>
      </div>
    </Card>
  );
};

export default RoommateProfile;
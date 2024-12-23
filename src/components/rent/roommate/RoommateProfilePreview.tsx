import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, User } from "lucide-react";
import { formatDistance } from "date-fns";

interface RoommateProfilePreviewProps {
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    bio: string | null;
    budget_min: number | null;
    budget_max: number | null;
    move_in_date: string | null;
    preferences: Record<string, any> | null;
  };
  onViewProfile: (id: string) => void;
}

const RoommateProfilePreview = ({ profile, onViewProfile }: RoommateProfilePreviewProps) => {
  return (
    <Card className="glass-card overflow-hidden animate-fade-in">
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <img 
              src={profile.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"} 
              alt={profile.first_name}
              className="object-cover"
            />
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {profile.first_name} {profile.last_name?.charAt(0)}.
            </h3>
            {profile.bio && (
              <p className="text-sm text-white/60 line-clamp-2">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {(profile.budget_min || profile.budget_max) && (
            <div className="flex items-center text-sm text-white/80">
              <DollarSign className="w-4 h-4 mr-2" />
              Budget: €{profile.budget_min || '?'} - €{profile.budget_max || '?'}
            </div>
          )}
          
          {profile.move_in_date && (
            <div className="flex items-center text-sm text-white/80">
              <Calendar className="w-4 h-4 mr-2" />
              Move in: {formatDistance(new Date(profile.move_in_date), new Date(), { addSuffix: true })}
            </div>
          )}

          {profile.preferences && (
            <div className="flex flex-wrap gap-2 mt-3">
              {Object.entries(profile.preferences).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="bg-primary/20 text-primary">
                  {key}: {value}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button 
          className="w-full mt-4"
          onClick={() => onViewProfile(profile.id)}
        >
          <User className="w-4 h-4 mr-2" />
          View Full Profile
        </Button>
      </div>
    </Card>
  );
};

export default RoommateProfilePreview;
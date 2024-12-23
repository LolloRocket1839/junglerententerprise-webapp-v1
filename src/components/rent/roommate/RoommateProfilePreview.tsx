import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, User, Heart, Smoking, Dog } from "lucide-react";
import { formatDistance } from "date-fns";
import { Json } from "@/integrations/supabase/types";

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
    preferences: Json;
  };
  onViewProfile: (id: string) => void;
}

const RoommateProfilePreview = ({ profile, onViewProfile }: RoommateProfilePreviewProps) => {
  const parsedPreferences = profile.preferences 
    ? (typeof profile.preferences === 'string' 
        ? JSON.parse(profile.preferences) 
        : profile.preferences)
    : {};

  return (
    <Card className="glass-card overflow-hidden animate-fade-in hover:scale-[1.02] transition-transform duration-300">
      <div className="p-6 space-y-4">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-primary/50 shadow-xl">
            <img 
              src={profile.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"} 
              alt={profile.first_name}
              className="object-cover"
            />
          </Avatar>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-white">
              {profile.first_name} {profile.last_name?.charAt(0)}.
            </h3>
            {profile.bio && (
              <p className="text-sm text-white/70 mt-2 line-clamp-2">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="space-y-3 bg-white/5 rounded-lg p-3">
          {(profile.budget_min || profile.budget_max) && (
            <div className="flex items-center text-sm text-white/80">
              <DollarSign className="w-4 h-4 mr-2 text-primary" />
              Budget: €{profile.budget_min || '?'} - €{profile.budget_max || '?'}
            </div>
          )}
          
          {profile.move_in_date && (
            <div className="flex items-center text-sm text-white/80">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              Move in: {formatDistance(new Date(profile.move_in_date), new Date(), { addSuffix: true })}
            </div>
          )}
        </div>

        {Object.keys(parsedPreferences).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(parsedPreferences).map(([key, value]) => (
              <Badge 
                key={key} 
                variant="secondary" 
                className="bg-primary/20 text-primary border border-primary/30"
              >
                {getPreferenceIcon(key)}
                {key}: {String(value)}
              </Badge>
            ))}
          </div>
        )}

        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary transition-all duration-300"
          onClick={() => onViewProfile(profile.id)}
        >
          <User className="w-4 h-4 mr-2" />
          View Full Profile
        </Button>
      </div>
    </Card>
  );
};

const getPreferenceIcon = (key: string) => {
  const icons: Record<string, JSX.Element> = {
    smoking: <Smoking className="w-3 h-3 mr-1" />,
    pets: <Dog className="w-3 h-3 mr-1" />,
    lifestyle: <Heart className="w-3 h-3 mr-1" />
  };
  return icons[key.toLowerCase()] || null;
};

export default RoommateProfilePreview;
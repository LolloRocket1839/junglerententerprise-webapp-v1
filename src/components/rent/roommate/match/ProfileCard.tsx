import { motion } from "framer-motion";
import { Heart, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Profile {
  id: string;
  first_name: string;
  avatar_url: string | null;
  bio: string | null;
  budget_min: number | null;
  budget_max: number | null;
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (liked: boolean) => void;
}

const ProfileCard = ({ profile, onSwipe }: ProfileCardProps) => {
  return (
    <motion.div
      key={profile.id}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full"
    >
      <div className="relative h-full glass-card rounded-none">
        {profile.avatar_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.avatar_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">
            {profile.first_name}, {profile.bio}
          </h3>
          <p className="text-sm opacity-90 mb-4">
            Budget: €{profile.budget_min} - €{profile.budget_max}
          </p>
          
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-12 h-12 p-0 border-2 hover:bg-red-500/20"
              onClick={() => onSwipe(false)}
            >
              <Ban className="h-6 w-6 text-red-500" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-12 h-12 p-0 border-2 hover:bg-green-500/20"
              onClick={() => onSwipe(true)}
            >
              <Heart className="h-6 w-6 text-green-500" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock, Users } from 'lucide-react';

const mockStories = [
  {
    id: '1',
    title: 'Perfect Study Partners!',
    story: 'We matched based on our similar study schedules and found the perfect apartment near campus. Now we\'re best friends and study buddies!',
    user_names: 'Sofia & Emma',
    match_duration: 'Connected in 3 days',
    is_featured: true
  },
  {
    id: '2',
    title: 'International Students Unite',
    story: 'As international students, we understood each other\'s challenges. Our compatibility score was 95% and we\'ve been roommates for 2 years now!',
    user_names: 'Marco & Ahmed',
    match_duration: 'Matched instantly',
    is_featured: true
  },
  {
    id: '3',
    title: 'Budget-Friendly Match',
    story: 'We both needed affordable housing and had similar lifestyles. Found a great place together and split costs perfectly!',
    user_names: 'Anna & Lisa',
    match_duration: 'Found housing in 1 week',
    is_featured: false
  }
];

export const SuccessStories = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-2">Success Stories</h3>
        <p className="text-white/70">Real students who found their perfect roommates</p>
      </div>

      <div className="space-y-4">
        {mockStories.slice(0, 2).map((story) => (
          <Card key={story.id} className="glass-premium hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <h4 className="font-semibold text-white">{story.title}</h4>
                </div>
                {story.is_featured && (
                  <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    Featured
                  </Badge>
                )}
              </div>

              <p className="text-white/80 mb-4 leading-relaxed">{story.story}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-white/60">
                  <Users className="w-4 h-4" />
                  <span>{story.user_names}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Clock className="w-4 h-4" />
                  <span>{story.match_duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
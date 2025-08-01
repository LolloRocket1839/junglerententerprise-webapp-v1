import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Home, ShoppingBag } from 'lucide-react';

export const PlatformStats = () => {
  // Mock stats until the new table is properly typed
  const stats = {
    total_matches: 247,
    active_users: 89,
    successful_roommate_pairs: 123,
    properties_listed: 45,
    marketplace_items: 67
  };

  const statItems = [
    {
      icon: Heart,
      value: stats.total_matches,
      label: 'Total Matches',
      color: 'text-pink-400'
    },
    {
      icon: Users,
      value: stats.active_users,
      label: 'Active Users',
      color: 'text-blue-400'
    },
    {
      icon: Home,
      value: stats.successful_roommate_pairs,
      label: 'Roommate Pairs',
      color: 'text-emerald-400'
    },
    {
      icon: ShoppingBag,
      value: stats.marketplace_items,
      label: 'Market Items',
      color: 'text-purple-400'
    }
  ];

  return (
    <Card className="glass-premium">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {item.value.toLocaleString()}
              </div>
              <div className="text-sm text-white/60">{item.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
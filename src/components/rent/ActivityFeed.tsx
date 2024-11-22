import { AlertCircle, Calendar, Home } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      icon: AlertCircle,
      title: 'Utility Bill Due',
      message: "Please confirm your portion of this month's utilities",
      time: '2 days',
    },
    {
      icon: Calendar,
      title: 'House Meeting',
      message: "Vote for next weekend's cleaning schedule",
      time: '5 hours',
    },
    {
      icon: Home,
      title: 'Room Check',
      message: 'Monthly room inspection scheduled',
      time: 'Tomorrow',
    }
  ];

  return (
    <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Recent Activity</h3>
      <div className="space-y-3 sm:space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="glass hover:bg-white/10 p-3 sm:p-4 rounded-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm sm:text-base font-medium">{activity.title}</h4>
                    <p className="text-white/60 text-xs sm:text-sm">{activity.message}</p>
                  </div>
                </div>
                <span className="text-white/40 text-xs sm:text-sm">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
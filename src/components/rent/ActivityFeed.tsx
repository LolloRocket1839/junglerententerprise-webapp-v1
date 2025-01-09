import { AlertCircle, Calendar, Home } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      icon: AlertCircle,
      title: 'Bolletta da Pagare',
      message: "Conferma la tua parte delle utenze di questo mese",
      time: '2 giorni',
    },
    {
      icon: Calendar,
      title: 'Riunione Casa',
      message: "Vota per il programma delle pulizie del prossimo weekend",
      time: '5 ore',
    },
    {
      icon: Home,
      title: 'Controllo Stanza',
      message: 'Ispezione mensile della stanza programmata',
      time: 'Domani',
    }
  ];

  return (
    <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Attività Recenti</h3>
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
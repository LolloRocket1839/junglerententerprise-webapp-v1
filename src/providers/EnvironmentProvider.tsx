import React, { createContext, useContext, useEffect, useState } from 'react';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';
type Season = 'spring' | 'summer' | 'fall' | 'winter';

interface EnvironmentState {
  timeOfDay: TimeOfDay;
  season: Season;
  isDark: boolean;
}

const EnvironmentContext = createContext<EnvironmentState>({
  timeOfDay: 'morning',
  season: 'spring',
  isDark: false,
});

export const useEnvironment = () => useContext(EnvironmentContext);

export const EnvironmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<EnvironmentState>({
    timeOfDay: 'morning',
    season: 'spring',
    isDark: false,
  });

  useEffect(() => {
    // Initial setup
    updateTimeOfDay();
    updateSeason();

    // Update time of day every minute
    const timeInterval = setInterval(updateTimeOfDay, 60000);
    
    // Update season once per day
    const seasonInterval = setInterval(updateSeason, 86400000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(seasonInterval);
    };
  }, []);

  const updateTimeOfDay = () => {
    const hour = new Date().getHours();
    let timeOfDay: TimeOfDay;
    let isDark: boolean;

    if (hour >= 6 && hour < 12) {
      timeOfDay = 'morning';
      isDark = false;
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = 'afternoon';
      isDark = false;
    } else {
      timeOfDay = 'evening';
      isDark = true;
    }

    setState(prev => ({ ...prev, timeOfDay, isDark }));
  };

  const updateSeason = () => {
    const month = new Date().getMonth();
    let season: Season;

    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'fall';
    else season = 'winter';

    setState(prev => ({ ...prev, season }));
  };

  return (
    <EnvironmentContext.Provider value={state}>
      <div className={`
        transition-colors duration-1000
        ${state.isDark ? 'dark' : ''}
        ${state.timeOfDay === 'morning' ? 'bg-gradient-to-br from-green-50 via-emerald-100 to-teal-200' : ''}
        ${state.timeOfDay === 'afternoon' ? 'bg-gradient-to-br from-emerald-200 via-green-300 to-teal-400' : ''}
        ${state.timeOfDay === 'evening' ? 'bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900' : ''}
      `}>
        {children}
      </div>
    </EnvironmentContext.Provider>
  );
};
import React, { useState } from 'react';
import {
  Calendar,
  Bell,
  Home,
  MessageCircle,
  Settings,
  Clock,
  AlertCircle
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]">
      {/* Top Navigation */}
      <nav className="glass-nav">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-primary font-bold">MS</span>
              </div>
              <div>
                <h2 className="text-white font-medium">Marco Studente</h2>
                <p className="text-white/60 text-sm">Villa Roma Centrale</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="glass-card p-4">
              <nav className="space-y-2">
                {[
                  { icon: Home, label: 'Overview', id: 'overview' },
                  { icon: Calendar, label: 'Schedule', id: 'schedule' },
                  { icon: MessageCircle, label: 'Messages', id: 'messages' },
                  { icon: Settings, label: 'Settings', id: 'settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Clock,
                  label: 'Next House Meeting',
                  value: 'Tomorrow, 18:00',
                  type: 'primary'
                },
                {
                  icon: Bell,
                  label: 'Notifications',
                  value: '3 New',
                  type: 'primary'
                },
                {
                  icon: Calendar,
                  label: 'Next Event',
                  value: 'House Dinner',
                  type: 'primary'
                },
                {
                  icon: Home,
                  label: 'Room Status',
                  value: 'All Good',
                  type: 'primary'
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="glass-card p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{stat.label}</p>
                      <p className="text-white font-medium">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: AlertCircle,
                    title: 'Utility Bill Due',
                    message: 'Please confirm your portion of this month\'s utilities',
                    time: '2 days',
                  },
                  {
                    icon: Calendar,
                    title: 'House Meeting',
                    message: 'Vote for next weekend\'s cleaning schedule',
                    time: '5 hours',
                  },
                  {
                    icon: Home,
                    title: 'Room Check',
                    message: 'Monthly room inspection scheduled',
                    time: 'Tomorrow',
                  }
                ].map((notification, index) => (
                  <div
                    key={index}
                    className="glass hover:bg-white/10 p-4 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <notification.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{notification.title}</h4>
                          <p className="text-white/60">{notification.message}</p>
                        </div>
                      </div>
                      <span className="text-white/40">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
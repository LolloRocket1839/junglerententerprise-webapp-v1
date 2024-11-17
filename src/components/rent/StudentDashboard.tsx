import React, { useState } from 'react';
import {
  Calendar,
  Bell,
  Home,
  MessageCircle,
  Settings,
  ChevronRight,
  Clock,
  AlertCircle
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showJungleHelp, setShowJungleHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-emerald-900">
      {/* Top Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Profile & Location */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold">MS</span>
              </div>
              <div>
                <h2 className="text-white font-medium">Marco Studente</h2>
                <p className="text-white/60 text-sm">Villa Roma Centrale</p>
              </div>
            </div>

            {/* Quick Actions */}
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
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
                        ? 'bg-green-500 text-white'
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
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[
                {
                  icon: Clock,
                  label: 'Next House Meeting',
                  value: 'Tomorrow, 18:00',
                  type: 'info'
                },
                {
                  icon: Bell,
                  label: 'Notifications',
                  value: '3 New',
                  type: 'warning'
                },
                {
                  icon: Calendar,
                  label: 'Next Event',
                  value: 'House Dinner',
                  type: 'success'
                },
                {
                  icon: Home,
                  label: 'Room Status',
                  value: 'All Good',
                  type: 'info'
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className={`p-3 rounded-lg bg-${stat.type === 'warning' ? 'yellow' : stat.type === 'success' ? 'green' : 'blue'}-500/20`}>
                      <stat.icon className={`w-6 h-6 text-${stat.type === 'warning' ? 'yellow' : stat.type === 'success' ? 'green' : 'blue'}-500`} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{stat.label}</p>
                      <p className="text-white font-medium">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* House Activity & Notifications */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: AlertCircle,
                    title: 'Utility Bill Due',
                    message: 'Please confirm your portion of this month\'s utilities',
                    time: '2 days',
                    type: 'warning'
                  },
                  {
                    icon: Calendar,
                    title: 'House Meeting',
                    message: 'Vote for next weekend\'s cleaning schedule',
                    time: '5 hours',
                    type: 'info'
                  },
                  {
                    icon: Home,
                    title: 'Room Check',
                    message: 'Monthly room inspection scheduled',
                    time: 'Tomorrow',
                    type: 'success'
                  }
                ].map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-${notification.type === 'warning' ? 'yellow' : notification.type === 'success' ? 'green' : 'blue'}-500/20`}>
                        <notification.icon className={`w-5 h-5 text-${notification.type === 'warning' ? 'yellow' : notification.type === 'success' ? 'green' : 'blue'}-500`} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{notification.title}</h4>
                        <p className="text-white/60">{notification.message}</p>
                      </div>
                    </div>
                    <span className="text-white/40">{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jungle Help Button */}
      <button
        onClick={() => setShowJungleHelp(true)}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6" />
        <span>Jungle Help 24/7</span>
      </button>
    </div>
  );
};

export default StudentDashboard;

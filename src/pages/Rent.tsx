import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Users, 
  Home,
  MessageCircle,
  Upload,
  Bell,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Rent = () => {
  const [showChat, setShowChat] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Utility Bill Due',
      message: 'Please confirm your portion of this month\'s utilities',
      timeLeft: '2 days'
    },
    {
      id: 2,
      type: 'social',
      title: 'House Meeting',
      message: 'Vote for next weekend\'s cleaning schedule',
      timeLeft: '5 hours'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-emerald-900">
      {/* Fixed Chat Bot Button */}
      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 z-50"
      >
        <MessageCircle className="w-6 h-6" />
        <span>Jungle Help 24/7</span>
      </button>

      {/* Chat Bot Modal */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl z-50">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Jungle Help</h3>
                <p className="text-white/60 text-sm">Always online</p>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white/60 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="h-96 p-4 overflow-y-auto">
            {/* Chat messages would go here */}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Student Home
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Long-term rentals verified and managed by Jungle Rent
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="University City"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60"
                  />
                </div>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white/60 appearance-none">
                    <option>Room Type</option>
                    <option>Single Room</option>
                    <option>Double Room</option>
                    <option>Studio</option>
                  </select>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4 transition-colors">
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Users,
              title: 'Personal Info',
              desc: 'Basic details and student status'
            },
            {
              icon: Upload,
              title: 'Documents',
              desc: 'Upload required guarantees'
            },
            {
              icon: CheckCircle,
              title: 'Verification',
              desc: 'Quick approval process'
            },
            {
              icon: Home,
              title: 'Move In',
              desc: 'Welcome to your new home'
            }
          ].map((step, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <step.icon className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Notifications Center */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
            <Bell className="w-6 h-6 text-white/60" />
          </div>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {notif.type === 'urgent' ? (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <Bell className="w-6 h-6 text-blue-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-white">{notif.title}</h3>
                    <p className="text-white/60">{notif.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-sm">{notif.timeLeft}</span>
                  <ChevronRight className="w-5 h-5 text-white/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
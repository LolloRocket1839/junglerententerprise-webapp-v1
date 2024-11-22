import { useState } from 'react';
import {
  Calendar,
  Bell,
  Home,
  MessageCircle,
  Settings,
  Clock,
  AlertCircle,
  LayoutGrid,
  Newspaper,
  Heart,
  MessageSquare,
  Share2
} from 'lucide-react';
import StudentSchedule from './StudentSchedule';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockNewsFeed = [
    {
      id: 1,
      author: "Maria Silva",
      hub: "Villa Roma Nord",
      content: "Just hosted a great international dinner at our hub! Students from 5 different countries shared their traditional dishes. 🌍🍝",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format"
    },
    {
      id: 2,
      author: "Alex Chen",
      hub: "Villa Roma Sud",
      content: "Study group forming for finals week! Join us in the common area every evening from 6-9pm. Coffee provided! ☕📚",
      timestamp: "5 hours ago",
      likes: 15,
      comments: 12
    },
    {
      id: 3,
      author: "Sophie Martin",
      hub: "Villa Roma Est",
      content: "Our hub's rooftop garden project is finally complete! Come check out our new sustainable urban garden. 🌱",
      timestamp: "1 day ago",
      likes: 45,
      comments: 16,
      image: "https://images.unsplash.com/photo-1558435186-d31d126391fa?w=500&auto=format"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]">
      {/* Top Navigation */}
      <nav className="glass-nav">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-primary text-sm sm:text-base font-bold">MS</span>
              </div>
              <div className="hidden sm:block">
                <h2 className="text-white text-sm sm:text-base font-medium">Marco Studente</h2>
                <p className="text-white/60 text-xs sm:text-sm">Villa Roma Centrale</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-1.5 sm:p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="p-1.5 sm:p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="glass-card p-3 sm:p-4">
              <nav className="space-y-1 sm:space-y-2">
                {[
                  { icon: Home, label: 'Overview', id: 'overview' },
                  { icon: Calendar, label: 'Schedule', id: 'schedule' },
                  { icon: MessageCircle, label: 'Messages', id: 'messages' },
                  { icon: Newspaper, label: 'Newsfeed', id: 'newsfeed' },
                  { icon: LayoutGrid, label: 'Hub', id: 'hub' },
                  { icon: Settings, label: 'Settings', id: 'settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                      className="glass-card p-4 sm:p-6 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 rounded-lg bg-primary/20">
                          <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs sm:text-sm">{stat.label}</p>
                          <p className="text-white text-sm sm:text-base font-medium mt-1">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Recent Activity</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
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
                    ].map((notification, index) => (
                      <div
                        key={index}
                        className="glass hover:bg-white/10 p-3 sm:p-4 rounded-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 rounded-lg bg-primary/20">
                              <notification.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="text-white text-sm sm:text-base font-medium">{notification.title}</h4>
                              <p className="text-white/60 text-xs sm:text-sm">{notification.message}</p>
                            </div>
                          </div>
                          <span className="text-white/40 text-xs sm:text-sm">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'schedule' && <StudentSchedule />}
            
            {activeTab === 'newsfeed' && (
              <div className="space-y-6">
                {mockNewsFeed.map((post) => (
                  <div key={post.id} className="glass-card p-6 animate-fade-in">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">{post.author}</h3>
                            <p className="text-white/60 text-sm">{post.hub} • {post.timestamp}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-white/90">{post.content}</p>
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="mt-4 rounded-lg w-full object-cover max-h-96"
                          />
                        )}
                        <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-white/10">
                          <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                            <Heart className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'messages' && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white">Messages</h3>
                <p className="text-white/60 mt-2">No messages yet.</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white">Settings</h3>
                <p className="text-white/60 mt-2">Settings panel coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
import { useState } from 'react';
import {
  Calendar,
  MessageCircle,
  Settings,
  LayoutGrid,
  Newspaper,
  Heart,
  MessageSquare,
  Share2,
  ArrowLeftRight,
  Home,
  UserSearch,
  ShoppingBag
} from 'lucide-react';
import StudentSchedule from './StudentSchedule';
import StudentSwap from './StudentSwap';
import StudentHeader from './StudentHeader';
import DashboardStats from './DashboardStats';
import ActivityFeed from './ActivityFeed';
import RoommateFinder from './roommate/RoommateFinder';
import MarketplaceGrid from '../marketplace/MarketplaceGrid';

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
      <StudentHeader />

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
                  { icon: ArrowLeftRight, label: 'Swap', id: 'swap' },
                  { icon: UserSearch, label: 'Find Roommate', id: 'roommate' },
                  { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
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
                <DashboardStats />
                <ActivityFeed />
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
            
            {activeTab === 'swap' && <StudentSwap />}
            
            {activeTab === 'roommate' && <RoommateFinder />}
            
            {activeTab === 'marketplace' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Jungle Exchange</h3>
                    <p className="text-white/60">Buy, sell, and trade items within your student community</p>
                  </div>
                  <Button variant="default" className="glass-button">
                    List New Item
                  </Button>
                </div>
                <MarketplaceGrid />
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
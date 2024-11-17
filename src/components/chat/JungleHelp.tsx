import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const JungleHelp = () => {
  const [showChat, setShowChat] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 11) {
        setGreeting("Good morning");
      } else if (hour < 17) {
        setGreeting("Hello");
      } else {
        setGreeting("Good evening, how was your day?");
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fixed Chat Bot Button */}
      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg flex items-center gap-2 z-50 transition-all duration-200 animate-fade-in"
      >
        <MessageCircle className="w-6 h-6" />
        <span>Jungle Help 24/7</span>
      </button>

      {/* Chat Bot Modal */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 bg-background/60 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl z-50 animate-fade-in">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Jungle Help</h3>
                <p className="text-white/60 text-sm">Always online</p>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="h-96 p-4 overflow-y-auto space-y-4">
            {/* Bot Messages */}
            <div className="flex flex-col gap-2">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg max-w-[80%] text-white animate-fade-in">
                {greeting}
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg max-w-[80%] text-white animate-fade-in delay-300">
                How can Jungle Rent help you?
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-xl backdrop-blur-md">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JungleHelp;
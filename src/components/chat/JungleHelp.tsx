import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getChatResponse } from '@/utils/claudeApi';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const JungleHelp = () => {
  const [showChat, setShowChat] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(inputMessage);
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg flex items-center gap-2 z-50 transition-all duration-200 animate-fade-in"
      >
        <MessageCircle className="w-6 h-6" />
        <span>Jungle Help 24/7</span>
      </button>

      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 bg-background/60 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl z-50 animate-fade-in">
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

          <div className="h-96 p-4 overflow-y-auto space-y-4">
            <div className="flex flex-col gap-2">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg max-w-[80%] text-white animate-fade-in">
                {greeting}
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg max-w-[80%] text-white animate-fade-in delay-300">
                How can Jungle Rent help you?
              </div>
            </div>
            
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`${
                    message.role === 'user' 
                      ? 'bg-primary/20' 
                      : 'bg-white/10'
                  } backdrop-blur-sm p-3 rounded-lg max-w-[80%] text-white`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg max-w-[80%] text-white">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-xl backdrop-blur-md">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
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
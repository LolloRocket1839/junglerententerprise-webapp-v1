import { useState } from 'react';
import { MessageCircle, Share2, X } from 'lucide-react';

const JungleHelp = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Fixed Chat Bot Button */}
      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 z-50 transition-colors duration-200"
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
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-96 p-4 overflow-y-auto">
            {/* Chat messages would go here */}
          </div>
        </div>
      )}
    </>
  );
};

export default JungleHelp;
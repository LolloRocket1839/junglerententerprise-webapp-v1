import { Tag, ArrowLeftRight, MessageSquare } from 'lucide-react';

const StudentSwap = () => {
  const mockSwaps = [
    {
      id: 1,
      author: "Marco B.",
      hub: "Villa Roma Nord",
      offering: "Italian Language Lessons",
      looking: "Spanish Language Exchange",
      timestamp: "1 hour ago",
      tags: ["Language", "Skills"]
    },
    {
      id: 2,
      author: "Sarah K.",
      hub: "Villa Roma Sud",
      offering: "Psychology Textbook (2023 Ed.)",
      looking: "Economics 101 Textbook",
      timestamp: "3 hours ago",
      tags: ["Books", "Study"]
    },
    {
      id: 3,
      author: "David L.",
      hub: "Villa Roma Est",
      offering: "Guitar Lessons",
      looking: "Math Tutoring",
      timestamp: "1 day ago",
      tags: ["Music", "Education"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Student Swaps</h3>
        <button className="glass-button">
          Create Swap
        </button>
      </div>
      
      {mockSwaps.map((swap) => (
        <div key={swap.id} className="glass-card p-6 animate-fade-in">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">
                {swap.author.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{swap.author}</h3>
                  <p className="text-white/60 text-sm">{swap.hub} • {swap.timestamp}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2 text-white/90">
                  <span className="font-medium">Offering:</span>
                  <span>{swap.offering}</span>
                </div>
                <div className="flex items-center">
                  <ArrowLeftRight className="w-5 h-5 text-primary mx-2" />
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <span className="font-medium">Looking for:</span>
                  <span>{swap.looking}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {swap.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary"
                  >
                    <Tag className="w-3 h-3 inline-block mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-white/10">
                <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentSwap;
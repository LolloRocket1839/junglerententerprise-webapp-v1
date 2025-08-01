import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface MarketplaceMessagingProps {
  itemId: string;
  sellerId: string;
  sellerName: string;
}

export const MarketplaceMessaging = ({ itemId, sellerId, sellerName }: MarketplaceMessagingProps) => {
  const [message, setMessage] = useState('');
  const { session } = useAuth();
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message functionality coming soon!",
      description: "Direct messaging between users will be available soon.",
    });
    setMessage('');
  };

  // Don't show messaging to seller of their own item
  if (session?.user?.id === sellerId) {
    return null;
  }

  if (!session?.user) {
    return (
      <Card className="glass-premium">
        <CardContent className="p-6 text-center">
          <MessageCircle className="w-12 h-12 text-white/60 mx-auto mb-4" />
          <p className="text-white/70">Sign in to message the seller</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-premium">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Contact {sellerName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-blue-300 text-sm mb-3">
            Interested in this item? Send a message to the seller!
          </p>
          
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-white/10 border-white/20 text-white placeholder-white/60"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-white/50 text-xs mt-2">
            Full messaging system coming soon
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
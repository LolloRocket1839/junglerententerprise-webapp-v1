import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

interface MarketplaceMessagingProps {
  itemId: string;
  sellerId: string;
  sellerName: string;
}

interface Message {
  id: string;
  message: string;
  sender_id: string;
  created_at: string;
  sender?: {
    first_name: string;
    last_name: string;
  };
}

interface Conversation {
  id: string;
  buyer_id: string;
  seller_id: string;
  last_message: string;
  last_message_at: string;
}

export const MarketplaceMessaging = ({ itemId, sellerId, sellerName }: MarketplaceMessagingProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get or create conversation using raw query since tables aren't in types yet
  const { data: conversation } = useQuery({
    queryKey: ['marketplace-conversation', itemId, session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      try {
        // First try to find existing conversation
        const { data: existing, error: existingError } = await supabase
          .rpc('get_marketplace_conversation', {
            p_item_id: itemId,
            p_buyer_id: session.user.id
          });

        if (existing && existing.length > 0) {
          setConversationId(existing[0].id);
          return existing[0] as Conversation;
        }

        // Create new conversation if none exists
        const { data: newConv, error: createError } = await supabase
          .rpc('create_marketplace_conversation', {
            p_item_id: itemId,
            p_buyer_id: session.user.id,
            p_seller_id: sellerId
          });

        if (createError) throw createError;
        if (newConv && newConv.length > 0) {
          setConversationId(newConv[0].id);
          return newConv[0] as Conversation;
        }
        return null;
      } catch (error) {
        console.error('Error with conversation:', error);
        return null;
      }
    },
    enabled: !!session?.user?.id && !!itemId && session?.user?.id !== sellerId
  });

  // For now, disable messaging until the new tables are properly typed
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

  // Don't show messaging to seller of their own item
  if (session?.user?.id === sellerId) {
    return null;
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
        <div className="text-center p-6 glass-premium rounded-lg">
          <p className="text-white/70 mb-4">
            Interested in this item? Contact the seller directly!
          </p>
          <Button className="w-full">
            Send Message (Coming Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
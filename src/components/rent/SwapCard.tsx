import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, ArrowRightLeft } from "lucide-react";

interface SwapCardProps {
  swap: any;
  onContactClick: (swapId: number) => void;
}

const SwapCard = ({ swap, onContactClick }: SwapCardProps) => {
  return (
    <Card className="glass-card overflow-hidden">
      {(swap.image || swap.currentHub?.image) && (
        <div className="relative h-48">
          <img 
            src={swap.image || swap.currentHub?.image} 
            alt={swap.item || swap.currentHub?.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {swap.tags?.slice(0, 2).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="glass">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {swap.item || swap.currentHub?.name}
            </h3>
            <p className="text-sm text-white/60">
              by {swap.author}
            </p>
          </div>
          <Badge variant="outline" className="glass">
            <Clock className="w-4 h-4 mr-1" />
            {swap.timestamp}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {swap.description && (
          <p className="text-sm text-white/80">
            {swap.description}
          </p>
        )}

        {swap.currentHub && (
          <div className="space-y-2">
            <p className="text-sm text-white/80">
              Room: {swap.currentHub.room}
            </p>
            <p className="text-sm text-white/80">
              Price: €{swap.currentHub.price}/month
            </p>
            <div className="flex flex-wrap gap-2">
              {swap.currentHub.features.map((feature: string, index: number) => (
                <Badge key={index} variant="outline" className="glass">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-white/60">
          <ArrowRightLeft className="w-4 h-4" />
          <span>Looking for: {swap.lookingFor.hub || swap.lookingFor}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {swap.tags?.slice(2).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="glass-button">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full glass-button"
          onClick={() => onContactClick(swap.id)}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact for Swap
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
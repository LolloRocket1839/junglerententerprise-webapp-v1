import React from 'react';
import { ArrowLeft, Share, Heart, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  title?: string;
  onBack?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  onMore?: () => void;
  isFavorited?: boolean;
  transparent?: boolean;
  className?: string;
}

export function MobileHeader({
  title,
  onBack,
  onShare,
  onFavorite,
  onMore,
  isFavorited = false,
  transparent = false,
  className
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4',
        'transition-all duration-300',
        transparent 
          ? 'bg-transparent' 
          : 'bg-background/95 backdrop-blur-sm border-b border-border',
        'safe-area-top',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-10 w-10 rounded-full bg-background/80 hover:bg-background/90"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        {title && (
          <h1 className="text-lg font-semibold text-foreground truncate max-w-48">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onShare && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="h-10 w-10 rounded-full bg-background/80 hover:bg-background/90"
          >
            <Share className="h-5 w-5" />
          </Button>
        )}

        {onFavorite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFavorite}
            className={cn(
              "h-10 w-10 rounded-full transition-colors",
              isFavorited 
                ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" 
                : "bg-background/80 hover:bg-background/90"
            )}
          >
            <Heart 
              className={cn(
                "h-5 w-5",
                isFavorited && "fill-current"
              )} 
            />
          </Button>
        )}

        {onMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMore}
            className="h-10 w-10 rounded-full bg-background/80 hover:bg-background/90"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
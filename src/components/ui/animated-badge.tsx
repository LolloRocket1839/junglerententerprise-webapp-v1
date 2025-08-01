import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  pulse?: boolean;
  shimmer?: boolean;
  glow?: boolean;
}

export const AnimatedBadge = ({ 
  children, 
  variant = 'default', 
  className, 
  pulse = false,
  shimmer = false,
  glow = false 
}: AnimatedBadgeProps) => {
  return (
    <Badge 
      variant={variant}
      className={cn(
        'transition-all duration-300',
        pulse && 'animate-pulse-gentle',
        shimmer && 'shimmer-effect',
        glow && 'shadow-lg hover:shadow-xl hover:shadow-primary/30',
        className
      )}
    >
      {children}
    </Badge>
  );
};
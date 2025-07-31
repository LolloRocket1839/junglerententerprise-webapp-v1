import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TouchCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  pressable?: boolean;
}

export function TouchCard({ 
  children, 
  className, 
  onClick, 
  hoverable = false, 
  pressable = false 
}: TouchCardProps) {
  const isInteractive = onClick || hoverable || pressable;

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card text-card-foreground shadow-sm p-6',
        isInteractive && [
          'cursor-pointer transition-all duration-300 ease-out',
          'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1',
          'active:scale-[0.98] active:shadow-sm active:translate-y-0',
          'touch-manipulation select-none',
          'transform-gpu will-change-transform'
        ],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onTouchStart={() => {
        // Add haptic feedback for mobile
        if ('vibrate' in navigator) {
          navigator.vibrate(1);
        }
      }}
    >
      {children}
    </div>
  );
}
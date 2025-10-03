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
        'rounded-2xl border bg-card text-card-foreground p-6',
        'shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)]',
        'transition-all duration-[350ms]',
        isInteractive && [
          'cursor-pointer',
          'hover:shadow-[0_16px_32px_hsl(0_0%_0%_/_0.16)] hover:-translate-y-1.5',
          'active:scale-[0.96] active:shadow-[0_1px_2px_hsl(0_0%_0%_/_0.05)] active:translate-y-0',
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
          navigator.vibrate(2);
        }
      }}
    >
      {children}
    </div>
  );
}
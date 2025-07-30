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
          'cursor-pointer transition-all duration-200',
          'hover:shadow-md hover:scale-[1.02]',
          'active:scale-[0.98] active:shadow-sm',
          'touch-manipulation select-none'
        ],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
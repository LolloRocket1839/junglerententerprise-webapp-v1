import React, { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'xl';
  fullWidth?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ className, variant = 'default', size = 'default', fullWidth = false, icon, children, ...props }, ref) => {
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)] hover:shadow-[0_8px_16px_hsl(0_0%_0%_/_0.12)]',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)] hover:shadow-[0_8px_16px_hsl(0_0%_0%_/_0.12)]',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/30 active:bg-accent/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)] hover:shadow-[0_8px_16px_hsl(0_0%_0%_/_0.12)]',
    };

    const sizes = {
      default: 'h-12 px-6 py-3',
      sm: 'h-10 px-5 py-2',
      lg: 'h-14 px-8 py-4',
      xl: 'h-16 px-10 py-5 text-lg',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-3 rounded-xl font-medium',
          'transition-all duration-[250ms]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-[0.96] touch-manipulation transform-gpu will-change-transform',
          'hover:-translate-y-1',
          'active:translate-y-0 active:shadow-[0_1px_2px_hsl(0_0%_0%_/_0.05)]',
          'select-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        onTouchStart={() => {
          // Add haptic feedback for mobile
          if ('vibrate' in navigator) {
            navigator.vibrate(3);
          }
        }}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

TouchButton.displayName = 'TouchButton';
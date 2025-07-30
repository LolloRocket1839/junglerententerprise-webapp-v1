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
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
    };

    const sizes = {
      default: 'h-12 px-6 py-3',
      sm: 'h-10 px-4 py-2',
      lg: 'h-14 px-8 py-4',
      xl: 'h-16 px-10 py-5 text-lg',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-3 rounded-xl font-medium transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-95 touch-manipulation',
          'select-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

TouchButton.displayName = 'TouchButton';
import { cn } from "@/lib/utils";

interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const GradientBackground = ({ 
  children, 
  className,
  variant = 'primary',
  ...props 
}: GradientBackgroundProps) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        variant === 'primary' && "bg-gradient-to-br from-primary/30 via-primary/20 to-background animate-gradient-slow",
        variant === 'secondary' && "bg-gradient-to-b from-primary/20 via-primary-dark/10 to-background/90",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
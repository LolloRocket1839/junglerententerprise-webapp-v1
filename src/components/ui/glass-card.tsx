import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'light';
}

export const GlassCard = ({ children, className, variant = 'light', ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-2xl border transition-all duration-300",
        variant === 'light' 
          ? "bg-card border-border shadow-sm hover:shadow-md hover:-translate-y-0.5"
          : "backdrop-blur-sm bg-white/5 border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

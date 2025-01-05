import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl",
        "transition-all duration-300 hover:shadow-primary/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
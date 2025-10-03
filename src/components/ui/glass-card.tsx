
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10",
        "shadow-[0_8px_16px_hsl(0_0%_0%_/_0.12)]",
        "transition-all duration-[350ms]",
        "hover:shadow-[0_24px_48px_hsl(0_0%_0%_/_0.20)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

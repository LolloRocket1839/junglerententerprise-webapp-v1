import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({ 
  icon: Icon,
  title, 
  description,
  className,
  ...props 
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "p-4 sm:p-6 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10",
        "transition-all duration-300 hover:bg-white/10 touch-manipulation",
        "focus-within:ring-2 focus-within:ring-primary/50",
        className
      )}
      role="article"
      {...props}
    >
      <Icon className="w-12 h-12 rounded-full bg-primary/20 p-2.5 text-primary mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-secondary/80 text-sm sm:text-base">{description}</p>
    </div>
  );
};
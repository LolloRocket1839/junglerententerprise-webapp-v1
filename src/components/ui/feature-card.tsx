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
        "p-4 sm:p-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10",
        "shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)]",
        "transition-all duration-[350ms] hover:bg-white/10 touch-manipulation",
        "hover:shadow-[0_16px_32px_hsl(0_0%_0%_/_0.16)] hover:-translate-y-1.5",
        "focus-within:ring-2 focus-within:ring-primary/50",
        className
      )}
      role="article"
      {...props}
    >
      <Icon className="w-12 h-12 rounded-full bg-primary/20 p-2.5 text-primary mb-4 transition-transform duration-[250ms] group-hover:scale-110" />
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary tracking-wide">{title}</h3>
      <p className="text-secondary/80 text-sm sm:text-base leading-relaxed">{description}</p>
    </div>
  );
};
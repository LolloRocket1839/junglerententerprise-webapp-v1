
import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ 
  variant = 'default', 
  size = 'md',
  className 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const variantClasses = {
    default: 'text-primary bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6]',
    light: 'text-white',
    dark: 'text-[#1A1F2C]'
  };

  return (
    <div className={cn(
      "flex items-center gap-2 font-bold",
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      {/* Placeholder for actual SVG logo - replace this with your SVG when ready */}
      <div className={cn(
        "aspect-square rounded-xl glass",
        "bg-gradient-to-br from-primary/20 to-primary/10",
        "flex items-center justify-center",
        sizeClasses[size]
      )}>
        <span className="text-2xl">🦍</span>
      </div>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6]">
        Jungle Rent
      </span>
    </div>
  );
}

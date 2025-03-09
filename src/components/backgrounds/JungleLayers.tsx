
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface JungleLayersProps {
  children: React.ReactNode;
  className?: string;
}

export const JungleLayers = ({ children, className }: JungleLayersProps) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.1}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background Image Layer - Blurred jungle photograph */}
      <div 
        className="fixed inset-0 bg-[url('/jungle-bg.jpg')] bg-cover bg-center bg-no-repeat 
                   filter blur-sm brightness-50"
        style={{ transform: 'scale(1.1)' }}
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/80 via-[#1a472a]/90 to-[#0a1f12]/95" />

      {/* Subtle Pattern Layer */}
      <div 
        ref={parallaxRef}
        className="fixed inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url('/leaf-pattern.svg')`,
          backgroundSize: '600px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Vignette Effect */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};


import { useEffect, useRef } from 'react';

export const LeafOverlay = () => {
  const leafRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!leafRef.current) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.01;
      const moveY = (clientY - window.innerHeight / 2) * 0.01;
      leafRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={leafRef}
      className="fixed inset-0 pointer-events-none transition-transform duration-300 ease-out"
      style={{
        backgroundImage: 'url("/golden-leaves.svg")',
        backgroundSize: '800px',
        backgroundRepeat: 'repeat',
        opacity: 0.1,
        mixBlendMode: 'overlay',
      }}
    />
  );
};

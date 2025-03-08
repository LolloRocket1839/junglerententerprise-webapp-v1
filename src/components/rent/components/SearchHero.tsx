
import React from 'react';

export const SearchHero = () => {
  return (
    <header className="flex min-h-[60vh] items-center justify-center flex-col py-12 md:py-20 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
      
      <div className="text-center space-y-6 max-w-3xl px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in">
          Trova la tua
          <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent block mt-2">
            casa ideale
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
          Risparmia fino al 20% sul mercato con affitti a lungo termine, verificati per garantire qualità e sicurezza
        </p>
      </div>
    </header>
  );
};

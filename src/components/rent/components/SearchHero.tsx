
import React from 'react';

export const SearchHero = () => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center flex-col py-12 md:py-20">
      <div className="text-center space-y-6 max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in">
          Trova la tua
          <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent block mt-2">
            casa ideale
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
          Risparmia fino al 20% con affitti a lungo termine, verificati per garantire qualità e sicurezza
        </p>
      </div>
    </div>
  );
};

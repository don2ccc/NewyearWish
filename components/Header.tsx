import React from 'react';
import { Lantern } from './Lantern';

export const Header: React.FC = () => {
  return (
    <header className="relative w-full py-8 px-4 flex justify-between items-start overflow-hidden">
      <div className="absolute top-0 left-4 md:left-20">
        <Lantern delay="0.5s" />
      </div>
      <div className="absolute top-4 left-32 hidden md:block scale-75 opacity-80">
        <Lantern delay="2.5s" />
      </div>

      <div className="w-full text-center z-10 mt-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-cn-gold drop-shadow-lg tracking-wider">
          新年许愿池
        </h1>
        <p className="text-cn-light-gold mt-2 text-lg md:text-xl font-light tracking-widest opacity-90">
          NEW YEAR WISHES
        </p>
        <div className="w-24 h-1 bg-cn-gold mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(244,208,63,0.8)]"></div>
      </div>

      <div className="absolute top-0 right-4 md:right-20">
         <Lantern delay="1.5s" />
      </div>
      <div className="absolute top-4 right-32 hidden md:block scale-75 opacity-80">
         <Lantern delay="3s" />
      </div>
    </header>
  );
};
import React from 'react';

interface LanternProps {
  className?: string;
  delay?: string;
}

export const Lantern: React.FC<LanternProps> = ({ className = "", delay = "0s" }) => {
  return (
    <div className={`relative flex flex-col items-center animate-float ${className}`} style={{ animationDelay: delay }}>
      {/* Rope */}
      <div className="w-1 h-8 bg-cn-gold"></div>
      
      {/* Lantern Body */}
      <div className="relative w-24 h-20 bg-gradient-to-br from-red-600 to-cn-red rounded-xl shadow-lg border-2 border-red-800 flex items-center justify-center overflow-hidden">
        {/* Decorative Gold Lines */}
        <div className="absolute top-0 bottom-0 w-full flex justify-between px-2 opacity-30">
            <div className="w-0.5 h-full bg-black/20"></div>
            <div className="w-0.5 h-full bg-black/20"></div>
            <div className="w-0.5 h-full bg-black/20"></div>
        </div>
        {/* Character (Fu) */}
        <div className="text-cn-gold font-serif text-3xl font-bold bg-red-900 w-10 h-10 flex items-center justify-center rounded-sm border border-cn-gold shadow-sm rotate-45 transform">
            <span className="-rotate-45">福</span>
        </div>
      </div>

      {/* Tassel Header */}
      <div className="w-12 h-2 bg-cn-gold rounded-b-md"></div>
      
      {/* Tassel */}
      <div className="w-1 h-12 bg-red-600 shadow-sm mt-0.5"></div>
    </div>
  );
};
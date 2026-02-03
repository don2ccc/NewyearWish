import React from 'react';
import { Wish } from '../types';
import { WishCard } from './WishCard';

interface WishWallProps {
  wishes: Wish[];
  loading: boolean;
}

export const WishWall: React.FC<WishWallProps> = ({ wishes, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-cn-gold animate-pulse">
        <div className="text-xl font-serif">Loading Wishes...</div>
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-200 opacity-80">
        <p className="text-lg">No wishes yet.</p>
        <p className="text-sm mt-2">Be the first to wish!</p>
      </div>
    );
  }

  // Duplicate wishes to create seamless loop if there are enough items
  // If few items, just show them normally without intense scrolling to avoid jerkiness
  const displayWishes = wishes.length > 3 ? [...wishes, ...wishes] : wishes;
  const shouldAnimate = wishes.length > 3;

  return (
    <div className="w-full h-[600px] overflow-hidden relative bg-black/20 rounded-2xl border border-white/10 p-4">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cn-dark-red/90 to-transparent z-10 pointer-events-none"></div>
      
      <div 
        className={`${shouldAnimate ? 'animate-scroll-vertical' : ''} flex flex-col`}
        style={{ 
          animationDuration: `${Math.max(30, wishes.length * 5)}s` // Adjust speed based on content
        }}
      >
        {displayWishes.map((wish, index) => (
          <WishCard key={`${wish.id}-${index}`} wish={wish} />
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cn-dark-red/90 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};
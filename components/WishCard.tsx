import React from 'react';
import { Wish } from '../types';

interface WishCardProps {
  wish: Wish;
}

export const WishCard: React.FC<WishCardProps> = ({ wish }) => {
  // Format date: "Jan 24, 10:30 PM"
  const formattedDate = new Date(wish.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5 shadow-md relative overflow-hidden hover:shadow-xl transition-shadow duration-300 mx-2 mb-4 break-inside-avoid">
       {/* Envelope Flap decoration */}
       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-100 rotate-45 border border-red-200 z-0"></div>
       
       {/* Decorative stamp */}
       <div className="absolute top-2 right-2 w-8 h-8 border-2 border-red-200 rounded-full opacity-30 flex items-center justify-center rotate-12">
          <span className="text-red-800 text-xs font-serif font-bold">福</span>
       </div>

       <div className="relative z-10">
        <p className="text-gray-800 font-serif text-lg leading-relaxed mb-4">
          "{wish.content}"
        </p>
        
        <div className="flex justify-between items-end border-t border-red-100 pt-3 mt-2">
          <div className="text-cn-dark-red font-bold text-sm">
            @{wish.name}
          </div>
          <div className="text-gray-400 text-xs font-mono">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};
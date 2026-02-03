import React from 'react';
import { Lantern } from './Lantern';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <header className="relative w-full py-8 px-4 flex justify-between items-start overflow-hidden">
      {/* Language Switcher - Absolute positioned top right, but distinct from lanterns */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1 bg-red-900/50 hover:bg-red-800 text-cn-gold border border-cn-gold/30 px-3 py-1.5 rounded-full text-xs font-serif transition-colors backdrop-blur-md shadow-sm"
        >
          <Languages size={14} />
          <span>{language === 'zh' ? 'English' : '中文'}</span>
        </button>
      </div>

      <div className="absolute top-0 left-4 md:left-20 pointer-events-none">
        <Lantern delay="0.5s" />
      </div>
      <div className="absolute top-4 left-32 hidden md:block scale-75 opacity-80 pointer-events-none">
        <Lantern delay="2.5s" />
      </div>

      <div className="w-full text-center z-10 mt-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-cn-gold drop-shadow-lg tracking-wider">
          {t('appTitle')}
        </h1>
        <p className="text-cn-light-gold mt-2 text-lg md:text-xl font-light tracking-widest opacity-90">
          {t('appSubtitle')}
        </p>
        <div className="w-24 h-1 bg-cn-gold mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(244,208,63,0.8)]"></div>
      </div>

      <div className="absolute top-0 right-4 md:right-20 pointer-events-none">
         <Lantern delay="1.5s" />
      </div>
      <div className="absolute top-4 right-32 hidden md:block scale-75 opacity-80 pointer-events-none">
         <Lantern delay="3s" />
      </div>
    </header>
  );
};
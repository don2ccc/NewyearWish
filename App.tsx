import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { WishForm } from './components/WishForm';
import { WishWall } from './components/WishWall';
import { wishService } from './services/supabaseClient';
import { Wish } from './types';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);
  const { t } = useLanguage();

  const fetchWishes = async () => {
    setLoading(true);
    try {
      const data = await wishService.getWishes();
      setWishes(data);
      setIsMock(wishService.isMock());
    } catch (error) {
      console.error("Failed to fetch wishes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
    
    // Auto-refresh every 30 seconds to keep the wall alive
    const interval = setInterval(() => {
        fetchWishes();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleWishAdded = (newWish: Wish) => {
    // Add new wish to the top immediately for UX
    setWishes(prev => [newWish, ...prev]);
  };

  return (
    <div className="min-h-screen bg-cn-dark-red bg-[url('https://www.transparenttextures.com/patterns/red-paper.png')] font-sans text-white pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-8 w-full max-w-md">
            <WishForm onWishAdded={handleWishAdded} />
            
            <div className="mt-8 text-center opacity-70">
              <p className="text-cn-light-gold text-sm font-serif italic">
                {t('footerQuote')}
              </p>
            </div>

            {isMock && (
              <div className="mt-6 p-4 bg-yellow-900/40 border border-yellow-700 rounded text-xs text-yellow-200">
                <strong>{t('demoMode')}</strong> {t('demoModeDesc')}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Wall */}
        <div className="lg:col-span-7">
          <div className="bg-red-900/40 border border-cn-gold/30 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
             <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h3 className="text-2xl font-serif font-bold text-cn-gold">{t('latestWishes')}</h3>
                <span className="bg-red-800 text-red-200 text-xs px-3 py-1 rounded-full border border-red-600">
                  {wishes.length} {t('wishesCount')}
                </span>
             </div>
             <WishWall wishes={wishes} loading={loading} />
          </div>
        </div>

      </main>

      {/* Decorative Footer */}
      <footer className="mt-20 text-center text-red-400 text-sm p-8 border-t border-red-900">
        <p>{t('footerCopyright')}</p>
      </footer>
    </div>
  );
}

export default App;
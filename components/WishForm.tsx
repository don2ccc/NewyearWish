import React, { useState } from 'react';
import { Send, Sparkles, ShieldCheck } from 'lucide-react';
import { wishService } from '../services/supabaseClient';
import { Wish } from '../types';
import { checkRateLimit, updateRateLimit, validateWish, sanitizeInput } from '../utils/security';
import { useLanguage } from '../contexts/LanguageContext';

interface WishFormProps {
  onWishAdded: (wish: Wish) => void;
}

export const WishForm: React.FC<WishFormProps> = ({ onWishAdded }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Security: Rate Limiting
    const rateCheck = checkRateLimit(10); // 10 seconds cooldown
    if (!rateCheck.allowed) {
      setError(t('waitError', { seconds: rateCheck.waitTime || 10 }));
      return;
    }

    // 2. Security: Validation & Sanitization
    const validation = validateWish(content, name);
    if (!validation.valid) {
      setError(t(validation.errorKey || 'invalidInput'));
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // 3. Send sanitized data
      const cleanContent = sanitizeInput(content);
      const cleanName = sanitizeInput(name);

      const newWish = await wishService.addWish(cleanContent, cleanName);
      if (newWish) {
        onWishAdded(newWish);
        setContent('');
        setName('');
        updateRateLimit(); // Update the cooldown timestamp
      }
    } catch (err) {
      setError(t('sendError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-red-800/80 border-2 border-cn-gold rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-sm relative overflow-hidden group">
      {/* Decorative corner patterns */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cn-gold rounded-tl-xl opacity-60"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cn-gold rounded-tr-xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cn-gold rounded-bl-xl opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cn-gold rounded-br-xl opacity-60"></div>

      <div className="flex items-center gap-2 mb-4 text-cn-gold">
        <Sparkles size={24} />
        <h2 className="text-2xl font-serif font-bold">{t('makeWish')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-cn-light-gold text-sm mb-1 font-medium">{t('yourName')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
            className="w-full bg-red-900/50 border border-red-600 text-white placeholder-red-300/50 rounded-lg px-4 py-2 focus:outline-none focus:border-cn-gold focus:ring-1 focus:ring-cn-gold transition-colors"
            maxLength={30}
          />
        </div>

        <div>
          <label className="block text-cn-light-gold text-sm mb-1 font-medium">{t('yourWish')}</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('wishPlaceholder')}
            rows={4}
            className="w-full bg-red-900/50 border border-red-600 text-white placeholder-red-300/50 rounded-lg px-4 py-2 focus:outline-none focus:border-cn-gold focus:ring-1 focus:ring-cn-gold transition-colors resize-none"
            maxLength={200}
            required
          />
          <div className="flex justify-between mt-1">
            <div className="flex items-center text-xs text-red-300 gap-1">
               <ShieldCheck size={12} />
               <span>{t('secure')}</span>
            </div>
            <div className="text-xs text-red-300">
              {content.length}/200
            </div>
          </div>
        </div>

        {error && <p className="text-red-200 bg-red-900/80 px-2 py-1 rounded text-sm animate-pulse">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cn-gold to-yellow-500 text-red-900 font-bold py-3 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(244,208,63,0.5)] transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            t('sending')
          ) : (
            <>
              <Send size={18} />
              {t('sendWish')}
            </>
          )}
        </button>
      </form>
    </div>
  );
};
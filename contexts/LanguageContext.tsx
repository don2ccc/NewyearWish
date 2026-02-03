import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    appTitle: "新年许愿池",
    appSubtitle: "新春祈愿",
    footerQuote: "“愿新年胜旧年，万事尽可期。”",
    footerCopyright: "© 2026 新年许愿池。祝您繁荣昌盛。",
    demoMode: "演示模式：",
    demoModeDesc: "未检测到 Supabase 配置。愿望仅保存在本地内存中。",
    latestWishes: "最新愿望",
    wishesCount: "条愿望",
    loading: "正在加载愿望...",
    noWishes: "暂无愿望。",
    beFirst: "快来许下第一个愿望吧！",
    makeWish: "许个愿吧",
    yourName: "您的名字（可选）",
    namePlaceholder: "例如：财神爷",
    yourWish: "您的愿望",
    wishPlaceholder: "愿今年...",
    secure: "安全 & 已审核",
    sending: "发送中...",
    sendWish: "发送愿望",
    waitError: "请等待 {seconds} 秒后再许愿。",
    emptyError: "愿望内容不能为空。",
    lengthError: "愿望太长了（最多200字）。",
    nameError: "名字太长了（最多30字）。",
    sendError: "发送失败，请重试。",
    invalidInput: "输入无效。"
  },
  en: {
    appTitle: "New Year Wish Pool",
    appSubtitle: "NEW YEAR WISHES",
    footerQuote: "\"May all your dreams come true in the coming year.\"",
    footerCopyright: "© 2026 New Year Wish Pool. Wishing you prosperity.",
    demoMode: "Demo Mode:",
    demoModeDesc: "Supabase keys not found. Wishes are saved locally in memory.",
    latestWishes: "Latest Wishes",
    wishesCount: "Wishes",
    loading: "Loading Wishes...",
    noWishes: "No wishes yet.",
    beFirst: "Be the first to wish!",
    makeWish: "Make a Wish",
    yourName: "Your Name (Optional)",
    namePlaceholder: "e.g. Lucky Star",
    yourWish: "Your Wish",
    wishPlaceholder: "May this year bring...",
    secure: "Secure & Moderated",
    sending: "Sending...",
    sendWish: "Send Wish",
    waitError: "Please wait {seconds}s before making another wish.",
    emptyError: "Wish content cannot be empty.",
    lengthError: "Wish is too long (max 200 characters).",
    nameError: "Name is too long (max 30 characters).",
    sendError: "Failed to send wish. Please try again.",
    invalidInput: "Invalid input."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
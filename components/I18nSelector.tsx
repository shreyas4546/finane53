import React, { useState, useRef, useEffect } from 'react';
import { useI18n, Language, Currency } from '../context/I18nContext';
import { Globe, DollarSign, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export const I18nSelector: React.FC = () => {
  const { language, setLanguage, currency, setCurrency } = useI18n();
  const [activeMenu, setActiveMenu] = useState<'lang' | 'curr' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (menu: 'lang' | 'curr') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="flex items-center gap-2" ref={containerRef}>
      {/* Language Selector */}
      <div className="relative">
        <button 
          onClick={() => toggleMenu('lang')}
          className={clsx(
            "flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-md transition-colors",
            activeMenu === 'lang' 
              ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="uppercase">{language}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </button>
        
        {activeMenu === 'lang' && (
          <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 overflow-hidden">
            {(['en', 'es', 'fr', 'de', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setActiveMenu(null);
                }}
                className={clsx(
                  "w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between",
                  language === lang 
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {lang === 'en' ? 'English' : 
                 lang === 'es' ? 'Español' : 
                 lang === 'fr' ? 'Français' : 
                 lang === 'de' ? 'Deutsch' : 'हिन्दी'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

      {/* Currency Selector */}
      <div className="relative">
        <button 
          onClick={() => toggleMenu('curr')}
          className={clsx(
            "flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-md transition-colors",
            activeMenu === 'curr' 
              ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>{currency}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </button>

        {activeMenu === 'curr' && (
          <div className="absolute right-0 top-full mt-1 w-24 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 overflow-hidden">
            {(['USD', 'EUR', 'GBP', 'JPY', 'INR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  setCurrency(curr);
                  setActiveMenu(null);
                }}
                className={clsx(
                  "w-full text-left px-3 py-2 text-xs transition-colors",
                  currency === curr 
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {curr}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
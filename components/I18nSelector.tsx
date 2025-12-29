import React from 'react';
import { useI18n, Language, Currency } from '../context/I18nContext';
import { Globe, DollarSign } from 'lucide-react';

export const I18nSelector: React.FC = () => {
  const { language, setLanguage, currency, setCurrency } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <div className="relative group">
        <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
          <Globe className="w-3.5 h-3.5" />
          <span className="uppercase">{language}</span>
        </button>
        <div className="absolute right-0 top-full mt-1 w-24 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1 hidden group-hover:block z-50">
          {(['en', 'es', 'fr', 'de', 'hi'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 ${
                language === lang ? 'text-primary-600 font-semibold' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {lang === 'en' ? 'English' : 
               lang === 'es' ? 'Español' : 
               lang === 'fr' ? 'Français' : 
               lang === 'de' ? 'Deutsch' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

      <div className="relative group">
        <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
          <DollarSign className="w-3.5 h-3.5" />
          <span>{currency}</span>
        </button>
        <div className="absolute right-0 top-full mt-1 w-20 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1 hidden group-hover:block z-50">
          {(['USD', 'EUR', 'GBP', 'JPY', 'INR'] as Currency[]).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 ${
                currency === curr ? 'text-primary-600 font-semibold' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
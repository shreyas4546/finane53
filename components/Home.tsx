import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Brain, Zap, PieChart } from 'lucide-react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { I18nSelector } from './I18nSelector';
import { useI18n } from '../context/I18nContext';

export const Home: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">{t('app.name')}</span>
        </div>
        <div className="flex items-center gap-4">
             <I18nSelector />
             <ThemeToggle />
             <Link to="/dashboard">
                <Button variant="ghost">{t('nav.login')}</Button>
             </Link>
             <Link to="/dashboard">
                <Button>{t('nav.demo')}</Button>
             </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary-100 dark:border-primary-800 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            {t('hero.badge')}
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            {t('hero.title.1')} <br/>
            <span className="text-primary-600 dark:text-primary-400">{t('hero.title.2')}</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
            {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 shadow-lg shadow-primary-500/20 dark:shadow-none">
                    {t('hero.cta.dashboard')} <ArrowRight className="w-5 h-5" />
                </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">{t('hero.cta.docs')}</Button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-24 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <Brain className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('feat.cat.title')}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t('feat.cat.desc')}
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('feat.risk.title')}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t('feat.risk.desc')}
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t('feat.explain.title')}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t('feat.explain.desc')}
                    </p>
                </div>
            </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 text-center text-slate-500 dark:text-slate-500 text-sm transition-colors duration-200">
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
};
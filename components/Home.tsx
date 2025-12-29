import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Brain, Zap, PieChart, Github, Twitter, Linkedin, Mail, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { I18nSelector } from './I18nSelector';
import { useI18n } from '../context/I18nContext';
import { BentoItem } from './BentoGrid';
import { motion, Variants } from 'framer-motion';

const NewsletterForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-medium flex items-center gap-2 border border-emerald-100 dark:border-emerald-800"
      >
        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
        <span>Subscribed!</span>
      </motion.div>
    );
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="relative group">
        <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
        <input 
          required
          type="email" 
          placeholder="Enter your email" 
          disabled={status === 'loading'}
          className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm disabled:opacity-50 placeholder:text-slate-400"
        />
      </div>
      <Button size="sm" className="w-full text-xs py-1.5" isLoading={status === 'loading'}>Subscribe</Button>
    </form>
  );
};

export const Home: React.FC = () => {
  const { t } = useI18n();

  const footerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const footerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-primary-500/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full h-20 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-primary-600 p-1.5 rounded-lg shadow-sm">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">{t('app.name')}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
                 <I18nSelector />
                 <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
                 <ThemeToggle />
                 <div className="hidden sm:flex items-center gap-3 ml-2">
                    <Link to="/login">
                        <Button variant="ghost" size="sm">{t('nav.login')}</Button>
                    </Link>
                    <Link to="/login">
                        <Button size="sm" className="shadow-md shadow-primary-500/20">{t('nav.demo')}</Button>
                    </Link>
                 </div>
                 {/* Mobile only login button */}
                 <Link to="/login" className="sm:hidden">
                    <Button size="sm">{t('nav.login')}</Button>
                 </Link>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 w-full max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-sm font-medium text-slate-600 dark:text-slate-300"
         >
            <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t('hero.badge')}
         </motion.div>

        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
                {t('hero.title.1')} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 filter drop-shadow-sm">{t('hero.title.2')}</span>
            </h1>
        </div>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 shadow-xl shadow-primary-500/20 dark:shadow-primary-900/20">
                    {t('hero.cta.dashboard')} <ArrowRight className="w-5 h-5" />
                </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-transparent border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                {t('hero.cta.docs')}
            </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 px-6 w-full max-w-5xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoItem delay={0.1} className="flex flex-col items-start text-left h-full border-slate-200/60 dark:border-slate-800/60 hover:border-primary-200 dark:hover:border-primary-800/50 transition-colors">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 shrink-0">
                    <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('feat.cat.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                    {t('feat.cat.desc')}
                </p>
            </BentoItem>

            <BentoItem delay={0.2} className="flex flex-col items-start text-left h-full border-slate-200/60 dark:border-slate-800/60 hover:border-rose-200 dark:hover:border-rose-800/50 transition-colors">
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400 mb-6 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('feat.risk.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                    {t('feat.risk.desc')}
                </p>
            </BentoItem>

            <BentoItem delay={0.3} className="flex flex-col items-start text-left h-full border-slate-200/60 dark:border-slate-800/60 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shrink-0">
                    <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('feat.explain.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                    {t('feat.explain.desc')}
                </p>
            </BentoItem>
        </div>
      </section>
      
      {/* Footer - Compact Version */}
      <footer className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 py-10 relative overflow-hidden mt-auto">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={footerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          >
            {/* Brand Column */}
            <motion.div variants={footerItem} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary-600 p-1 rounded-md">
                  <PieChart className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{t('app.name')}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-xs">
                Empowering finance teams with AI-driven insights, automated categorization, and real-time risk detection.
              </p>
              <div className="flex gap-2">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    whileHover={{ scale: 1.1, y: -2, color: '#6366f1' }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-500 transition-colors border border-slate-200 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div variants={footerItem}>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Product</h4>
              <ul className="space-y-2 text-xs">
                {['Features', 'Integrations', 'Security', 'Pricing', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group w-fit">
                       <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={footerItem}>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Company</h4>
              <ul className="space-y-2 text-xs">
                {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group w-fit">
                       <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={footerItem} className="lg:pl-4">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Stay Updated</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                Get the latest financial AI trends.
              </p>
              <NewsletterForm />
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-slate-400 dark:text-slate-500 text-xs">
              {t('footer')}
            </p>
            <div className="flex gap-4 text-xs text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Cookies</a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};
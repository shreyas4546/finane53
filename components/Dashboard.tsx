import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransactionTable } from './TransactionTable';
import { FilterBar } from './FilterBar';
import { AuditDrawer } from './AuditDrawer';
import { ThemeToggle } from './ThemeToggle';
import { BulkActionBar } from './BulkActionBar';
import { I18nSelector } from './I18nSelector';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { LayoutDashboard, FileText, Bell, Settings, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const [isAuditOpen, setAuditOpen] = useState(false);
  const { isProcessing } = useTransactions();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-200">
      {/* Navigation */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-600 p-1.5 rounded-lg group-hover:bg-primary-700 transition-colors">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{t('app.name')}</span>
          </Link>

          <div className="flex items-center gap-4">
            <I18nSelector />
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <ThemeToggle />
            <button 
              onClick={() => setAuditOpen(true)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {t('nav.audit')}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('dash.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t('dash.subtitle')}</p>
        </div>

        <FilterBar />

        {/* AI Processing Indicator */}
        <div className="h-1 mb-1 overflow-hidden rounded-full bg-transparent">
          {isProcessing && (
             <motion.div 
               className="h-full bg-primary-500 w-full origin-left"
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 1, repeat: Infinity }}
             />
          )}
        </div>

        <TransactionTable />
        <BulkActionBar />
      </main>

      <AuditDrawer isOpen={isAuditOpen} onClose={() => setAuditOpen(false)} />
    </div>
  );
};
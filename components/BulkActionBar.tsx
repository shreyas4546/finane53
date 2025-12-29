import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { Button } from './ui/Button';
import { CheckSquare, AlertOctagon, RefreshCw, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../mockData';

export const BulkActionBar: React.FC = () => {
  const { isProcessing, bulkUpdateStatus, bulkUpdateCategory, selectedIds, clearSelection } = useTransactions();
  const { t } = useI18n();
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  
  if (selectedIds.size === 0) return null;

  const handleBulkFlag = () => {
    bulkUpdateStatus(Array.from(selectedIds), 'Flagged');
  };

  const handleBulkReview = () => {
    bulkUpdateStatus(Array.from(selectedIds), 'Reviewed');
  };

  const initiateCategoryUpdate = (category: string) => {
    setPendingCategory(category);
  };

  const confirmCategoryUpdate = async () => {
    if (pendingCategory) {
      await bulkUpdateCategory(Array.from(selectedIds), pendingCategory);
      setPendingCategory(null);
      setShowCategorySelect(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-6 border border-slate-700 dark:border-slate-700"
        >
          <div className="flex items-center gap-3 pr-4 border-r border-slate-700">
            <div className="bg-primary-500 text-xs font-bold px-2 py-0.5 rounded text-white">
              {selectedIds.size}
            </div>
            <span className="text-sm font-medium">{t('bulk.selected')}</span>
          </div>

          <div className="flex items-center gap-2">
            {showCategorySelect ? (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-200">
                <select 
                  autoFocus
                  className="text-sm bg-slate-800 dark:bg-slate-700 border border-slate-600 rounded-lg px-2 py-1.5 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  onChange={(e) => initiateCategoryUpdate(e.target.value)}
                  value=""
                >
                  <option value="" disabled>{t('bulk.cat.select')}</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setShowCategorySelect(false)} className="p-1 hover:text-rose-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700"
                isLoading={isProcessing && !pendingCategory}
                onClick={() => setShowCategorySelect(true)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('bulk.recategorize')}
              </Button>
            )}
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-rose-300 hover:text-rose-100 hover:bg-rose-900/30"
              isLoading={isProcessing && !pendingCategory}
              onClick={handleBulkFlag}
            >
              <AlertOctagon className="w-4 h-4 mr-2" />
              {t('bulk.flag')}
            </Button>

             <Button 
              size="sm" 
              variant="ghost" 
              className="text-emerald-300 hover:text-emerald-100 hover:bg-emerald-900/30"
              isLoading={isProcessing && !pendingCategory}
              onClick={handleBulkReview}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              {t('bulk.review')}
            </Button>
          </div>

          <button onClick={clearSelection} className="ml-2 text-slate-500 hover:text-white">
            {t('bulk.close')}
          </button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {pendingCategory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    onClick={() => setPendingCategory(null)}
                />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 z-10"
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Update</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                You are about to move <span className="font-semibold text-slate-900 dark:text-white">{selectedIds.size} transactions</span> to the <span className="font-semibold text-primary-600 dark:text-primary-400">"{pendingCategory}"</span> category.
                            </p>
                        </div>
                        <div className="flex gap-3 w-full mt-2">
                            <Button variant="secondary" className="flex-1" onClick={() => setPendingCategory(null)} disabled={isProcessing}>
                                Cancel
                            </Button>
                            <Button className="flex-1" onClick={confirmCategoryUpdate} isLoading={isProcessing}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
};
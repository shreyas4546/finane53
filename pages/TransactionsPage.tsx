import React, { useState } from 'react';
import { TransactionTable } from '../components/TransactionTable';
import { FilterBar } from '../components/FilterBar';
import { BulkActionBar } from '../components/BulkActionBar';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { Download, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const TransactionsPage: React.FC = () => {
  const { t } = useI18n();
  const { filteredTransactions, transactions } = useTransactions();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const handleExport = () => {
    // Mock export functionality
    const headers = ['Date', 'Merchant', 'Amount', 'Category', 'Risk Level', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => 
        [t.date, t.merchant, t.amount, t.category, t.riskLevel, t.status].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t('dash.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={clsx("gap-2 transition-colors", isFiltersOpen ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700" : "text-slate-500")}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t('filter.label')}
          </Button>
          <Button variant="secondary" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {isFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="overflow-hidden"
            >
              <FilterBar />
            </motion.div>
          )}
        </AnimatePresence>
        <TransactionTable />
      </div>
      
      <BulkActionBar />
    </div>
  );
};
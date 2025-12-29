import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { Badge } from './ui/Badge';
import { ConfidenceBar } from './ConfidenceBar';
import { ExplainModal } from './ExplainModal';
import { Transaction, RiskLevel } from '../types';
import { CATEGORIES } from '../mockData';
import { 
  ChevronDown, ChevronUp, Edit2, Sparkles, 
  AlertTriangle, ShieldCheck, AlertOctagon, MoreHorizontal 
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionTable: React.FC = () => {
  const { 
    filteredTransactions, 
    updateCategory, 
    sortConfig, 
    setSortConfig,
    selectedIds,
    toggleSelection,
    selectAll,
    clearSelection
  } = useTransactions();
  
  const { t, formatCurrency, currency } = useI18n();
  
  const [selectedTxForExplain, setSelectedTxForExplain] = useState<Transaction | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSort = (field: any) => {
    setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const SortIcon = ({ field }: { field: any }) => {
    if (sortConfig.field !== field) return <div className="w-4 h-4" />; // Spacer
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-primary-500" /> : <ChevronDown className="w-4 h-4 text-primary-500" />;
  };

  const renderRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'High':
        return (
          <Badge variant="danger" className="pl-1.5 pr-2.5 gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5" />
            High
          </Badge>
        );
      case 'Medium':
        return (
          <Badge variant="warning" className="pl-1.5 pr-2.5 gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Med
          </Badge>
        );
      default:
        return (
          <Badge variant="success" className="pl-1.5 pr-2.5 gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Low
          </Badge>
        );
    }
  };

  const handleCategoryChange = (txId: string, newCat: string) => {
    updateCategory(txId, newCat);
    setEditingId(null);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden ring-1 ring-slate-900/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-10">
                  <div className="flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer transition-colors"
                      onChange={(e) => {
                        if (e.target.checked) selectAll(filteredTransactions.map(t => t.id));
                        else clearSelection();
                      }}
                      checked={filteredTransactions.length > 0 && selectedIds.size === filteredTransactions.length}
                    />
                  </div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    {t('table.date')} <SortIcon field="date" />
                  </div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                  onClick={() => handleSort('merchant')}
                >
                   <div className="flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    {t('table.merchant')} <SortIcon field="merchant" />
                  </div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    {t('table.category')} <SortIcon field="category" />
                  </div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    {t('table.amount')} <SortIcon field="amount" />
                  </div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                  onClick={() => handleSort('riskLevel')}
                >
                   <div className="flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    {t('table.risk')} <SortIcon field="riskLevel" />
                  </div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none hidden lg:table-cell"
                  onClick={() => handleSort('confidenceScore')}
                >
                   <div className="flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                    {t('table.confidence')} <SortIcon field="confidenceScore" />
                  </div>
                </th>
                <th className="p-4 text-right">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((tx) => (
                  <motion.tr 
                    key={tx.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={clsx(
                      "hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group relative",
                      selectedIds.has(tx.id) && "bg-primary-50/60 dark:bg-primary-900/20"
                    )}
                  >
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                          checked={selectedIds.has(tx.id)}
                          onChange={() => toggleSelection(tx.id)}
                        />
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-mono whitespace-nowrap">
                      {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4 max-w-[140px] md:max-w-[200px]">
                      <div className="font-medium text-slate-900 dark:text-slate-100 truncate">{tx.merchant}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 truncate">{tx.description}</div>
                    </td>
                    <td className="p-4">
                      {editingId === tx.id ? (
                        <div className="relative">
                          <select 
                            autoFocus
                            className="w-full text-xs rounded-md border-primary-500 dark:border-primary-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-1 focus:ring-primary-500 py-1 pl-2 pr-6 appearance-none"
                            defaultValue={tx.category}
                            onChange={(e) => handleCategoryChange(tx.id, e.target.value)}
                            onBlur={() => setEditingId(null)}
                          >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                        </div>
                      ) : (
                        <div 
                          className="group/edit inline-flex items-center gap-2 cursor-pointer py-1 px-2 -ml-2 rounded-md hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all"
                          onClick={() => setEditingId(tx.id)}
                        >
                          <Badge variant="neutral" className="pointer-events-none">{tx.category}</Badge>
                          <Edit2 className="w-3 h-3 text-slate-400 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-sm font-mono font-medium text-slate-900 dark:text-slate-100">
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="p-4">
                      {renderRiskBadge(tx.riskLevel)}
                    </td>
                    <td className="p-4 w-32 hidden lg:table-cell">
                      <ConfidenceBar score={tx.confidenceScore} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedTxForExplain(tx)}
                          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-lg transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Explain
                        </button>
                        <button 
                          onClick={() => setSelectedTxForExplain(tx)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
                        >
                            <Sparkles className="w-5 h-5 text-primary-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">No transactions found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                We couldn't find any transactions matching your current filters. Try adjusting your search or clearing filters.
              </p>
            </div>
          )}
        </div>
      </div>

      <ExplainModal 
        isOpen={!!selectedTxForExplain} 
        transaction={selectedTxForExplain} 
        onClose={() => setSelectedTxForExplain(null)} 
      />
    </>
  );
};
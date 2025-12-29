import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { Badge } from './ui/Badge';
import { ConfidenceBar } from './ConfidenceBar';
import { ExplainModal } from './ExplainModal';
import { Transaction, RiskLevel } from '../types';
import { CATEGORIES } from '../mockData';
import { Info, AlertTriangle, Check, ChevronDown, ChevronUp, Edit2, FileText, ShieldCheck, AlertOctagon } from 'lucide-react';
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
    if (sortConfig.field !== field) return <div className="w-4 h-4 opacity-0" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
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
            Medium
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
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-primary-600 focus:ring-primary-500"
                    onChange={(e) => {
                      if (e.target.checked) selectAll(filteredTransactions.map(t => t.id));
                      else clearSelection();
                    }}
                    checked={filteredTransactions.length > 0 && selectedIds.size === filteredTransactions.length}
                  />
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">{t('table.date')} <SortIcon field="date" /></div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  onClick={() => handleSort('merchant')}
                >
                   <div className="flex items-center gap-1">{t('table.merchant')} <SortIcon field="merchant" /></div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">{t('table.category')} <SortIcon field="category" /></div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-1">{t('table.amount')} ({currency}) <SortIcon field="amount" /></div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => handleSort('riskLevel')}
                >
                   <div className="flex items-center gap-1">{t('table.risk')} <SortIcon field="riskLevel" /></div>
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => handleSort('confidenceScore')}
                >
                   <div className="flex items-center gap-1">{t('table.confidence')} <SortIcon field="confidenceScore" /></div>
                </th>
                <th className="p-4 text-right">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {filteredTransactions.map((tx) => (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={clsx(
                      "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group",
                      selectedIds.has(tx.id) && "bg-primary-50 dark:bg-primary-900/10"
                    )}
                  >
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-primary-600 focus:ring-primary-500"
                        checked={selectedIds.has(tx.id)}
                        onChange={() => toggleSelection(tx.id)}
                      />
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-mono">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{tx.merchant}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 truncate max-w-[200px]">{tx.description}</div>
                    </td>
                    <td className="p-4">
                      {editingId === tx.id ? (
                        <select 
                          autoFocus
                          className="text-sm rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 py-1 pl-2 pr-8"
                          defaultValue={tx.category}
                          onChange={(e) => handleCategoryChange(tx.id, e.target.value)}
                          onBlur={() => setEditingId(null)}
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <div 
                          className="flex items-center gap-2 cursor-pointer group/cat"
                          onClick={() => setEditingId(tx.id)}
                        >
                          <Badge variant="neutral">{tx.category}</Badge>
                          <Edit2 className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover/cat:text-slate-500 dark:group-hover/cat:text-slate-400 opacity-0 group-hover/cat:opacity-100 transition-all" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-sm font-mono font-medium text-slate-900 dark:text-slate-100">
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="p-4">
                      {renderRiskBadge(tx.riskLevel)}
                    </td>
                    <td className="p-4">
                      <ConfidenceBar score={tx.confidenceScore} />
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedTxForExplain(tx)}
                        className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ml-auto border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {t('action.details')}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
              {t('table.no_results')}
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
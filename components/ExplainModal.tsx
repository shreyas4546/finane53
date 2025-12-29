import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { Transaction } from '../types';
import { Badge } from './ui/Badge';
import { ConfidenceBar } from './ConfidenceBar';
import { useI18n } from '../context/I18nContext';

interface ExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({ isOpen, onClose, transaction }) => {
  const { t } = useI18n();

  if (!isOpen || !transaction) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/40 rounded-lg">
                <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('modal.title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('modal.model')}: {transaction.aiReasoning.modelUsed}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            
            {/* Main Insight */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('modal.reasoning')}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                "{transaction.aiReasoning.primaryReason}"
              </p>
            </div>

            {/* Keyword Analysis */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-slate-400" />
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">{t('modal.keywords')}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {transaction.aiReasoning.keywords.map((kw, i) => (
                  <span key={i} className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300">
                    "{kw}"
                  </span>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-slate-400" />
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">{t('modal.risk')}</h4>
              </div>
              
              {transaction.aiReasoning.riskFactors.length > 0 ? (
                <ul className="space-y-2">
                  {transaction.aiReasoning.riskFactors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 p-2 rounded border border-rose-100 dark:border-rose-800">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded border border-emerald-100 dark:border-emerald-800">
                  <CheckCircle className="w-4 h-4" />
                  {t('modal.norisk')}
                </div>
              )}
            </div>

            {/* Confidence Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t('modal.conf_label')}</p>
                <ConfidenceBar score={transaction.confidenceScore} />
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t('modal.cat_label')}</p>
                <Badge variant="neutral">{transaction.category}</Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, User, Activity } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';

interface AuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditDrawer: React.FC<AuditDrawerProps> = ({ isOpen, onClose }) => {
  const { auditLog } = useTransactions();
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <h2 className="font-semibold text-slate-800 dark:text-slate-200">{t('audit.title')}</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {auditLog.length === 0 ? (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>{t('audit.empty')}</p>
                </div>
              ) : (
                <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8">
                  {auditLog.map((log) => (
                    <div key={log.id} className="relative pl-6">
                      <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white dark:bg-slate-900 border-2 border-primary-500 ring-4 ring-white dark:ring-slate-900" />
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {log.action.replace('_', ' ')}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{log.details}</p>
                        
                        {log.userOverride && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded w-fit border border-amber-100 dark:border-amber-800">
                            <User className="w-3 h-3" />
                            {t('audit.override')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
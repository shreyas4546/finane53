import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { History, User, Shield, Tag, RefreshCw } from 'lucide-react';

export const AuditPage: React.FC = () => {
  const { auditLog } = useTransactions();
  const { t } = useI18n();

  const getIcon = (action: string) => {
      if (action.includes('CATEGORY')) return Tag;
      if (action.includes('RISK') || action.includes('REVIEW')) return Shield;
      if (action.includes('BULK')) return RefreshCw;
      return History;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="text-primary-600" />
            Audit Trail
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
            Immutable log of all AI and user actions for compliance and traceability.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="p-4">Timestamp</th>
                        <th className="p-4">Action Type</th>
                        <th className="p-4">User</th>
                        <th className="p-4">Target ID(s)</th>
                        <th className="p-4">Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {auditLog.length === 0 ? (
                         <tr>
                            <td colSpan={5} className="p-12 text-center text-slate-500">
                                No audit records found. Interact with transactions to generate logs.
                            </td>
                         </tr>
                    ) : (
                        auditLog.map(log => {
                            const Icon = getIcon(log.action);
                            return (
                                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 text-sm font-mono text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                            <Icon className="w-3 h-3" />
                                            {log.action.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {log.userOverride ? (
                                            <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded w-fit border border-amber-100 dark:border-amber-800">
                                                <User className="w-3 h-3" />
                                                Human
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-500">System (AI)</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-xs font-mono text-slate-400">
                                        {Array.isArray(log.targetId) ? `${log.targetId.length} items` : log.targetId}
                                    </td>
                                    <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                                        {log.details}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
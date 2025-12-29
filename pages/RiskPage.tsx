import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { 
  AlertOctagon, ShieldAlert, AlertTriangle, 
  ArrowUpRight, CheckCircle, Search, Sparkles
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { ConfidenceBar } from '../components/ConfidenceBar';
import { ExplainModal } from '../components/ExplainModal';
import { Transaction } from '../types';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Button } from '../components/ui/Button';

export const RiskPage: React.FC = () => {
  const { transactions, updateStatus } = useTransactions();
  const { formatCurrency } = useI18n();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Filter for Medium and High risk
  const riskTransactions = transactions.filter(t => t.riskLevel === 'High' || t.riskLevel === 'Medium');
  const highRiskCount = transactions.filter(t => t.riskLevel === 'High').length;
  const medRiskCount = transactions.filter(t => t.riskLevel === 'Medium').length;
  const totalRiskValue = riskTransactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertOctagon className="w-8 h-8 text-rose-600" />
            Risk & Anomalies
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            AI-detected irregularities requiring human attention. The model flags transactions based on historical patterns, merchant categorization, and amount thresholds.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" size="sm">Configure Model</Button>
           <Button variant="ghost" size="sm">Download Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/40 rounded-lg text-rose-600 dark:text-rose-400">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-rose-900 dark:text-rose-200">Critical Risks</span>
           </div>
           <div className="text-3xl font-bold text-slate-900 dark:text-white">{highRiskCount}</div>
           <div className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center">
             <ArrowUpRight className="w-3 h-3 mr-1" />
             +2 from yesterday
           </div>
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-amber-900 dark:text-amber-200">Medium Risks</span>
           </div>
           <div className="text-3xl font-bold text-slate-900 dark:text-white">{medRiskCount}</div>
           <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center">
             No change
           </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Value Exposed</span>
           </div>
           <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{formatCurrency(totalRiskValue)}</div>
           <div className="text-xs text-slate-500 mt-1">
             Across {riskTransactions.length} transactions
           </div>
        </div>

         <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Model Precision</span>
           </div>
           <div className="text-3xl font-bold text-slate-900 dark:text-white">94.2%</div>
           <div className="text-xs text-emerald-600 mt-1 flex items-center">
             <CheckCircle className="w-3 h-3 mr-1" />
             Validated by audit
           </div>
        </div>
      </div>

      {/* Main List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Detected Anomalies</h3>
        
        {riskTransactions.length === 0 ? (
           <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
             <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4">
               <CheckCircle className="w-8 h-8 text-emerald-500" />
             </div>
             <h3 className="text-lg font-medium text-slate-900 dark:text-white">All Clear</h3>
             <p className="text-slate-500 dark:text-slate-400 mt-1">No high or medium risk transactions detected in the current view.</p>
           </div>
        ) : (
          <div className="grid gap-4">
            {riskTransactions.map((tx, idx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedTx(tx)}
                className={clsx(
                  "group relative bg-white dark:bg-slate-900 rounded-xl border p-5 shadow-sm transition-all hover:shadow-lg cursor-pointer",
                  tx.riskLevel === 'High' 
                    ? "border-l-4 border-l-rose-500 border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800" 
                    : "border-l-4 border-l-amber-500 border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800"
                )}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Basic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                         <h4 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{tx.merchant}</h4>
                         <span className="text-xs font-mono text-slate-500">{new Date(tx.date).toLocaleDateString()}</span>
                      </div>
                      <div className="md:hidden">
                        <Badge variant={tx.riskLevel === 'High' ? 'danger' : 'warning'}>{tx.riskLevel}</Badge>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:border-primary-100 dark:group-hover:border-primary-900/30 transition-colors">
                        <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                          AI Analysis: 
                        </span>
                        {tx.aiReasoning.primaryReason}
                        <span className="block mt-1 text-xs text-primary-600 dark:text-primary-400 font-medium">Click to view full reasoning &rarr;</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {tx.aiReasoning.riskFactors.map(factor => (
                        <span key={factor} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Metrics & Actions */}
                  <div className="flex flex-col items-end gap-4 min-w-[200px] border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                    <div className="text-right">
                       <p className="text-sm text-slate-500 dark:text-slate-400">Transaction Amount</p>
                       <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{formatCurrency(tx.amount)}</p>
                    </div>

                    <div className="w-full">
                       <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Risk Confidence</span>
                          <span>{tx.confidenceScore}%</span>
                       </div>
                       <ConfidenceBar score={tx.confidenceScore} />
                    </div>

                    <div className="flex items-center gap-2 w-full mt-auto">
                       <Button 
                        size="sm" 
                        variant="secondary" 
                        className="flex-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(tx.id, 'Reviewed');
                        }}
                       >
                         <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                         Safe
                       </Button>
                       <Button 
                        size="sm" 
                        variant="secondary" 
                        className="flex-1 text-xs border-rose-200 hover:bg-rose-50 text-rose-700 dark:border-rose-900/30 dark:hover:bg-rose-900/20 dark:text-rose-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(tx.id, 'Flagged');
                        }}
                       >
                         <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
                         Escalate
                       </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ExplainModal 
        isOpen={!!selectedTx} 
        transaction={selectedTx} 
        onClose={() => setSelectedTx(null)} 
      />
    </div>
  );
};
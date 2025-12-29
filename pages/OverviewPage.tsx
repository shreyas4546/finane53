import React, { useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { ArrowUpRight, ArrowDownRight, Activity, AlertOctagon, CheckCircle, PieChart as PieChartIcon, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoItem } from '../components/BentoGrid';

// Helper for simple SVG charts
const AreaChart = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - ((d - min) / (max - min)) * 100}`).join(' ');
  
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className={color} />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" className={color} />
        </linearGradient>
      </defs>
      <path d={`M0,100 ${points} 100,100 Z`} fill={`url(#gradient-${color})`} />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className={color} vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

export const OverviewPage: React.FC = () => {
  const { transactions } = useTransactions();
  const { formatCurrency } = useI18n();

  // Calculations
  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const riskCount = transactions.filter(t => t.riskLevel === 'High').length;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;
  const avgConfidence = transactions.reduce((sum, t) => sum + t.confidenceScore, 0) / transactions.length;

  // Mock Trend Data (derived loosely or static for visual demo)
  const spendTrendData = [450, 620, 580, 810, 750, 920, 1100, 1050, 1300, 1250, 1400, 1600];
  
  // Category Breakdown
  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    transactions.forEach(t => {
      map.set(t.category, (map.get(t.category) || 0) + t.amount);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [transactions]);
  
  const maxCategoryAmount = Math.max(...categoryData.map(([, amount]) => amount));

  const stats = [
    { 
      label: 'Total Monthly Spend', 
      value: formatCurrency(totalSpend), 
      change: '+12.5% vs last mo', 
      trend: 'up',
      icon: Activity,
      color: 'text-primary-600',
      bg: 'bg-primary-50 dark:bg-primary-900/20'
    },
    { 
      label: 'Critical Risk Alerts', 
      value: riskCount, 
      change: '-2 vs last mo', 
      trend: 'down',
      icon: AlertOctagon,
      color: 'text-rose-600',
      bg: 'bg-rose-50 dark:bg-rose-900/20'
    },
    { 
      label: 'Model Confidence', 
      value: `${Math.round(avgConfidence)}%`, 
      change: '+1.2% improvement', 
      trend: 'up',
      icon: PieChartIcon,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    { 
      label: 'Pending Review', 
      value: pendingCount, 
      change: 'Requires attention', 
      trend: 'neutral',
      icon: CheckCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">AI-driven analysis of your organization's expenditure.</p>
        </div>
        <div className="text-sm text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          Last updated: <span className="font-mono text-slate-600 dark:text-slate-300">Today, 09:41 AM</span>
        </div>
      </div>

      {/* KPI Grid */}
      <BentoGrid>
        {stats.map((stat, i) => (
          <BentoItem
            key={stat.label}
            delay={i * 0.1}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              {stat.trend !== 'neutral' && (
                 <div className={`flex items-center text-xs font-medium ${
                    stat.trend === 'up' && stat.color === 'text-rose-600' ? 'text-rose-600' : // Bad up
                    stat.trend === 'up' ? 'text-emerald-600' : // Good up
                    stat.trend === 'down' && stat.color === 'text-rose-600' ? 'text-emerald-600' : // Good down (risk)
                    'text-rose-600' // Bad down
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    <span className="text-slate-500">{stat.change}</span>
                 </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
          </BentoItem>
        ))}
      </BentoGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Spending Trend</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">30-day running total vs projected</p>
            </div>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View Report</button>
          </div>
          <div className="h-64 relative">
             <div className="absolute inset-0 flex items-end justify-between px-2 pointer-events-none">
                 {/* Simple grid lines/labels could go here */}
             </div>
             <AreaChart data={spendTrendData} color="text-primary-500" />
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-md">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Daily Digest</h3>
            </div>
            
            <div className="space-y-4 flex-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-3">
                        <TrendingUp className="w-4 h-4 text-rose-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Unusual Spike in 'Software'</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Spending is 45% higher than the 3-month moving average.</p>
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-3">
                        <AlertOctagon className="w-4 h-4 text-amber-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">New Vendor Detected</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">First time transaction with "Global Consulting Corp" flagged for review.</p>
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Recurring Payment Identified</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">AWS subscription confirmed with 99.8% confidence.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors border border-dashed border-slate-300 dark:border-slate-700">
                Generate more insights
            </button>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
         <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Categories by Spend</h3>
         <div className="space-y-4">
            {categoryData.map(([cat, amount], i) => (
                <div key={cat} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-600 dark:text-slate-300 truncate">{cat}</div>
                    <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(amount / maxCategoryAmount) * 100}%` }}
                            transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                            className={`h-full rounded-full ${
                                i === 0 ? 'bg-primary-500' :
                                i === 1 ? 'bg-indigo-500' :
                                i === 2 ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                        />
                    </div>
                    <div className="w-24 text-right text-sm font-mono text-slate-900 dark:text-slate-100">
                        {formatCurrency(amount)}
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};
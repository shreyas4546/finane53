import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';
import { useI18n } from '../context/I18nContext';
import { CATEGORIES } from '../mockData';
import { Search, Filter } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const { filters, setFilters } = useTransactions();
  const { t, formatCurrency, exchangeRate, currency } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync URL to Context
  useEffect(() => {
    const newFilters = {
      search: searchParams.get('q') || '',
      category: searchParams.get('cat') || '',
      riskLevel: searchParams.get('risk') || '',
      minAmount: searchParams.get('min') || '',
      maxAmount: searchParams.get('max') || '',
      dateRange: (searchParams.get('date') as any) || 'all',
    };
    // Only update if different to avoid infinite loop
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Clear amount filters when currency changes to avoid confusing thresholds
  useEffect(() => {
    if (filters.minAmount || filters.maxAmount) {
      updateParams({ min: null, max: null });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const updateParam = (key: string, value: string) => {
    const prev = Object.fromEntries(searchParams.entries());
    if (value) {
      prev[key] = value;
    } else {
      delete prev[key];
    }
    setSearchParams(prev);
  };

  const updateParams = (updates: Record<string, string | null>) => {
    const prev = Object.fromEntries(searchParams.entries());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        prev[key] = value;
      } else {
        delete prev[key];
      }
    });
    setSearchParams(prev);
  };

  // Base USD tiers
  const TIER_1 = 100;
  const TIER_2 = 500;
  const TIER_3 = 1000;

  // Calculate current currency thresholds
  const thresholds = useMemo(() => {
    return {
      t1: Math.round(TIER_1 * exchangeRate),
      t2: Math.round(TIER_2 * exchangeRate),
      t3: Math.round(TIER_3 * exchangeRate)
    };
  }, [exchangeRate]);

  const { t1, t2, t3 } = thresholds;

  const handleAmountChange = (value: string) => {
    switch (value) {
      case 'tier1':
        updateParams({ min: '0', max: t1.toString() });
        break;
      case 'tier2':
        updateParams({ min: t1.toString(), max: t2.toString() });
        break;
      case 'tier3':
        updateParams({ min: t2.toString(), max: t3.toString() });
        break;
      case 'tier4':
        updateParams({ min: t3.toString(), max: null });
        break;
      default:
        updateParams({ min: null, max: null });
        break;
    }
  };

  const getAmountValue = () => {
    const min = filters.minAmount;
    const max = filters.maxAmount;
    
    if (min === '0' && max === t1.toString()) return 'tier1';
    if (min === t1.toString() && max === t2.toString()) return 'tier2';
    if (min === t2.toString() && max === t3.toString()) return 'tier3';
    if (min === t3.toString() && !max) return 'tier4';
    return '';
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder={t('filter.search')}
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:placeholder-slate-500 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          value={filters.search}
          onChange={(e) => updateParam('q', e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">{t('filter.label')}</span>
        </div>

        <select 
          className="form-select text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-lg focus:border-primary-500 focus:ring-primary-500"
          value={filters.category}
          onChange={(e) => updateParam('cat', e.target.value)}
        >
          <option value="">{t('filter.cat.all')}</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select 
          className="form-select text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-lg focus:border-primary-500 focus:ring-primary-500 min-w-[140px]"
          value={getAmountValue()}
          onChange={(e) => handleAmountChange(e.target.value)}
        >
          <option value="">{t('filter.amount.any')}</option>
          <option value="tier1">Under {formatCurrency(TIER_1)}</option>
          <option value="tier2">{formatCurrency(TIER_1)} - {formatCurrency(TIER_2)}</option>
          <option value="tier3">{formatCurrency(TIER_2)} - {formatCurrency(TIER_3)}</option>
          <option value="tier4">Over {formatCurrency(TIER_3)}</option>
        </select>

        <select 
          className="form-select text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-lg focus:border-primary-500 focus:ring-primary-500"
          value={filters.riskLevel}
          onChange={(e) => updateParam('risk', e.target.value)}
        >
          <option value="">{t('filter.risk.all')}</option>
          <option value="Low">{t('filter.risk.low')}</option>
          <option value="Medium">{t('filter.risk.medium')}</option>
          <option value="High">{t('filter.risk.high')}</option>
        </select>

        <select 
          className="form-select text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-lg focus:border-primary-500 focus:ring-primary-500"
          value={filters.dateRange}
          onChange={(e) => updateParam('date', e.target.value)}
        >
          <option value="all">{t('filter.date.all')}</option>
          <option value="7d">{t('filter.date.7d')}</option>
          <option value="30d">{t('filter.date.30d')}</option>
        </select>
      </div>
    </div>
  );
};
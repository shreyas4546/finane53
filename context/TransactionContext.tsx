import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Transaction, AuditLogEntry, FilterState, RiskLevel, TransactionStatus, SortField, SortDirection } from '../types';
import { MOCK_TRANSACTIONS } from '../mockData';
import { v4 as uuidv4 } from 'uuid';
import { useI18n } from './I18nContext';

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

interface TransactionContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  auditLog: AuditLogEntry[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  updateCategory: (id: string, newCategory: string) => Promise<void>;
  updateStatus: (id: string, status: TransactionStatus) => void;
  bulkUpdateStatus: (ids: string[], status: TransactionStatus) => Promise<void>;
  bulkUpdateCategory: (ids: string[], category: string) => Promise<void>;
  isProcessing: boolean;
  sortConfig: { field: SortField; direction: SortDirection };
  setSortConfig: (config: { field: SortField; direction: SortDirection }) => void;
  // Selection
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection }>({
    field: 'date',
    direction: 'desc',
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const { exchangeRate } = useI18n();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    riskLevel: '',
    minAmount: '',
    maxAmount: '',
    dateRange: 'all',
  });

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => 
        t.merchant.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.riskLevel) {
      result = result.filter(t => t.riskLevel === filters.riskLevel);
    }

    // Convert transaction amount (Base USD) to Display Currency for filtering
    if (filters.minAmount) {
      result = result.filter(t => (t.amount * exchangeRate) >= Number(filters.minAmount));
    }

    if (filters.maxAmount) {
      result = result.filter(t => (t.amount * exchangeRate) <= Number(filters.maxAmount));
    }

    // Sort Logic
    result.sort((a, b) => {
      let valA: any = a[sortConfig.field];
      let valB: any = b[sortConfig.field];

      // Handle risk level sorting numerically
      if (sortConfig.field === 'riskLevel') {
        const riskMap = { Low: 1, Medium: 2, High: 3 };
        valA = riskMap[a.riskLevel];
        valB = riskMap[b.riskLevel];
      } else if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortConfig.direction === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, filters, sortConfig, exchangeRate]);

  const addAuditLog = (action: AuditLogEntry['action'], targetId: string | string[], details: string, userOverride: boolean) => {
    const entry: AuditLogEntry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      action,
      targetId,
      details,
      userOverride
    };
    setAuditLog(prev => [entry, ...prev]);
  };

  const updateCategory = async (id: string, newCategory: string) => {
    setIsProcessing(true);
    // Simulate AI Latency
    await new Promise(resolve => setTimeout(resolve, 600));

    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          category: newCategory,
          confidenceScore: 100, // Validated by human
          aiReasoning: {
            ...t.aiReasoning,
            primaryReason: 'Manually re-categorized by user. Model retrained on correction.',
            modelUsed: 'Human-In-The-Loop'
          }
        };
      }
      return t;
    }));

    addAuditLog('UPDATE_CATEGORY', id, `Category changed to ${newCategory}`, true);
    setIsProcessing(false);
  };

  const updateStatus = (id: string, status: TransactionStatus) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    addAuditLog(status === 'Flagged' ? 'FLAG_RISK' : 'REVIEW', id, `Status updated to ${status}`, true);
  };

  const bulkUpdateStatus = async (ids: string[], status: TransactionStatus) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTransactions(prev => prev.map(t => ids.includes(t.id) ? { ...t, status } : t));
    addAuditLog('BULK_UPDATE', ids, `Bulk status update to ${status}`, true);
    setSelectedIds(new Set()); // Clear selection after action
    setIsProcessing(false);
  };

  const bulkUpdateCategory = async (ids: string[], category: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    setTransactions(prev => prev.map(t => {
      if (ids.includes(t.id)) {
        return {
          ...t,
          category,
          confidenceScore: 100,
          aiReasoning: {
            ...t.aiReasoning,
            primaryReason: 'Batch correction applied by user.'
          }
        };
      }
      return t;
    }));
    addAuditLog('BULK_UPDATE', ids, `Bulk category update to ${category}`, true);
    setSelectedIds(new Set()); // Clear selection after action
    setIsProcessing(false);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const selectAll = (ids: string[]) => {
    setSelectedIds(new Set(ids));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      filteredTransactions,
      auditLog,
      filters,
      setFilters,
      updateCategory,
      updateStatus,
      bulkUpdateStatus,
      bulkUpdateCategory,
      isProcessing,
      sortConfig,
      setSortConfig,
      selectedIds,
      toggleSelection,
      selectAll,
      clearSelection
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
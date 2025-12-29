
export type RiskLevel = 'Low' | 'Medium' | 'High';

export type TransactionStatus = 'Pending' | 'Reviewed' | 'Flagged';

export interface Transaction {
  id: string;
  date: string; // ISO Date string
  merchant: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  riskLevel: RiskLevel;
  confidenceScore: number; // 0-100
  status: TransactionStatus;
  aiReasoning: {
    primaryReason: string;
    keywords: string[];
    riskFactors: string[];
    modelUsed: string;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'UPDATE_CATEGORY' | 'FLAG_RISK' | 'BULK_UPDATE' | 'REVIEW';
  targetId: string | string[]; // Transaction ID(s)
  details: string;
  userOverride: boolean;
}

export interface FilterState {
  search: string;
  category: string;
  riskLevel: string;
  minAmount: string;
  maxAmount: string;
  dateRange: 'all' | '7d' | '30d' | '90d';
}

export type SortField = 'date' | 'amount' | 'riskLevel' | 'confidenceScore' | 'merchant' | 'category';
export type SortDirection = 'asc' | 'desc';

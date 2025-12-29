import { Transaction } from './types';

export const CATEGORIES = [
  'Travel', 'Food & Dining', 'Software', 'Office Supplies', 'Marketing', 'Utilities', 'Professional Services'
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_001',
    date: '2023-10-24T14:30:00Z',
    merchant: 'Uber Technologies',
    description: 'Uber Ride - SFO to Downtown',
    category: 'Travel',
    amount: 45.50,
    currency: 'USD',
    riskLevel: 'Low',
    confidenceScore: 98,
    status: 'Reviewed',
    aiReasoning: {
      primaryReason: 'Merchant "Uber" strongly associated with category "Travel".',
      keywords: ['Uber', 'Ride', 'SFO'],
      riskFactors: [],
      modelUsed: 'FinBERT-v2'
    }
  },
  {
    id: 'tx_002',
    date: '2023-10-23T09:15:00Z',
    merchant: 'AWS Web Services',
    description: 'Monthly Cloud Infrastructure Bill',
    category: 'Software',
    amount: 1250.00,
    currency: 'USD',
    riskLevel: 'Low',
    confidenceScore: 99,
    status: 'Pending',
    aiReasoning: {
      primaryReason: 'Recurring high-value payment to known tech vendor.',
      keywords: ['AWS', 'Cloud', 'Bill'],
      riskFactors: [],
      modelUsed: 'FinBERT-v2'
    }
  },
  {
    id: 'tx_003',
    date: '2023-10-22T23:45:00Z',
    merchant: 'Unknown Vendor 882',
    description: 'Purchase at 882 Holdings Ltd',
    category: 'Professional Services',
    amount: 24500.00,
    currency: 'USD',
    riskLevel: 'High',
    confidenceScore: 65,
    status: 'Flagged',
    aiReasoning: {
      primaryReason: 'Large round number amount at unusual time (23:45).',
      keywords: ['Holdings', 'Ltd'],
      riskFactors: ['Unusual Time', 'Round Amount', 'Unknown Merchant'],
      modelUsed: 'Anomaly-G3'
    }
  },
  {
    id: 'tx_004',
    date: '2023-10-22T12:00:00Z',
    merchant: 'Starbucks',
    description: 'Coffee and Pastries for Team',
    category: 'Food & Dining',
    amount: 35.20,
    currency: 'USD',
    riskLevel: 'Low',
    confidenceScore: 96,
    status: 'Pending',
    aiReasoning: {
      primaryReason: 'Micro-transaction at known food chain.',
      keywords: ['Starbucks', 'Coffee'],
      riskFactors: [],
      modelUsed: 'FinBERT-v2'
    }
  },
  {
    id: 'tx_005',
    date: '2023-10-21T03:30:00Z',
    merchant: 'Electronics Store',
    description: 'High-end GPU Cluster Purchase',
    category: 'Office Supplies',
    amount: 8999.99,
    currency: 'USD',
    riskLevel: 'Medium',
    confidenceScore: 78,
    status: 'Pending',
    aiReasoning: {
      primaryReason: 'High value hardware purchase requires manager approval.',
      keywords: ['GPU', 'Cluster', 'Purchase'],
      riskFactors: ['High Amount', 'Asset Purchase'],
      modelUsed: 'Risk-X1'
    }
  },
  {
    id: 'tx_006',
    date: '2023-10-20T18:20:00Z',
    merchant: 'Delta Airlines',
    description: 'Flight to NY',
    category: 'Travel',
    amount: 450.00,
    currency: 'USD',
    riskLevel: 'Low',
    confidenceScore: 95,
    status: 'Pending',
    aiReasoning: {
      primaryReason: 'Merchant matches travel category.',
      keywords: ['Delta', 'Flight', 'NY'],
      riskFactors: [],
      modelUsed: 'FinBERT-v2'
    }
  },
  {
    id: 'tx_007',
    date: '2023-10-19T14:00:00Z',
    merchant: 'Slack Technologies',
    description: 'Annual Subscription',
    category: 'Software',
    amount: 1500.00,
    currency: 'USD',
    riskLevel: 'Low',
    confidenceScore: 99,
    status: 'Reviewed',
    aiReasoning: {
      primaryReason: 'Standard software subscription.',
      keywords: ['Slack', 'Subscription'],
      riskFactors: [],
      modelUsed: 'FinBERT-v2'
    }
  },
  {
    id: 'tx_008',
    date: '2023-10-18T20:15:00Z',
    merchant: 'Local Bistro',
    description: 'Client Dinner',
    category: 'Food & Dining',
    amount: 210.50,
    currency: 'USD',
    riskLevel: 'Medium',
    confidenceScore: 82,
    status: 'Pending',
    aiReasoning: {
      primaryReason: 'Dinner expense slightly above average threshold.',
      keywords: ['Bistro', 'Dinner'],
      riskFactors: ['Above Average Amount'],
      modelUsed: 'Anomaly-G3'
    }
  }
];

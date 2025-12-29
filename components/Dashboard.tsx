// This file is deprecated. 
// Functionality has been moved to:
// - components/AppLayout.tsx (Header/Layout)
// - pages/TransactionsPage.tsx (Main content)
import React from 'react';
import { Navigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return <Navigate to="/app/transactions" replace />;
};
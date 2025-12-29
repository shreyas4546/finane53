import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { Home } from './components/Home';
import { AppLayout } from './components/AppLayout';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { RiskPage } from './pages/RiskPage';
import { AuditPage } from './pages/AuditPage';
import { ModelPage } from './pages/ModelPage';

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <HashRouter>
          <TransactionProvider>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<Home />} />
              
              {/* App Routes */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate to="/app/overview" replace />} />
                <Route path="overview" element={<OverviewPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="risk" element={<RiskPage />} />
                <Route path="audit" element={<AuditPage />} />
                <Route path="model" element={<ModelPage />} />
              </Route>

              {/* Legacy/Convenience Redirects */}
              <Route path="/dashboard" element={<Navigate to="/app/transactions" replace />} />
            </Routes>
          </TransactionProvider>
        </HashRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
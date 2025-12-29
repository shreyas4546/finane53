import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Home } from './components/Home';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { CursorTrail } from './components/CursorTrail';
import { LoadingScreen } from './components/LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { RiskPage } from './pages/RiskPage';
import { AuditPage } from './pages/AuditPage';
import { ModelPage } from './pages/ModelPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <CursorTrail />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <LoadingScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <I18nProvider>
              <AuthProvider>
                <HashRouter>
                  <TransactionProvider>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<LoginPage />} />
                      
                      {/* Protected App Routes */}
                      <Route path="/app" element={
                        <ProtectedRoute>
                          <AppLayout />
                        </ProtectedRoute>
                      }>
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
              </AuthProvider>
            </I18nProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;

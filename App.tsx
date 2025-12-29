import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';

// We use HashRouter here as requested to avoid server configuration issues in static/demo environments
function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <HashRouter>
          <TransactionProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </TransactionProvider>
        </HashRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
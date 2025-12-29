import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { I18nSelector } from './I18nSelector';
import { useI18n } from '../context/I18nContext';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import { 
  PieChart, Bell, LayoutGrid, List, AlertOctagon, 
  History, Settings, Menu, X, Search, ChevronRight,
  LogOut, User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const AppLayout: React.FC = () => {
  const { t } = useI18n();
  const { isProcessing } = useTransactions();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navItems = [
    { path: '/app/overview', icon: LayoutGrid, label: 'Overview' },
    { path: '/app/transactions', icon: List, label: 'Transactions' },
    { path: '/app/risk', icon: AlertOctagon, label: 'Risk & Anomalies' },
    { path: '/app/audit', icon: History, label: 'Audit Trail' },
    { path: '/app/model', icon: Settings, label: 'Model Behavior' },
  ];

  const getPageTitle = () => {
    const current = navItems.find(item => item.path === location.pathname);
    return current ? current.label : 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const Sidebar = () => (
    <aside className={clsx(
      "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Logo Area */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-500/20">
          <PieChart className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white block leading-none">{t('app.name')}</span>
          <span className="text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-0.5">Enterprise</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)} 
          className="lg:hidden ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
          Main Menu
        </p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive 
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <item.icon className={clsx("w-5 h-5 transition-colors", isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
              <span className="relative z-10">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 dark:bg-primary-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Snippet */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold border-2 border-white dark:border-slate-700 shadow-sm">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.role || 'Viewer'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200">
      <Sidebar />
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0 w-full">
          
          {/* Mobile Search Overlay */}
          <AnimatePresence>
            {isMobileSearchOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 z-50 bg-white dark:bg-slate-900 px-4 flex items-center gap-3 md:hidden border-b border-slate-200 dark:border-slate-800"
                >
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="Search transactions..." 
                        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 h-full"
                        onBlur={() => setIsMobileSearchOpen(false)}
                    />
                    <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 text-slate-500">
                        <X className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Breadcrumbs */}
            <div className={clsx("flex flex-col", isMobileSearchOpen ? "invisible" : "visible")}>
              <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                 <span>Application</span>
                 <ChevronRight className="w-3 h-3" />
                 <span className="text-slate-900 dark:text-slate-200">Finance AI</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{getPageTitle()}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Trigger */}
            <button 
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
                <Search className="w-5 h-5" />
            </button>

            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary-500 w-64 transition-all focus:w-80"
              />
            </div>
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-2" />
            
            <div className="flex items-center gap-2">
              <I18nSelector />
              <ThemeToggle />
              <button className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
              </button>
            </div>
          </div>

           {/* AI Processing Bar - Global */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden bg-transparent">
              {isProcessing && (
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary-400 to-indigo-500 w-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
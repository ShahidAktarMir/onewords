import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, User, LogOut, History } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { useAuth } from '@/contexts/AuthContext';
import { APP_CONFIG } from '@/utils/constants';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen } = useAppSelector(state => state.ui);
  const { appState } = useAppSelector(state => state.app);
  const { user, logout, isAuthenticated } = useAuth();

  const showMenuButton = appState === 'test';
  const isAuthPage = location.pathname === '/auth';

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-card shadow-lg border-b border-slate-200/50 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => isAuthenticated && navigate('/import')}
            >
              <GraduationCap className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  {APP_CONFIG.name}
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  {APP_CONFIG.description}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            {showMenuButton && (
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6 text-slate-600" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-600" />
                )}
              </button>
            )}

            {isAuthenticated && !isAuthPage && (
              <>
                <button
                  onClick={() => navigate('/history')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700"
                  title="View test history"
                >
                  <History className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-medium">History</span>
                </button>

                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                  <User className="w-5 h-5 text-slate-600" />
                  <span className="hidden md:inline text-sm font-medium text-slate-700">
                    {user?.fullName || user?.email}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-red-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-medium">Logout</span>
                </button>
              </>
            )}

            {!isAuthenticated && !isAuthPage && (
              <div className="hidden sm:flex items-center text-sm text-slate-600">
                <span>v{APP_CONFIG.version}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
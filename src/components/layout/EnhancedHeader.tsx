import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, History, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const EnhancedHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isAuthPage = location.pathname === '/auth';
  const isTestPage = location.pathname === '/test';

  const handleLogout = () => {
    logout();
    navigate('/auth');
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  if (isTestPage) {
    return null;
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => isAuthenticated && navigate('/import')}
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">
                SSC CGL Exam Simulator
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                Ultimate MCQ - One Word Substitution
              </p>
            </div>
          </div>

          {isAuthenticated && !isAuthPage && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/history')}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
              >
                <History className="w-4 h-4" />
                <span className="text-sm">History</span>
              </button>

              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm max-w-[150px] truncate">
                    {user?.fullName || user?.email}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900">
                          {user?.fullName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5 text-slate-700" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {showMobileMenu && isAuthenticated && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <button
              onClick={() => {
                navigate('/history');
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <History className="w-4 h-4" />
              <span>Test History</span>
            </button>

            <div className="px-4 py-3 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-900">
                {user?.fullName}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default EnhancedHeader;

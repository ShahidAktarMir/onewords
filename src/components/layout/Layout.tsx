import React from 'react';
import { useLocation } from 'react-router-dom';
import EnhancedHeader from './EnhancedHeader';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isTestPage = location.pathname === '/test';
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <EnhancedHeader />

      <main className={`flex-1 ${isTestPage || isAuthPage ? '' : 'flex items-center justify-center p-4'} safe-area-inset`}>
        {children}
      </main>

      {!isTestPage && <Footer />}
    </div>
  );
};

export default Layout;
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 safe-area-inset">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
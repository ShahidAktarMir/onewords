import React from 'react';
import { APP_CONFIG } from '@/utils/constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</span>
          <span className="mt-1 sm:mt-0">Version {APP_CONFIG.version}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
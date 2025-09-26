import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { APP_CONFIG } from '@/utils/constants';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="py-6 text-center text-slate-500 text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-error-500 fill-current" />
          <span>by {APP_CONFIG.author}</span>
        </div>
        
        <div className="mt-2 text-xs">
          <span>© {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
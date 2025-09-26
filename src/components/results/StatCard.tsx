import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-slate-50 p-4 rounded-lg text-center hover:bg-slate-100 transition-colors"
    >
      <div className="flex items-center justify-center text-slate-500 mb-2">
        {icon}
      </div>
      
      <p className="text-2xl font-bold text-slate-800 mb-1">
        {value}
      </p>
      
      <p className="text-sm text-slate-500">
        {label}
      </p>
    </motion.div>
  );
};

export default StatCard;
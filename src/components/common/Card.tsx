import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  glass = true,
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = `rounded-xl shadow-lg border border-slate-200/50 ${paddingClasses[padding]}`;
  const glassClasses = glass ? 'glass-card' : 'bg-white';
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';

  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={classes}>{children}</div>;
};

export default Card;
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-500',
      success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
      warning: 'bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-500',
      error: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

    const iconElement = loading ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : icon;

    const {
      onAnimationStart,
      onAnimationEnd,
      onDragStart,
      onDragEnd,
      onDrag,
      ...restProps
    } = props;

    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...restProps}
      >
        {iconElement && iconPosition === 'left' && (
          <span className={children ? 'mr-2' : ''}>{iconElement}</span>
        )}

        {children}

        {iconElement && iconPosition === 'right' && (
          <span className={children ? 'ml-2' : ''}>{iconElement}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
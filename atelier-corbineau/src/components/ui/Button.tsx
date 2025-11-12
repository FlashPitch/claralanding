import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, onClick, type, disabled }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-primary-orange text-white hover:bg-orange-600 focus:ring-primary-orange shadow-lg hover:shadow-xl hover:scale-105',
      secondary: 'bg-primary-blue text-white hover:bg-blue-600 focus:ring-primary-blue shadow-lg hover:shadow-xl hover:scale-105',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-primary-violet focus:ring-white',
      gradient: 'bg-gradient-to-r from-primary-violet to-primary-orange text-white hover:shadow-2xl hover:scale-105 shadow-lg',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

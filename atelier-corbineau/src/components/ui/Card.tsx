import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'gradient';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hover = true
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';

  const variants = {
    default: 'bg-white border border-gray-200 shadow-md',
    hover: 'bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1',
    gradient: 'bg-gradient-to-br from-primary-violet to-primary-blue text-white shadow-xl hover:shadow-2xl',
  };

  if (hover) {
    return (
      <motion.div
        className={cn(baseStyles, variants[variant], className)}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring" as const, stiffness: 300 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)}>
      {children}
    </div>
  );
};

export default Card;

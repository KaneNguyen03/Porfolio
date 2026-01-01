import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 32, 
  className = "",
  label = 'Loading…'
}) => {
  return (
    <motion.div
      className={`flex flex-1 justify-center items-center min-h-[60vh] px-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      aria-busy="true"
      aria-live="polite"
    >
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center gap-3">
          <div
            className="animate-spin rounded-full border-4 border-slate-200 border-t-sky-600 dark:border-slate-800 dark:border-t-sky-400"
            style={{ width: size, height: size }}
            aria-label={label}
          />
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default LoadingSpinner;

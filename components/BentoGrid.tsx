import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {children}
    </div>
  );
};

interface BentoItemProps {
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

export const BentoItem: React.FC<BentoItemProps> = ({ 
  className, 
  children, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={clsx(
        "group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Dynamic Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-fuchsia-500/5 to-amber-500/5 dark:from-indigo-500/10 dark:via-fuchsia-500/10 dark:to-amber-500/10"
        style={{ 
          backgroundSize: "200% 200%",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          backgroundPosition: {
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          },
          opacity: { duration: 0.3 }
        }}
      />
      
      {/* Corner Blob for extra depth */}
      <motion.div 
        className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};
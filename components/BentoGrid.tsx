import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const BentoGrid = ({ 
  className, 
  children 
}: { 
  className?: string; 
  children: React.ReactNode 
}) => {
  return (
    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {children}
    </div>
  );
};

export const BentoItem = ({ 
  className, 
  children, 
  delay = 0 
}: { 
  className?: string; 
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={clsx(
        "group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      {/* Dynamic Gradient Background Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-amber-500/5 dark:from-primary-500/10 dark:via-purple-500/10 dark:to-amber-500/10"
        style={{ 
          backgroundSize: "400% 400%",
          opacity: 0
        }}
        whileHover={{ opacity: 1 }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          backgroundPosition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          },
          opacity: { duration: 0.3 }
        }}
      />
      
      {/* Decorative Blob */}
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
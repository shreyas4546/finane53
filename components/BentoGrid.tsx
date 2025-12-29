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
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20"
        style={{ 
          backgroundSize: "400% 400%",
        }}
        initial={{ opacity: 0, backgroundPosition: "0% 50%" }}
        whileHover={{ 
          opacity: 1,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          },
          opacity: { duration: 0.3 }
        }}
      />
      
      {/* Corner Blob for extra depth - Reacts to hover */}
      <motion.div 
        className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        whileHover={{
            scale: 1.4,
            opacity: 0.6
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

       {/* Secondary Blob (Bottom Left) - Appears on hover */}
      <motion.div 
        className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 0.6, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};
import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ConfidenceBarProps {
  score: number;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ score }) => {
  let colorClass = 'bg-emerald-500';
  if (score < 70) colorClass = 'bg-rose-500';
  else if (score < 90) colorClass = 'bg-amber-500';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          className={clsx("h-full rounded-full", colorClass)}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ type: "spring", stiffness: 45, damping: 12 }}
        />
      </div>
      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">{score}%</span>
    </div>
  );
};
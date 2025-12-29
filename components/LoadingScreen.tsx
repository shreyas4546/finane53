import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Command, Brain, ShieldCheck, Server, Zap, Lock } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { text: "Initializing Secure Environment", icon: Lock },
    { text: "Loading FinBERT Models", icon: Brain },
    { text: "Connecting to Data Stream", icon: Server },
    { text: "Verifying Risk Protocols", icon: ShieldCheck },
    { text: "Optimizing AI Engine", icon: Zap },
  ];

  useEffect(() => {
    // Total animation duration in ms
    const duration = 2200; 
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      // Calculate stage based on progress
      const stageIndex = Math.floor((newProgress / 100) * stages.length);
      setCurrentStage(Math.min(stageIndex, stages.length - 1));

      if (currentStep >= steps) {
        clearInterval(timer);
        // Small delay at 100% before triggering completion
        setTimeout(onComplete, 400); 
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const ActiveIcon = stages[currentStage].icon;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        {/* Background Ambient Effects */}
        <div className="absolute inset-0 pointer-events-none">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" 
            />
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" 
            />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
            {/* Logo Animation */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 relative"
            >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/30 z-10 relative">
                    <Command className="w-12 h-12 text-white" />
                </div>
                {/* Pulse Ring */}
                <motion.div 
                    className="absolute inset-0 bg-primary-500 rounded-3xl z-[-1]"
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
            </motion.div>

            {/* Dynamic Text Stage */}
            <div className="h-16 flex flex-col items-center justify-center mb-6 w-full">
                 <motion.div
                    key={currentStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-2"
                 >
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-lg">
                        <ActiveIcon className="w-5 h-5 text-primary-500" />
                        <span>{stages[currentStage].text}</span>
                    </div>
                 </motion.div>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-full relative">
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-primary-500 bg-[length:200%_100%]"
                        style={{ width: `${progress}%` }}
                        animate={{ backgroundPosition: ["100% 0%", "0% 0%"] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                
                {/* Tech details text */}
                <div className="flex justify-between w-full mt-3 text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                    <span>FinSight_AI_Kernal_v2.4</span>
                    <span>{Math.round(progress)}% LOADED</span>
                </div>
            </div>
        </div>
    </motion.div>
  );
};
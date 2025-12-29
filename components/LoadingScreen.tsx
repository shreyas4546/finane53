import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Command, Brain, ShieldCheck, Server, Zap, Lock, Database } from 'lucide-react';

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
    const duration = 2800; // Slightly longer to appreciate the 3D
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
        setTimeout(onComplete, 600); 
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const ActiveIcon = stages[currentStage].icon;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        {/* 3D Background Grid - Retro/Tech Vibe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -inset-[100%] opacity-[0.05] dark:opacity-[0.1]" 
                 style={{ 
                     backgroundImage: 'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
                     backgroundSize: '4rem 4rem',
                     transform: 'perspective(500px) rotateX(60deg) translateY(0px) translateZ(-200px)'
                 }} 
            >
               <motion.div 
                 className="absolute inset-0"
                 animate={{ translateY: [0, 64] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
            </div>
            
            {/* Ambient Center Glow */}
             <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 blur-[100px] rounded-full" 
            />
        </div>

        {/* 3D Scene Container */}
        <div className="relative w-80 h-80 mb-12 flex items-center justify-center" style={{ perspective: '1200px' }}>
            <motion.div 
                className="relative flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateX: 0, rotateY: 0 }}
                animate={{ rotateX: [10, -10, 10], rotateY: [0, 360] }}
                transition={{ 
                  rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
            >
                {/* Ring 1 - Outer Gyroscope */}
                <motion.div
                    className="absolute w-64 h-64 rounded-full border-[1px] border-slate-300 dark:border-slate-700 border-l-primary-500 border-r-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: 360, rotateY: 45 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Ring 2 - Vertical Orbital */}
                <motion.div
                    className="absolute w-56 h-56 rounded-full border-[1px] border-dashed border-slate-400 dark:border-slate-600 opacity-70"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: -360, rotateZ: 20 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Ring 3 - Inner Accelerator */}
                <motion.div
                    className="absolute w-48 h-48 rounded-full border-[4px] border-transparent border-t-primary-500 border-b-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: 180, rotateY: 360, rotateZ: -45 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                {/* Particles orbiting */}
                <motion.div
                    className="absolute w-72 h-72"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateZ: 360, rotateX: 60 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]" />
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_10px_#fb7185]" />
                </motion.div>

                {/* Central Core (Cube-ish / Logo Card) */}
                <motion.div
                    className="relative w-24 h-24 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl z-20 backface-visible"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ 
                        rotateY: [-360, 0], // Counter-rotate to stay somewhat legible or spin with scene
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                     {/* 3D Thickness Simulation (Layers) */}
                     <div className="absolute inset-0 bg-primary-700 rounded-2xl opacity-40" style={{ transform: 'translateZ(-4px)' }}></div>
                     <div className="absolute inset-0 bg-indigo-800 rounded-2xl opacity-40" style={{ transform: 'translateZ(-8px)' }}></div>
                     <div className="absolute inset-0 bg-indigo-900 rounded-2xl opacity-40" style={{ transform: 'translateZ(-12px)' }}></div>
                     
                     {/* The Icon */}
                     <div className="relative z-30 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
                         <Command className="w-12 h-12 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                     </div>
                     
                     {/* Gloss Effect */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl z-40 pointer-events-none" />
                </motion.div>
            </motion.div>
        </div>

        {/* Status Text Area - 3D Float Effect */}
        <motion.div 
            className="relative z-20 flex flex-col items-center max-w-sm w-full px-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            {/* Dynamic Text Stage */}
            <div className="h-16 flex flex-col items-center justify-center mb-4 w-full">
                 <motion.div
                    key={currentStage}
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-2"
                 >
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg tracking-tight drop-shadow-sm">
                        <ActiveIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <span>{stages[currentStage].text}</span>
                    </div>
                 </motion.div>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-full relative h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                    className="h-full bg-gradient-to-r from-primary-600 via-indigo-500 to-primary-600 bg-[length:200%_100%] shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                    style={{ width: `${progress}%` }}
                    animate={{ backgroundPosition: ["100% 0%", "0% 0%"] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
            
            {/* Tech details text */}
            <div className="flex justify-between w-full mt-3 text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-widest uppercase">
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    FinSight_Core_v2.4
                </div>
                <span>{Math.round(progress)}%</span>
            </div>
        </motion.div>
    </motion.div>
  );
};

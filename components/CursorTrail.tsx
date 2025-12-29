import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Point {
  x: number;
  y: number;
}

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // Refs for mutable state in the animation loop
  const points = useRef<Point[]>([]);
  const mouse = useRef<Point>({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const frameId = useRef<number>(0);
  const timerId = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices to improve performance/UX
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize with High DPI support
    const handleResize = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        // Set physical pixel dimensions
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        // Scale context to match device pixel ratio for sharp rendering
        ctx.scale(dpr, dpr);
        
        // Force CSS dimensions to logical pixels
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }
    };
    
    // Initial size
    handleResize();
    window.addEventListener('resize', handleResize);

    // Track Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      isMoving.current = true;
      
      // Reset stop timer
      window.clearTimeout(timerId.current);
      timerId.current = window.setTimeout(() => {
        isMoving.current = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Configuration
    const trailLength = 20;
    const lineWidth = 2.5; // Slightly thicker for better visibility

    // Animation Loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // 1. Clear Canvas (using logical dimensions due to scale)
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // 2. Update Points
      points.current.push({ ...mouse.current });

      // Limit array length
      if (points.current.length > trailLength) {
        points.current.shift();
      }

      // If mouse stopped, shrink the trail
      if (!isMoving.current && points.current.length > 0) {
        points.current.shift();
      }

      // 3. Draw Trail
      if (points.current.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw segments to allow gradient opacity
        for (let i = 0; i < points.current.length - 1; i++) {
          const p1 = points.current[i];
          const p2 = points.current[i + 1];
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Calculate visual properties based on index (tail to head)
          const progress = i / points.current.length;
          const alpha = progress * 0.8; // Max opacity 0.8
          const currentWidth = lineWidth * progress;

          // Set Color based on Theme
          // Primary-500: #6366f1 (rgb: 99, 102, 241)
          const r = theme === 'dark' ? 99 : 79;
          const g = theme === 'dark' ? 102 : 70;
          const b = theme === 'dark' ? 241 : 229;

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = currentWidth;
          
          // Add glow effect in dark mode
          if (theme === 'dark') {
             ctx.shadowBlur = 8;
             ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
          } else {
             ctx.shadowBlur = 0;
          }

          ctx.stroke();
        }
      }

      frameId.current = requestAnimationFrame(animate);
    };

    // Start Loop
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId.current);
      window.clearTimeout(timerId.current);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
};
/**
 * Smart Motion Components
 * Automatically chooses the best animation approach based on device performance
 * while maintaining visual appeal and "fancyness"
 */

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { useOptimizedAnimations, AnimationLevel, createOptimizedVariants, createOptimizedStagger } from '@/lib/utils/optimizedAnimations';
import { cn } from '@/lib/utils';

// Smart motion div that automatically chooses the best animation approach
export interface SmartMotionProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
  children?: React.ReactNode;
  className?: string;
  forceLevel?: AnimationLevel;
  maintainLayout?: boolean;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: any;
  staggerChildren?: number;
  delayChildren?: number;
  style?: React.CSSProperties;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const SmartMotion = forwardRef<HTMLDivElement, SmartMotionProps>(
  ({ 
    initial, 
    animate, 
    exit, 
    transition, 
    variants, 
    children, 
    className, 
    forceLevel,
    maintainLayout,
    whileHover,
    whileTap,
    whileInView,
    viewport,
    staggerChildren,
    delayChildren,
    ...props 
  }, ref) => {
    const { animationLevel, shouldUseFramerMotion, shouldUseCSSAnimations, shouldAnimate, isReady } = useOptimizedAnimations();
    const [optimizedVariants, setOptimizedVariants] = useState(variants);
    const [cssClasses, setCssClasses] = useState<string>('');
    const elementRef = useRef<HTMLDivElement>(null);

    // Use forced level if provided, otherwise use detected level
    const currentLevel = forceLevel || animationLevel;

    useEffect(() => {
      if (!isReady) return;

      if (variants) {
        setOptimizedVariants(variants);
      } else if (initial || animate || exit) {
        // Create optimized variants based on the current level
        const newVariants = createOptimizedVariants(currentLevel);
        
        // Override with custom values if provided
        if (initial) newVariants.initial = { ...newVariants.initial, ...initial };
        if (animate) newVariants.animate = { ...newVariants.animate, ...animate };
        if (exit) newVariants.exit = { ...newVariants.exit, ...exit };
        
        setOptimizedVariants(newVariants);
      }

      // Generate CSS classes for fallback
      if (shouldUseCSSAnimations) {
        const classes = [];
        
        if (initial?.opacity === 0 && animate?.opacity === 1) {
          classes.push('animate-fade-in');
        }
        
        if (initial?.y && animate?.y === 0) {
          classes.push(initial.y > 0 ? 'animate-slide-up' : 'animate-slide-down');
        }
        
        if (initial?.x && animate?.x === 0) {
          classes.push(initial.x > 0 ? 'animate-slide-in-left' : 'animate-slide-in-right');
        }
        
        if (initial?.scale && animate?.scale === 1) {
          classes.push('animate-scale-in');
        }
        
        setCssClasses(classes.join(' '));
      }
    }, [isReady, currentLevel, shouldUseCSSAnimations, initial, animate, exit, variants]);

    // Stagger configuration
    const staggerConfig = staggerChildren || delayChildren ? {
      staggerChildren: staggerChildren || 0.1,
      delayChildren: delayChildren || 0
    } : undefined;

    const optimizedStagger = staggerConfig ? createOptimizedStagger(currentLevel, staggerConfig.staggerChildren) : undefined;

    // If animations are disabled, render plain component
    if (!shouldAnimate || currentLevel === 'none') {
      return (
        <div 
          ref={ref || elementRef} 
          className={cn(className)} 
          {...props}
        >
          {children}
        </div>
      );
    }

    // Use framer-motion for full animations
    if (shouldUseFramerMotion) {
      return (
        <motion.div
          ref={ref || elementRef}
          initial={optimizedVariants?.initial || initial}
          animate={optimizedVariants?.animate || animate}
          exit={optimizedVariants?.exit || exit}
          transition={optimizedVariants?.transition || transition}
          variants={optimizedVariants}
          className={cn(className)}
          whileHover={whileHover}
          whileTap={whileTap}
          whileInView={whileInView}
          viewport={viewport}
          layout={maintainLayout}
          {...(optimizedStagger && { 
            initial: { ...optimizedVariants?.initial, ...optimizedStagger },
            animate: { ...optimizedVariants?.animate, ...optimizedStagger }
          })}
          style={props.style}
          id={props.id}
          role={props.role}
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          aria-describedby={props['aria-describedby']}
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        >
          {children}
        </motion.div>
      );
    }

    // Use CSS animations for reduced performance
    if (shouldUseCSSAnimations) {
      return (
        <div
          ref={ref || elementRef}
          className={cn(className, cssClasses)}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Fallback to no animations
    return (
      <div 
        ref={ref || elementRef} 
        className={cn(className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

SmartMotion.displayName = 'SmartMotion';

// Smart AnimatePresence wrapper
export interface SmartAnimatePresenceProps {
  children?: React.ReactNode;
  mode?: 'sync' | 'wait' | 'popLayout';
  initial?: boolean;
  custom?: any;
  onExitComplete?: () => void;
  presenceAffectsLayout?: boolean;
}

export const SmartAnimatePresence: React.FC<SmartAnimatePresenceProps> = ({
  children,
  mode = 'sync',
  initial = true,
  custom,
  onExitComplete,
  presenceAffectsLayout
}) => {
  const { shouldUseFramerMotion, shouldAnimate } = useOptimizedAnimations();

  // If animations are disabled or we're not using framer-motion, render children directly
  if (!shouldAnimate || !shouldUseFramerMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence
      mode={mode}
      initial={initial}
      custom={custom}
      onExitComplete={onExitComplete}
      presenceAffectsLayout={presenceAffectsLayout}
    >
      {children}
    </AnimatePresence>
  );
};

// Smart motion components for common use cases
export const SmartFadeIn = forwardRef<HTMLDivElement, Omit<SmartMotionProps, 'initial' | 'animate' | 'exit'>>(
  ({ children, className, transition, ...props }, ref) => {
    const { animationLevel } = useOptimizedAnimations();
    const duration = animationLevel === 'reduced' ? 0.3 : animationLevel === 'minimal' ? 0.15 : 0.5;

    return (
      <SmartMotion
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration, ease: 'easeOut', ...transition }}
        className={className}
        {...props}
      >
        {children}
      </SmartMotion>
    );
  }
);

SmartFadeIn.displayName = 'SmartFadeIn';

export const SmartSlideUp = forwardRef<HTMLDivElement, Omit<SmartMotionProps, 'initial' | 'animate' | 'exit'>>(
  ({ children, className, transition, ...props }, ref) => {
    const { animationLevel } = useOptimizedAnimations();
    const duration = animationLevel === 'reduced' ? 0.3 : animationLevel === 'minimal' ? 0.15 : 0.5;
    const yOffset = animationLevel === 'reduced' ? 10 : animationLevel === 'minimal' ? 5 : 20;

    return (
      <SmartMotion
        ref={ref}
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -yOffset }}
        transition={{ duration, ease: 'easeOut', ...transition }}
        className={className}
        {...props}
      >
        {children}
      </SmartMotion>
    );
  }
);

SmartSlideUp.displayName = 'SmartSlideUp';

export const SmartScaleIn = forwardRef<HTMLDivElement, Omit<SmartMotionProps, 'initial' | 'animate' | 'exit'>>(
  ({ children, className, transition, ...props }, ref) => {
    const { animationLevel } = useOptimizedAnimations();
    const duration = animationLevel === 'reduced' ? 0.3 : animationLevel === 'minimal' ? 0.15 : 0.5;
    const scale = animationLevel === 'reduced' ? 0.95 : animationLevel === 'minimal' ? 0.98 : 0.9;

    return (
      <SmartMotion
        ref={ref}
        initial={{ opacity: 0, scale }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale }}
        transition={{ duration, ease: 'easeOut', ...transition }}
        className={className}
        {...props}
      >
        {children}
      </SmartMotion>
    );
  }
);

SmartScaleIn.displayName = 'SmartScaleIn';

// Smart stagger container
export const SmartStaggerContainer = forwardRef<HTMLDivElement, SmartMotionProps>(
  ({ children, className, staggerChildren = 0.1, delayChildren = 0, ...props }, ref) => {
    const { animationLevel } = useOptimizedAnimations();
    const optimizedStagger = createOptimizedStagger(animationLevel, staggerChildren);

    return (
      <SmartMotion
        ref={ref}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0 },
          animate: { 
            opacity: 1, 
            transition: {
              ...optimizedStagger,
              delayChildren: delayChildren
            }
          },
          exit: { 
            opacity: 0,
            transition: {
              staggerChildren: optimizedStagger.staggerChildren,
              staggerDirection: -1
            }
          }
        }}
        className={className}
        {...props}
      >
        {children}
      </SmartMotion>
    );
  }
);

SmartStaggerContainer.displayName = 'SmartStaggerContainer';

// Smart stagger item
export const SmartStaggerItem = forwardRef<HTMLDivElement, Omit<SmartMotionProps, 'variants'>>(
  ({ children, className, ...props }, ref) => {
    const { animationLevel } = useOptimizedAnimations();
    const yOffset = animationLevel === 'reduced' ? 10 : animationLevel === 'minimal' ? 5 : 20;

    return (
      <SmartMotion
        ref={ref}
        variants={{
          initial: { opacity: 0, y: yOffset },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -yOffset }
        }}
        className={className}
        {...props}
      >
        {children}
      </SmartMotion>
    );
  }
);

SmartStaggerItem.displayName = 'SmartStaggerItem';

// Smart hover effects
export const SmartHoverScale = forwardRef<HTMLDivElement, Omit<SmartMotionProps, 'whileHover' | 'whileTap'>>(
  ({ children, className, ...props }, ref) => {
    const { animationLevel, shouldUseFramerMotion } = useOptimizedAnimations();
    
    if (!shouldUseFramerMotion) {
      return (
        <div
          ref={ref}
          className={cn(className, 'transition-transform duration-200 hover:scale-105')}
          {...props}
        >
          {children}
        </div>
      );
    }

    const scale = animationLevel === 'reduced' ? 1.02 : animationLevel === 'minimal' ? 1.01 : 1.05;
    const duration = animationLevel === 'reduced' ? 0.15 : animationLevel === 'minimal' ? 0.1 : 0.2;

    return (
      <SmartMotion
        ref={ref}
        whileHover={{ scale }}
        whileTap={{ scale: scale * 0.95 }}
        transition={{ duration, ease: 'easeOut' }}
        className={className}
        {...props}
      >
        {children}
      </SmartMotion>
    );
  }
);

SmartHoverScale.displayName = 'SmartHoverScale';

// Smart scroll reveal
export const SmartScrollReveal = forwardRef<HTMLDivElement, SmartMotionProps & { threshold?: number; rootMargin?: string }>(
  ({ children, className, threshold = 0.1, rootMargin = '100px', ...props }, ref) => {
    const { animationLevel, shouldUseFramerMotion } = useOptimizedAnimations();
    
    if (!shouldUseFramerMotion) {
      return (
        <div
          ref={ref}
          className={cn(className, 'animate-fade-in')}
          {...props}
        >
          {children}
        </div>
      );
    }

    const yOffset = animationLevel === 'reduced' ? 10 : animationLevel === 'minimal' ? 5 : 20;
    const duration = animationLevel === 'reduced' ? 0.4 : animationLevel === 'minimal' ? 0.2 : 0.6;
    const optimizedThreshold = animationLevel === 'reduced' ? threshold * 2 : threshold;
    const optimizedRootMargin = animationLevel === 'reduced' ? '50px' : rootMargin;

    return (
      <SmartMotion
        ref={ref}
        initial={{ opacity: 0, y: yOffset }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -yOffset }}
        transition={{ duration, ease: 'easeOut' }}
        viewport={{ once: true, amount: optimizedThreshold, margin: optimizedRootMargin }}
        className={className}
        {...props}
      >
        {children}
      </SmartMotion>
    );
  }
);

SmartScrollReveal.displayName = 'SmartScrollReveal';

// Performance monitoring component
export const AnimationPerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { animationLevel, isReady } = useOptimizedAnimations();
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  useEffect(() => {
    // Show debug info in development
    if (process.env.NODE_ENV === 'development') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'a' && e.ctrlKey && e.shiftKey) {
          setShowDebugInfo(prev => !prev);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <>
      {children}
      {showDebugInfo && isReady && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm z-50">
          <div className="font-bold">Animation Level: {animationLevel}</div>
          <div className="text-xs text-gray-300 mt-1">
            Press Ctrl+Shift+A to toggle debug info
          </div>
        </div>
      )}
    </>
  );
}; 
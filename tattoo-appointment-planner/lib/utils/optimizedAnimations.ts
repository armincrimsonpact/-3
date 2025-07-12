/**
 * Optimized Animation System
 * Intelligently adapts animations based on device capabilities and user preferences
 * while maintaining visual appeal and "fancyness"
 */

import { useEffect, useState, useCallback, useMemo } from 'react';

// Animation performance levels
export type AnimationLevel = 'full' | 'reduced' | 'minimal' | 'none';

// Device performance metrics
export interface DeviceMetrics {
  cpu: number; // Relative CPU performance (0-1)
  memory: number; // Available memory in GB
  connection: 'slow' | 'medium' | 'fast';
  battery: number; // Battery level (0-1)
  isMobile: boolean;
  isLowEndDevice: boolean;
}

// Animation configuration
export interface AnimationConfig {
  level: AnimationLevel;
  respectReducedMotion: boolean;
  adaptToPerformance: boolean;
  maintainVisualAppeal: boolean;
  fallbackToCSS: boolean;
}

// Performance detection utilities
export class PerformanceDetector {
  private static instance: PerformanceDetector;
  private metrics: DeviceMetrics | null = null;
  private listeners: Array<(metrics: DeviceMetrics) => void> = [];

  static getInstance(): PerformanceDetector {
    if (!PerformanceDetector.instance) {
      PerformanceDetector.instance = new PerformanceDetector();
    }
    return PerformanceDetector.instance;
  }

  async detectPerformance(): Promise<DeviceMetrics> {
    if (this.metrics) return this.metrics;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // CPU estimation (simplified)
    const cpuScore = await this.estimateCPUPerformance();
    
    // Memory estimation
    const memory = this.estimateMemory();
    
    // Connection speed
    const connection = this.getConnectionSpeed();
    
    // Battery level
    const battery = await this.getBatteryLevel();
    
    // Low-end device heuristics
    const isLowEndDevice = this.isLowEndDevice(cpuScore, memory, isMobile);

    this.metrics = {
      cpu: cpuScore,
      memory,
      connection,
      battery,
      isMobile,
      isLowEndDevice
    };

    // Notify listeners
    this.listeners.forEach(listener => listener(this.metrics!));

    return this.metrics;
  }

  private async estimateCPUPerformance(): Promise<number> {
    return new Promise((resolve) => {
      const start = performance.now();
      let iterations = 0;
      const maxTime = 10; // 10ms test

      const testCPU = () => {
        const testStart = performance.now();
        while (performance.now() - testStart < 1) {
          Math.random() * Math.random();
          iterations++;
        }
        
        if (performance.now() - start < maxTime) {
          setTimeout(testCPU, 0);
        } else {
          // Normalize score (higher = better)
          const score = Math.min(iterations / 100000, 1);
          resolve(score);
        }
      };

      testCPU();
    });
  }

  private estimateMemory(): number {
    // @ts-ignore - Not in all browsers
    const memory = (navigator as any).deviceMemory || 4;
    return Math.min(memory, 8); // Cap at 8GB for calculation
  }

  private getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
    // @ts-ignore - Not in all browsers
    const connection = (navigator as any).connection || {};
    const effectiveType = connection.effectiveType || '4g';
    
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'slow';
    if (effectiveType === '3g') return 'medium';
    return 'fast';
  }

  private async getBatteryLevel(): Promise<number> {
    try {
      // @ts-ignore - Not in all browsers
      const battery = await (navigator as any).getBattery?.();
      return battery?.level || 1;
    } catch {
      return 1; // Assume full battery if not available
    }
  }

  private isLowEndDevice(cpu: number, memory: number, isMobile: boolean): boolean {
    const cpuThreshold = 0.3;
    const memoryThreshold = 2;
    
    return (
      cpu < cpuThreshold || 
      memory < memoryThreshold || 
      (isMobile && memory < 4)
    );
  }

  subscribe(listener: (metrics: DeviceMetrics) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// Smart animation configuration
export class AnimationOptimizer {
  private config: AnimationConfig;
  private detector: PerformanceDetector;

  constructor(config: Partial<AnimationConfig> = {}) {
    this.config = {
      level: 'full',
      respectReducedMotion: true,
      adaptToPerformance: true,
      maintainVisualAppeal: true,
      fallbackToCSS: true,
      ...config
    };
    this.detector = PerformanceDetector.getInstance();
  }

  async getOptimalAnimationLevel(): Promise<AnimationLevel> {
    // Check user preference first
    if (this.config.respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'minimal';
    }

    if (!this.config.adaptToPerformance) {
      return this.config.level;
    }

    const metrics = await this.detector.detectPerformance();
    
    // Performance-based decision
    if (metrics.isLowEndDevice || metrics.battery < 0.2) {
      return 'reduced';
    }

    if (metrics.cpu < 0.5 || metrics.memory < 3 || metrics.connection === 'slow') {
      return 'reduced';
    }

    if (metrics.cpu < 0.7 || metrics.isMobile) {
      return 'full'; // Still fancy but optimized
    }

    return 'full';
  }

  async shouldUseFramerMotion(): Promise<boolean> {
    const level = await this.getOptimalAnimationLevel();
    return level === 'full' && this.config.maintainVisualAppeal;
  }

  async shouldUseCSSAnimations(): Promise<boolean> {
    const level = await this.getOptimalAnimationLevel();
    return level === 'reduced' || (level === 'full' && !await this.shouldUseFramerMotion());
  }

  async getAnimationDuration(baseDuration: number): Promise<number> {
    const level = await this.getOptimalAnimationLevel();
    const metrics = await this.detector.detectPerformance();
    
    switch (level) {
      case 'full':
        return baseDuration;
      case 'reduced':
        return baseDuration * 0.6; // Faster but still visible
      case 'minimal':
        return baseDuration * 0.3; // Quick transitions
      case 'none':
        return 0;
      default:
        return baseDuration;
    }
  }

  async getStaggerDelay(baseDelay: number): Promise<number> {
    const level = await this.getOptimalAnimationLevel();
    
    switch (level) {
      case 'full':
        return baseDelay;
      case 'reduced':
        return baseDelay * 0.5;
      case 'minimal':
        return baseDelay * 0.2;
      case 'none':
        return 0;
      default:
        return baseDelay;
    }
  }
}

// React hooks for animation optimization
export const useOptimizedAnimations = (config?: Partial<AnimationConfig>) => {
  const [optimizer] = useState(() => new AnimationOptimizer(config));
  const [animationLevel, setAnimationLevel] = useState<AnimationLevel>('full');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeOptimizer = async () => {
      const level = await optimizer.getOptimalAnimationLevel();
      setAnimationLevel(level);
      setIsReady(true);
    };

    initializeOptimizer();
  }, [optimizer]);

  const getOptimizedConfig = useCallback(async (baseConfig: any) => {
    const duration = await optimizer.getAnimationDuration(baseConfig.duration || 0.5);
    const delay = await optimizer.getStaggerDelay(baseConfig.delay || 0);
    
    return {
      ...baseConfig,
      duration,
      delay,
      ease: animationLevel === 'reduced' ? 'easeOut' : baseConfig.ease || 'easeInOut'
    };
  }, [optimizer, animationLevel]);

  const shouldAnimate = useMemo(() => {
    return animationLevel !== 'none' && isReady;
  }, [animationLevel, isReady]);

  const shouldUseFramerMotion = useMemo(() => {
    return animationLevel === 'full' && isReady;
  }, [animationLevel, isReady]);

  const shouldUseCSSAnimations = useMemo(() => {
    return (animationLevel === 'reduced' || animationLevel === 'minimal') && isReady;
  }, [animationLevel, isReady]);

  return {
    animationLevel,
    shouldAnimate,
    shouldUseFramerMotion,
    shouldUseCSSAnimations,
    getOptimizedConfig,
    isReady
  };
};

// Smart motion wrapper that automatically chooses the best animation approach
export const useSmartMotion = () => {
  const { shouldUseFramerMotion, shouldUseCSSAnimations, getOptimizedConfig } = useOptimizedAnimations();

  const createMotionConfig = useCallback(async (config: any) => {
    if (shouldUseFramerMotion) {
      return await getOptimizedConfig(config);
    }
    
    if (shouldUseCSSAnimations) {
      // Convert to CSS animation classes
      return {
        ...config,
        className: getCSSAnimationClass(config),
        // Remove framer-motion specific props
        initial: undefined,
        animate: undefined,
        exit: undefined,
        transition: undefined
      };
    }

    // No animations
    return {
      ...config,
      initial: undefined,
      animate: undefined,
      exit: undefined,
      transition: undefined
    };
  }, [shouldUseFramerMotion, shouldUseCSSAnimations, getOptimizedConfig]);

  return { createMotionConfig, shouldUseFramerMotion, shouldUseCSSAnimations };
};

// CSS animation class mapping
const getCSSAnimationClass = (config: any): string => {
  const classes = [];
  
  if (config.initial?.opacity === 0 && config.animate?.opacity === 1) {
    classes.push('animate-fade-in');
  }
  
  if (config.initial?.y && config.animate?.y === 0) {
    classes.push('animate-slide-up');
  }
  
  if (config.initial?.x && config.animate?.x === 0) {
    classes.push(config.initial.x > 0 ? 'animate-slide-in-left' : 'animate-slide-in-right');
  }
  
  if (config.initial?.scale && config.animate?.scale === 1) {
    classes.push('animate-scale-in');
  }
  
  return classes.join(' ');
};

// Performance-aware animation variants
export const createOptimizedVariants = (level: AnimationLevel) => {
  const baseVariants = {
    full: {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }
      },
      exit: { 
        opacity: 0, 
        y: -20, 
        scale: 0.95,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    },
    reduced: {
      initial: { opacity: 0, y: 10 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      },
      exit: { 
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeIn"
        }
      }
    },
    minimal: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut"
        }
      },
      exit: { 
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn"
        }
      }
    },
    none: {
      initial: {},
      animate: {},
      exit: {}
    }
  };

  return baseVariants[level] || baseVariants.full;
};

// Optimized stagger configuration
export const createOptimizedStagger = (level: AnimationLevel, baseDelay: number = 0.1) => {
  const staggerConfig = {
    full: {
      staggerChildren: baseDelay,
      delayChildren: baseDelay * 2
    },
    reduced: {
      staggerChildren: baseDelay * 0.5,
      delayChildren: baseDelay
    },
    minimal: {
      staggerChildren: baseDelay * 0.2,
      delayChildren: baseDelay * 0.5
    },
    none: {
      staggerChildren: 0,
      delayChildren: 0
    }
  };

  return staggerConfig[level] || staggerConfig.full;
};

// Battery-aware animation management
export const useBatteryAwareAnimations = () => {
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [isLowBattery, setIsLowBattery] = useState(false);

  useEffect(() => {
    const updateBatteryStatus = async () => {
      try {
        // @ts-ignore - Not in all browsers
        const battery = await (navigator as any).getBattery?.();
        if (battery) {
          setBatteryLevel(battery.level);
          setIsLowBattery(battery.level < 0.2);
          
          battery.addEventListener('levelchange', () => {
            setBatteryLevel(battery.level);
            setIsLowBattery(battery.level < 0.2);
          });
        }
      } catch {
        // Battery API not available
      }
    };

    updateBatteryStatus();
  }, []);

  return {
    batteryLevel,
    isLowBattery,
    shouldReduceAnimations: isLowBattery
  };
};

// Memory-efficient animation utilities
export const createMemoryEfficientAnimation = (element: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
  // Use Web Animations API for better performance
  const animation = element.animate(keyframes, options);
  
  // Clean up after animation
  animation.addEventListener('finish', () => {
    animation.cancel();
  });
  
  return animation;
};

// Intersection Observer for performance-aware scroll animations
export const usePerformanceAwareIntersection = (threshold: number = 0.1) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const { animationLevel } = useOptimizedAnimations();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setEntries(entries);
      },
      {
        threshold: animationLevel === 'reduced' ? threshold * 2 : threshold,
        rootMargin: animationLevel === 'reduced' ? '50px' : '100px'
      }
    );

    return () => observer.disconnect();
  }, [threshold, animationLevel]);

  return entries;
};

// Export everything for easy access
export * from './lightweightMotion'; 
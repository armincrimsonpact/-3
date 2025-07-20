// Lightweight animation utilities to replace heavy framer-motion where possible
// Reduces bundle size significantly while maintaining smooth animations

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none';
}

export interface KeyframeConfig {
  [key: string]: string | number;
}

// CSS-based animation utilities
export const createAnimation = (
  element: HTMLElement,
  keyframes: KeyframeConfig[],
  config: AnimationConfig = {}
): Animation => {
  const {
    duration = 300,
    delay = 0,
    easing = 'ease-out',
    fillMode = 'forwards'
  } = config;

  return element.animate(keyframes, {
    duration,
    delay,
    easing,
    fill: fillMode
  });
};

// Common animation presets
export const fadeIn = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { opacity: '0' },
      { opacity: '1' }
    ],
    { duration: 300, ...config }
  );
};

export const fadeOut = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { opacity: '1' },
      { opacity: '0' }
    ],
    { duration: 300, ...config }
  );
};

export const slideInUp = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { transform: 'translateY(20px)', opacity: '0' },
      { transform: 'translateY(0)', opacity: '1' }
    ],
    { duration: 400, ...config }
  );
};

export const slideInDown = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { transform: 'translateY(-20px)', opacity: '0' },
      { transform: 'translateY(0)', opacity: '1' }
    ],
    { duration: 400, ...config }
  );
};

export const slideInLeft = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { transform: 'translateX(-20px)', opacity: '0' },
      { transform: 'translateX(0)', opacity: '1' }
    ],
    { duration: 400, ...config }
  );
};

export const slideInRight = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { transform: 'translateX(20px)', opacity: '0' },
      { transform: 'translateX(0)', opacity: '1' }
    ],
    { duration: 400, ...config }
  );
};

export const scaleIn = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { transform: 'scale(0.9)', opacity: '0' },
      { transform: 'scale(1)', opacity: '1' }
    ],
    { duration: 300, ...config }
  );
};

export const scaleOut = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { transform: 'scale(1)', opacity: '1' },
      { transform: 'scale(0.9)', opacity: '0' }
    ],
    { duration: 300, ...config }
  );
};

export const pulse = (element: HTMLElement, config?: AnimationConfig): Animation => {
  return createAnimation(
    element,
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    { duration: 600, ...config }
  );
};

// React hook for lightweight animations
export const useLightweightAnimation = () => {
  const animateElement = (
    elementOrRef: HTMLElement | React.RefObject<HTMLElement>,
    animationType: 'fadeIn' | 'fadeOut' | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'scaleOut' | 'pulse',
    config?: AnimationConfig
  ): Promise<void> => {
    return new Promise((resolve) => {
      const element = 'current' in elementOrRef ? elementOrRef.current : elementOrRef;
      if (!element) {
        resolve();
        return;
      }

      let animation: Animation;

      switch (animationType) {
        case 'fadeIn':
          animation = fadeIn(element, config);
          break;
        case 'fadeOut':
          animation = fadeOut(element, config);
          break;
        case 'slideInUp':
          animation = slideInUp(element, config);
          break;
        case 'slideInDown':
          animation = slideInDown(element, config);
          break;
        case 'slideInLeft':
          animation = slideInLeft(element, config);
          break;
        case 'slideInRight':
          animation = slideInRight(element, config);
          break;
        case 'scaleIn':
          animation = scaleIn(element, config);
          break;
        case 'scaleOut':
          animation = scaleOut(element, config);
          break;
        case 'pulse':
          animation = pulse(element, config);
          break;
        default:
          resolve();
          return;
      }

      animation.addEventListener('finish', () => resolve());
    });
  };

  return { animateElement };
};

// CSS class-based animations for even lighter weight
export const cssAnimations = {
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce'
};

// CSS classes to add to your global styles
export const animationCSS = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes slide-in-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-in-down {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-in-left {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-right {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes scale-out {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.9); opacity: 0; }
}

.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
.animate-fade-out { animation: fade-out 0.3s ease-out forwards; }
.animate-slide-in-up { animation: slide-in-up 0.4s ease-out forwards; }
.animate-slide-in-down { animation: slide-in-down 0.4s ease-out forwards; }
.animate-slide-in-left { animation: slide-in-left 0.4s ease-out forwards; }
.animate-slide-in-right { animation: slide-in-right 0.4s ease-out forwards; }
.animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
.animate-scale-out { animation: scale-out 0.3s ease-out forwards; }

/* Utility classes for common animations */
.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }
.animate-delay-500 { animation-delay: 500ms; }

.animate-duration-200 { animation-duration: 200ms; }
.animate-duration-300 { animation-duration: 300ms; }
.animate-duration-500 { animation-duration: 500ms; }
.animate-duration-700 { animation-duration: 700ms; }
.animate-duration-1000 { animation-duration: 1000ms; }
`;

// Intersection Observer for scroll-triggered animations
export const useScrollAnimation = () => {
  const observeElement = (
    element: HTMLElement,
    animationType: string,
    config: {
      threshold?: number;
      rootMargin?: string;
      once?: boolean;
    } = {}
  ) => {
    const { threshold = 0.1, rootMargin = '0px', once = true } = config;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationType);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove(animationType);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  };

  return { observeElement };
};

export default {
  createAnimation,
  fadeIn,
  fadeOut,
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  scaleOut,
  pulse,
  useLightweightAnimation,
  useScrollAnimation,
  cssAnimations,
  animationCSS
}; 
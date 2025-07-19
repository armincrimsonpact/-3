import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import { MainNav } from '@/components/layout/main-nav';
import { StepIndicator } from '@/components/booking/step-indicator';
import { BookingSuccess } from '@/components/booking/booking-success';
import { useBookingForm } from '@/lib/hooks/useBookingForm';
import { BookingErrorBoundary } from '@/components/error/BookingErrorBoundary';
import { BookingPageSkeleton } from '@/components/ui/loading/SkeletonLoader';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';

// Lazy load step components for better performance
const OptimizedStepOneForm = React.lazy(() => import('@/components/booking/optimized-step-one-form'));
const StepTwoForm = React.lazy(() => import('@/components/booking/step-two-form').then(module => ({ default: module.StepTwoForm })));
const StepThreeForm = React.lazy(() => import('@/components/booking/step-three-form').then(module => ({ default: module.StepThreeForm })));
const StepFourForm = React.lazy(() => import('@/components/booking/step-four-form').then(module => ({ default: module.StepFourForm })));
const StepFiveForm = React.lazy(() => import('@/components/booking/step-five-form').then(module => ({ default: module.StepFiveForm })));

// Enhanced loading component with error state
const StepLoadingSpinner = React.memo(({ hasError = false }: { hasError?: boolean }) => (
  <div className="flex items-center justify-center py-12">
    {hasError ? (
      <>
        <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
        <span className="text-red-400">Failed to load step</span>
      </>
    ) : (
      <>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        <span className="ml-3 text-white">Loading...</span>
      </>
    )}
  </div>
));

// Connection status component
const ConnectionStatus = React.memo(() => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50"
    >
      <div className="flex items-center justify-center">
        <WifiOff className="w-4 h-4 mr-2" />
        You're offline. Your data is saved locally and will sync when you reconnect.
      </div>
    </motion.div>
  );
});

// Memory status indicator (for debugging)
const MemoryStatusIndicator = React.memo(({ getMemoryStatus }: { getMemoryStatus: () => any }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [memoryStatus, setMemoryStatus] = useState<any>(null);

  useEffect(() => {
    if (showStatus) {
      const status = getMemoryStatus();
      setMemoryStatus(status);
      
      // Update every second when visible
      const interval = setInterval(() => {
        setMemoryStatus(getMemoryStatus());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showStatus, getMemoryStatus]);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowStatus(!showStatus)}
        className="bg-blue-500 text-white p-2 rounded-full text-xs"
      >
        MEM
      </button>
      
      {showStatus && memoryStatus && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-12 right-0 bg-black/90 text-white p-3 rounded text-xs max-w-xs"
        >
          <h4 className="font-bold mb-2">Memory Status (1min expiry)</h4>
          {Object.entries(memoryStatus).map(([step, status]: [string, any]) => (
            <div key={step} className="mb-1">
              <strong>{step}:</strong> {status.hasData ? '✓' : '✗'} 
              {status.hasData && (
                <span className="ml-1">
                  ({Math.round(status.timeRemaining / 1000)}s left)
                </span>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
});

// Error fallback for lazy loading
const LazyLoadErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
    <h3 className="text-white font-medium mb-2">Failed to load form step</h3>
    <p className="text-gray-400 mb-4 text-sm">
      There was an error loading this part of the form.
    </p>
    <button
      onClick={retry}
      className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Memoized animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

// Main component
export const OptimizedBookingPageWithErrorHandling: React.FC = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepLoadingError, setStepLoadingError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    formData, 
    isLoading, 
    clearFormData, 
    validateStep, 
    getProgressPercentage,
    getMemoryStatus 
  } = useBookingForm();
  
  const totalSteps = 5;
  
  // Error recovery state
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Memoize search params to prevent unnecessary re-renders
  const isNewBooking = useMemo(() => {
    return searchParams.get('new') === 'true';
  }, [searchParams]);

  // Initialize step only once
  useEffect(() => {
    let mounted = true;

    const initializeStep = async () => {
      if (!mounted) return;

      try {
        if (isNewBooking) {
          clearFormData();
          setStep(1);
        } else {
          // Load saved step from memory storage
          const savedStep = sessionStorage.getItem('booking-current-step');
          if (savedStep && parseInt(savedStep, 10) > 1) {
            setStep(parseInt(savedStep, 10));
          } else {
            setStep(1);
          }
        }
      } catch (error) {
        console.error('Error initializing booking step:', error);
        setStep(1); // Fallback to step 1
      }
    };

    initializeStep();

    return () => {
      mounted = false;
    };
  }, [isNewBooking, clearFormData]);

  // Save current step to sessionStorage whenever it changes
  useEffect(() => {
    if (!isLoading && step > 0) {
      try {
        sessionStorage.setItem('booking-current-step', step.toString());
      } catch (error) {
        console.warn('Could not save current step:', error);
      }
    }
  }, [step, isLoading]);

  // Navigation handlers with error handling
  const goToNextStep = useCallback(() => {
    try {
      if (step < totalSteps && validateStep(step)) {
        setDirection(1);
        setStep(prev => prev + 1);
        setStepLoadingError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error navigating to next step:', error);
      setStepLoadingError('Failed to navigate to next step');
    }
  }, [step, totalSteps, validateStep]);

  const goToPreviousStep = useCallback(() => {
    try {
      if (step > 1) {
        setDirection(-1);
        setStep(prev => prev - 1);
        setStepLoadingError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error navigating to previous step:', error);
      setStepLoadingError('Failed to navigate to previous step');
    }
  }, [step]);

  // Enhanced booking completion handler with retry logic
  const handleBookingComplete = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random failure for testing
          if (Math.random() < 0.1 && retryCount < maxRetries) {
            reject(new Error('Network error during booking submission'));
          } else {
            resolve(true);
          }
        }, 1500);
      });
      
      // Clear all saved booking data when booking is completed
      clearFormData();
      
      // Show success screen
      setIsSubmitted(true);
      setRetryCount(0);
    } catch (error) {
      console.error('Error submitting booking:', error);
      
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        // Auto-retry after a delay
        setTimeout(() => {
          handleBookingComplete();
        }, 2000 * (retryCount + 1)); // Exponential backoff
      } else {
        // Show error state or redirect to error page
        alert('Failed to submit booking after multiple attempts. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, clearFormData, retryCount, maxRetries]);

  const handleBackToDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  // Memoized step names
  const stepNames = useMemo(() => [
    'Basic Information',
    'Personal Details',
    'Tattoo Details',
    'Visual References',
    'Additional Info'
  ], []);

  // Memoized progress percentage
  const progressPercentage = useMemo(() => {
    try {
      return getProgressPercentage;
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  }, [getProgressPercentage]);

  // Retry loading step
  const retryStepLoading = useCallback(() => {
    setStepLoadingError(null);
    // Force re-render of the step
    setStep(prevStep => prevStep);
  }, []);

  // Render step content with enhanced error handling
  const renderStepContent = useCallback(() => {
    const commonProps = {
      onNext: goToNextStep,
      onBack: goToPreviousStep,
    };

    if (stepLoadingError) {
      return <LazyLoadErrorFallback error={new Error(stepLoadingError)} retry={retryStepLoading} />;
    }

    try {
      switch (step) {
        case 1:
          return (
            <Suspense fallback={<StepLoadingSpinner />}>
              <BookingErrorBoundary>
                <OptimizedStepOneForm onNext={goToNextStep} />
              </BookingErrorBoundary>
            </Suspense>
          );
        case 2:
          return (
            <Suspense fallback={<StepLoadingSpinner />}>
              <BookingErrorBoundary>
                <StepTwoForm {...commonProps} />
              </BookingErrorBoundary>
            </Suspense>
          );
        case 3:
          return (
            <Suspense fallback={<StepLoadingSpinner />}>
              <BookingErrorBoundary>
                <StepThreeForm {...commonProps} />
              </BookingErrorBoundary>
            </Suspense>
          );
        case 4:
          return (
            <Suspense fallback={<StepLoadingSpinner />}>
              <BookingErrorBoundary>
                <StepFourForm {...commonProps} />
              </BookingErrorBoundary>
            </Suspense>
          );
        case 5:
          return (
            <Suspense fallback={<StepLoadingSpinner />}>
              <BookingErrorBoundary>
                <StepFiveForm 
                  onSubmit={handleBookingComplete} 
                  onBack={goToPreviousStep}
                />
              </BookingErrorBoundary>
            </Suspense>
          );
        default:
          return (
            <Suspense fallback={<StepLoadingSpinner />}>
              <BookingErrorBoundary>
                <OptimizedStepOneForm onNext={goToNextStep} />
              </BookingErrorBoundary>
            </Suspense>
          );
      }
    } catch (error) {
      console.error('Error rendering step content:', error);
      setStepLoadingError('Failed to render form step');
      return <LazyLoadErrorFallback error={error as Error} retry={retryStepLoading} />;
    }
  }, [step, goToNextStep, goToPreviousStep, handleBookingComplete, stepLoadingError, retryStepLoading]);

  // Show loading skeleton while initializing
  if (isLoading) {
    return <BookingPageSkeleton />;
  }

  return (
    <BookingErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
        {/* Connection Status */}
        <ConnectionStatus />
        
        {/* Navigation Bar */}
        <MainNav />

        {/* Memory Status (Development Only) */}
        <MemoryStatusIndicator getMemoryStatus={getMemoryStatus} />

        {/* Booking Form */}
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col items-center pt-24 pb-12 px-4"
        >
          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-white mb-3 tracking-tight text-center"
          >
            Book Your <span className="text-teal-400">Tattoo Session</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-400 mb-6 text-center max-w-xl"
          >
            Complete the steps below to schedule your consultation or tattoo appointment with one of our artists.
          </motion.p>

          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="w-full max-w-4xl mb-8">
              <div className="bg-gray-800 rounded-full h-2 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-center text-sm text-gray-400">
                {Math.round(progressPercentage)}% Complete
                {retryCount > 0 && (
                  <span className="ml-2 text-orange-400">
                    (Retry {retryCount}/{maxRetries})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Progress Steps - Hide when showing success */}
          {!isSubmitted && (
            <div className="w-full max-w-4xl px-4 mb-8">
              <StepIndicator
                currentStep={step}
                steps={stepNames}
              />
            </div>
          )}

          {/* Form Container */}
          <div className="w-full max-w-4xl px-4">
            {isSubmitted ? (
              <BookingSuccess />
            ) : (
              <motion.div
                className="bg-[#111] border border-gray-800 rounded-lg p-6 shadow-xl"
                whileHover={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <Footer />
      </div>
    </BookingErrorBoundary>
  );
};

export default OptimizedBookingPageWithErrorHandling; 
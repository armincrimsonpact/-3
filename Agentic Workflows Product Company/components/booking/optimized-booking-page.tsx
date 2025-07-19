import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import { MainNav } from '@/components/layout/main-nav';
import { StepIndicator } from '@/components/booking/step-indicator';
import { BookingSuccess } from '@/components/booking/booking-success';
import { useBookingForm } from '@/lib/hooks/useBookingForm';

// Lazy load step components for better performance
const OptimizedStepOneForm = React.lazy(() => import('@/components/booking/optimized-step-one-form'));
const StepTwoForm = React.lazy(() => import('@/components/booking/step-two-form').then(module => ({ default: module.StepTwoForm })));
const StepThreeForm = React.lazy(() => import('@/components/booking/step-three-form').then(module => ({ default: module.StepThreeForm })));
const StepFourForm = React.lazy(() => import('@/components/booking/step-four-form').then(module => ({ default: module.StepFourForm })));
const StepFiveForm = React.lazy(() => import('@/components/booking/step-five-form').then(module => ({ default: module.StepFiveForm })));

// Loading component for suspense
const StepLoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
    <span className="ml-3 text-white">Loading...</span>
  </div>
));

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

export const OptimizedBookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formData, isLoading, clearFormData, validateStep, getProgressPercentage } = useBookingForm();
  
  const totalSteps = 5;
  
  // Memoize search params to prevent unnecessary re-renders
  const isNewBooking = useMemo(() => {
    return searchParams.get('new') === 'true';
  }, [searchParams]);

  // Initialize step only once
  useEffect(() => {
    let mounted = true;

    const initializeStep = () => {
      if (!mounted) return;

      if (isNewBooking) {
        clearFormData();
        setStep(1);
      } else {
                 // Load saved step from localStorage
         try {
           const savedStep = localStorage.getItem('booking-current-step');
           if (savedStep && parseInt(savedStep, 10) > 1) {
             setStep(parseInt(savedStep, 10));
           } else {
             setStep(1);
           }
         } catch (error) {
           console.warn('Could not read current step from localStorage:', error);
           setStep(1);
         }
      }
    };

    initializeStep();

    return () => {
      mounted = false;
    };
  }, [isNewBooking, clearFormData]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && step > 0) {
      try {
        localStorage.setItem('booking-current-step', step.toString());
      } catch (error) {
        console.warn('Could not save current step to localStorage:', error);
      }
    }
  }, [step, isLoading]);

  // Navigation handlers
  const goToNextStep = useCallback(() => {
    if (step < totalSteps && validateStep(step)) {
      setDirection(1);
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step, totalSteps, validateStep]);

  const goToPreviousStep = useCallback(() => {
    if (step > 1) {
      setDirection(-1);
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  // Optimized booking completion handler
  const handleBookingComplete = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual booking submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear all saved booking data when booking is completed
      clearFormData();
      
      // Show success screen
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      // Handle error - could show error message to user
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, clearFormData]);

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
    const percentage = getProgressPercentage();
    return percentage;
  }, [getProgressPercentage]);

  // Render step content with lazy loading
  const renderStepContent = useCallback(() => {
    const commonProps = {
      onNext: goToNextStep,
      onBack: goToPreviousStep,
    };

    switch (step) {
      case 1:
        return (
          <Suspense fallback={<StepLoadingSpinner />}>
            <OptimizedStepOneForm onNext={goToNextStep} />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<StepLoadingSpinner />}>
            <StepTwoForm {...commonProps} />
          </Suspense>
        );
      case 3:
        return (
          <Suspense fallback={<StepLoadingSpinner />}>
            <StepThreeForm {...commonProps} />
          </Suspense>
        );
      case 4:
        return (
          <Suspense fallback={<StepLoadingSpinner />}>
            <StepFourForm {...commonProps} />
          </Suspense>
        );
      case 5:
        return (
          <Suspense fallback={<StepLoadingSpinner />}>
            <StepFiveForm 
              onSubmit={handleBookingComplete} 
              onBack={goToPreviousStep}
            />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<StepLoadingSpinner />}>
            <OptimizedStepOneForm onNext={goToNextStep} />
          </Suspense>
        );
    }
  }, [step, goToNextStep, goToPreviousStep, handleBookingComplete, isSubmitting]);

  // Show loading state while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-lg flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500 mr-3"></div>
            Loading booking form...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
      {/* Navigation Bar */}
      <MainNav />

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
  );
};

export default OptimizedBookingPage; 
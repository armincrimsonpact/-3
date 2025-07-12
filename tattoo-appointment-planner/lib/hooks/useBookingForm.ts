import { useState, useEffect, useCallback, useMemo } from 'react';
import { useBookingMemory, clearAllBookingMemory } from './useMemoryStorage';

// Types for each step's data
export interface StepOneData {
  selectedArtist: string;
  selectedLocation: string;
  selectedDate: string | null;
  selectedTime: string;
}

export interface StepTwoData {
  firstName: string;
  lastName: string;
  pronouns: string;
  dateOfBirth: string | null;
  phone: string;
  email: string;
  confirmEmail: string;
  contactMethod: string | null;
  instagramAccount: string;
  accessibilityNotes: string;
}

export interface StepThreeData {
  tattooStyle: string;
  tattooSize: string;
  placement: string;
  hasScars: string | null;
  scarDetails: string;
  budget: string;
  inspiration: string;
  description: string;
  previousTattoo: string | null;
  additionalInfo: string;
}

export interface StepFourData {
  referenceImages: File[];
  additionalImages: File[];
  visualNotes: string;
}

export interface StepFiveData {
  emergencyContactName: string;
  emergencyContactPhone: string;
  healthConditions: string;
  medications: string;
  allergies: string;
  consentToTattoo: boolean;
  consentToPhotos: boolean;
  marketingConsent: boolean;
  additionalRequests: string;
}

// Combined form data interface
export interface BookingFormData {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  stepFour: StepFourData;
  stepFive: StepFiveData;
}

// Initial data for each step
const initialStepOneData: StepOneData = {
  selectedArtist: '',
  selectedLocation: '',
  selectedDate: null,
  selectedTime: '',
};

const initialStepTwoData: StepTwoData = {
  firstName: '',
  lastName: '',
  pronouns: '',
  dateOfBirth: null,
  phone: '',
  email: '',
  confirmEmail: '',
  contactMethod: null,
  instagramAccount: '',
  accessibilityNotes: '',
};

const initialStepThreeData: StepThreeData = {
  tattooStyle: '',
  tattooSize: '',
  placement: '',
  hasScars: null,
  scarDetails: '',
  budget: '',
  inspiration: '',
  description: '',
  previousTattoo: null,
  additionalInfo: '',
};

const initialStepFourData: StepFourData = {
  referenceImages: [],
  additionalImages: [],
  visualNotes: '',
};

const initialStepFiveData: StepFiveData = {
  emergencyContactName: '',
  emergencyContactPhone: '',
  healthConditions: '',
  medications: '',
  allergies: '',
  consentToTattoo: false,
  consentToPhotos: false,
  marketingConsent: false,
  additionalRequests: '',
};

// Validation functions for each step
const validateStepOne = (data: StepOneData): boolean => {
  return !!(data.selectedArtist && data.selectedLocation && data.selectedDate && data.selectedTime);
};

const validateStepTwo = (data: StepTwoData): boolean => {
  const emailsMatch = data.email === data.confirmEmail;
  const isValidAge = data.dateOfBirth ? calculateAge(new Date(data.dateOfBirth)) >= 18 : false;
  
  return !!(
    data.firstName &&
    data.lastName &&
    data.email &&
    data.confirmEmail &&
    emailsMatch &&
    data.phone &&
    data.dateOfBirth &&
    isValidAge &&
    data.contactMethod
  );
};

const validateStepThree = (data: StepThreeData): boolean => {
  return !!(
    data.tattooStyle &&
    data.tattooSize &&
    data.placement &&
    data.hasScars !== null &&
    data.budget &&
    data.previousTattoo !== null
  );
};

const validateStepFour = (data: StepFourData): boolean => {
  // Step 4 is optional, so always return true
  return true;
};

const validateStepFive = (data: StepFiveData): boolean => {
  return !!(
    data.emergencyContactName &&
    data.emergencyContactPhone &&
    data.consentToTattoo
  );
};

// Helper function to calculate age
const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

// Memory storage with 1-minute expiration
const useStepMemory = <T>(stepKey: string, initialValue: T) => {
  return useBookingMemory<T>(`booking-${stepKey}`, initialValue);
};

// Custom hook for booking form management with 1-minute memory expiration
export const useBookingForm = () => {
  // Individual memory storage for each step (1-minute expiration)
  const stepOneMemory = useStepMemory('stepone', initialStepOneData);
  const stepTwoMemory = useStepMemory('steptwo', initialStepTwoData);
  const stepThreeMemory = useStepMemory('stepthree', initialStepThreeData);
  const stepFourMemory = useStepMemory('stepfour', initialStepFourData);
  const stepFiveMemory = useStepMemory('stepfive', initialStepFiveData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Consolidated form data from memory storage
  const formData = useMemo((): BookingFormData => ({
    stepOne: stepOneMemory.value || initialStepOneData,
    stepTwo: stepTwoMemory.value || initialStepTwoData,
    stepThree: stepThreeMemory.value || initialStepThreeData,
    stepFour: stepFourMemory.value || initialStepFourData,
    stepFive: stepFiveMemory.value || initialStepFiveData,
  }), [
    stepOneMemory.value,
    stepTwoMemory.value,
    stepThreeMemory.value,
    stepFourMemory.value,
    stepFiveMemory.value
  ]);

  // Loading state based on all memory storages
  const isLoading = useMemo(() => {
    return stepOneMemory.isLoading || stepTwoMemory.isLoading || 
           stepThreeMemory.isLoading || stepFourMemory.isLoading || 
           stepFiveMemory.isLoading;
  }, [
    stepOneMemory.isLoading,
    stepTwoMemory.isLoading,
    stepThreeMemory.isLoading,
    stepFourMemory.isLoading,
    stepFiveMemory.isLoading
  ]);

  // Update specific step data
  const updateStepData = useCallback(<T extends keyof BookingFormData>(
    step: T,
    data: Partial<BookingFormData[T]>
  ) => {
    const currentData = formData[step];
    const newData = { ...currentData, ...data };

    switch (step) {
      case 'stepOne':
        stepOneMemory.setItem(newData as StepOneData);
        break;
      case 'stepTwo':
        stepTwoMemory.setItem(newData as StepTwoData);
        break;
      case 'stepThree':
        stepThreeMemory.setItem(newData as StepThreeData);
        break;
      case 'stepFour':
        stepFourMemory.setItem(newData as StepFourData);
        break;
      case 'stepFive':
        stepFiveMemory.setItem(newData as StepFiveData);
        break;
    }
  }, [formData, stepOneMemory, stepTwoMemory, stepThreeMemory, stepFourMemory, stepFiveMemory]);

  // Validate specific step
  const validateStep = useCallback((step: number): boolean => {
    const validators = [
      validateStepOne,
      validateStepTwo,
      validateStepThree,
      validateStepFour,
      validateStepFive,
    ];

    const stepKeys: (keyof BookingFormData)[] = ['stepOne', 'stepTwo', 'stepThree', 'stepFour', 'stepFive'];
    const stepKey = stepKeys[step - 1];

    if (step < 1 || step > 5) return false;

    return validators[step - 1](formData[stepKey] as any);
  }, [formData]);

  // Get validation errors for a specific step
  const getStepErrors = useCallback((step: number): Record<string, string> => {
    const stepErrors: Record<string, string> = {};

    if (step === 2) {
      const { email, confirmEmail, dateOfBirth } = formData.stepTwo;
      if (email && confirmEmail && email !== confirmEmail) {
        stepErrors.confirmEmail = 'Email addresses do not match';
      }
      if (dateOfBirth && calculateAge(new Date(dateOfBirth)) < 18) {
        stepErrors.dateOfBirth = 'You must be 18 or older to get a tattoo';
      }
    }

    return stepErrors;
  }, [formData]);

  // Clear all form data
  const clearFormData = useCallback(() => {
    stepOneMemory.removeItem();
    stepTwoMemory.removeItem();
    stepThreeMemory.removeItem();
    stepFourMemory.removeItem();
    stepFiveMemory.removeItem();
    
    // Clear all booking memory globally
    clearAllBookingMemory();
  }, [stepOneMemory, stepTwoMemory, stepThreeMemory, stepFourMemory, stepFiveMemory]);

  // Check if all steps are valid
  const isFormComplete = useMemo(() => {
    return [1, 2, 3, 4, 5].every(step => validateStep(step));
  }, [validateStep]);

  // Get progress percentage
  const getProgressPercentage = useMemo(() => {
    const completedSteps = [1, 2, 3, 4, 5].filter(step => validateStep(step)).length;
    return (completedSteps / 5) * 100;
  }, [validateStep]);

  // Get memory status for debugging
  const getMemoryStatus = useCallback(() => {
    return {
      stepOne: {
        hasData: !!stepOneMemory.value,
        timeRemaining: stepOneMemory.getTimeRemaining(),
        isExpired: stepOneMemory.isExpired()
      },
      stepTwo: {
        hasData: !!stepTwoMemory.value,
        timeRemaining: stepTwoMemory.getTimeRemaining(),
        isExpired: stepTwoMemory.isExpired()
      },
      stepThree: {
        hasData: !!stepThreeMemory.value,
        timeRemaining: stepThreeMemory.getTimeRemaining(),
        isExpired: stepThreeMemory.isExpired()
      },
      stepFour: {
        hasData: !!stepFourMemory.value,
        timeRemaining: stepFourMemory.getTimeRemaining(),
        isExpired: stepFourMemory.isExpired()
      },
      stepFive: {
        hasData: !!stepFiveMemory.value,
        timeRemaining: stepFiveMemory.getTimeRemaining(),
        isExpired: stepFiveMemory.isExpired()
      }
    };
  }, [stepOneMemory, stepTwoMemory, stepThreeMemory, stepFourMemory, stepFiveMemory]);

  return {
    formData,
    isLoading,
    errors,
    updateStepData,
    validateStep,
    getStepErrors,
    clearFormData,
    isFormComplete,
    getProgressPercentage,
    getMemoryStatus, // New: for debugging memory state
  };
};

export default useBookingForm; 
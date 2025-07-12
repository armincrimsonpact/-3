import { useState, useCallback, useEffect, useMemo } from 'react';

// Simple debounce function with cancel
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeoutId: NodeJS.Timeout;
  
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
  
  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };
  
  return debounced;
};

// Validation rule types
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  email?: boolean;
  phone?: boolean;
  age?: { min: number; max?: number };
  match?: string; // field name to match against
};

export type ValidationRules = Record<string, ValidationRule>;

export type ValidationErrors = Record<string, string>;

export type ValidationState = {
  errors: ValidationErrors;
  isValid: boolean;
  isValidating: boolean;
  hasBeenValidated: boolean;
};

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (flexible international format)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// Validation functions
const validateEmail = (value: string): string | null => {
  if (!value) return null;
  return EMAIL_REGEX.test(value) ? null : 'Please enter a valid email address';
};

const validatePhone = (value: string): string | null => {
  if (!value) return null;
  const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
  return PHONE_REGEX.test(cleanPhone) ? null : 'Please enter a valid phone number';
};

const validateAge = (dateOfBirth: string, minAge: number, maxAge?: number): string | null => {
  if (!dateOfBirth) return null;
  
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < minAge) {
    return `You must be at least ${minAge} years old`;
  }
  
  if (maxAge && age > maxAge) {
    return `You must be under ${maxAge} years old`;
  }
  
  return null;
};

const validateSingleField = (
  value: any,
  rule: ValidationRule,
  allValues: Record<string, any>
): string | null => {
  // Required validation
  if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return 'This field is required';
  }
  
  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  
  // String-based validations
  if (typeof value === 'string') {
    // Length validations
    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`;
    }
    
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`;
    }
    
    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Invalid format';
    }
    
    // Email validation
    if (rule.email) {
      const emailError = validateEmail(value);
      if (emailError) return emailError;
    }
    
    // Phone validation
    if (rule.phone) {
      const phoneError = validatePhone(value);
      if (phoneError) return phoneError;
    }
    
    // Match validation (for password confirmation, etc.)
    if (rule.match && allValues[rule.match] !== value) {
      return 'Values do not match';
    }
  }
  
  // Age validation
  if (rule.age && typeof value === 'string') {
    const ageError = validateAge(value, rule.age.min, rule.age.max);
    if (ageError) return ageError;
  }
  
  // Custom validation
  if (rule.custom) {
    const customError = rule.custom(value);
    if (customError) return customError;
  }
  
  return null;
};

export const useFormValidation = (
  rules: ValidationRules,
  debounceMs: number = 300
) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValidating, setIsValidating] = useState(false);
  const [hasBeenValidated, setHasBeenValidated] = useState(false);

  // Debounced validation function
  const debouncedValidate = useMemo(
    () => debounce((values: Record<string, any>) => {
      const newErrors: ValidationErrors = {};
      
      Object.entries(rules).forEach(([fieldName, rule]) => {
        const error = validateSingleField(values[fieldName], rule, values);
        if (error) {
          newErrors[fieldName] = error;
        }
      });
      
      setErrors(newErrors);
      setIsValidating(false);
      setHasBeenValidated(true);
    }, debounceMs),
    [rules, debounceMs]
  );

  // Validate all fields
  const validateAll = useCallback((values: Record<string, any>) => {
    setIsValidating(true);
    debouncedValidate(values);
  }, [debouncedValidate]);

  // Validate a single field
  const validateField = useCallback((
    fieldName: string,
    value: any,
    allValues: Record<string, any>
  ) => {
    const rule = rules[fieldName];
    if (!rule) return;

    const error = validateSingleField(value, rule, allValues);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));
  }, [rules]);

  // Clear validation for a field
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  // Clear all validation
  const clearAllErrors = useCallback(() => {
    setErrors({});
    setHasBeenValidated(false);
  }, []);

  // Check if form is valid
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  // Get specific field error
  const getFieldError = useCallback((fieldName: string) => {
    return errors[fieldName] || '';
  }, [errors]);

  // Check if field has error
  const hasFieldError = useCallback((fieldName: string) => {
    return Boolean(errors[fieldName]);
  }, [errors]);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedValidate.cancel();
    };
  }, [debouncedValidate]);

  return {
    errors,
    isValid,
    isValidating,
    hasBeenValidated,
    validateAll,
    validateField,
    clearFieldError,
    clearAllErrors,
    getFieldError,
    hasFieldError,
  };
};

export default useFormValidation; 
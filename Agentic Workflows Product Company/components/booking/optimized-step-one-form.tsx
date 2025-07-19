import React, { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User } from 'lucide-react';
import { OptimizedDropdown } from '@/components/ui/form/OptimizedDropdown';
import { InlineCalendar } from '@/components/ui/inline-calendar';
import { useBookingForm } from '@/lib/hooks/useBookingForm';

interface OptimizedStepOneFormProps {
  onNext: () => void;
}

// Memoized static data to prevent re-creation on every render
const artistOptions = [
  { value: 'alex-morgan', label: 'Alex Morgan' },
  { value: 'jamie-chen', label: 'Jamie Chen' },
  { value: 'luna-diaz', label: 'Luna Diaz' },
  { value: 'thomas-berg', label: 'Thomas Berg' },
];

const locationOptions = [
  { value: 'berlin', label: 'Berlin' },
  { value: 'hamburg', label: 'Hamburg' },
  { value: 'munich', label: 'Munich' },
];

// Memoized animation variants
const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const OptimizedStepOneForm = memo<OptimizedStepOneFormProps>(({ onNext }) => {
  const { formData, updateStepData, validateStep, getStepErrors } = useBookingForm();
  const stepOneData = formData.stepOne;
  const errors = getStepErrors(1);

  // Memoized validation state
  const isFormValid = useMemo(() => validateStep(1), [validateStep]);

  // Memoized handlers to prevent re-creation
  const handleArtistChange = useCallback((value: string) => {
    updateStepData('stepOne', { selectedArtist: value });
  }, [updateStepData]);

  const handleLocationChange = useCallback((value: string) => {
    updateStepData('stepOne', { selectedLocation: value });
  }, [updateStepData]);

  const handleDateTimeSelect = useCallback((date: Date | null, time?: string) => {
    updateStepData('stepOne', { 
      selectedDate: date ? date.toISOString() : null,
      selectedTime: time || stepOneData.selectedTime 
    });
  }, [updateStepData, stepOneData.selectedTime]);

  const handleNextClick = useCallback(() => {
    if (isFormValid) {
      onNext();
    }
  }, [isFormValid, onNext]);

  // Memoized parsed date
  const selectedDate = useMemo(() => {
    return stepOneData.selectedDate ? new Date(stepOneData.selectedDate) : null;
  }, [stepOneData.selectedDate]);

  return (
    <motion.div 
      className="space-y-6" 
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-gray-400 text-sm">
          Let's start with selecting your artist, location, and preferred appointment time.
        </p>
      </div>

      <div className="space-y-4">
        <OptimizedDropdown
          options={artistOptions}
          value={stepOneData.selectedArtist}
          onChange={handleArtistChange}
          placeholder="Select an artist"
          label="Artist"
          icon={<User className="w-4 h-4" />}
          required
          searchable
          clearable
          error={errors.selectedArtist}
        />

        <OptimizedDropdown
          options={locationOptions}
          value={stepOneData.selectedLocation}
          onChange={handleLocationChange}
          placeholder="Select a location"
          label="Location"
          icon={<MapPin className="w-4 h-4" />}
          required
          searchable
          clearable
          error={errors.selectedLocation}
        />

        <div className="space-y-3">
          <div className="flex items-center mb-3">
            <Calendar className="mr-2 h-5 w-5 text-teal-500" />
            <label className="text-white font-medium">
              Date and Time <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
          <InlineCalendar 
            selectedDate={selectedDate}
            onSelectDate={handleDateTimeSelect}
            selectedTime={stepOneData.selectedTime}
          />
          {(errors.selectedDate || errors.selectedTime) && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {errors.selectedDate || errors.selectedTime}
            </motion.p>
          )}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-700/50">
        <motion.button
          whileHover={{ scale: isFormValid ? 1.02 : 1 }}
          whileTap={{ scale: isFormValid ? 0.98 : 1 }}
          type="button"
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isFormValid
              ? 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleNextClick}
          disabled={!isFormValid}
        >
          Next Step
        </motion.button>
      </div>
    </motion.div>
  );
});

OptimizedStepOneForm.displayName = 'OptimizedStepOneForm';

export default OptimizedStepOneForm; 
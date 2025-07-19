import React, { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'custom';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
  className?: string;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
  children?: ReactNode;
  variant?: 'default' | 'compact';
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  (
    {
      label,
      id,
      type = 'text',
      placeholder,
      value = '',
      onChange,
      onBlur,
      error,
      required,
      disabled,
      icon,
      description,
      className = '',
      rows = 3,
      options = [],
      children,
      variant = 'default',
    },
    ref
  ) => {
    const baseInputClasses = `
      w-full 
      bg-[#0d1520] 
      border 
      ${error ? 'border-red-500' : 'border-gray-700'} 
      text-white 
      p-3 
      rounded-md 
      focus:ring-2 
      ${error ? 'focus:ring-red-500' : 'focus:ring-teal-500'} 
      focus:border-transparent 
      transition-all
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `;

    const labelClasses = `
      block 
      text-white 
      font-medium 
      mb-2 
      flex 
      items-center
      ${variant === 'compact' ? 'text-sm' : ''}
    `;

    const containerClasses = `
      ${variant === 'compact' ? 'space-y-1' : 'space-y-2'}
      ${className}
    `;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const renderInput = () => {
      switch (type) {
        case 'textarea':
          return (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={id}
              className={`${baseInputClasses} resize-none`}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onBlur={onBlur}
              required={required}
              disabled={disabled}
              rows={rows}
            />
          );
        
        case 'select':
          return (
            <select
              id={id}
              className={baseInputClasses}
              value={value}
              onChange={handleInputChange}
              onBlur={onBlur}
              required={required}
              disabled={disabled}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        
        case 'custom':
          return children;
        
        default:
          return (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              id={id}
              className={baseInputClasses}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onBlur={onBlur}
              required={required}
              disabled={disabled}
            />
          );
      }
    };

    return (
      <motion.div
        className={containerClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label htmlFor={id} className={labelClasses}>
          {icon && <span className="mr-2 text-teal-500">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {description && (
          <p className={`text-gray-400 ${variant === 'compact' ? 'text-xs' : 'text-sm'} mb-2`}>
            {description}
          </p>
        )}
        
        {renderInput()}
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField; 
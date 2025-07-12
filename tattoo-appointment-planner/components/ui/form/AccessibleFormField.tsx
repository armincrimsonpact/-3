"use client"

import React, { forwardRef, useRef, useEffect, useId } from 'react'
import { useAccessibility } from '@/lib/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface AccessibleFormFieldProps {
  // Basic field props
  label: string
  id?: string
  name?: string
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'textarea' | 'select'
  value?: string | number
  placeholder?: string
  disabled?: boolean
  required?: boolean
  
  // Validation & feedback
  error?: string
  description?: string
  
  // Styling
  className?: string
  labelClassName?: string
  inputClassName?: string
  
  // Accessibility
  ariaLabel?: string
  ariaDescribedBy?: string
  
  // Select/textarea specific
  options?: Array<{ value: string; label: string; disabled?: boolean }>
  rows?: number
  
  // Events
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  
  // Children for custom content
  children?: React.ReactNode
}

export const AccessibleFormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  AccessibleFormFieldProps
>(({
  label,
  id: providedId,
  name,
  type = 'text',
  value = '',
  placeholder,
  disabled = false,
  required = false,
  error,
  description,
  className = '',
  labelClassName = '',
  inputClassName = '',
  ariaLabel,
  ariaDescribedBy,
  options = [],
  rows = 4,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  children
}, ref) => {
  const { formAccessibility, screenReader, aria, isReducedMotion } = useAccessibility()
  const generatedId = useId()
  const fieldId = providedId || generatedId
  const errorRef = useRef<HTMLDivElement>(null)
  
  // Generate proper accessibility attributes
  const fieldAttributes = formAccessibility.getFieldAttributes({
    id: fieldId,
    label,
    description,
    error,
    required,
    invalid: !!error
  })

  // Announce errors to screen readers
  useEffect(() => {
    if (error && errorRef.current) {
      screenReader.announce(`Error: ${error}`, { politeness: 'assertive' })
    }
  }, [error, screenReader])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  // Handle keyboard navigation for custom select
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(e)
    }

    // Add specific keyboard handling for different field types
    if (type === 'select' && ['ArrowUp', 'ArrowDown', 'Enter', 'Space'].includes(e.key)) {
      // Custom select keyboard handling would go here
    }
  }

  // Generate input props
  const inputProps = {
    ...fieldAttributes.field,
    name: name || fieldId,
    value,
    placeholder,
    disabled,
    className: cn(
      'w-full px-4 py-3 rounded-lg border transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Base styling
      'bg-bg border-textTertiary/30 text-textPrimary',
      'focus:ring-primary/50 focus:border-primary/50',
      // Error state
      error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50',
      // Reduced motion
      isReducedMotion && 'transition-none',
      inputClassName
    ),
    onChange: handleChange,
    onBlur,
    onFocus,
    onKeyDown: handleKeyDown,
    'aria-label': ariaLabel,
    'aria-describedby': [fieldAttributes.field['aria-describedby'], ariaDescribedBy]
      .filter(Boolean)
      .join(' ') || undefined
  }

  // Render different input types
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            {...inputProps}
          />
        )
      
      case 'select':
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            {...inputProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        )
      
      default:
        return (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            {...inputProps}
          />
        )
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      <label
        {...fieldAttributes.label}
        className={cn(
          'block text-sm font-medium text-textTertiary',
          'flex items-center gap-1',
          disabled && 'opacity-50',
          labelClassName
        )}
      >
        {label}
        {required && (
          <span 
            className="text-red-500" 
            aria-label="required"
            title="This field is required"
          >
            *
          </span>
        )}
      </label>

      {/* Description */}
      {description && fieldAttributes.description && (
        <div
          {...fieldAttributes.description}
          className="text-sm text-textTertiary/80"
        >
          {description}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        {renderInput()}
        
        {/* Custom content (icons, buttons, etc.) */}
        {children}
      </div>

      {/* Error message */}
      {error && fieldAttributes.error && (
        <div
          ref={errorRef}
          {...fieldAttributes.error}
          className={cn(
            'text-sm text-red-500 flex items-start gap-2',
            isReducedMotion ? 'opacity-100' : 'animate-in slide-in-from-top-1 duration-200'
          )}
          role="alert"
        >
          <span className="inline-block w-4 h-4 mt-0.5" aria-hidden="true">
            ⚠️
          </span>
          <span>{error}</span>
        </div>
      )}
    </div>
  )
})

AccessibleFormField.displayName = 'AccessibleFormField'

// Specialized components for common use cases
export const AccessibleEmailField = forwardRef<HTMLInputElement, Omit<AccessibleFormFieldProps, 'type'>>(
  (props, ref) => (
    <AccessibleFormField
      {...props}
      ref={ref}
      type="email"
      placeholder={props.placeholder || "your.email@example.com"}
      ariaLabel={props.ariaLabel || "Email address"}
    />
  )
)

export const AccessiblePasswordField = forwardRef<HTMLInputElement, Omit<AccessibleFormFieldProps, 'type'> & {
  showPasswordToggle?: boolean
}>(({ showPasswordToggle = true, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const { aria } = useAccessibility()
  const toggleId = aria.generateId('password-toggle')

  return (
    <AccessibleFormField
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      placeholder={props.placeholder || "••••••••"}
      ariaLabel={props.ariaLabel || "Password"}
      ariaDescribedBy={showPasswordToggle ? `${toggleId} ${props.ariaDescribedBy || ''}`.trim() : props.ariaDescribedBy}
    >
      {showPasswordToggle && (
        <>
          <button
            id={toggleId}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textTertiary hover:text-textSecondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            tabIndex={-1} // Remove from tab order, accessible via label click
          >
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
            <span aria-hidden="true">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </button>
          <div className="sr-only" id={`${toggleId}-description`}>
            Click to {showPassword ? "hide" : "show"} password
          </div>
        </>
      )}
    </AccessibleFormField>
  )
})

export const AccessiblePhoneField = forwardRef<HTMLInputElement, Omit<AccessibleFormFieldProps, 'type'>>(
  (props, ref) => (
    <AccessibleFormField
      {...props}
      ref={ref}
      type="tel"
      placeholder={props.placeholder || "+1 (555) 123-4567"}
      ariaLabel={props.ariaLabel || "Phone number"}
    />
  )
)

AccessibleEmailField.displayName = 'AccessibleEmailField'
AccessiblePasswordField.displayName = 'AccessiblePasswordField'
AccessiblePhoneField.displayName = 'AccessiblePhoneField' 
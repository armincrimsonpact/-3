"use client"

import React, { useEffect, useRef, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAccessibility } from '@/lib/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  initialFocus?: React.RefObject<HTMLElement | null>
  finalFocus?: React.RefObject<HTMLElement | null>
  preventScroll?: boolean
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  initialFocus,
  finalFocus,
  preventScroll = true
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  const {
    focusManagement,
    aria,
    screenReader,
    isReducedMotion
  } = useAccessibility()

  // Generate IDs for ARIA relationships
  const titleId = aria.generateId('modal-title')
  const descriptionId = description ? aria.generateId('modal-description') : undefined

  // Handle mounting for portal
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle modal open/close effects
  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previouslyFocusedElement.current = document.activeElement as HTMLElement

      // Prevent body scroll
      if (preventScroll) {
        document.body.style.overflow = 'hidden'
      }

      // Announce modal opening to screen readers
      screenReader.announce(`Dialog opened: ${title}`, { politeness: 'assertive' })

      // Focus management after modal is rendered
      setTimeout(() => {
        if (initialFocus?.current) {
          initialFocus.current.focus()
        } else if (modalRef.current) {
          focusManagement.focusFirst(modalRef.current)
        }
      }, 100)
    } else {
      // Restore body scroll
      if (preventScroll) {
        document.body.style.overflow = ''
      }

      // Restore focus to previously focused element
      if (finalFocus?.current) {
        finalFocus.current.focus()
      } else {
        focusManagement.restoreFocus(previouslyFocusedElement.current)
      }

      // Announce modal closing
      screenReader.announce('Dialog closed')
    }

    return () => {
      if (preventScroll) {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, title, initialFocus, finalFocus, focusManagement, screenReader, preventScroll])

  // Handle keyboard events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'Escape':
        if (closeOnEscape) {
          e.preventDefault()
          onClose()
        }
        break

      case 'Tab':
        if (modalRef.current) {
          const focusable = focusManagement.getFocusableElements(modalRef.current)
          if (focusable.length === 0) {
            e.preventDefault()
            return
          }

          const firstFocusable = focusable[0]
          const lastFocusable = focusable[focusable.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault()
              lastFocusable.focus()
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault()
              firstFocusable.focus()
            }
          }
        }
        break
    }
  }, [isOpen, closeOnEscape, onClose, focusManagement])

  // Attach/detach keyboard listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  // Handle overlay click
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose()
    }
  }, [closeOnOverlayClick, onClose])

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose()
  }, [onClose])

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-none w-full h-full'
  }

  if (!isMounted || !isOpen) {
    return null
  }

  const modalContent = (
    <div
      ref={overlayRef}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black/80 backdrop-blur-sm',
        isReducedMotion ? 'opacity-100' : 'animate-in fade-in duration-200'
      )}
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          'relative w-full bg-cardBg rounded-lg shadow-xl',
          'border border-textTertiary/20',
          'max-h-[90vh] overflow-hidden flex flex-col',
          sizeClasses[size],
          isReducedMotion ? 'scale-100' : 'animate-in zoom-in-95 duration-200',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-textTertiary/20">
          <div className="flex-1 pr-4">
            <h2
              id={titleId}
              className="text-xl font-semibold text-textSecondary"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-2 text-sm text-textTertiary"
              >
                {description}
              </p>
            )}
          </div>
          
          {showCloseButton && (
            <button
              type="button"
              onClick={handleCloseClick}
              className={cn(
                'flex-shrink-0 p-2 rounded-md transition-colors',
                'text-textTertiary hover:text-textSecondary hover:bg-textTertiary/10',
                'focus:outline-none focus:ring-2 focus:ring-primary/50'
              )}
              aria-label="Close dialog"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

// Confirmation dialog component
export function AccessibleConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default'
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
}) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const buttonClasses = cn(
    'px-4 py-2 rounded-md font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cardBg'
  )

  const confirmButtonClasses = cn(
    buttonClasses,
    variant === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
      : 'bg-primary text-black hover:bg-primary/90 focus:ring-primary'
  )

  const cancelButtonClasses = cn(
    buttonClasses,
    'bg-textTertiary/20 text-textSecondary hover:bg-textTertiary/30 focus:ring-textTertiary'
  )

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={message}
      size="sm"
      initialFocus={variant === 'danger' ? cancelButtonRef : confirmButtonRef}
    >
      <div className="flex gap-3 justify-end">
        <button
          ref={cancelButtonRef}
          type="button"
          onClick={onClose}
          className={cancelButtonClasses}
        >
          {cancelText}
        </button>
        <button
          ref={confirmButtonRef}
          type="button"
          onClick={handleConfirm}
          className={confirmButtonClasses}
        >
          {confirmText}
        </button>
      </div>
    </AccessibleModal>
  )
}

// Alert dialog component (informational only)
export function AccessibleAlertDialog({
  isOpen,
  onClose,
  title,
  message,
  buttonText = 'OK',
  variant = 'info'
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  buttonText?: string
  variant?: 'info' | 'success' | 'warning' | 'error'
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const variantClasses = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  }

  const variantIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  }

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      initialFocus={buttonRef}
      showCloseButton={false}
    >
      <div className="flex items-start gap-3 mb-6">
        <span 
          className={cn('text-2xl', variantClasses[variant])}
          aria-hidden="true"
        >
          {variantIcons[variant]}
        </span>
        <p className="text-textSecondary flex-1">{message}</p>
      </div>
      
      <div className="flex justify-end">
        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-primary text-black rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-cardBg transition-all duration-200"
        >
          {buttonText}
        </button>
      </div>
    </AccessibleModal>
  )
} 
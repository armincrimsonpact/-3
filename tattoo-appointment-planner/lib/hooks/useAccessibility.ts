"use client"

import { useCallback, useRef, useEffect, useState } from 'react'

interface FocusableElement extends HTMLElement {
  focus(): void
  tabIndex: number
}

interface KeyboardNavigationOptions {
  loop?: boolean
  orientation?: 'horizontal' | 'vertical' | 'both'
  preventDefault?: boolean
}

interface ScreenReaderOptions {
  politeness?: 'polite' | 'assertive'
  atomic?: boolean
  relevant?: string
}

export function useAccessibility() {
  const announcementRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Focus management utilities
  const focusManagement = {
    // Get all focusable elements within a container
    getFocusableElements: useCallback((container: HTMLElement): FocusableElement[] => {
      const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ].join(', ')

      return Array.from(container.querySelectorAll(focusableSelectors))
    }, []),

    // Focus first focusable element
    focusFirst: useCallback((container: HTMLElement) => {
      const focusable = focusManagement.getFocusableElements(container)
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    }, []),

    // Focus last focusable element
    focusLast: useCallback((container: HTMLElement) => {
      const focusable = focusManagement.getFocusableElements(container)
      if (focusable.length > 0) {
        focusable[focusable.length - 1].focus()
      }
    }, []),

    // Trap focus within container
    trapFocus: useCallback((container: HTMLElement) => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusable = focusManagement.getFocusableElements(container)
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

      container.addEventListener('keydown', handleKeyDown)
      return () => container.removeEventListener('keydown', handleKeyDown)
    }, []),

    // Restore focus to previous element
    restoreFocus: useCallback((previouslyFocused: HTMLElement | null) => {
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus()
      }
    }, [])
  }

  // Keyboard navigation utilities
  const keyboardNavigation = {
    // Handle arrow key navigation
    handleArrowKeys: useCallback((
      e: KeyboardEvent, 
      elements: HTMLElement[], 
      currentIndex: number,
      options: KeyboardNavigationOptions = {}
    ) => {
      const { loop = true, orientation = 'both', preventDefault = true } = options
      let newIndex = currentIndex

      const isVertical = ['ArrowUp', 'ArrowDown'].includes(e.key)
      const isHorizontal = ['ArrowLeft', 'ArrowRight'].includes(e.key)

      if ((orientation === 'vertical' && !isVertical) || 
          (orientation === 'horizontal' && !isHorizontal)) {
        return currentIndex
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? elements.length - 1 : 0)
          break
        case 'ArrowDown':
        case 'ArrowRight':
          newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : (loop ? 0 : elements.length - 1)
          break
        case 'Home':
          newIndex = 0
          break
        case 'End':
          newIndex = elements.length - 1
          break
        default:
          return currentIndex
      }

      if (preventDefault) {
        e.preventDefault()
      }

      if (elements[newIndex]) {
        elements[newIndex].focus()
      }

      return newIndex
    }, [])
  }

  // Screen reader utilities
  const screenReader = {
    // Announce message to screen readers
    announce: useCallback((message: string, options: ScreenReaderOptions = {}) => {
      const { politeness = 'polite', atomic = true } = options
      
      if (!announcementRef.current) {
        // Create announcement region if it doesn't exist
        const region = document.createElement('div')
        region.setAttribute('aria-live', politeness)
        region.setAttribute('aria-atomic', atomic.toString())
        region.setAttribute('class', 'sr-only')
        region.style.cssText = `
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        `
        document.body.appendChild(region)
        announcementRef.current = region
      }

      // Clear previous message and set new one
      announcementRef.current.textContent = ''
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = message
        }
      }, 100)
    }, []),

    // Generate descriptive text for complex elements
    generateDescription: useCallback((element: {
      type?: string
      state?: string
      position?: string
      total?: number
    }) => {
      const parts: string[] = []
      
      if (element.type) parts.push(element.type)
      if (element.position && element.total) {
        parts.push(`${element.position} of ${element.total}`)
      }
      if (element.state) parts.push(element.state)
      
      return parts.join(', ')
    }, [])
  }

  // ARIA utilities
  const aria = {
    // Generate unique IDs for ARIA relationships
    generateId: useCallback((prefix: string = 'aria') => {
      return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
    }, []),

    // Create ARIA attributes object
    createAttributes: useCallback((config: {
      label?: string
      labelledBy?: string
      describedBy?: string
      expanded?: boolean
      selected?: boolean
      checked?: boolean | 'mixed'
      disabled?: boolean
      required?: boolean
      invalid?: boolean
      live?: 'polite' | 'assertive' | 'off'
      role?: string
      level?: number
      setSize?: number
      posInSet?: number
    }) => {
      const attributes: Record<string, string> = {}

      if (config.label) attributes['aria-label'] = config.label
      if (config.labelledBy) attributes['aria-labelledby'] = config.labelledBy
      if (config.describedBy) attributes['aria-describedby'] = config.describedBy
      if (config.expanded !== undefined) attributes['aria-expanded'] = config.expanded.toString()
      if (config.selected !== undefined) attributes['aria-selected'] = config.selected.toString()
      if (config.checked !== undefined) attributes['aria-checked'] = config.checked.toString()
      if (config.disabled !== undefined) attributes['aria-disabled'] = config.disabled.toString()
      if (config.required !== undefined) attributes['aria-required'] = config.required.toString()
      if (config.invalid !== undefined) attributes['aria-invalid'] = config.invalid.toString()
      if (config.live) attributes['aria-live'] = config.live
      if (config.role) attributes['role'] = config.role
      if (config.level) attributes['aria-level'] = config.level.toString()
      if (config.setSize) attributes['aria-setsize'] = config.setSize.toString()
      if (config.posInSet) attributes['aria-posinset'] = config.posInSet.toString()

      return attributes
    }, [])
  }

  // Color contrast utilities
  const colorContrast = {
    // Check if colors meet WCAG contrast requirements
    meetsContrastRequirement: useCallback((
      foreground: string, 
      background: string, 
      level: 'AA' | 'AAA' = 'AA'
    ): boolean => {
      // This is a simplified version - in production, you'd use a proper color contrast library
      const getRelativeLuminance = (color: string): number => {
        // Convert hex to RGB and calculate relative luminance
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16) / 255
        const g = parseInt(hex.substr(2, 2), 16) / 255
        const b = parseInt(hex.substr(4, 2), 16) / 255
        
        const toLinear = (val: number) => val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
        
        return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
      }

      const l1 = getRelativeLuminance(foreground)
      const l2 = getRelativeLuminance(background)
      const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
      
      return level === 'AAA' ? contrast >= 7 : contrast >= 4.5
    }, [])
  }

  // Form accessibility utilities
  const formAccessibility = {
    // Generate form field attributes
    getFieldAttributes: useCallback((field: {
      id?: string
      label?: string
      description?: string
      error?: string
      required?: boolean
      invalid?: boolean
    }) => {
      const id = field.id || aria.generateId('field')
      const labelId = `${id}-label`
      const descriptionId = field.description ? `${id}-description` : undefined
      const errorId = field.error ? `${id}-error` : undefined
      
      const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

      return {
        field: {
          id,
          'aria-labelledby': labelId,
          'aria-describedby': describedBy,
          'aria-required': field.required || undefined,
          'aria-invalid': field.invalid || undefined
        },
        label: {
          id: labelId,
          htmlFor: id
        },
        description: descriptionId ? {
          id: descriptionId
        } : undefined,
        error: errorId ? {
          id: errorId,
          'aria-live': 'polite' as const
        } : undefined
      }
    }, [aria])
  }

  return {
    focusManagement,
    keyboardNavigation,
    screenReader,
    aria,
    colorContrast,
    formAccessibility,
    isReducedMotion
  }
} 
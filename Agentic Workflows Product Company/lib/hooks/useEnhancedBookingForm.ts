"use client"

import { useState, useCallback, useEffect } from 'react'
import { useBookingForm } from './useBookingForm'
import { useApiCache } from './useApiCache'
import { useIntelligentCache } from './useIntelligentCache'

interface BookingFormData {
  // Step 1: Service Selection
  serviceType: string
  artistId: string
  studioId: string
  
  // Step 2: Appointment Details
  appointmentDate: string
  appointmentTime: string
  duration: number
  
  // Step 3: Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Step 4: Additional Details
  description: string
  references: string[]
  specialRequests: string
  
  // Step 5: Confirmation
  agreedToTerms: boolean
  marketingConsent: boolean
}

interface FormState {
  data: Partial<BookingFormData>
  errors: Record<string, string>
  isLoading: boolean
  isDirty: boolean
  lastSaved: number | null
}

const AUTOSAVE_INTERVAL = 30 * 1000 // 30 seconds
const FORM_CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export function useEnhancedBookingForm(initialData?: Partial<BookingFormData>) {
  const bookingForm = useBookingForm()
  const apiCache = useApiCache()
  const formCache = useIntelligentCache<FormState>('booking-form', { ttl: FORM_CACHE_TTL })
  
  const [formState, setFormState] = useState<FormState>({
    data: initialData || {},
    errors: {},
    isLoading: false,
    isDirty: false,
    lastSaved: null
  })

  // Load cached form data on mount
  useEffect(() => {
    const cachedState = formCache.get('current-booking')
    if (cachedState && Object.keys(cachedState.data).length > 0) {
      setFormState(prev => ({
        ...prev,
        data: { ...cachedState.data, ...initialData },
        lastSaved: cachedState.lastSaved
      }))
    }
  }, [formCache, initialData])

  // Auto-save form data
  useEffect(() => {
    if (formState.isDirty) {
      const saveTimer = setTimeout(() => {
        formCache.set('current-booking', {
          ...formState,
          lastSaved: Date.now()
        })
        setFormState(prev => ({ ...prev, isDirty: false, lastSaved: Date.now() }))
      }, AUTOSAVE_INTERVAL)

      return () => clearTimeout(saveTimer)
    }
  }, [formState, formCache])

  // Update form data with validation
  const updateFormData = useCallback((field: keyof BookingFormData, value: any) => {
    setFormState(prev => {
      const newData = { ...prev.data, [field]: value }
      const newErrors = { ...prev.errors }
      
      // Clear field-specific error
      delete newErrors[field]
      
      // Perform field validation
      if (field === 'email' && value && !isValidEmail(value)) {
        newErrors[field] = 'Please enter a valid email address'
      }
      
      if (field === 'phone' && value && !isValidPhone(value)) {
        newErrors[field] = 'Please enter a valid phone number'
      }
      
      if (field === 'firstName' && (!value || value.trim().length < 2)) {
        newErrors[field] = 'First name must be at least 2 characters'
      }
      
      if (field === 'lastName' && (!value || value.trim().length < 2)) {
        newErrors[field] = 'Last name must be at least 2 characters'
      }

      return {
        ...prev,
        data: newData,
        errors: newErrors,
        isDirty: true
      }
    })
  }, [])

  // Prefetch related data based on selections
  const prefetchRelatedData = useCallback(async () => {
    const { artistId, studioId } = formState.data

    const prefetchPromises: Promise<any>[] = []

    if (artistId) {
      prefetchPromises.push(apiCache.prefetchArtistData(artistId))
    }

    if (studioId) {
      prefetchPromises.push(
        apiCache.fetchStudios({ id: studioId }).catch(() => {}) // Silent fail for prefetch
      )
    }

    if (prefetchPromises.length > 0) {
      await Promise.allSettled(prefetchPromises)
    }
  }, [formState.data, apiCache])

  // Smart artist/studio suggestions with caching
  const getArtistSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) return []
    
    try {
      const results = await apiCache.search(query, 'artists')
      return results.results.slice(0, 5) // Top 5 suggestions
    } catch (error) {
      console.warn('Failed to fetch artist suggestions:', error)
      return []
    }
  }, [apiCache])

  const getStudioSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) return []
    
    try {
      const results = await apiCache.search(query, 'studios')
      return results.results.slice(0, 5) // Top 5 suggestions
    } catch (error) {
      console.warn('Failed to fetch studio suggestions:', error)
      return []
    }
  }, [apiCache])

  // Get available time slots for selected artist/date
  const getAvailableTimeSlots = useCallback(async (artistId: string, date: string) => {
    const cacheKey = `timeslots-${artistId}-${date}`
    
    return formCache.fetchWithCache(cacheKey, async () => {
      const response = await fetch(`/api/artists/${artistId}/availability?date=${date}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch availability')
      }
      
      return response.json()
    }, { ttl: 5 * 60 * 1000 }) // 5 minutes cache for availability
  }, [formCache])

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const { data } = formState
    const errors: Record<string, string> = {}

    // Required fields validation
    if (!data.serviceType) errors.serviceType = 'Please select a service type'
    if (!data.artistId) errors.artistId = 'Please select an artist'
    if (!data.appointmentDate) errors.appointmentDate = 'Please select a date'
    if (!data.appointmentTime) errors.appointmentTime = 'Please select a time'
    if (!data.firstName) errors.firstName = 'First name is required'
    if (!data.lastName) errors.lastName = 'Last name is required'
    if (!data.email) errors.email = 'Email is required'
    if (!data.phone) errors.phone = 'Phone number is required'
    if (!data.agreedToTerms) errors.agreedToTerms = 'You must agree to the terms and conditions'

    // Format validation
    if (data.email && !isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (data.phone && !isValidPhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    setFormState(prev => ({ ...prev, errors }))
    return Object.keys(errors).length === 0
  }, [formState])

  // Submit form
  const submitForm = useCallback(async () => {
    if (!validateForm()) {
      return { success: false, errors: formState.errors }
    }

    setFormState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState.data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }

      const result = await response.json()

      // Clear cached form data on successful submission
      formCache.del('current-booking')
      
      // Invalidate related cache data
      if (formState.data.artistId) {
        apiCache.invalidateAppointments(formState.data.artistId, 'artist')
      }

      setFormState({
        data: {},
        errors: {},
        isLoading: false,
        isDirty: false,
        lastSaved: null
      })

      return { success: true, data: result }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit booking'
      
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        errors: { ...prev.errors, submit: errorMessage }
      }))

      return { success: false, error: errorMessage }
    }
  }, [formState, validateForm, formCache, apiCache])

  // Clear form data
  const clearForm = useCallback(() => {
    formCache.del('current-booking')
    setFormState({
      data: {},
      errors: {},
      isLoading: false,
      isDirty: false,
      lastSaved: null
    })
  }, [formCache])

  // Get form progress percentage
  const getProgress = useCallback((): number => {
    const requiredFields = [
      'serviceType', 'artistId', 'appointmentDate', 'appointmentTime',
      'firstName', 'lastName', 'email', 'phone'
    ]
    
    const completedFields = requiredFields.filter(field => 
      formState.data[field as keyof BookingFormData]
    ).length
    
    return Math.round((completedFields / requiredFields.length) * 100)
  }, [formState.data])

  // Effect to prefetch data when selections change
  useEffect(() => {
    prefetchRelatedData()
  }, [prefetchRelatedData])

  return {
    // Form state
    formData: formState.data,
    errors: formState.errors,
    isLoading: formState.isLoading,
    isDirty: formState.isDirty,
    lastSaved: formState.lastSaved,
    progress: getProgress(),
    
    // Form actions
    updateFormData,
    validateForm,
    submitForm,
    clearForm,
    
    // Data fetching
    getArtistSuggestions,
    getStudioSuggestions,
    getAvailableTimeSlots,
    
    // Cache management
    getCacheStats: apiCache.getCacheStats,
    clearAllCaches: apiCache.clearAllCaches,
  }
}

// Helper validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s|-|\(|\)/g, ''))
} 
/**
 * Input validation and sanitization utilities
 * Use these functions to validate and clean user input
 */

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation (supports international formats)
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Name validation (letters, spaces, hyphens, apostrophes)
export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s\-']+$/
  return nameRegex.test(name) && name.length >= 2 && name.length <= 50
}

// Password strength validation
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Sanitize HTML input
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Sanitize general text input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000) // Limit length to prevent abuse
}

// Validate and sanitize URL
export function validateUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

// Validate date
export function validateDate(date: string): boolean {
  const parsed = Date.parse(date)
  return !isNaN(parsed) && new Date(date).toISOString().slice(0, 10) === date
}

// Validate age (must be 18+)
export function validateAge(birthDate: string): boolean {
  const today = new Date()
  const birth = new Date(birthDate)
  const age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18
  }
  
  return age >= 18
}

// Validate budget format
export function validateBudget(budget: string): boolean {
  const budgetRegex = /^\$?\d{1,6}(\.\d{0,2})?$/
  return budgetRegex.test(budget.replace(/,/g, ''))
}

// Sanitize file name
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .slice(0, 255)
}

// Validate file type
export function validateFileType(fileName: string, allowedTypes: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

// Rate limit check (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(identifier)
  
  if (!userLimit || userLimit.resetTime < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }
  
  if (userLimit.count >= maxRequests) {
    return false
  }
  
  userLimit.count++
  return true
}

// Clean up old rate limit entries
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }
}, 60000)

// Validate booking form data
export interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  appointmentType: string
  tattooStyle: string
  tattooSize: string
  placement: string
  budget: string
  specialRequests?: string
}

export function validateBookingData(data: BookingData): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}
  
  if (!validateName(data.firstName)) {
    errors.firstName = 'Please enter a valid first name'
  }
  
  if (!validateName(data.lastName)) {
    errors.lastName = 'Please enter a valid last name'
  }
  
  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  if (!data.appointmentType) {
    errors.appointmentType = 'Please select an appointment type'
  }
  
  if (!data.tattooStyle) {
    errors.tattooStyle = 'Please select a tattoo style'
  }
  
  if (!data.tattooSize) {
    errors.tattooSize = 'Please select a tattoo size'
  }
  
  if (!data.placement) {
    errors.placement = 'Please specify the placement'
  }
  
  if (!validateBudget(data.budget)) {
    errors.budget = 'Please enter a valid budget amount'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

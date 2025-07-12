import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

const CSRF_TOKEN_LENGTH = 32
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000 // 1 hour

export async function generateCsrfToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
  const expires = new Date(Date.now() + CSRF_TOKEN_EXPIRY)

  // Clean up old tokens for this user
  await prisma.csrfToken.deleteMany({
    where: {
      userId,
      expires: {
        lt: new Date()
      }
    }
  })

  // Create new token
  await prisma.csrfToken.create({
    data: {
      token,
      userId,
      expires
    }
  })

  return token
}

export async function validateCsrfToken(token: string, userId: string): Promise<boolean> {
  if (!token || !userId) {
    return false
  }

  const csrfToken = await prisma.csrfToken.findFirst({
    where: {
      token,
      userId,
      expires: {
        gt: new Date()
      }
    }
  })

  return !!csrfToken
}

export async function deleteCsrfToken(token: string): Promise<void> {
  await prisma.csrfToken.delete({
    where: {
      token
    }
  }).catch(() => {
    // Token might not exist, which is fine
  })
}

// Middleware helper to get CSRF token from request
export function getCsrfTokenFromRequest(request: Request): string | null {
  // Check header first (for AJAX requests)
  const headerToken = request.headers.get('X-CSRF-Token')
  if (headerToken) {
    return headerToken
  }

  // Check body for form submissions
  if (request.method === 'POST' && request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
    // This would need to be parsed from the body
    // For now, we'll rely on header-based CSRF tokens
  }

  return null
}

// Hook for client-side CSRF token management
export function useCsrfToken() {
  const getCsrfToken = async () => {
    const response = await fetch('/api/csrf')
    const data = await response.json()
    return data.token
  }

  return { getCsrfToken }
}

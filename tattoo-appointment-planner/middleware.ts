import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Clean up old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key)
      }
    }
  }, 60000) // Clean every minute
}

export async function middleware(request: NextRequest) {
  // COMPLETELY DISABLED - Testing if middleware is causing redirect loops
  console.log('Middleware disabled for testing - path:', request.nextUrl.pathname)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * COMPLETELY DISABLED - No paths match middleware
     */
    // '/api/auth/:path*',
    // '/api/appointments/:path*',
  ],
}

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
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()
  
  // Security headers (additional to next.config.js)
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Basic rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100
  
  const now = Date.now()
  const userRateLimit = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs }
  
  if (userRateLimit.resetTime < now) {
    userRateLimit.count = 0
    userRateLimit.resetTime = now + windowMs
  }
  
  userRateLimit.count++
  rateLimitMap.set(ip, userRateLimit)
  
  if (userRateLimit.count > maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }
  
  // Redirect protection
  const url = request.nextUrl
  const redirectParam = url.searchParams.get('redirect')
  
  if (redirectParam) {
    try {
      const redirectUrl = new URL(redirectParam, request.url)
      // Only allow redirects to same origin
      if (redirectUrl.origin !== url.origin) {
        url.searchParams.delete('redirect')
        return NextResponse.redirect(url)
      }
    } catch {
      // Invalid URL, remove the parameter
      url.searchParams.delete('redirect')
      return NextResponse.redirect(url)
    }
  }
  
  // CSRF Protection for mutations
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const contentType = request.headers.get('content-type')
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    
    // Check origin header for CSRF protection
    if (origin && host) {
      const expectedOrigin = `${request.nextUrl.protocol}//${host}`
      if (origin !== expectedOrigin) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    }

    // Additional CSRF token validation for form submissions
    if (contentType?.includes('application/x-www-form-urlencoded') || 
        contentType?.includes('multipart/form-data')) {
      const csrfToken = request.headers.get('X-CSRF-Token')
      if (!csrfToken) {
        return new NextResponse('CSRF token missing', { status: 403 })
      }
    }
  }

  // Protected routes
  const protectedPaths = ['/dashboard', '/profile', '/settings', '/messages', '/schedule']
  const authPaths = ['/login', '/register', '/forgot-password']
  const pathname = request.nextUrl.pathname

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      // Redirect to login with return URL
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (isAuthPath) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Already logged in, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

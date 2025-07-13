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
  const response = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
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
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Get current user
  const { data: { user }, error } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/login/client',
    '/login/artist',
    '/login/studio',
    '/login/admin',
    '/register/client',
    '/register/artist',
    '/register/studio',
    '/register/admin',
    '/forgot-password',
    '/about-us',
    '/pricing',
    '/faq',
    '/terms',
    '/privacy',
    '/artists',
    '/blog',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/register/admin',
    '/api/csrf',
    '/impressum',
    '/datenschutz',
    '/widerrufsbelehrung'
  ]

  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  // If user is not authenticated and trying to access protected route
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is authenticated and trying to access auth pages, redirect to appropriate dashboard
  if (user && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    // Get user profile to determine role
    try {
      const { data: profile } = await supabase
        .from('UserProfile')
        .select('role')
        .eq('authId', user.id)
        .single()

      if (profile?.role) {
        const dashboardRoutes = {
          'CLIENT': '/dashboard/client',
          'ARTIST': '/dashboard/artist',
          'STUDIO': '/dashboard/studio',
          'ADMIN': '/dashboard/admin'
        }
        
        const redirectUrl = dashboardRoutes[profile.role as keyof typeof dashboardRoutes] || '/dashboard'
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  // If user is authenticated and accessing dashboard, ensure they're on the correct dashboard
  if (user && pathname.startsWith('/dashboard/')) {
    try {
      const { data: profile } = await supabase
        .from('UserProfile')
        .select('role')
        .eq('authId', user.id)
        .single()

      if (profile?.role) {
        const roleRoutes = {
          'CLIENT': '/dashboard/client',
          'ARTIST': '/dashboard/artist',
          'STUDIO': '/dashboard/studio',
          'ADMIN': '/dashboard/admin'
        }
        
        const expectedRoute = roleRoutes[profile.role as keyof typeof roleRoutes]
        
        // If user is trying to access wrong dashboard, redirect to correct one
        if (expectedRoute && !pathname.startsWith(expectedRoute)) {
          return NextResponse.redirect(new URL(expectedRoute, request.url))
        }
      }
    } catch (error) {
      console.error('Error checking dashboard access:', error)
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
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

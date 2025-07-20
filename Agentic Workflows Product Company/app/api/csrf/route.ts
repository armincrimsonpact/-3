import { createClient } from '@/lib/supabase/server'
import { generateCsrfToken } from '@/lib/csrf'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get current user
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Generate CSRF token
    const token = await generateCsrfToken(user.id)

    return NextResponse.json({ token })
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}

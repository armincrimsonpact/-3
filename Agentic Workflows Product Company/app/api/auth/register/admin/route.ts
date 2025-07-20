import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendVerificationEmail } from '@/lib/email'

// In production, store these in a secure database or environment variable
const VALID_INVITE_CODES = process.env.ADMIN_INVITE_CODES?.split(',') || []

const adminRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12).max(100),
  name: z.string().min(2).max(100),
  inviteCode: z.string().min(1),
  role: z.literal('ADMIN')
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, inviteCode } = adminRegisterSchema.parse(body)

    // Validate invite code
    if (!VALID_INVITE_CODES.includes(inviteCode)) {
      // Log failed attempt
      console.error(`Invalid admin invite code attempt: ${inviteCode} from email: ${email}`)
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 403 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'ADMIN'
        }
      }
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create user profile in database
    const userProfile = await prisma.userProfile.create({
      data: {
        authId: authData.user.id,
        email,
        name,
        role: 'ADMIN'
      }
    })

    // Create admin profile with elevated permissions
    await prisma.admin.create({
      data: {
        userId: userProfile.id,
        permissions: [
          'USER_MANAGEMENT',
          'CONTENT_MODERATION',
          'SYSTEM_CONFIGURATION',
          'ANALYTICS_ACCESS',
          'FINANCIAL_REPORTS',
          'PLATFORM_SETTINGS'
        ]
      }
    })

    // Log successful admin creation
    console.log(`New admin created: ${email} at ${new Date().toISOString()}`)

    // Send verification email with admin-specific instructions
    await sendVerificationEmail(email, name)

    // Invalidate the used invite code (in production, mark as used in database)
    // For now, we'll just log it
    console.log(`Invite code ${inviteCode} used by ${email}`)

    return NextResponse.json({
      message: 'Admin registration successful. Please check your email to verify your account. Two-factor authentication setup will be required on first login.',
      user: {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role
      }
    })
  } catch (error) {
    console.error('Admin registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

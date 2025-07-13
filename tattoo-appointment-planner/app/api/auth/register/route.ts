import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendVerificationEmail } from '@/lib/email'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(2).max(100),
  role: z.enum(['ARTIST', 'CLIENT', 'STUDIO', 'ADMIN'])
})

export async function POST(request: Request) {
  try {
    console.log('=== Registration API Started ===')
    
    // Check environment variables
    console.log('Environment check:')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json({
        error: 'Authentication service not configured. Please contact administrator.',
        details: 'Missing Supabase credentials'
      }, { status: 503 })
    }

    const body = await request.json()
    console.log('Request body received:', { email: body.email, role: body.role })
    
    const { email, password, name, role } = registerSchema.parse(body)
    console.log('Schema validation passed')

    // Create Supabase client
    console.log('Creating Supabase client...')
    const supabase = await createClient()

    // Sign up user with Supabase Auth
    console.log('Attempting Supabase auth signup...')
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    })

    if (authError) {
      console.error('Supabase auth error:', authError)
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      console.error('No user returned from Supabase auth')
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    console.log('Supabase user created successfully:', authData.user.id)

    // Wait a moment for the trigger to create the UserProfile
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Try to find existing user profile first (in case trigger worked)
    console.log('Checking for existing user profile...')
    let userProfile = await prisma.userProfile.findUnique({
      where: { authId: authData.user.id }
    })

    if (!userProfile) {
      console.log('Creating user profile manually...')
      // Create user profile if trigger didn't work
      userProfile = await prisma.userProfile.create({
        data: {
          authId: authData.user.id,
          email,
          name,
          role
        }
      })
      console.log('User profile created:', userProfile.id)
    } else {
      console.log('User profile found, updating...')
      // Update existing user profile
      userProfile = await prisma.userProfile.update({
        where: { authId: authData.user.id },
        data: {
          name,
          role
        }
      })
      console.log('User profile updated:', userProfile.id)
    }

    // Create role-specific profile
    console.log('Creating role-specific profile for role:', role)
    try {
      switch (role) {
        case 'CLIENT':
          console.log('Creating CLIENT profile...')
          await prisma.client.create({
            data: {
              userId: userProfile.id
            }
          })
          console.log('CLIENT profile created successfully')
          break
        case 'ARTIST':
          console.log('Creating ARTIST profile...')
          await prisma.artist.create({
            data: {
              userId: userProfile.id,
              specialties: [],
              portfolioImages: []
            }
          })
          console.log('ARTIST profile created successfully')
          break
        case 'STUDIO':
          console.log('Creating STUDIO profile...')
          await prisma.studio.create({
            data: {
              userId: userProfile.id,
              name: name || 'Studio',
              address: '',
              city: '',
              state: '',
              zipCode: '',
              phone: '',
              images: []
            }
          })
          console.log('STUDIO profile created successfully')
          break
        case 'ADMIN':
          console.log('Creating ADMIN profile...')
          await prisma.admin.create({
            data: {
              userId: userProfile.id,
              permissions: []
            }
          })
          console.log('ADMIN profile created successfully')
          break
      }
    } catch (roleError) {
      console.error('Role-specific profile creation error:', roleError)
      console.error('Role error details:', {
        code: (roleError as any)?.code,
        message: (roleError as any)?.message,
        meta: (roleError as any)?.meta
      })
      // Don't fail registration if role profile creation fails
    }

    // Send verification email (optional, don't fail if it doesn't work)
    console.log('Attempting to send verification email...')
    try {
      await sendVerificationEmail(email, name)
      console.log('Verification email sent successfully')
    } catch (emailError) {
      console.warn('Email verification failed:', emailError)
      console.warn('Email error details:', {
        code: (emailError as any)?.code,
        message: (emailError as any)?.message
      })
      // Don't fail registration if email fails
    }

    console.log('=== Registration completed successfully ===')
    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role
      }
    })
  } catch (error) {
    console.error('=== Registration error ===')
    console.error('Error:', error)
    console.error('Error type:', typeof error)
    console.error('Error constructor:', error?.constructor?.name)
    
    if (error instanceof z.ZodError) {
      console.error('Zod validation error:', error.issues)
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    // Handle specific Prisma errors
    if (error instanceof Error && 'code' in error) {
      const prismaError = error as any
      console.error('Prisma error detected:', {
        code: prismaError.code,
        message: prismaError.message,
        meta: prismaError.meta
      })
      
      if (prismaError.code === 'P2025') {
        return NextResponse.json(
          { error: 'User profile creation failed. Please try again.' },
          { status: 500 }
        )
      }
      
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          { error: 'User already exists with this email.' },
          { status: 400 }
        )
      }
    }

    // Handle network/connection errors
    if (error instanceof Error) {
      console.error('Standard error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
      
      if (error.message.includes('connect') || error.message.includes('network')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please try again later.' },
          { status: 503 }
        )
      }
    }

    console.error('Unhandled error, returning generic response')
    return NextResponse.json(
      { error: 'Internal server error', details: 'Check server logs for more information' },
      { status: 500 }
    )
  }
}

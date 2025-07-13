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
    const body = await request.json()
    const { email, password, name, role } = registerSchema.parse(body)

    // Create Supabase client
    const supabase = await createClient()

    // Sign up user with Supabase Auth
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

    // Wait a moment for the trigger to create the UserProfile
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Try to find existing user profile first (in case trigger worked)
    let userProfile = await prisma.userProfile.findUnique({
      where: { authId: authData.user.id }
    })

    if (!userProfile) {
      // Create user profile if trigger didn't work
      userProfile = await prisma.userProfile.create({
        data: {
          authId: authData.user.id,
          email,
          name,
          role
        }
      })
    } else {
      // Update existing user profile
      userProfile = await prisma.userProfile.update({
        where: { authId: authData.user.id },
        data: {
          name,
          role
        }
      })
    }

    // Create role-specific profile
    try {
      switch (role) {
        case 'CLIENT':
          await prisma.client.create({
            data: {
              userId: userProfile.id
            }
          })
          break
        case 'ARTIST':
          await prisma.artist.create({
            data: {
              userId: userProfile.id,
              specialties: [],
              portfolioImages: []
            }
          })
          break
        case 'STUDIO':
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
          break
        case 'ADMIN':
          await prisma.admin.create({
            data: {
              userId: userProfile.id,
              permissions: []
            }
          })
          break
      }
    } catch (roleError) {
      console.error('Role-specific profile creation error:', roleError)
      // Don't fail registration if role profile creation fails
    }

    // Send verification email (optional, don't fail if it doesn't work)
    try {
      await sendVerificationEmail(email, name)
    } catch (emailError) {
      console.warn('Email verification failed:', emailError)
      // Don't fail registration if email fails
    }

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
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    // Handle specific Prisma errors
    if (error instanceof Error && 'code' in error) {
      const prismaError = error as any
      
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

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

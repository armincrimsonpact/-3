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

    // Wait a moment for the trigger to create the UserProfile
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update the user profile with the correct role and name (trigger creates with default CLIENT role)
    const userProfile = await prisma.userProfile.update({
      where: {
        authId: authData.user.id
      },
      data: {
        name,
        role
      }
    })

    // Create role-specific profile
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

    // Send verification email
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

    // Handle case where UserProfile wasn't created by trigger
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User profile creation failed. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

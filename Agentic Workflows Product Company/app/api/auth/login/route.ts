import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Create Supabase client
    const supabase = await createClient()

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 500 }
      )
    }

    // Get user profile from database
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        authId: authData.user.id
      }
    })

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Get role-specific data
    let roleData = null
    switch (userProfile.role) {
      case 'CLIENT':
        roleData = await prisma.client.findUnique({
          where: { userId: userProfile.id }
        })
        break
      case 'ARTIST':
        roleData = await prisma.artist.findUnique({
          where: { userId: userProfile.id },
          include: { studio: true }
        })
        break
      case 'STUDIO':
        roleData = await prisma.studio.findUnique({
          where: { userId: userProfile.id }
        })
        break
      case 'ADMIN':
        roleData = await prisma.admin.findUnique({
          where: { userId: userProfile.id }
        })
        break
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role,
        emailVerified: userProfile.emailVerified,
        image: userProfile.image,
        roleData
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    
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

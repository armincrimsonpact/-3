import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { validateCsrfToken, getCsrfTokenFromRequest } from '@/lib/csrf'
import { sendAppointmentConfirmation } from '@/lib/email'

const createAppointmentSchema = z.object({
  artistId: z.string().uuid(),
  date: z.string().datetime(),
  duration: z.number().min(30).max(480), // 30 minutes to 8 hours
  tattooStyle: z.string().optional(),
  description: z.string().optional(),
  referenceImages: z.array(z.string()).optional(),
  estimatedPrice: z.number().positive().optional(),
  deposit: z.number().positive().optional(),
  notes: z.string().optional()
})

export async function GET(request: Request) {
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

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { authId: user.id }
    })

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Get appointments based on user role
    let appointments
    if (userProfile.role === 'CLIENT') {
      const client = await prisma.client.findUnique({
        where: { userId: userProfile.id }
      })
      
      appointments = await prisma.appointment.findMany({
        where: { clientId: client?.id },
        include: {
          artist: {
            include: {
              user: true,
              studio: true
            }
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: { date: 'desc' }
      })
    } else if (userProfile.role === 'ARTIST') {
      const artist = await prisma.artist.findUnique({
        where: { userId: userProfile.id }
      })
      
      appointments = await prisma.appointment.findMany({
        where: { artistId: artist?.id },
        include: {
          client: {
            include: {
              user: true
            }
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: { date: 'desc' }
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid user role for appointments' },
        { status: 403 }
      )
    }

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Get appointments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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

    // Validate CSRF token
    const csrfToken = getCsrfTokenFromRequest(request)
    if (!csrfToken || !(await validateCsrfToken(csrfToken, user.id))) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const appointmentData = createAppointmentSchema.parse(body)

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { authId: user.id }
    })

    if (!userProfile || userProfile.role !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Only clients can create appointments' },
        { status: 403 }
      )
    }

    // Get client profile
    const client = await prisma.client.findUnique({
      where: { userId: userProfile.id }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client profile not found' },
        { status: 404 }
      )
    }

    // Verify artist exists and is active
    const artist = await prisma.artist.findUnique({
      where: { id: appointmentData.artistId },
      include: { user: true }
    })

    if (!artist || !artist.isActive) {
      return NextResponse.json(
        { error: 'Artist not found or inactive' },
        { status: 404 }
      )
    }

    // Check for conflicting appointments
    const appointmentDate = new Date(appointmentData.date)
    const endDate = new Date(appointmentDate.getTime() + appointmentData.duration * 60000)

    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        artistId: appointmentData.artistId,
        status: {
          in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS']
        },
        OR: [
          {
            AND: [
              { date: { lte: appointmentDate } },
              { date: { gte: new Date(appointmentDate.getTime() - appointmentData.duration * 60000) } }
            ]
          },
          {
            AND: [
              { date: { lte: endDate } },
              { date: { gte: appointmentDate } }
            ]
          }
        ]
      }
    })

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: 'Time slot not available' },
        { status: 409 }
      )
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        clientId: client.id,
        artistId: appointmentData.artistId,
        date: appointmentDate,
        duration: appointmentData.duration,
        tattooStyle: appointmentData.tattooStyle,
        description: appointmentData.description,
        referenceImages: appointmentData.referenceImages || [],
        estimatedPrice: appointmentData.estimatedPrice,
        deposit: appointmentData.deposit,
        notes: appointmentData.notes
      },
      include: {
        artist: {
          include: { user: true }
        },
        client: {
          include: { user: true }
        }
      }
    })

    // Send confirmation email
    if (appointment.client.user.email && appointment.artist.user.name) {
      await sendAppointmentConfirmation(
        appointment.client.user.email,
        appointment.client.user.name || 'Client',
        appointment.artist.user.name,
        appointment.date,
        appointment.duration
      )
    }

    return NextResponse.json({
      message: 'Appointment created successfully',
      appointment
    })
  } catch (error) {
    console.error('Create appointment error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

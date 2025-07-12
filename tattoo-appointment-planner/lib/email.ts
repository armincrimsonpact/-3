import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Email templates
const emailTemplates = {
  verifyEmail: (name: string, verificationUrl: string) => ({
    subject: 'Verify your InkCircle email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #14b8a6;">Welcome to InkCircle!</h1>
        <p>Hi ${name || 'there'},</p>
        <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">If you didn't create an account with InkCircle, you can safely ignore this email.</p>
      </div>
    `,
  }),

  resetPassword: (name: string, resetUrl: string) => ({
    subject: 'Reset your InkCircle password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #14b8a6;">Password Reset Request</h1>
        <p>Hi ${name || 'there'},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  }),

  appointmentConfirmation: (clientName: string, artistName: string, date: Date, duration: number) => ({
    subject: 'Appointment Confirmation - InkCircle',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #14b8a6;">Appointment Confirmed!</h1>
        <p>Hi ${clientName},</p>
        <p>Your appointment has been confirmed with the following details:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Artist:</strong> ${artistName}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${date.toLocaleTimeString()}</p>
          <p><strong>Duration:</strong> ${duration} minutes</p>
        </div>
        <p>Please arrive 10 minutes early for your appointment.</p>
        <p>If you need to cancel or reschedule, please do so at least 24 hours in advance.</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">Thank you for choosing InkCircle!</p>
      </div>
    `,
  }),

  appointmentReminder: (clientName: string, artistName: string, date: Date) => ({
    subject: 'Appointment Reminder - InkCircle',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #14b8a6;">Appointment Reminder</h1>
        <p>Hi ${clientName},</p>
        <p>This is a reminder about your upcoming appointment:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Artist:</strong> ${artistName}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${date.toLocaleTimeString()}</p>
        </div>
        <p>Please remember to:</p>
        <ul>
          <li>Arrive 10 minutes early</li>
          <li>Bring a valid ID</li>
          <li>Eat a good meal beforehand</li>
          <li>Stay hydrated</li>
        </ul>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">We look forward to seeing you!</p>
      </div>
    `,
  }),
}

// Email sending functions
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"InkCircle" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

export async function sendVerificationEmail(email: string, name: string | null) {
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}`
  const { subject, html } = emailTemplates.verifyEmail(name || '', verificationUrl)
  
  return sendEmail(email, subject, html)
}

export async function sendPasswordResetEmail(email: string, name: string | null) {
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
  const { subject, html } = emailTemplates.resetPassword(name || '', resetUrl)
  
  return sendEmail(email, subject, html)
}

export async function sendAppointmentConfirmation(
  clientEmail: string,
  clientName: string,
  artistName: string,
  date: Date,
  duration: number
) {
  const { subject, html } = emailTemplates.appointmentConfirmation(
    clientName,
    artistName,
    date,
    duration
  )
  
  return sendEmail(clientEmail, subject, html)
}

export async function sendAppointmentReminder(
  clientEmail: string,
  clientName: string,
  artistName: string,
  date: Date
) {
  const { subject, html } = emailTemplates.appointmentReminder(
    clientName,
    artistName,
    date
  )
  
  return sendEmail(clientEmail, subject, html)
}

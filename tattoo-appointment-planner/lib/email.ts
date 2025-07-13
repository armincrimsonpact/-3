import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// Check if email service is configured
const isEmailConfigured = () => {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD)
}

// Create reusable transporter only if configured
let transporter: nodemailer.Transporter | null = null

if (isEmailConfigured()) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

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
    subject: 'Appointment Confirmed - InkCircle',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #14b8a6;">Appointment Confirmed!</h1>
        <p>Hi ${clientName},</p>
        <p>Your tattoo appointment has been confirmed with ${artistName}.</p>
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Appointment Details:</h3>
          <p><strong>Artist:</strong> ${artistName}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${date.toLocaleTimeString()}</p>
          <p><strong>Duration:</strong> ${duration} minutes</p>
        </div>
        <p>Please arrive 15 minutes early for your appointment.</p>
        <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
      </div>
    `,
  }),

  appointmentReminder: (clientName: string, artistName: string, date: Date) => ({
    subject: 'Appointment Reminder - InkCircle',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #14b8a6;">Appointment Reminder</h1>
        <p>Hi ${clientName},</p>
        <p>This is a reminder that you have an appointment with ${artistName} tomorrow.</p>
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Appointment Details:</h3>
          <p><strong>Artist:</strong> ${artistName}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${date.toLocaleTimeString()}</p>
        </div>
        <p>Please arrive 15 minutes early for your appointment.</p>
        <p>See you soon!</p>
      </div>
    `,
  }),
}

// Send email function
export async function sendEmail(to: string, subject: string, html: string) {
  if (!transporter) {
    console.warn('Email service not configured - skipping email send')
    return Promise.resolve()
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    })
    console.log(`Email sent to ${to}`)
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

// Send verification email
export async function sendVerificationEmail(email: string, name: string | null) {
  if (!isEmailConfigured()) {
    console.warn('Email service not configured - skipping verification email')
    return Promise.resolve()
  }

  // Generate verification token
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // Save token to database
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email?token=${token}`
  const { subject, html } = emailTemplates.verifyEmail(name || 'there', verificationUrl)

  await sendEmail(email, subject, html)
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, name: string | null) {
  if (!isEmailConfigured()) {
    console.warn('Email service not configured - skipping password reset email')
    return Promise.resolve()
  }

  // Generate reset token
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  // Save token to database
  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${token}`
  const { subject, html } = emailTemplates.resetPassword(name || 'there', resetUrl)

  await sendEmail(email, subject, html)
}

// Send appointment confirmation email
export async function sendAppointmentConfirmation(
  clientEmail: string,
  clientName: string,
  artistName: string,
  date: Date,
  duration: number
) {
  if (!isEmailConfigured()) {
    console.warn('Email service not configured - skipping appointment confirmation email')
    return Promise.resolve()
  }

  const { subject, html } = emailTemplates.appointmentConfirmation(clientName, artistName, date, duration)
  await sendEmail(clientEmail, subject, html)
}

// Send appointment reminder email
export async function sendAppointmentReminder(
  clientEmail: string,
  clientName: string,
  artistName: string,
  date: Date
) {
  if (!isEmailConfigured()) {
    console.warn('Email service not configured - skipping appointment reminder email')
    return Promise.resolve()
  }

  const { subject, html } = emailTemplates.appointmentReminder(clientName, artistName, date)
  await sendEmail(clientEmail, subject, html)
}

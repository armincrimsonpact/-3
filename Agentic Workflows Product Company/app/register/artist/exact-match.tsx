"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

export default function ArtistRegistrationPage() {
  const [step, setStep] = useState(1)

  const goToNextStep = () => {
    setStep(step + 1)
  }

  const goToPreviousStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-ultra/5 blur-2xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-bg py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/home" className="text-2xl font-bold text-textPrimary hover:text-primary transition-colors">
            <span className="text-primary mr-1">●</span>
            InkCircle
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-cardBg rounded-lg p-8 border border-textTertiary/20">
          <Link href="/home" className="inline-flex items-center text-textTertiary hover:text-textSecondary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-textSecondary text-center mb-6">Create Your InkCircle Account</h1>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step === stepNumber 
                      ? 'bg-primary text-black' 
                      : step > stepNumber 
                      ? 'bg-primary/70 text-black' 
                      : 'bg-textTertiary/20 text-textTertiary'
                  }`}>
                    {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
                  </div>
                  {stepNumber < 2 && (
                    <div className={`w-12 h-0.5 mx-2 transition-colors ${
                      step > stepNumber ? 'bg-primary' : 'bg-textTertiary/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-textTertiary mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-textTertiary mb-2">Password</label>
                <input
                  type="password"
                  className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Create a secure password"
                />
              </div>

              <div>
                <label className="block text-textTertiary mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="button"
                onClick={goToNextStep}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-black py-3 rounded font-medium transition-all duration-200 hover:shadow-glow-primary"
              >
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-textTertiary mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-textTertiary mb-2">Specialization</label>
                <select className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                  <option value="">Select your specialization</option>
                  <option value="traditional">Traditional</option>
                  <option value="realism">Realism</option>
                  <option value="blackwork">Blackwork</option>
                  <option value="japanese">Japanese</option>
                  <option value="watercolor">Watercolor</option>
                  <option value="geometric">Geometric</option>
                  <option value="portrait">Portrait</option>
                  <option value="neotraditional">Neo-Traditional</option>
                </select>
              </div>

              <div>
                <label className="block text-textTertiary mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-textTertiary mb-2">Years of Experience</label>
                <select className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-textTertiary mb-2">Portfolio URL (Optional)</label>
                <input
                  type="url"
                  className="w-full bg-bg border border-textTertiary/30 text-textPrimary p-4 rounded focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="https://your-portfolio.com"
                />
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 bg-bg border-textTertiary/30 rounded focus:ring-primary/50"
                  />
                  <label htmlFor="terms" className="ml-2 text-textTertiary text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="w-1/2 bg-cardBg border border-textTertiary/30 text-textSecondary py-3 rounded hover:bg-textTertiary/10 hover:border-textTertiary/50 transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-1/2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-black py-3 rounded font-medium transition-all duration-200 hover:shadow-glow-primary"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/register" className="text-textTertiary hover:text-textSecondary text-sm transition-colors">
              Choose a different account type
            </Link>
          </div>

          <div className="mt-4 text-center">
            <p className="text-textTertiary text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-textTertiary">
        <p>© {new Date().getFullYear()} InkCircle. All rights reserved.</p>
      </footer>
    </div>
  )
}

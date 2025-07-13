"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"

export default function ClientRegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: "CLIENT"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Show success message and redirect to login
      router.push("/login/client?registered=true")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Background effects removed for pure black background */}

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/home" className="inline-flex items-center">
          <span className="text-primary mr-2 text-2xl">●</span>
          <span className="text-textPrimary text-2xl font-bold">InkCircle</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-cardBg rounded-lg p-8 border border-textTertiary/20"
        >
          <Link href="/register" className="inline-flex items-center text-textTertiary hover:text-textSecondary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Registration Options
          </Link>

          <h1 className="text-3xl font-bold text-textSecondary text-center mb-6">Create Client Account</h1>
          <p className="text-textTertiary text-center mb-10">Join InkCircle to book appointments and find your perfect artist</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-textTertiary mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-textPrimary transition-all"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textTertiary mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-textPrimary transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-textTertiary mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-textPrimary pr-10 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textTertiary hover:text-textSecondary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-textTertiary mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-textPrimary pr-10 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textTertiary hover:text-textSecondary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 bg-bg border-textTertiary/30 rounded checkbox-client mt-0.5"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-textTertiary">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-black font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-cardBg disabled:opacity-70 transition-all duration-200 hover:shadow-glow-primary"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-textTertiary">
              Already have an account?{" "}
              <Link href="/login/client" className="text-primary hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

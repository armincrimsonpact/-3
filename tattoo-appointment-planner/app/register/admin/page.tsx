"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminRegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
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

    // Validate password strength (stronger requirements for admin)
    if (formData.password.length < 12) {
      setError("Admin passwords must be at least 12 characters long")
      setIsLoading(false)
      return
    }

    // Validate invite code
    if (!formData.inviteCode) {
      setError("Admin invite code is required")
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
      // Note: In production, admin registration would require special validation
      // such as invite codes, existing admin approval, or other security measures
      const response = await fetch("/api/auth/register/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          inviteCode: formData.inviteCode,
          role: "ADMIN"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Show success message and redirect to login
      router.push("/login/admin?registered=true")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="p-6">
        <Link href="/home" className="inline-flex items-center">
          <span className="text-teal-500 mr-2 text-2xl">●</span>
          <span className="text-white text-2xl font-bold">InkCircle</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#111] rounded-lg p-8"
        >
          <Link href="/register" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Registration Options
          </Link>

          <div className="flex justify-center mb-6">
            <div className="bg-red-900/20 p-4 rounded-full border border-red-800">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-6">Admin Registration</h1>
          <p className="text-gray-400 text-center mb-6">Create an administrator account</p>

          <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-200 font-medium">Restricted Access</p>
                <p className="text-xs text-yellow-300/80 mt-1">
                  Admin registration requires a valid invite code from an existing administrator. 
                  Unauthorized access attempts will be logged.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-400 mb-1">
                Admin Invite Code *
              </label>
              <input
                id="inviteCode"
                name="inviteCode"
                type="text"
                value={formData.inviteCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-red-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white"
                placeholder="Enter your invite code"
              />
              <p className="mt-1 text-xs text-gray-500">Contact an existing admin to obtain an invite code</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Admin Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white"
                placeholder="admin@inkcircle.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={12}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white pr-10"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Must be at least 12 characters with mixed case, numbers, and symbols</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white pr-10"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
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
                className="h-4 w-4 bg-bg border-textTertiary/30 rounded checkbox-admin mt-0.5"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-400">
                I agree to the{" "}
                <Link href="/terms" className="text-red-500 hover:text-red-400">
                  Terms and Conditions
                </Link>
                ,{" "}
                <Link href="/privacy" className="text-red-500 hover:text-red-400">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link href="/terms#admin-agreement" className="text-red-500 hover:text-red-400">
                  Administrator Agreement
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 transition-colors"
            >
              {isLoading ? "Creating admin account..." : "Create admin account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have admin access?{" "}
              <Link href="/login/admin" className="text-red-500 hover:text-red-400">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
            <p className="text-sm text-gray-400">
              <strong className="text-red-400">Security Notice:</strong> Admin accounts have full platform access. 
              Two-factor authentication will be required after registration.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Building } from "lucide-react"
import { motion } from "framer-motion"

export default function StudioRegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    studioName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
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

    // Validate required fields
    if (!formData.studioName || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.phone) {
      setError("Please fill in all required fields")
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
          name: formData.ownerName,
          role: "STUDIO"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Note: Studio details (name, address, etc.) will be saved in the database
      // The API handles creating the studio profile with default values

      // Show success message and redirect to login
      router.push("/login/studio?registered=true")
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
            <div className="bg-teal-900/20 p-4 rounded-full border border-teal-800">
              <Building className="h-8 w-8 text-teal-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-6">Create Studio Account</h1>
          <p className="text-gray-400 text-center mb-10">Manage your studio and artist team</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="studioName" className="block text-sm font-medium text-gray-400 mb-1">
                Studio Name
              </label>
              <input
                id="studioName"
                name="studioName"
                type="text"
                value={formData.studioName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 text-white transition-all"
                placeholder="Enter your studio name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 text-white transition-all"
                placeholder="studio@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
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
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 text-white transition-all pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                className="h-4 w-4 bg-black border-gray-700 rounded checkbox-studio mt-0.5"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-400">
                I agree to the{" "}
                <Link href="/terms" className="text-teal-500 hover:text-teal-400 transition-colors">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-teal-500 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg border-2 border-teal-500 hover:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-[#111] disabled:opacity-70 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">{isLoading ? "Creating account..." : "Create account"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login/studio" className="text-teal-500 hover:text-teal-400 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

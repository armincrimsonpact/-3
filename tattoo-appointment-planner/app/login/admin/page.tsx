"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/dashboard/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [twoFactorCode, setTwoFactorCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          password,
          twoFactorCode: requiresTwoFactor ? twoFactorCode : undefined
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Check if 2FA is required
        if (data.requiresTwoFactor) {
          setRequiresTwoFactor(true)
          setIsLoading(false)
          return
        }
        throw new Error(data.error || "Login failed")
      }

      // Check if user role is ADMIN
      if (data.user.role !== "ADMIN") {
        throw new Error("Unauthorized access. Admin privileges required.")
      }

      // Redirect to the intended page or dashboard
      router.push(redirectUrl)
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
          <Link href="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login Options
          </Link>

          <div className="flex justify-center mb-6">
            <div className="bg-red-900/20 p-4 rounded-full border border-red-800">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h1>
          <p className="text-gray-400 text-center mb-10">Sign in to access platform administration</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-white transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-white transition-all pr-10"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-black border-gray-700 rounded checkbox-admin"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <Link href="/forgot-password" className="text-sm text-red-500 hover:text-red-400 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg border-2 border-red-500 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-[#111] disabled:opacity-70 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">{isLoading ? "Signing in..." : "Sign in"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Need admin access?{" "}
              <Link href="/register/admin" className="text-red-500 hover:text-red-400 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

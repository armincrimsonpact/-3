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
          <Link href="/login" className="inline-flex items-center text-textTertiary hover:text-textSecondary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login Options
          </Link>

          <div className="flex justify-center mb-6">
            <div className="bg-red-900/20 p-4 rounded-full border border-red-800">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-textSecondary text-center mb-6">Admin Login</h1>
          <p className="text-textTertiary text-center mb-10">Secure access to platform administration</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textTertiary mb-1">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-textPrimary transition-all"
                placeholder="admin@inkcircle.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-textTertiary mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-textPrimary pr-10 transition-all"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-bg border-textTertiary/30 rounded checkbox-admin"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-textTertiary">
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
              className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-cardBg disabled:opacity-70 transition-all duration-200 hover:shadow-lg"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-textTertiary">
              Need admin access?{" "}
              <Link href="/contact" className="text-red-500 hover:text-red-400 transition-colors">
                Contact support
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

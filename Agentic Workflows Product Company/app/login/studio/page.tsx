"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"

export default function StudioLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/dashboard/studio"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

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
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Check if user role is STUDIO
      if (data.user.role !== "STUDIO") {
        throw new Error("Invalid account type. Please use the correct login page.")
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
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-primary/3 blur-2xl" />
      </div>

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

          <h1 className="text-3xl font-bold text-textSecondary text-center mb-6">Studio Login</h1>
          <p className="text-textTertiary text-center mb-10">Sign in to manage your studio and artist team</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textTertiary mb-1">
                Studio Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-textPrimary transition-all"
                placeholder="studio@example.com"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-bg border-textTertiary/30 rounded focus:ring-primary/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-textTertiary">
                  Remember me
                </label>
              </div>

              <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-black font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-cardBg disabled:opacity-70 transition-all duration-200 hover:shadow-glow-primary"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-textTertiary">
              Don't have a studio account?{" "}
              <Link href="/register/studio" className="text-primary hover:text-primary/80 transition-colors">
                Register your studio
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Brush } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ArtistLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/dashboard/artist"

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

      // Check if user role is ARTIST
      if (data.user.role !== "ARTIST") {
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
            <div className="bg-purple-900/20 p-4 rounded-full border border-purple-800">
              <Brush className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-textSecondary text-center mb-6">Artist Login</h1>
          <p className="text-textTertiary text-center mb-10">Sign in to manage your portfolio and appointments</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textTertiary mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-textPrimary transition-all"
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-bg border border-textTertiary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-textPrimary pr-10 transition-all"
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
                  className="h-4 w-4 bg-bg border-textTertiary/30 rounded checkbox-artist"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-textTertiary">
                  Remember me
                </label>
              </div>

              <Link href="/forgot-password" className="text-sm text-purple-500 hover:text-purple-400 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-cardBg disabled:opacity-70 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              animation="ripple"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-textTertiary">
              Don't have an account?{" "}
              <Link href="/register/artist" className="text-purple-500 hover:text-purple-400 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

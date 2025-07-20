'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Brush, Building, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function LoginPage({ searchParams }: PageProps) {
  const router = useRouter()

  const userTypes = [
    {
      id: 'client',
      title: 'Client',
      description: 'Book appointments and find artists',
      icon: User,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      textColor: 'text-blue-100',
      route: '/login/client'
    },
    {
      id: 'artist',
      title: 'Artist',
      description: 'Manage your portfolio and appointments',
      icon: Brush,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      textColor: 'text-purple-100',
      route: '/login/artist'
    },
    {
      id: 'studio',
      title: 'Studio',
      description: 'Manage your studio and artists',
      icon: Building,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      textColor: 'text-teal-100',
      route: '/login/studio'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Platform administration',
      icon: Shield,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      textColor: 'text-red-100',
      route: '/login/admin'
    }
  ]

  const handleUserTypeSelect = (route: string) => {
    router.push(route)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-ultra/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-ultra bg-clip-text text-transparent mb-4">
                Welcome Back
              </h1>
              <p className="text-xl text-textTertiary max-w-2xl mx-auto">
                Sign in to your account to access your dashboard and manage your tattoo journey
              </p>
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((userType, index) => {
              const Icon = userType.icon
              return (
                <motion.div
                  key={userType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className={`relative overflow-hidden bg-cardBg border-textTertiary/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group`}
                    onClick={() => handleUserTypeSelect(userType.route)}
                  >
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-lg ${userType.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${userType.textColor}`} />
                      </div>
                      <CardTitle className="text-xl text-textSecondary group-hover:text-primary transition-colors">
                        {userType.title}
                      </CardTitle>
                      <p className="text-textTertiary group-hover:text-textSecondary transition-colors">
                        {userType.description}
                      </p>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-textTertiary mb-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:text-primary/80 transition-colors">
                Sign up
              </Link>
            </p>
            <Link href="/home" className="text-textTertiary hover:text-textSecondary transition-colors">
              ← Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

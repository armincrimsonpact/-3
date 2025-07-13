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

export default function RegisterPage({ searchParams }: PageProps) {
  const router = useRouter()

  const userTypes = [
    {
      id: 'client',
      title: 'Client',
      description: 'Book appointments and find your perfect artist',
      icon: User,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      textColor: 'text-blue-100',
      route: '/register/client'
    },
    {
      id: 'artist',
      title: 'Artist',
      description: 'Create an artist profile and showcase your work',
      icon: Brush,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      textColor: 'text-purple-100',
      route: '/register/artist'
    },
    {
      id: 'studio',
      title: 'Studio',
      description: 'Manage your studio and artist team',
      icon: Building,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      textColor: 'text-teal-100',
      route: '/register/studio'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Platform administration access',
      icon: Shield,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      textColor: 'text-red-100',
      route: '/register/admin'
    }
  ]

  const handleUserTypeSelect = (route: string) => {
    router.push(route)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background effects - removed for pure black background */}

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-teal-300 bg-clip-text text-transparent mb-4">
                Join InkCircle
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Create your account and start your tattoo journey with our community
              </p>
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    className={`relative overflow-hidden bg-gray-900 border-gray-700/30 transition-all duration-300 cursor-pointer group h-full ${
                      userType.id === 'client' ? 'hover:bg-blue-500/20 hover:border-blue-500/50' :
                      userType.id === 'artist' ? 'hover:bg-purple-500/20 hover:border-purple-500/50' :
                      userType.id === 'studio' ? 'hover:bg-teal-500/20 hover:border-teal-500/50' :
                      'hover:bg-red-500/20 hover:border-red-500/50'
                    }`}
                    onClick={() => handleUserTypeSelect(userType.route)}
                  >
                    <CardHeader className="pb-4 text-center">
                      <div className={`w-12 h-12 rounded-lg ${userType.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${userType.textColor}`} />
                      </div>
                      <CardTitle className={`text-lg text-white transition-colors ${
                        userType.id === 'client' ? 'group-hover:text-blue-500' :
                        userType.id === 'artist' ? 'group-hover:text-purple-500' :
                        userType.id === 'studio' ? 'group-hover:text-teal-500' :
                        'group-hover:text-red-500'
                      }`}>
                        {userType.title}
                      </CardTitle>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
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
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-500 hover:text-teal-400 transition-colors">
                Sign in
              </Link>
            </p>
            <Link href="/home" className="text-gray-400 hover:text-gray-300 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

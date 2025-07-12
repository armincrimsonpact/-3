"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, Search } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Appointment = {
  id: string
  clientId: string
  artistId: string
  date: string
  duration: number
  status: string
  tattooStyle: string | null
  description: string | null
  estimatedPrice: number | null
  notes: string | null
  artist: {
    id: string
    user: {
      name: string | null
      image: string | null
    }
    studio?: {
      name: string
      address: string
      city: string
      state: string
    }
  }
}

export default function ClientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const supabase = createClient()

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please log in to view appointments')
        return
      }

      const { data: userProfile } = await supabase
        .from('UserProfile')
        .select('id')
        .eq('authId', user.id)
        .single()

      if (!userProfile) return

      const { data: clientData } = await supabase
        .from('Client')
        .select('id')
        .eq('userId', userProfile.id)
        .single()

      if (!clientData) return

      const { data, error } = await supabase
        .from('Appointment')
        .select(`
          *,
          artist:Artist!Appointment_artistId_fkey (
            id,
            user:UserProfile!Artist_userId_fkey (
              name,
              image
            ),
            studio:Studio!Artist_studioId_fkey (
              name,
              address,
              city,
              state
            )
          )
        `)
        .eq('clientId', clientData.id)
        .order('date', { ascending: false })

      if (error) {
        console.error('Error loading appointments:', error)
        alert('Failed to load appointments')
        return
      }

      setAppointments(data || [])
    } catch (error) {
      console.error("Failed to load appointments:", error)
      alert('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.artist.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.tattooStyle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || appointment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My Appointments</h1>
            <p className="text-gray-400">Track your upcoming and past appointments</p>
          </div>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-cardBg border-gray-800">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Appointments</h1>
          <p className="text-gray-400">Track your upcoming and past appointments</p>
        </div>
        <Badge variant="secondary" className="bg-teal-500/20 text-teal-400">
          {filteredAppointments.length} Appointments
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by artist, service, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cardBg border-gray-700 text-white"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-cardBg border border-gray-700 rounded-md text-white text-sm"
        >
          <option value="all">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <ScrollReveal key={appointment.id}>
            <Card className="bg-cardBg border-gray-800 hover:border-teal-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                      {appointment.artist.user.image ? (
                        <img 
                          src={appointment.artist.user.image} 
                          alt={appointment.artist.user.name || 'Artist'} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-lg font-bold text-white">
                          {appointment.artist.user.name?.charAt(0) || 'A'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {appointment.tattooStyle || 'Tattoo Session'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          with {appointment.artist.user.name}
                        </p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(appointment.date)}</span>
                      </div>
                      {appointment.artist.studio && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.artist.studio.name}</span>
                        </div>
                      )}
                    </div>

                    {appointment.description && (
                      <p className="text-gray-300 text-sm mb-3">
                        {appointment.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">
                          Duration: {appointment.duration} minutes
                        </span>
                        {appointment.estimatedPrice && (
                          <span className="text-teal-400 font-semibold">
                            ${appointment.estimatedPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors text-sm">
                          View Details
                        </button>
                        {appointment.status === 'PENDING' && (
                          <button className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No appointments found.</p>
            <p className="text-sm">Book your first appointment to get started!</p>
          </div>
        </div>
      )}
    </div>
  )
}

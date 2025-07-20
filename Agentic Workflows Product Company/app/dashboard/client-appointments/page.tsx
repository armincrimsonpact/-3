"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Search } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function ClientAppointments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      artist: "Sarah Chen",
      artistAvatar: "/tattoo-artist-portrait.png",
      studio: "Ink Masters Studio",
      date: "2024-03-15",
      time: "2:00 PM",
      duration: "3 hours",
      service: "Traditional Dragon Tattoo",
      status: "confirmed",
      location: "Downtown, NYC",
      price: "$450",
      notes: "Bring reference images discussed",
    },
    {
      id: 2,
      artist: "Mike Rodriguez",
      artistAvatar: "/tattoo-artist.jpg",
      studio: "Black Rose Tattoo",
      date: "2024-03-22",
      time: "11:00 AM",
      duration: "2 hours",
      service: "Geometric Sleeve Touch-up",
      status: "pending",
      location: "Brooklyn, NYC",
      price: "$280",
      notes: "Follow-up session for healing check",
    },
    {
      id: 3,
      artist: "Emma Thompson",
      artistAvatar: "/colorful-hair-tattoo-artist.png",
      studio: "Artistic Ink",
      date: "2024-04-05",
      time: "4:30 PM",
      duration: "4 hours",
      service: "Watercolor Phoenix Back Piece",
      status: "confirmed",
      location: "Manhattan, NYC",
      price: "$650",
      notes: "First session of large piece",
    },
  ]

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || appointment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-400 bg-green-400/10"
      case "pending":
        return "text-yellow-400 bg-yellow-400/10"
      case "cancelled":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-500/3 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
              My Appointments
            </h1>
            <p className="text-gray-400">Manage your upcoming tattoo sessions</p>
          </div>
        </ScrollReveal>

        {/* Search and Filter */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 transition-colors"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-900/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </ScrollReveal>

        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.map((appointment, index) => (
            <ScrollReveal key={appointment.id} delay={0.1 * (index + 2)}>
              <div className="bg-gray-900/30 border border-teal-500/20 rounded-xl p-6 hover:bg-gray-900/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,176,0.1)]">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Artist Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={appointment.artistAvatar || "/placeholder.svg"}
                      alt={appointment.artist}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-500/30"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{appointment.artist}</h3>
                      <p className="text-gray-400">{appointment.studio}</p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-teal-400" size={16} />
                      <div>
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-white font-medium">{appointment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-teal-400" size={16} />
                      <div>
                        <p className="text-sm text-gray-400">Time</p>
                        <p className="text-white font-medium">{appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-teal-400" size={16} />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">{appointment.location}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>

                {/* Service Details */}
                <div className="mt-4 pt-4 border-t border-teal-500/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium text-white">{appointment.service}</h4>
                      <p className="text-gray-400 text-sm">{appointment.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal-400">{appointment.price}</p>
                      <p className="text-sm text-gray-400">{appointment.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <ScrollReveal delay={0.2}>
            <div className="text-center py-12">
              <Calendar className="mx-auto text-gray-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No appointments found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}

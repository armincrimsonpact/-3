"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtistAppointments() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")

  const appointments = [
    {
      id: 1,
      client: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      date: "2024-03-15",
      time: "2:00 PM",
      duration: "3 hours",
      service: "Traditional Dragon Tattoo",
      status: "confirmed",
      price: "$450",
      notes: "Client wants to incorporate family symbols into the design",
      deposit: "$135",
      location: "Studio Room A",
    },
    {
      id: 2,
      client: {
        name: "Mike Chen",
        email: "mike.chen@email.com",
        phone: "+1 (555) 987-6543",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      date: "2024-03-16",
      time: "11:00 AM",
      duration: "2 hours",
      service: "Geometric Sleeve Touch-up",
      status: "pending",
      price: "$280",
      notes: "Follow-up session for healing check and color touch-up",
      deposit: "$84",
      location: "Studio Room B",
    },
    {
      id: 3,
      client: {
        name: "Emma Rodriguez",
        email: "emma.r@email.com",
        phone: "+1 (555) 456-7890",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      date: "2024-03-18",
      time: "4:30 PM",
      duration: "4 hours",
      service: "Watercolor Phoenix Back Piece",
      status: "confirmed",
      price: "$650",
      notes: "First session of large piece - client is very excited",
      deposit: "$195",
      location: "Studio Room A",
    },
    {
      id: 4,
      client: {
        name: "David Wilson",
        email: "david.w@email.com",
        phone: "+1 (555) 321-0987",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      date: "2024-03-20",
      time: "1:00 PM",
      duration: "1.5 hours",
      service: "Small Memorial Tattoo",
      status: "cancelled",
      price: "$200",
      notes: "Client requested cancellation due to personal reasons",
      deposit: "$60",
      location: "Studio Room C",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "completed":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "cancelled":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} />
      case "pending":
        return <AlertCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      default:
        return <AlertCircle size={16} />
    }
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesFilter = selectedFilter === "all" || appointment.status === selectedFilter
    const matchesDate = !selectedDate || appointment.date === selectedDate
    return matchesFilter && matchesDate
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects removed for pure black background */}

      <div className="relative z-10 p-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
              Appointments
            </h1>
            <p className="text-gray-400">Manage your client appointments and schedule</p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex gap-2">
              {["all", "confirmed", "pending", "cancelled"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                    selectedFilter === filter
                      ? "bg-teal-500 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
        </ScrollReveal>

        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.map((appointment, index) => (
            <ScrollReveal key={appointment.id} delay={0.1 * (index + 2)}>
              <Card className="bg-gray-900/30 border border-teal-500/20 hover:bg-gray-900/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,176,0.1)]">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={appointment.client.avatar || "/placeholder.svg"}
                        alt={appointment.client.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-teal-500/30"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-white">{appointment.client.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail size={14} />
                          {appointment.client.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Phone size={14} />
                          {appointment.client.phone}
                        </div>
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
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}
                        >
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="mt-6 pt-4 border-t border-teal-500/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <h4 className="text-lg font-medium text-white">{appointment.service}</h4>
                        <p className="text-gray-400 text-sm">{appointment.notes}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Duration</p>
                        <p className="text-white font-medium">{appointment.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Price</p>
                        <p className="text-2xl font-bold text-teal-400">{appointment.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Deposit Paid</p>
                        <p className="text-white font-medium">{appointment.deposit}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <ScrollReveal delay={0.2}>
            <div className="text-center py-12">
              <Calendar className="mx-auto text-gray-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No appointments found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more appointments</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}

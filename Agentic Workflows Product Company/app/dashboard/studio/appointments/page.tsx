"use client"

import { useState, useEffect } from "react"
import { Clock, CheckCircle, XCircle, AlertCircle, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function StudioAppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    // Load appointments from localStorage or use mock data
    const savedAppointments = localStorage.getItem("studioAppointments")
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    } else {
      // Initialize with sample appointments
      const sampleAppointments = [
        {
          id: 1,
          clientName: "Sarah Johnson",
          clientPhone: "+1 (555) 123-4567",
          clientEmail: "sarah.j@email.com",
          date: "2024-03-15",
          time: "2:00 PM",
          duration: 180, // minutes
          service: "Dragon Tattoo - Session 1",
          status: "confirmed",
          location: "Studio A",
          price: 450,
          deposit: 150,
          notes: "First session of large back piece. Client is excited and prepared.",
          preparation: "Stencil ready, design approved",
          aftercare: "Standard aftercare instructions provided",
          sessionNumber: 1,
          totalSessions: 3,
        },
        {
          id: 2,
          clientName: "Mike Chen",
          clientPhone: "+1 (555) 987-6543",
          clientEmail: "mike.chen@email.com",
          date: "2024-03-16",
          time: "11:00 AM",
          duration: 120,
          service: "Rose Touch-up",
          status: "confirmed",
          location: "Studio B",
          price: 200,
          deposit: 50,
          notes: "Touch-up on 6-month old rose tattoo. Healing went well.",
          preparation: "Review original work photos",
          aftercare: "Minimal aftercare needed",
          sessionNumber: 1,
          totalSessions: 1,
        },
        {
          id: 3,
          clientName: "Emma Wilson",
          clientPhone: "+1 (555) 456-7890",
          clientEmail: "emma.w@email.com",
          date: "2024-03-17",
          time: "3:00 PM",
          duration: 240,
          service: "Sleeve Progress - Session 2",
          status: "pending",
          location: "Studio A",
          price: 600,
          deposit: 200,
          notes: "Second session of full sleeve. Client handles pain well.",
          preparation: "Continue from shoulder area",
          aftercare: "Extended aftercare due to large area",
          sessionNumber: 2,
          totalSessions: 4,
        },
        {
          id: 4,
          clientName: "David Brown",
          clientPhone: "+1 (555) 321-0987",
          clientEmail: "david.b@email.com",
          date: "2024-03-14",
          time: "1:00 PM",
          duration: 90,
          service: "Small Script Tattoo",
          status: "completed",
          location: "Studio B",
          price: 150,
          deposit: 50,
          notes: "Simple script on forearm. Quick session.",
          preparation: "Font confirmed, placement marked",
          aftercare: "Standard aftercare provided",
          sessionNumber: 1,
          totalSessions: 1,
        },
      ]
      setAppointments(sampleAppointments)
      localStorage.setItem("studioAppointments", JSON.stringify(sampleAppointments))
    }
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "pending":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "completed":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "cancelled":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "rescheduled":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} />
      case "pending":
        return <AlertCircle size={16} />
      case "completed":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const handleStatusChange = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt,
    )
    setAppointments(updatedAppointments)
    localStorage.setItem("studioAppointments", JSON.stringify(updatedAppointments))
  }

  const handleDeleteAppointment = (appointmentId) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = appointments.filter((apt) => apt.id !== appointmentId)
      setAppointments(updatedAppointments)
      localStorage.setItem("studioAppointments", JSON.stringify(updatedAppointments))
    }
  }

  const handleReschedule = (appointmentId, newDate, newTime) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, date: newDate, time: newTime, status: "rescheduled" } : apt,
    )
    setAppointments(updatedAppointments)
    localStorage.setItem("studioAppointments", JSON.stringify(updatedAppointments))
  }

  const handleUpdateNotes = (appointmentId, field, value) => {
    const updatedAppointments = appointments.map((apt) => (apt.id === appointmentId ? { ...apt, [field]: value } : apt))
    setAppointments(updatedAppointments)
    localStorage.setItem("studioAppointments", JSON.stringify(updatedAppointments))
  }

  const getTotalRevenue = () => {
    return appointments.filter((apt) => apt.status === "completed").reduce((total, apt) => total + apt.price, 0)
  }

  const getUpcomingCount = () => {
    const today = new Date()
    return appointments.filter((apt) => new Date(apt.date) >= today && apt.status !== "cancelled").length
  }

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.clientPhone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <DashboardHeader title="Studio Appointments" description="Manage all studio appointments and schedules" />

      {/* Search and Filters */}
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
        <div className="flex gap-2">
          {["all", "confirmed", "pending", "completed", "cancelled"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                statusFilter === filter ? "bg-teal-500 text-white" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="bg-gray-900/30 border border-teal-500/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{appointment.clientName}</h3>
                  <p className="text-gray-400 text-sm">{appointment.service}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{appointment.date}</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {getStatusIcon(appointment.status)}
                  {appointment.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <select
                  value={appointment.status}
                  onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                  className="px-3 py-1 bg-gray-800/50 border border-teal-500/20 rounded text-white text-sm focus:outline-none focus:border-teal-500/50"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
                <button
                  onClick={() => handleDeleteAppointment(appointment.id)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

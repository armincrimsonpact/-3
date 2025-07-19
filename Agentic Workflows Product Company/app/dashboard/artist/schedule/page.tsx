"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Phone, MapPin, Edit, Trash2, CheckCircle, XCircle, AlertCircle, Search } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtistSchedule() {
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("upcoming") // upcoming, today, week, month
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(null)

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem("artistAppointments")
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
      localStorage.setItem("artistAppointments", JSON.stringify(sampleAppointments))
    }
  }, [])

  // Filter appointments based on search and filters
  useEffect(() => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.clientPhone.includes(searchTerm),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter)
    }

    // Date filter based on view mode
    const today = new Date()
    const todayStr = formatDate(today)

    switch (viewMode) {
      case "today":
        filtered = filtered.filter((apt) => apt.date === todayStr)
        break
      case "upcoming":
        filtered = filtered.filter((apt) => new Date(apt.date) >= today)
        break
      case "week":
        const weekFromNow = new Date(today)
        weekFromNow.setDate(today.getDate() + 7)
        filtered = filtered.filter((apt) => {
          const aptDate = new Date(apt.date)
          return aptDate >= today && aptDate <= weekFromNow
        })
        break
      case "month":
        const monthFromNow = new Date(today)
        monthFromNow.setMonth(today.getMonth() + 1)
        filtered = filtered.filter((apt) => {
          const aptDate = new Date(apt.date)
          return aptDate >= today && aptDate <= monthFromNow
        })
        break
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateA - dateB
    })

    setFilteredAppointments(filtered)
  }, [appointments, searchTerm, statusFilter, viewMode])

  const saveAppointments = (newAppointments) => {
    setAppointments(newAppointments)
    localStorage.setItem("artistAppointments", JSON.stringify(newAppointments))
  }

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]
  }

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
    saveAppointments(updatedAppointments)
  }

  const handleDeleteAppointment = (appointmentId) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = appointments.filter((apt) => apt.id !== appointmentId)
      saveAppointments(updatedAppointments)
    }
  }

  const handleReschedule = (appointmentId, newDate, newTime) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, date: newDate, time: newTime, status: "rescheduled" } : apt,
    )
    saveAppointments(updatedAppointments)
    setShowRescheduleModal(null)
  }

  const handleUpdateNotes = (appointmentId, field, value) => {
    const updatedAppointments = appointments.map((apt) => (apt.id === appointmentId ? { ...apt, [field]: value } : apt))
    saveAppointments(updatedAppointments)
  }

  const getTotalRevenue = () => {
    return filteredAppointments.filter((apt) => apt.status === "completed").reduce((total, apt) => total + apt.price, 0)
  }

  const getUpcomingCount = () => {
    const today = new Date()
    return appointments.filter((apt) => new Date(apt.date) >= today && apt.status !== "cancelled").length
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects removed for pure black background */}

      <div className="relative z-10 p-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
              Schedule Management
            </h1>
            <p className="text-gray-400">Manage your appointments and upcoming sessions</p>
          </div>
        </ScrollReveal>

        {/* Stats Cards */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900/30 border border-teal-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Upcoming</p>
                    <p className="text-2xl font-bold text-white">{getUpcomingCount()}</p>
                  </div>
                  <Calendar className="text-teal-400" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/30 border border-teal-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Today</p>
                    <p className="text-2xl font-bold text-white">
                      {appointments.filter((apt) => apt.date === formatDate(new Date())).length}
                    </p>
                  </div>
                  <Clock className="text-teal-400" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/30 border border-teal-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-white">
                      {appointments.filter((apt) => apt.status === "completed").length}
                    </p>
                  </div>
                  <CheckCircle className="text-green-400" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/30 border border-teal-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-white">${getTotalRevenue()}</p>
                  </div>
                  <div className="text-green-400 text-xl">$</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Filters and Search */}
        <ScrollReveal delay={0.2}>
          <Card className="bg-gray-900/30 border border-teal-500/20 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>

                {/* View Mode Filter */}
                <div className="flex gap-2">
                  {["upcoming", "today", "week", "month"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        viewMode === mode
                          ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                          : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Appointments List */}
        <ScrollReveal delay={0.3}>
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <Card className="bg-gray-900/30 border border-teal-500/20">
                <CardContent className="p-8 text-center">
                  <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-400">No appointments found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteAppointment}
                  onReschedule={(id) => setShowRescheduleModal(id)}
                  onEdit={(id) => setEditingAppointment(id)}
                  onUpdateNotes={handleUpdateNotes}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              ))
            )}
          </div>
        </ScrollReveal>

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <RescheduleModal
            appointmentId={showRescheduleModal}
            appointment={appointments.find((apt) => apt.id === showRescheduleModal)}
            onClose={() => setShowRescheduleModal(null)}
            onReschedule={handleReschedule}
          />
        )}

        {/* Edit Appointment Modal */}
        {editingAppointment && (
          <EditAppointmentModal
            appointment={appointments.find((apt) => apt.id === editingAppointment)}
            onClose={() => setEditingAppointment(null)}
            onSave={(updatedAppointment) => {
              const updatedAppointments = appointments.map((apt) =>
                apt.id === editingAppointment ? { ...apt, ...updatedAppointment } : apt,
              )
              saveAppointments(updatedAppointments)
              setEditingAppointment(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

// Appointment Card Component
function AppointmentCard({
  appointment,
  onStatusChange,
  onDelete,
  onReschedule,
  onEdit,
  onUpdateNotes,
  getStatusColor,
  getStatusIcon,
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [editingField, setEditingField] = useState(null)
  const [tempValue, setTempValue] = useState("")

  const handleFieldEdit = (field, currentValue) => {
    setEditingField(field)
    setTempValue(currentValue)
  }

  const handleFieldSave = (field) => {
    onUpdateNotes(appointment.id, field, tempValue)
    setEditingField(null)
    setTempValue("")
  }

  const formatDateTime = (date, time) => {
    const appointmentDate = new Date(date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    let dateStr = ""
    if (appointmentDate.toDateString() === today.toDateString()) {
      dateStr = "Today"
    } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
      dateStr = "Tomorrow"
    } else {
      dateStr = appointmentDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    }

    return `${dateStr} at ${time}`
  }

  return (
    <Card className="bg-gray-900/30 border border-teal-500/20 hover:border-teal-500/40 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-white">{appointment.clientName}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(appointment.status)}`}
              >
                {getStatusIcon(appointment.status)}
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-400 mb-1">{appointment.service}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDateTime(appointment.date, appointment.time)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {appointment.duration} min
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {appointment.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors text-sm"
            >
              {showDetails ? "Hide" : "Details"}
            </button>
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(appointment.id)}
                className="p-2 text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onReschedule(appointment.id)}
                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Calendar size={16} />
              </button>
              <button
                onClick={() => onDelete(appointment.id)}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4">
          <select
            value={appointment.status}
            onChange={(e) => onStatusChange(appointment.id, e.target.value)}
            className="px-3 py-1 bg-gray-800/50 border border-teal-500/20 rounded text-white text-sm focus:outline-none focus:border-teal-500/50"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
          <a
            href={`tel:${appointment.clientPhone}`}
            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors text-sm flex items-center gap-1"
          >
            <Phone size={14} />
            Call
          </a>
          <a
            href={`mailto:${appointment.clientEmail}`}
            className="px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors text-sm"
          >
            Email
          </a>
        </div>

        {/* Detailed Information */}
        {showDetails && (
          <div className="border-t border-gray-700 pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-medium mb-2">Client Information</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">
                    <span className="text-gray-300">Phone:</span> {appointment.clientPhone}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-gray-300">Email:</span> {appointment.clientEmail}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Session Details</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">
                    <span className="text-gray-300">Session:</span> {appointment.sessionNumber} of{" "}
                    {appointment.totalSessions}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-gray-300">Price:</span> ${appointment.price}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-gray-300">Deposit:</span> ${appointment.deposit}
                  </p>
                </div>
              </div>
            </div>

            {/* Editable Notes */}
            <div className="space-y-3">
              {["notes", "preparation", "aftercare"].map((field) => (
                <div key={field}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium capitalize">{field}</h4>
                    {editingField !== field && (
                      <button
                        onClick={() => handleFieldEdit(field, appointment[field])}
                        className="text-gray-400 hover:text-teal-400 transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                    )}
                  </div>
                  {editingField === field ? (
                    <div className="flex gap-2">
                      <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 p-2 bg-gray-800/50 border border-teal-500/20 rounded text-white text-sm focus:outline-none focus:border-teal-500/50"
                        rows="2"
                      />
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleFieldSave(field)}
                          className="p-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          onClick={() => setEditingField(null)}
                          className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm bg-gray-800/30 p-2 rounded">
                      {appointment[field] || `No ${field} notes`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Reschedule Modal Component
function RescheduleModal({ appointmentId, appointment, onClose, onReschedule }) {
  const [newDate, setNewDate] = useState(appointment.date)
  const [newTime, setNewTime] = useState(appointment.time)

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onReschedule(appointmentId, newDate, newTime)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-teal-500/20 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Reschedule Appointment</h2>
        <p className="text-gray-400 mb-4">
          Rescheduling appointment for <span className="text-white">{appointment.clientName}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Time</label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            >
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Edit Appointment Modal Component
function EditAppointmentModal({ appointment, onClose, onSave }) {
  const [formData, setFormData] = useState({
    clientName: appointment.clientName,
    clientPhone: appointment.clientPhone,
    clientEmail: appointment.clientEmail,
    service: appointment.service,
    price: appointment.price,
    deposit: appointment.deposit,
    duration: appointment.duration,
    location: appointment.location,
    sessionNumber: appointment.sessionNumber,
    totalSessions: appointment.totalSessions,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-teal-500/20 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Edit Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Deposit ($)</label>
              <input
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: Number.parseInt(e.target.value) })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Session Number</label>
              <input
                type="number"
                value={formData.sessionNumber}
                onChange={(e) => setFormData({ ...formData, sessionNumber: Number.parseInt(e.target.value) })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Sessions</label>
              <input
                type="number"
                value={formData.totalSessions}
                onChange={(e) => setFormData({ ...formData, totalSessions: Number.parseInt(e.target.value) })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

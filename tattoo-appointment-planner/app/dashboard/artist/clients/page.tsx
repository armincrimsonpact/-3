"use client"

import { useState, useEffect } from "react"
import { Search, Mail, Phone, Calendar, Star, MessageSquare, Eye, Edit, Trash2 } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtistClients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Load clients from localStorage on component mount
  useEffect(() => {
    const savedClients = localStorage.getItem("artistClients")
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    } else {
      // Initialize with default data
      const defaultClients = [
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.j@email.com",
          phone: "+1 (555) 123-4567",
          avatar: "/placeholder.svg?height=60&width=60",
          totalSessions: 3,
          totalSpent: "$1,350",
          lastVisit: "2024-03-10",
          nextAppointment: "2024-03-20",
          status: "active",
          rating: 5,
          notes: "Loves traditional style, very punctual",
          tattoos: [
            { name: "Dragon Back Piece", date: "2024-01-15", status: "completed", price: "$800" },
            { name: "Rose Shoulder", date: "2024-02-20", status: "completed", price: "$300" },
            { name: "Phoenix Thigh", date: "2024-03-20", status: "scheduled", price: "$250" },
          ],
          preferences: {
            style: "Traditional",
            painTolerance: "High",
            sessionLength: "Long (3+ hours)",
            communication: "Text preferred",
          },
        },
        {
          id: 2,
          name: "Mike Chen",
          email: "mike.chen@email.com",
          phone: "+1 (555) 987-6543",
          avatar: "/placeholder.svg?height=60&width=60",
          totalSessions: 5,
          totalSpent: "$2,100",
          lastVisit: "2024-03-05",
          nextAppointment: null,
          status: "regular",
          rating: 5,
          notes: "Prefers geometric designs, good pain tolerance",
          tattoos: [
            { name: "Geometric Sleeve", date: "2023-12-10", status: "completed", price: "$900" },
            { name: "Mandala Chest", date: "2024-01-25", status: "completed", price: "$600" },
            { name: "Sacred Geometry Back", date: "2024-03-05", status: "completed", price: "$600" },
          ],
          preferences: {
            style: "Geometric",
            painTolerance: "Very High",
            sessionLength: "Medium (2-3 hours)",
            communication: "Email preferred",
          },
        },
        {
          id: 3,
          name: "Emma Rodriguez",
          email: "emma.r@email.com",
          phone: "+1 (555) 456-7890",
          avatar: "/placeholder.svg?height=60&width=60",
          totalSessions: 1,
          totalSpent: "$450",
          lastVisit: "2024-02-28",
          nextAppointment: "2024-03-25",
          status: "new",
          rating: 4,
          notes: "First-time client, interested in watercolor style",
          tattoos: [
            { name: "Watercolor Bird", date: "2024-02-28", status: "completed", price: "$450" },
            { name: "Floral Forearm", date: "2024-03-25", status: "scheduled", price: "$350" },
          ],
          preferences: {
            style: "Watercolor",
            painTolerance: "Medium",
            sessionLength: "Short (1-2 hours)",
            communication: "Phone preferred",
          },
        },
        {
          id: 4,
          name: "David Wilson",
          email: "david.w@email.com",
          phone: "+1 (555) 321-0987",
          avatar: "/placeholder.svg?height=60&width=60",
          totalSessions: 2,
          totalSpent: "$800",
          lastVisit: "2024-01-15",
          nextAppointment: null,
          status: "inactive",
          rating: 4,
          notes: "Moved to another city, may return for touch-ups",
          tattoos: [
            { name: "Memorial Portrait", date: "2023-11-20", status: "completed", price: "$500" },
            { name: "Quote Script", date: "2024-01-15", status: "completed", price: "$300" },
          ],
          preferences: {
            style: "Realism",
            painTolerance: "Low",
            sessionLength: "Short (1-2 hours)",
            communication: "Text preferred",
          },
        },
      ]
      setClients(defaultClients)
      localStorage.setItem("artistClients", JSON.stringify(defaultClients))
    }
  }, [])

  const saveClients = (updatedClients) => {
    setClients(updatedClients)
    localStorage.setItem("artistClients", JSON.stringify(updatedClients))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "regular":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "new":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "inactive":
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const handleViewDetails = (client) => {
    setSelectedClient(client)
    setShowClientModal(true)
  }

  const handleSendMessage = (client) => {
    // Create a new message conversation
    const messageData = {
      recipientId: `client-${client.id}`,
      recipientName: client.name,
      recipientAvatar: client.avatar,
      prefilledMessage: `Hi ${client.name}, `,
    }
    localStorage.setItem("newMessage", JSON.stringify(messageData))
    window.location.replace("/dashboard/artist/messages")
  }

  const handleBookAppointment = (client) => {
    // Pre-fill booking form with client data
    const bookingData = {
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
      preferredStyle: client.preferences?.style || "",
      sessionLength: client.preferences?.sessionLength || "",
    }
    localStorage.setItem("prefilledBooking", JSON.stringify(bookingData))
    window.location.replace("/dashboard/artist/schedule")
  }

  const handleEditClient = (client) => {
    setSelectedClient(client)
    setShowEditModal(true)
  }

  const handleDeleteClient = (clientId) => {
    if (confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      const updatedClients = clients.filter((client) => client.id !== clientId)
      saveClients(updatedClients)
    }
  }

  const handleUpdateClient = (updatedClient) => {
    const updatedClients = clients.map((client) => (client.id === updatedClient.id ? updatedClient : client))
    saveClients(updatedClients)
    setShowEditModal(false)
    setSelectedClient(null)
  }

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    const matchesFilter = selectedFilter === "all" || client.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects removed for pure black background */}

      <div className="relative z-10 p-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
              My Clients
            </h1>
            <p className="text-gray-400">Manage your client relationships and history</p>
          </div>
        </ScrollReveal>

        {/* Search and Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {["all", "active", "regular", "new", "inactive"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                    selectedFilter === filter
                      ? "bg-teal-500 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {filter} ({clients.filter((c) => filter === "all" || c.status === filter).length})
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClients.map((client, index) => (
            <ScrollReveal key={client.id} delay={0.1 * (index + 2)}>
              <Card className="bg-gray-900/30 border border-teal-500/20 hover:bg-gray-900/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,176,0.1)]">
                <CardContent className="p-6">
                  {/* Client Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={client.avatar || "/placeholder.svg"}
                      alt={client.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-500/30"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-white">{client.name}</h3>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}
                        >
                          {client.status}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                        <Mail size={14} />
                        <a href={`mailto:${client.email}`} className="hover:text-teal-400 transition-colors">
                          {client.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone size={14} />
                        <a href={`tel:${client.phone}`} className="hover:text-teal-400 transition-colors">
                          {client.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < client.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                          />
                        ))}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditClient(client)}
                          className="p-1 text-gray-400 hover:text-teal-400 transition-colors"
                          title="Edit client"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete client"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Client Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-2xl font-bold text-teal-400">{client.totalSessions}</p>
                      <p className="text-sm text-gray-400">Sessions</p>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-2xl font-bold text-teal-400">{client.totalSpent}</p>
                      <p className="text-sm text-gray-400">Total Spent</p>
                    </div>
                  </div>

                  {/* Visit Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Last Visit</p>
                      <p className="text-white font-medium">{client.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Next Appointment</p>
                      <p className="text-white font-medium">{client.nextAppointment || "None scheduled"}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-1">Notes</p>
                    <p className="text-gray-300 text-sm">{client.notes}</p>
                  </div>

                  {/* Recent Tattoos */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">Recent Work</p>
                    <div className="space-y-2">
                      {client.tattoos.slice(0, 2).map((tattoo, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">{tattoo.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-teal-400 font-medium">{tattoo.price}</span>
                            <span className="text-gray-400">{tattoo.date}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                tattoo.status === "completed"
                                  ? "bg-green-400/10 text-green-400"
                                  : "bg-yellow-400/10 text-yellow-400"
                              }`}
                            >
                              {tattoo.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(client)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button
                      onClick={() => handleSendMessage(client)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      <MessageSquare size={16} />
                      Message
                    </button>
                    <button
                      onClick={() => handleBookAppointment(client)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <Calendar size={16} />
                      Book
                    </button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <ScrollReveal delay={0.2}>
            <div className="text-center py-12">
              <Search className="mx-auto text-gray-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No clients found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          </ScrollReveal>
        )}

        {/* Client Detail Modal */}
        {showClientModal && selectedClient && (
          <ClientDetailModal
            client={selectedClient}
            onClose={() => {
              setShowClientModal(false)
              setSelectedClient(null)
            }}
            onEdit={() => {
              setShowClientModal(false)
              setShowEditModal(true)
            }}
            onMessage={() => handleSendMessage(selectedClient)}
            onBook={() => handleBookAppointment(selectedClient)}
          />
        )}

        {/* Edit Client Modal */}
        {showEditModal && selectedClient && (
          <EditClientModal
            client={selectedClient}
            onClose={() => {
              setShowEditModal(false)
              setSelectedClient(null)
            }}
            onSave={handleUpdateClient}
          />
        )}
      </div>
    </div>
  )
}

// Client Detail Modal Component
function ClientDetailModal({ client, onClose, onEdit, onMessage, onBook }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-teal-500/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <img
                src={client.avatar || "/placeholder.svg"}
                alt={client.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-teal-500/30"
              />
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{client.name}</h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1">
                    <Mail size={16} />
                    {client.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={16} />
                    {client.phone}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl">
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client Stats */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Client Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Sessions:</span>
                      <span className="text-white font-medium">{client.totalSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Spent:</span>
                      <span className="text-white font-medium">{client.totalSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Visit:</span>
                      <span className="text-white font-medium">{client.lastVisit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Appointment:</span>
                      <span className="text-white font-medium">{client.nextAppointment || "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < client.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Preferences</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-400 text-sm">Style:</span>
                      <p className="text-white">{client.preferences?.style}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Pain Tolerance:</span>
                      <p className="text-white">{client.preferences?.painTolerance}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Session Length:</span>
                      <p className="text-white">{client.preferences?.sessionLength}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Communication:</span>
                      <p className="text-white">{client.preferences?.communication}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tattoo History */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-4">Tattoo History</h3>
                <div className="space-y-4">
                  {client.tattoos.map((tattoo, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{tattoo.name}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tattoo.status === "completed"
                              ? "bg-green-400/10 text-green-400"
                              : "bg-yellow-400/10 text-yellow-400"
                          }`}
                        >
                          {tattoo.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{tattoo.date}</span>
                        <span className="text-teal-400 font-medium">{tattoo.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/30 p-4 rounded-lg mt-4">
                <h3 className="text-white font-semibold mb-3">Notes</h3>
                <p className="text-gray-300">{client.notes}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Client
            </button>
            <button
              onClick={onMessage}
              className="px-6 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
            >
              <MessageSquare size={16} />
              Send Message
            </button>
            <button
              onClick={onBook}
              className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
            >
              <Calendar size={16} />
              Book Appointment
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Client Modal Component
function EditClientModal({ client, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone,
    status: client.status,
    notes: client.notes,
    preferences: {
      style: client.preferences?.style || "",
      painTolerance: client.preferences?.painTolerance || "",
      sessionLength: client.preferences?.sessionLength || "",
      communication: client.preferences?.communication || "",
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...client,
      ...formData,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-teal-500/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Client</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="new">New</option>
                  <option value="active">Active</option>
                  <option value="regular">Regular</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Style</label>
                <input
                  type="text"
                  value={formData.preferences.style}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, style: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                  placeholder="e.g., Traditional, Geometric, Watercolor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pain Tolerance</label>
                <select
                  value={formData.preferences.painTolerance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, painTolerance: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="">Select...</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Length</label>
                <select
                  value={formData.preferences.sessionLength}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, sessionLength: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="">Select...</option>
                  <option value="Short (1-2 hours)">Short (1-2 hours)</option>
                  <option value="Medium (2-3 hours)">Medium (2-3 hours)</option>
                  <option value="Long (3+ hours)">Long (3+ hours)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Communication</label>
                <select
                  value={formData.preferences.communication}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, communication: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="">Select...</option>
                  <option value="Text preferred">Text preferred</option>
                  <option value="Email preferred">Email preferred</option>
                  <option value="Phone preferred">Phone preferred</option>
                </select>
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
    </div>
  )
}

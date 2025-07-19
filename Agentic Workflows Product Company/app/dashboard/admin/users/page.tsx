"use client"

import { useState } from "react"
import { Search, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 123-4567",
      type: "Artist",
      status: "active",
      joinDate: "2024-01-15",
      location: "New York, NY",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      email: "mike.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      type: "Studio Owner",
      status: "active",
      joinDate: "2023-11-20",
      location: "Los Angeles, CA",
    },
    {
      id: 3,
      name: "Emma Thompson",
      email: "emma.thompson@email.com",
      phone: "+1 (555) 345-6789",
      type: "Client",
      status: "inactive",
      joinDate: "2024-02-28",
      location: "Chicago, IL",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <DashboardHeader title="User Management" description="Manage platform users and their accounts" />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "inactive"].map((filter) => (
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

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gray-900/30 border border-teal-500/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.type}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{user.email}</span>
                    <span>{user.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-teal-400 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-white">{user.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Joined</p>
                  <p className="text-white">{user.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">{user.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Search, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"

export default function AdminStudiosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const studios = [
    {
      id: 1,
      name: "InkCircle NYC",
      owner: "Mike Rodriguez",
      email: "mike@inkcircle.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY",
      status: "verified",
      joinDate: "2023-01-15",
      artists: 8,
    },
    {
      id: 2,
      name: "Tattoo Paradise",
      owner: "Lisa Wong",
      email: "lisa@tattooparadise.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Los Angeles, CA",
      status: "pending",
      joinDate: "2024-02-20",
      artists: 5,
    },
    {
      id: 3,
      name: "Dark Arts Studio",
      owner: "James Smith",
      email: "james@darkarts.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine St, Chicago, IL",
      status: "rejected",
      joinDate: "2023-11-10",
      artists: 3,
    },
  ]

  const filteredStudios = studios.filter((studio) => {
    const matchesSearch =
      studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studio.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || studio.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <DashboardHeader title="Studio Management" description="Manage studio accounts and verify their information" />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search studios by name or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["all", "verified", "pending", "rejected"].map((filter) => (
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

      {/* Studios List */}
      <div className="space-y-4">
        {filteredStudios.map((studio) => (
          <Card key={studio.id} className="bg-gray-900/30 border border-teal-500/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{studio.name}</h3>
                  <p className="text-gray-400 text-sm">Owner: {studio.owner}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{studio.email}</span>
                    <span>{studio.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {studio.status === "verified" && <CheckCircle className="text-green-400" size={20} />}
                  {studio.status === "rejected" && <XCircle className="text-red-400" size={20} />}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white">{studio.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Artists</p>
                  <p className="text-white">{studio.artists}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Joined</p>
                  <p className="text-white">{studio.joinDate}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

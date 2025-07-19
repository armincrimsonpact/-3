"use client"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Users,
  Star,
  Calendar,
  DollarSign,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Search,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function StudioArtistsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const highlightId = searchParams.get("highlight")

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const artists = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@inkcircle.com",
      phone: "+1 (555) 123-4567",
      speciality: "Traditional",
      experience: "8 years",
      rating: 4.9,
      totalBookings: 156,
      monthlyRevenue: "$4,250",
      status: "active",
      joinDate: "2022-03-15",
      completedSessions: 142,
      avatar: "/tattoo-artist-portrait.png",
      bio: "Specializing in traditional American tattoos with bold lines and vibrant colors.",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      email: "mike@inkcircle.com",
      phone: "+1 (555) 234-5678",
      speciality: "Realism",
      experience: "6 years",
      rating: 4.8,
      totalBookings: 134,
      monthlyRevenue: "$3,800",
      status: "active",
      joinDate: "2022-07-20",
      completedSessions: 128,
      avatar: "/tattoo-artist.jpg",
      bio: "Expert in photorealistic portraits and detailed black & gray work.",
    },
    {
      id: 3,
      name: "Emma Thompson",
      email: "emma@inkcircle.com",
      phone: "+1 (555) 345-6789",
      speciality: "Watercolor",
      experience: "5 years",
      rating: 4.9,
      totalBookings: 98,
      monthlyRevenue: "$3,200",
      status: "active",
      joinDate: "2023-01-10",
      completedSessions: 89,
      avatar: "/colorful-hair-tattoo-artist.png",
      bio: "Creating vibrant watercolor-style tattoos with flowing, artistic designs.",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james@inkcircle.com",
      phone: "+1 (555) 456-7890",
      speciality: "Geometric",
      experience: "4 years",
      rating: 4.7,
      totalBookings: 76,
      monthlyRevenue: "$2,900",
      status: "on_leave",
      joinDate: "2023-05-22",
      completedSessions: 71,
      avatar: "/tattoo-artist-studio.png",
      bio: "Precision geometric patterns and sacred geometry designs.",
    },
  ]

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || artist.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewArtist = (artistId: number) => {
    // In a real app, this would navigate to artist detail page
    alert(`Viewing detailed profile for artist ID: ${artistId}`)
  }

  const handleMessageArtist = (email: string, name: string) => {
    router.push(`/dashboard/studio/messages?to=${email}&name=${name}`)
  }

  const handleCallArtist = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleEmailArtist = (email: string) => {
    window.open(`mailto:${email}`)
  }

  const handleEditArtist = (artistId: number) => {
    alert(`Edit artist functionality - Artist ID: ${artistId}`)
  }

  const handleRemoveArtist = (artistId: number, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from your studio?`)) {
      alert(`Artist ${name} removed from studio`)
    }
  }

  const handleAddArtist = () => {
    alert("Add new artist functionality - would open invite/registration form")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "on_leave":
        return "bg-yellow-500/20 text-yellow-400"
      case "inactive":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "on_leave":
        return "On Leave"
      case "inactive":
        return "Inactive"
      default:
        return "Unknown"
    }
  }

  return (
    <div>
      <DashboardHeader
        title="Studio Artists"
        description="Manage your studio artists, track performance, and handle communications"
      />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search artists by name or speciality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            All ({artists.length})
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            onClick={() => setStatusFilter("active")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            Active ({artists.filter((a) => a.status === "active").length})
          </Button>
          <Button
            variant={statusFilter === "on_leave" ? "default" : "outline"}
            onClick={() => setStatusFilter("on_leave")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            On Leave ({artists.filter((a) => a.status === "on_leave").length})
          </Button>
        </div>

        <Button onClick={handleAddArtist} className="bg-teal-600 hover:bg-teal-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Artist
        </Button>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredArtists.map((artist) => (
          <Card
            key={artist.id}
            className={`bg-gray-900 border-gray-800 ${
              highlightId === artist.id.toString() ? "ring-2 ring-teal-500" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={artist.avatar || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-white text-lg">{artist.name}</CardTitle>
                    <p className="text-gray-400">{artist.speciality} Specialist</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-300">{artist.rating}</span>
                      </div>
                      <Badge className={getStatusColor(artist.status)}>{getStatusText(artist.status)}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-800 rounded-lg">
                    <DollarSign className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-400">Monthly</p>
                    <p className="text-white font-semibold">{artist.monthlyRevenue}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-400">Bookings</p>
                    <p className="text-white font-semibold">{artist.totalBookings}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded-lg">
                    <Users className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-400">Completed</p>
                    <p className="text-white font-semibold">{artist.completedSessions}</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-gray-300 text-sm">{artist.bio}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Experience</p>
                    <p className="text-white">{artist.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Joined</p>
                    <p className="text-white">{new Date(artist.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewArtist(artist.id)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMessageArtist(artist.email, artist.name)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCallArtist(artist.phone)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEmailArtist(artist.email)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditArtist(artist.id)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveArtist(artist.id, artist.name)}
                    className="bg-red-700 border-red-600 text-white hover:bg-red-600"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredArtists.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No artists found</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start building your studio team by adding artists"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button onClick={handleAddArtist} className="bg-teal-600 hover:bg-teal-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Artist
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

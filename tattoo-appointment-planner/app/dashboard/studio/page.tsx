"use client"
import { useRouter } from "next/navigation"
import { Users, DollarSign, Calendar, Star, Eye, MessageSquare, Phone } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"

export default function StudioDashboard() {
  const router = useRouter()

  const stats = [
    {
      title: "Monthly Revenue",
      value: "$18,750",
      change: "+12% from last month",
      icon: DollarSign,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Studio Artists",
      value: "8",
      change: "All active",
      icon: Users,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Total Bookings",
      value: "156",
      change: "+23 this month",
      icon: Calendar,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Studio Rating",
      value: "4.8",
      change: "89 reviews",
      icon: Star,
      color: "from-yellow-500 to-yellow-700",
    },
  ]

  const topArtists = [
    {
      id: 1,
      name: "Sarah Chen",
      speciality: "Traditional",
      revenue: "$4,250",
      bookings: 23,
      rating: 4.9,
      phone: "+1 (555) 123-4567",
      email: "sarah@inkcircle.com",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      speciality: "Realism",
      revenue: "$3,800",
      bookings: 19,
      rating: 4.8,
      phone: "+1 (555) 234-5678",
      email: "mike@inkcircle.com",
    },
    {
      id: 3,
      name: "Emma Thompson",
      speciality: "Watercolor",
      revenue: "$3,200",
      bookings: 16,
      rating: 4.9,
      phone: "+1 (555) 345-6789",
      email: "emma@inkcircle.com",
    },
  ]

  const recentBookings = [
    {
      id: 1,
      client: "Alex Johnson",
      artist: "Sarah Chen",
      service: "Traditional Sleeve",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "confirmed",
      price: "$450",
    },
    {
      id: 2,
      client: "Maria Garcia",
      artist: "Mike Rodriguez",
      service: "Portrait Tattoo",
      date: "2024-01-16",
      time: "10:00 AM",
      status: "pending",
      price: "$320",
    },
    {
      id: 3,
      client: "David Kim",
      artist: "Emma Thompson",
      service: "Watercolor Design",
      date: "2024-01-17",
      time: "3:30 PM",
      status: "confirmed",
      price: "$280",
    },
  ]

  const handleViewArtist = (artistId: number) => {
    router.push(`/dashboard/studio/artists?highlight=${artistId}`)
  }

  const handleMessageArtist = (email: string) => {
    router.push(`/dashboard/studio/messages?to=${email}`)
  }

  const handleCallArtist = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleViewBooking = (bookingId: number) => {
    router.push(`/dashboard/studio/appointments?highlight=${bookingId}`)
  }

  return (
    <div>
      <DashboardHeader
        title="Studio Dashboard"
        description="Manage your studio, track performance, and oversee your artists"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Artists */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Top Performing Artists</h3>
          <div className="space-y-4">
            {topArtists.map((artist, index) => (
              <div key={artist.id} className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white font-medium">{artist.name}</p>
                    <p className="text-gray-400 text-sm">{artist.speciality} Specialist</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-400">{artist.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-teal-400 font-semibold">{artist.revenue}</p>
                    <p className="text-xs text-gray-500">#{index + 1} performer</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{artist.bookings} bookings</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewArtist(artist.id)}
                      className="bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/50 rounded-lg backdrop-blur-sm"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMessageArtist(artist.email)}
                      className="bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/50 rounded-lg backdrop-blur-sm"
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCallArtist(artist.phone)}
                      className="bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/50 rounded-lg backdrop-blur-sm"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-white font-medium">{booking.client}</p>
                    <p className="text-gray-400 text-sm">with {booking.artist}</p>
                    <p className="text-gray-500 text-xs">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-teal-400 font-semibold">{booking.price}</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        booking.status === "confirmed"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {booking.date} at {booking.time}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewBooking(booking.id)}
                    className="bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/50 rounded-lg backdrop-blur-sm"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Overview */}
      <div className="mt-8">
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Studio Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
              <h4 className="text-white font-medium mb-2">Capacity Utilization</h4>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-1">78% booked this month</p>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
              <h4 className="text-white font-medium mb-2">Popular Services</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Traditional</span>
                  <span className="text-teal-400">35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Realism</span>
                  <span className="text-teal-400">28%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Watercolor</span>
                  <span className="text-teal-400">22%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
              <h4 className="text-white font-medium mb-2">This Month</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">New Clients</span>
                  <span className="text-teal-400">24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Completed</span>
                  <span className="text-teal-400">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Avg Rating</span>
                  <span className="text-teal-400">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

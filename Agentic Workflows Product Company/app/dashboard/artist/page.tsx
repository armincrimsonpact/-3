"use client"
import { Calendar, Users, DollarSign, Star } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function ArtistDashboard() {
  const stats = [
    {
      title: "Monthly Earnings",
      value: "$4,250",
      change: "+18% from last month",
      icon: DollarSign,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Active Clients",
      value: "23",
      change: "+3 new clients",
      icon: Users,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Sessions This Week",
      value: "8",
      change: "Next 7 days",
      icon: Calendar,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Client Rating",
      value: "4.9",
      change: "47 reviews",
      icon: Star,
      color: "from-yellow-500 to-yellow-700",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      client: "Sarah Johnson",
      date: "2024-03-15",
      time: "2:00 PM",
      service: "Traditional Dragon Tattoo",
      status: "confirmed",
    },
    {
      id: 2,
      client: "Mike Chen",
      date: "2024-03-16",
      time: "11:00 AM",
      service: "Geometric Sleeve Touch-up",
      status: "pending",
    },
  ]

  return (
    <div>
      <DashboardHeader title="Artist Dashboard" description="Manage your artistic practice and client relationships" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Upcoming Sessions</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-white font-medium">{appointment.client}</p>
                    <p className="text-gray-400 text-sm">{appointment.service}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      appointment.status === "confirmed"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{appointment.date}</span>
                  <span>{appointment.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Work */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Work</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Dragon Back Piece</p>
                <p className="text-gray-400 text-sm">Client: Emma R.</p>
                <p className="text-gray-500 text-xs">2024-03-10</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Minimalist Rose</p>
                <p className="text-gray-400 text-sm">Client: David W.</p>
                <p className="text-gray-500 text-xs">2024-03-08</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

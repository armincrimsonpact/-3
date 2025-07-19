"use client"
import { Calendar, Star, Clock, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { StatCard } from "@/components/dashboard/stat-card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function ClientDashboard() {
  const router = useRouter()

  const stats = [
    {
      title: "Total Sessions",
      value: "12",
      change: "+2 this month",
      icon: Calendar,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Favorite Artists",
      value: "3",
      change: "Following",
      icon: Star,
      color: "from-yellow-500 to-yellow-700",
    },
    {
      title: "Hours Tattooed",
      value: "28",
      change: "+6 this month",
      icon: Clock,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Investment",
      value: "$2,450",
      change: "+$450 this month",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-700",
    },
  ]

  const recentAppointments = [
    {
      id: 1,
      artist: "Sarah Chen",
      date: "2024-03-15",
      service: "Traditional Dragon",
      status: "upcoming",
    },
    {
      id: 2,
      artist: "Mike Rodriguez",
      date: "2024-02-28",
      service: "Geometric Sleeve",
      status: "completed",
    },
  ]

  return (
    <div>
      <DashboardHeader
        title="Welcome Back!"
        description="Your tattoo journey dashboard - track appointments and discover artists"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Appointments</h3>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm"
              >
                <div>
                  <p className="text-white font-medium">{appointment.service}</p>
                  <p className="text-gray-400 text-sm">with {appointment.artist}</p>
                  <p className="text-gray-500 text-xs">{appointment.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === "upcoming"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/booking")}
              className="w-full p-4 bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-teal-400 rounded-xl hover:from-teal-500/30 hover:to-teal-600/30 transition-all duration-200 text-left font-medium border border-teal-500/30 backdrop-blur-sm"
            >
              Book New Session
            </button>
            <button
              onClick={() => router.push("/dashboard/client/artists")}
              className="w-full p-4 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all duration-200 text-left font-medium border border-gray-700/50 backdrop-blur-sm"
            >
              Find Artists
            </button>
            <button
              onClick={() => router.push("/dashboard/client/appointments")}
              className="w-full p-4 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all duration-200 text-left font-medium border border-gray-700/50 backdrop-blur-sm"
            >
              View My Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Building, TrendingUp, CheckCircle, Eye, AlertTriangle, Shield, X, Check } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const router = useRouter()
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [selectedAction, setSelectedAction] = useState<any>(null)
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "user_registration",
      message: "New artist registered: Sarah Chen",
      time: "2 hours ago",
      status: "info",
      userId: 1234,
      details: {
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        type: "Artist",
        location: "New York, NY",
        specialties: ["Traditional", "Neo-Traditional"],
        verified: false,
      },
    },
    {
      id: 2,
      type: "studio_approval",
      message: "Studio pending approval: Ink Masters NYC",
      time: "4 hours ago",
      status: "warning",
      studioId: 567,
      details: {
        name: "Ink Masters NYC",
        owner: "Mike Rodriguez",
        email: "mike@inkmasters.com",
        address: "123 Broadway, NYC",
        artists: 5,
        license: "NYC-2024-567",
      },
    },
    {
      id: 3,
      type: "system_alert",
      message: "Payment processing restored",
      time: "6 hours ago",
      status: "success",
      systemId: 1,
      details: {
        system: "Payment Gateway",
        downtime: "15 minutes",
        affectedUsers: 23,
        resolution: "Server restart completed",
      },
    },
    {
      id: 4,
      type: "user_report",
      message: "User report filed against Studio XYZ",
      time: "8 hours ago",
      status: "warning",
      reportId: 89,
      details: {
        reporter: "Anonymous Client",
        reported: "Studio XYZ",
        reason: "Unprofessional behavior",
        severity: "Medium",
        description: "Artist was late and unprepared for appointment",
      },
    },
  ])

  const [pendingActions, setPendingActions] = useState([
    {
      id: 1,
      title: "Studio Verification",
      description: "3 studios awaiting verification",
      priority: "high",
      count: 3,
      action: "verify-studios",
      items: [
        { name: "Ink Masters NYC", owner: "Mike Rodriguez", submitted: "2 days ago" },
        { name: "Tattoo Paradise", owner: "Lisa Wong", submitted: "1 day ago" },
        { name: "Dark Arts Studio", owner: "James Smith", submitted: "3 hours ago" },
      ],
    },
    {
      id: 2,
      title: "User Reports",
      description: "2 user reports need review",
      priority: "medium",
      count: 2,
      action: "review-reports",
      items: [
        { reporter: "Client A", reported: "Studio XYZ", reason: "Unprofessional" },
        { reporter: "Client B", reported: "Artist ABC", reason: "Quality issues" },
      ],
    },
    {
      id: 3,
      title: "System Updates",
      description: "Security patch available",
      priority: "low",
      count: 1,
      action: "system-update",
      items: [{ update: "Security Patch 2.1.4", type: "Security", size: "45MB" }],
    },
    {
      id: 4,
      title: "Payment Issues",
      description: "5 payment disputes to resolve",
      priority: "high",
      count: 5,
      action: "payment-disputes",
      items: [
        { client: "John Doe", amount: "$250", reason: "Service not completed" },
        { client: "Jane Smith", amount: "$180", reason: "Quality dispute" },
        { client: "Bob Wilson", amount: "$320", reason: "Cancellation fee" },
        { client: "Alice Brown", amount: "$150", reason: "Overcharge claim" },
        { client: "Tom Davis", amount: "$200", reason: "Refund request" },
      ],
    },
  ])

  const stats = [
    {
      title: "Platform Users",
      value: "12,847",
      change: "+234 this month",
      icon: Users,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Active Studios",
      value: "89",
      change: "+5 verified",
      icon: Building,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Platform Revenue",
      value: "$45,230",
      change: "+18% growth",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "System Status",
      value: "99.8%",
      change: "Uptime",
      icon: CheckCircle,
      color: "from-emerald-500 to-emerald-700",
    },
  ]

  const systemMetrics = [
    { label: "Active Sessions", value: "1,247", status: "normal" },
    { label: "API Response Time", value: "145ms", status: "normal" },
    { label: "Database Load", value: "23%", status: "normal" },
    { label: "Error Rate", value: "0.02%", status: "normal" },
  ]

  const handleViewActivity = (activity: any) => {
    setSelectedActivity(activity)
  }

  const handleResolveActivity = (activityId: number) => {
    setActivities((prev) => prev.filter((a) => a.id !== activityId))
    setSelectedActivity(null)
    // Show success message
    alert("Activity resolved successfully!")
  }

  const handlePendingAction = (action: any) => {
    setSelectedAction(action)
  }

  const handleResolveAction = (actionId: number, itemIndex?: number) => {
    setPendingActions((prev: any) =>
      prev
        .map((action: any) => {
          if (action.id === actionId) {
            if (itemIndex !== undefined) {
              // Remove specific item from the action
              const newItems = action.items.filter((_: any, index: number) => index !== itemIndex)
              return { ...action, items: newItems, count: newItems.length }
            } else {
              // Mark entire action as resolved
              return { ...action, count: 0, items: [] }
            }
          }
          return action
        })
        .filter((action: any) => action.count > 0)
    )
  }

  const handleApproveStudio = (studioName: string) => {
    alert(`${studioName} has been approved!`)
    // Update the pending actions
    handleResolveAction(1, 0)
  }

  const handleRejectStudio = (studioName: string) => {
    alert(`${studioName} has been rejected.`)
    handleResolveAction(1, 0)
  }

  return (
    <div>
      <DashboardHeader title="Admin Dashboard" description="Platform overview and system administration" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      activity.status === "success"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : activity.status === "warning"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewActivity(activity)}
                    className="bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/50 rounded-lg backdrop-blur-sm"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleResolveActivity(activity.id)}
                    className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 rounded-lg backdrop-blur-sm"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Pending Actions</h3>
          <div className="space-y-4">
            {pendingActions.map((action) => (
              <div key={action.id} className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white font-medium">{action.title}</p>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        action.priority === "high"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : action.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {action.priority}
                    </span>
                    {action.priority === "high" && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{action.count} items</span>
                  <Button
                    size="sm"
                    onClick={() => handlePendingAction(action)}
                    className="bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-teal-400 hover:from-teal-500/30 hover:to-teal-600/30 border border-teal-500/30 rounded-lg backdrop-blur-sm"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-6">System Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric) => (
            <div
              key={metric.label}
              className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/30"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                  <p className="text-white text-xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${metric.status === "normal" ? "bg-green-500" : "bg-red-500"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Activity Details</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedActivity(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-white text-sm">{selectedActivity.message}</p>
              <p className="text-gray-400 text-xs">{selectedActivity.time}</p>
              <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                {Object.entries(selectedActivity.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400 text-sm capitalize">{key}:</span>
                    <span className="text-white text-sm">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => handleResolveActivity(selectedActivity.id)}
                className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
              >
                Resolve
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedActivity(null)}
                className="flex-1 bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/50"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Action Detail Modal */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedAction.title}</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedAction(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {selectedAction.items.map((item: any, index: number) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <div className="space-y-2 mb-3">
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400 text-sm capitalize">{key}:</span>
                        <span className="text-white text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                  {selectedAction.action === "verify-studios" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveStudio(item.name)}
                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleRejectStudio(item.name)}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {selectedAction.action !== "verify-studios" && (
                    <Button
                      size="sm"
                      onClick={() => handleResolveAction(selectedAction.id, index)}
                      className="bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 border border-teal-500/30"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => handleResolveAction(selectedAction.id)}
                className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
              >
                Resolve All
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedAction(null)}
                className="flex-1 bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/50"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

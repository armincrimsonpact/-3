"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, Clock, ImageIcon, Settings, LogOut, MessageSquare } from "lucide-react"

// Define navigation items in a way that's easy to modify
const navigationItems = [
  { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
  { href: "/dashboard/appointments", icon: <Calendar size={20} />, label: "Appointments" },
  { href: "/schedule", icon: <Clock size={20} />, label: "This week's schedule" },
  { href: "/dashboard/clients", icon: <Users size={20} />, label: "Clients" },
  { href: "/dashboard/my-portfolio", icon: <ImageIcon size={20} />, label: "My Artist Profile" },
  { href: "/messages", icon: <MessageSquare size={20} />, label: "Messages" },
  { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
]

export function DashboardSidebar({ title = "InkCircle", subtitle = "Artist Dashboard" }) {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-black border-r border-teal-500/20 flex flex-col h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-teal-500">{title}</h1>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white border-l-2 border-teal-500"
                    : "text-gray-400 hover:bg-black/50 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-teal-500" : ""}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-teal-500/20">
        <Link href="/login">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-black/50 hover:text-white w-full">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

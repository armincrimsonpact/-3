"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { getNavigationItems } from "./navigation-config"

interface SidebarProps {
  accountType: string
  subtitle?: string
  isCollapsed?: boolean
}

export function Sidebar({ accountType, subtitle, isCollapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const navigationItems = getNavigationItems(accountType)

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 h-fit sticky top-6">
      {/* Header */}
      {!isCollapsed && (
        <div className="pb-4 mb-4 border-b border-gray-800/50">
          <h1 className="text-lg font-bold text-white">InkCircle</h1>
          <p className="text-xs text-gray-400 mt-1">{subtitle || "Dashboard"}</p>
        </div>
      )}

      {/* Collapsed Header */}
      {isCollapsed && (
        <div className="pb-4 mb-4 border-b border-gray-800/50 text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">IC</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-1 mb-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${
                isCollapsed ? "justify-center px-2" : "space-x-3 px-3"
              } py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-teal-400 shadow-lg shadow-teal-500/10"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={18} />
              {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="pt-4 border-t border-gray-800/50">
        <Link
          href="/login"
          className={`flex items-center ${
            isCollapsed ? "justify-center px-2" : "space-x-3 px-3"
          } py-2.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={18} />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </Link>
      </div>
    </div>
  )
}

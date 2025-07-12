"use client"

import { useState } from "react"
import { Bell, Settings, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden mr-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={onMenuToggle}
          >
            <Menu size={24} />
          </button>

          <div className="relative max-w-xs w-full hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-teal focus:ring-1 focus:ring-teal sm:text-sm"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>

          <Link href="/dashboard/profile" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium text-white">
              TA
            </div>
            <div className="ml-2 hidden md:block">
              <div className="text-sm font-medium text-white">Tattoo Artist</div>
              <div className="text-xs text-gray-400">Premium</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Sidebar } from "@/components/dashboard/sidebar"
import { AccountProvider, useAccount } from "@/contexts/account-context"
import { Menu, X } from "lucide-react"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { accountType, accountTitle } = useAccount()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-black">
      <MainNav />

      <div className="pt-20 p-6">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-24 left-4 z-50 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors lg:hidden"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex gap-6 min-h-[calc(100vh-8rem)]">
          {/* Sidebar - Stylish and Compact */}
          <div
            className={`${
              sidebarOpen ? "w-64" : "w-0 lg:w-16"
            } flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden`}
          >
            <div className="w-64 lg:w-full">
              <Sidebar accountType={accountType} subtitle={accountTitle} isCollapsed={!sidebarOpen} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Desktop Toggle Button */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>

            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AccountProvider>
      <DashboardContent>{children}</DashboardContent>
    </AccountProvider>
  )
}

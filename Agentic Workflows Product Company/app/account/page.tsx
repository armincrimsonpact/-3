"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Settings, CreditCard, Bell, ShieldCheck, Palette, Clock, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

// Define the tabs for the account settings
const tabs = [
  { id: "profile", label: "Profile", icon: <Settings className="h-5 w-5" /> },
  { id: "billing", label: "Billing", icon: <CreditCard className="h-5 w-5" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
  { id: "privacy", label: "Privacy", icon: <ShieldCheck className="h-5 w-5" /> },
  { id: "preferences", label: "Preferences", icon: <Palette className="h-5 w-5" /> },
  { id: "history", label: "Appointment History", icon: <Clock className="h-5 w-5" /> },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    profileImage: "/diverse-person-profiles.png",
    joinDate: "May 2023",
    phone: "+1 (555) 123-4567",
    appointments: [
      { id: 1, date: "June 10, 2023", artist: "Maya Thompson", status: "Completed", type: "Full Sleeve" },
      { id: 2, date: "July 15, 2023", artist: "Daniel Kim", status: "Confirmed", type: "Back Piece" },
      { id: 3, date: "August 5, 2023", artist: "Maya Thompson", status: "Pending", type: "Touch-up" },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="bg-teal-500 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/home" className="text-2xl font-bold text-black hover:text-black/80 transition-colors">
            InkCircle
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 sticky top-8 transition-colors duration-300 hover:border-teal-500">
                  <div className="text-center mb-6">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-teal-500">
                      <Image
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                    <p className="text-gray-400 text-sm">Member since {user.joinDate}</p>
                  </div>

                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                          activeTab === tab.id
                            ? "bg-teal-500/20 text-teal-500 font-medium"
                            : "text-gray-400 hover:text-white hover:bg-[#222]"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      animation="ripple"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="md:col-span-3">
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
                  {activeTab === "profile" && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>

                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue={user.phone}
                            className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                          <textarea
                            className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none h-32 transition-all"
                            placeholder="Tell artists a bit about yourself..."
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-3">Profile Photo</label>
                          <div className="flex items-center">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                              <Image
                                src={user.profileImage || "/placeholder.svg"}
                                alt={user.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              size="sm"
                              className="bg-transparent text-white border border-white hover:bg-white hover:text-black"
                              animation="ripple"
                            >
                              Change Photo
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            className="bg-teal-500 text-black border border-teal-500 hover:bg-teal-600 hover:border-teal-600"
                            animation="ripple"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "billing" && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Billing Information</h2>

                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-white mb-4">Payment Methods</h3>
                        <div className="bg-black border border-gray-800 rounded-lg p-4 mb-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded mr-4">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-white font-medium">•••• •••• •••• 4242</div>
                              <div className="text-gray-400 text-sm">Expires 12/24</div>
                            </div>
                          </div>
                          <div className="text-sm text-teal-500">Default</div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-transparent text-white border border-white hover:bg-white hover:text-black"
                          animation="ripple"
                        >
                          Add Payment Method
                        </Button>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white mb-4">Billing History</h3>
                        <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
                                <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
                                <th className="text-right py-3 px-4 text-gray-400 font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-4 text-white">May 15, 2023</td>
                                <td className="py-3 px-4 text-white">Appointment Booking - Maya Thompson</td>
                                <td className="py-3 px-4 text-white text-right">$150.00</td>
                                <td className="py-3 px-4 text-right">
                                  <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-4 text-white">Apr 3, 2023</td>
                                <td className="py-3 px-4 text-white">Appointment Booking - Daniel Kim</td>
                                <td className="py-3 px-4 text-white text-right">$200.00</td>
                                <td className="py-3 px-4 text-right">
                                  <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4 text-white">Mar 22, 2023</td>
                                <td className="py-3 px-4 text-white">Appointment Deposit - Maya Thompson</td>
                                <td className="py-3 px-4 text-white text-right">$50.00</td>
                                <td className="py-3 px-4 text-right">
                                  <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "history" && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Appointment History</h2>

                      <div className="space-y-4">
                        {user.appointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="bg-black border border-gray-800 rounded-lg p-4 transition-colors duration-300 hover:border-teal-500"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-lg font-medium text-white">{appointment.type}</h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  appointment.status === "Completed"
                                    ? "bg-green-500/20 text-green-500"
                                    : appointment.status === "Confirmed"
                                      ? "bg-blue-500/20 text-blue-500"
                                      : "bg-yellow-500/20 text-yellow-500"
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </div>
                            <div className="text-gray-400 mb-4">
                              <div>Artist: {appointment.artist}</div>
                              <div>Date: {appointment.date}</div>
                            </div>
                            <div className="flex justify-end space-x-3">
                              <Button variant="outline" size="sm" animation="shimmer">
                                Details
                              </Button>
                              {appointment.status !== "Completed" && (
                                <Button size="sm" animation="ripple">
                                  Reschedule
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-white mb-3">Email Notifications</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-gray-300">Appointment Reminders</label>
                              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-[#333]">
                                <input type="checkbox" className="absolute w-0 h-0 opacity-0" defaultChecked />
                                <span className="absolute left-1 top-1 bg-teal-500 w-4 h-4 transition-transform duration-200 transform translate-x-6 rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-gray-300">Artist Messages</label>
                              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-[#333]">
                                <input type="checkbox" className="absolute w-0 h-0 opacity-0" defaultChecked />
                                <span className="absolute left-1 top-1 bg-teal-500 w-4 h-4 transition-transform duration-200 transform translate-x-6 rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-gray-300">Promotions and News</label>
                              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-[#333]">
                                <input type="checkbox" className="absolute w-0 h-0 opacity-0" />
                                <span className="absolute left-1 top-1 bg-white w-4 h-4 transition-transform duration-200 transform translate-x-0 rounded-full"></span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-white mb-3">SMS Notifications</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-gray-300">Appointment Reminders</label>
                              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-[#333]">
                                <input type="checkbox" className="absolute w-0 h-0 opacity-0" defaultChecked />
                                <span className="absolute left-1 top-1 bg-teal-500 w-4 h-4 transition-transform duration-200 transform translate-x-6 rounded-full"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-gray-300">Status Updates</label>
                              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-[#333]">
                                <input type="checkbox" className="absolute w-0 h-0 opacity-0" />
                                <span className="absolute left-1 top-1 bg-white w-4 h-4 transition-transform duration-200 transform translate-x-0 rounded-full"></span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button animation="ripple">Save Preferences</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 border-t border-gray-800">
        <p>© {new Date().getFullYear()} InkCircle. All rights reserved.</p>
      </footer>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function StudioSettingsPage() {
  const [studioName, setStudioName] = useState("InkCircle NYC")
  const [studioEmail, setStudioEmail] = useState("info@inkcircle.com")
  const [studioPhone, setStudioPhone] = useState("+1 (555) 123-4567")
  const [studioAddress, setStudioAddress] = useState("123 Main St, New York, NY")
  const [studioDescription, setStudioDescription] = useState(
    "InkCircle is a premier tattoo studio in NYC, offering custom designs and exceptional service.",
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Settings saved!")
  }

  return (
    <div>
      <DashboardHeader title="Studio Settings" description="Manage your studio profile and settings" />

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Studio Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Studio Name</label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={studioEmail}
                onChange={(e) => setStudioEmail(e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={studioPhone}
                onChange={(e) => setStudioPhone(e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <input
                type="text"
                value={studioAddress}
                onChange={(e) => setStudioAddress(e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={studioDescription}
                onChange={(e) => setStudioDescription(e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

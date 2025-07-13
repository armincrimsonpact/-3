"use client"

import { useState } from "react"
import { User, Bell, Shield, CreditCard, Palette, Clock, Save } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtistSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Professional tattoo artist specializing in traditional and Japanese styles. 10+ years of experience creating unique artwork.",
    studio: "Ink Masters Studio",
    location: "Downtown, NYC",
    specialties: ["Traditional", "Japanese", "Neo-Traditional"],
    hourlyRate: 150,
    experience: "10+ years",
    certifications: ["Bloodborne Pathogen Certified", "First Aid Certified"],
    workingHours: {
      monday: { start: "10:00", end: "18:00", available: true },
      tuesday: { start: "10:00", end: "18:00", available: true },
      wednesday: { start: "10:00", end: "18:00", available: true },
      thursday: { start: "10:00", end: "18:00", available: true },
      friday: { start: "10:00", end: "18:00", available: true },
      saturday: { start: "12:00", end: "20:00", available: true },
      sunday: { start: "", end: "", available: false },
    },
    notifications: {
      newBookings: true,
      reminders: true,
      messages: true,
      reviews: true,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      portfolioPublic: true,
      showRates: true,
      showReviews: true,
    },
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "professional", label: "Professional", icon: Palette },
    { id: "schedule", label: "Schedule", icon: Clock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  const specialtyOptions = [
    "Traditional",
    "Realism",
    "Watercolor",
    "Japanese",
    "Geometric",
    "Fine Line",
    "Neo-Traditional",
    "Blackwork",
    "Portrait",
    "Abstract",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleWorkingHoursChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects removed for pure black background */}

      <div className="relative z-10 p-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
              Settings
            </h1>
            <p className="text-gray-400">Manage your artist profile and preferences</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <ScrollReveal delay={0.1}>
            <Card className="bg-gray-900/30 border border-teal-500/20">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-teal-500/20 text-teal-400 border-r-2 border-teal-500"
                          : "text-gray-300 hover:bg-gray-800/50"
                      }`}
                    >
                      <tab.icon size={20} />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.2}>
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <Card className="bg-gray-900/30 border border-teal-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="text-gray-400" size={32} />
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors">
                          Change Photo
                        </button>
                        <p className="text-sm text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        placeholder="Tell clients about yourself and your artistic style..."
                      />
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                      <Save size={20} />
                      Save Changes
                    </button>
                  </CardContent>
                </Card>
              )}

              {activeTab === "professional" && (
                <Card className="bg-gray-900/30 border border-teal-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Studio</label>
                      <input
                        type="text"
                        value={formData.studio}
                        onChange={(e) => handleInputChange("studio", e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Specialties</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {specialtyOptions.map((specialty) => (
                          <label key={specialty} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.specialties.includes(specialty)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleInputChange("specialties", [...formData.specialties, specialty])
                                } else {
                                  handleInputChange(
                                    "specialties",
                                    formData.specialties.filter((s) => s !== specialty),
                                  )
                                }
                              }}
                              className="rounded border-teal-500/20 bg-gray-800/50 text-teal-500 focus:ring-teal-500/50"
                            />
                            <span className="text-gray-300 text-sm">{specialty}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Hourly Rate ($)</label>
                        <input
                          type="number"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", Number.parseInt(e.target.value))}
                          className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
                        <select
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        >
                          <option value="1-2 years">1-2 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                      <Save size={20} />
                      Save Changes
                    </button>
                  </CardContent>
                </Card>
              )}

              {activeTab === "schedule" && (
                <Card className="bg-gray-900/30 border border-teal-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Working Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(formData.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg">
                        <div className="w-24">
                          <span className="text-white font-medium capitalize">{day}</span>
                        </div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={hours.available}
                            onChange={(e) => handleWorkingHoursChange(day, "available", e.target.checked)}
                            className="rounded border-teal-500/20 bg-gray-800/50 text-teal-500 focus:ring-teal-500/50"
                          />
                          <span className="text-gray-300">Available</span>
                        </label>
                        {hours.available && (
                          <>
                            <input
                              type="time"
                              value={hours.start}
                              onChange={(e) => handleWorkingHoursChange(day, "start", e.target.value)}
                              className="p-2 bg-gray-800/50 border border-teal-500/20 rounded text-white focus:outline-none focus:border-teal-500/50"
                            />
                            <span className="text-gray-400">to</span>
                            <input
                              type="time"
                              value={hours.end}
                              onChange={(e) => handleWorkingHoursChange(day, "end", e.target.value)}
                              className="p-2 bg-gray-800/50 border border-teal-500/20 rounded text-white focus:outline-none focus:border-teal-500/50"
                            />
                          </>
                        )}
                      </div>
                    ))}
                    <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                      <Save size={20} />
                      Save Schedule
                    </button>
                  </CardContent>
                </Card>
              )}

              {/* Add other tabs content similar to client settings but artist-specific */}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

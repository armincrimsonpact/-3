"use client"

import { useState, useEffect } from "react"
import { User, Bell, Shield, CreditCard, Save, Check, AlertCircle } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalConditions: "",
    allergies: "",
    notifications: {
      appointments: true,
      reminders: true,
      promotions: false,
      newsletter: true,
    },
    privacy: {
      profileVisible: true,
      showReviews: true,
      allowMessages: true,
    },
    preferences: {
      preferredStyles: [],
      budgetRange: [100, 500],
      travelDistance: 25,
    },
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  const tattooStyles = [
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

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    setLoading(true)
    try {
      // Load from localStorage or API
      const savedData = localStorage.getItem("clientSettings")
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setFormData({ ...formData, ...parsed })
      } else {
        // Set default/mock data
        setFormData({
          ...formData,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          city: "New York",
          state: "NY",
        })
      }
    } catch (error) {
      console.error("Failed to load user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
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

  const handleArrayChange = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: checked
          ? [...prev.preferences[field], value]
          : prev.preferences[field].filter((item) => item !== value),
      },
    }))
  }

  const saveSettings = async () => {
    if (!validateForm()) {
      setSaveStatus("error")
      return
    }

    setLoading(true)
    setSaveStatus("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save to localStorage
      localStorage.setItem("clientSettings", JSON.stringify(formData))

      setSaveStatus("success")
      setTimeout(() => setSaveStatus(""), 3000)
    } catch (error) {
      console.error("Failed to save settings:", error)
      setSaveStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm("Are you sure you want to reset all settings to default values?")) {
      localStorage.removeItem("clientSettings")
      loadUserData()
      setSaveStatus("reset")
      setTimeout(() => setSaveStatus(""), 3000)
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(formData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "my-inkcircle-data.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const deleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.",
      )
    ) {
      if (confirm("This is your final warning. Are you absolutely sure?")) {
        // In a real app, this would call an API
        localStorage.clear()
        alert("Account deleted successfully. You will be redirected to the home page.")
        window.location.href = "/"
      }
    }
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
            <p className="text-gray-400">Manage your account preferences and settings</p>
          </div>
        </ScrollReveal>

        {/* Save Status */}
        {saveStatus && (
          <div
            className={`mb-6 p-4 rounded-lg border flex items-center gap-2 ${
              saveStatus === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : saveStatus === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-400"
            }`}
          >
            {saveStatus === "success" ? (
              <Check size={20} />
            ) : saveStatus === "error" ? (
              <AlertCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {saveStatus === "success" && "Settings saved successfully!"}
            {saveStatus === "error" && "Failed to save settings. Please check your input and try again."}
            {saveStatus === "reset" && "Settings reset to default values."}
          </div>
        )}

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
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={`w-full p-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.firstName ? "border-red-500/50" : "border-teal-500/20 focus:border-teal-500/50"
                          }`}
                        />
                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={`w-full p-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.lastName ? "border-red-500/50" : "border-teal-500/20 focus:border-teal-500/50"
                          }`}
                        />
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full p-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none transition-colors ${
                          errors.email ? "border-red-500/50" : "border-teal-500/20 focus:border-teal-500/50"
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full p-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none transition-colors ${
                          errors.phone ? "border-red-500/50" : "border-teal-500/20 focus:border-teal-500/50"
                        }`}
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Zip Code</label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Tattoo Styles</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {tattooStyles.map((style) => (
                          <label key={style} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.preferences.preferredStyles.includes(style)}
                              onChange={(e) => handleArrayChange("preferredStyles", style, e.target.checked)}
                              className="rounded border-teal-500/20 bg-gray-800/50 text-teal-500 focus:ring-teal-500/50"
                            />
                            <span className="text-gray-300 text-sm">{style}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={saveSettings}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Save size={20} />
                        )}
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={resetToDefaults}
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card className="bg-gray-900/30 border border-teal-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(formData.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                        <div>
                          <h3 className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
                          <p className="text-gray-400 text-sm">
                            {key === "appointments" && "Get notified about upcoming appointments"}
                            {key === "reminders" && "Receive appointment and aftercare reminders"}
                            {key === "promotions" && "Receive special offers and promotions"}
                            {key === "newsletter" && "Stay updated with InkCircle news"}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNestedChange("notifications", key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                        </label>
                      </div>
                    ))}
                    <button
                      onClick={saveSettings}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
                    >
                      <Save size={20} />
                      Save Preferences
                    </button>
                  </CardContent>
                </Card>
              )}

              {activeTab === "privacy" && (
                <Card className="bg-gray-900/30 border border-teal-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(formData.privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                        <div>
                          <h3 className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
                          <p className="text-gray-400 text-sm">
                            {key === "profileVisible" && "Make your profile visible to artists"}
                            {key === "showReviews" && "Display your reviews publicly"}
                            {key === "allowMessages" && "Allow artists to message you directly"}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNestedChange("privacy", key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                        </label>
                      </div>
                    ))}

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-white font-medium mb-4">Data Management</h3>
                      <div className="space-y-3">
                        <button
                          onClick={exportData}
                          className="w-full px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-left"
                        >
                          Export My Data
                        </button>
                        <button
                          onClick={deleteAccount}
                          className="w-full px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-left"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={saveSettings}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
                    >
                      <Save size={20} />
                      Save Privacy Settings
                    </button>
                  </CardContent>
                </Card>
              )}

              {activeTab === "billing" && (
                <Card className="bg-gray-900/30 border border-teal-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Billing & Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-400">
                        Payment methods and billing history will be available in the full version of the app.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white font-medium">Payment Methods</h3>
                      <div className="p-4 bg-gray-800/30 rounded-lg">
                        <p className="text-gray-400">No payment methods added yet.</p>
                        <button className="mt-2 px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors">
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white font-medium">Billing History</h3>
                      <div className="p-4 bg-gray-800/30 rounded-lg">
                        <p className="text-gray-400">No billing history available.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

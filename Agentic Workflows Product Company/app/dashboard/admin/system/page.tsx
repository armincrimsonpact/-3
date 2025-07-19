"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function AdminSystemPage() {
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    maxUploadSize: "100MB",
    apiRateLimit: "1000 requests/hour",
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
    },
  })

  const handleSettingChange = (setting: string, value: any) => {
    setSystemSettings((prev) => ({ ...prev, [setting]: value }))
  }

  return (
    <div>
      <DashboardHeader title="System Settings" description="Configure platform settings and maintenance options" />

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">System Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Maintenance Mode</label>
            <select
              value={systemSettings.maintenanceMode.toString()}
              onChange={(e) => handleSettingChange("maintenanceMode", e.target.value === "true")}
              className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            >
              <option value="false">Disabled</option>
              <option value="true">Enabled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Max Upload Size</label>
            <input
              type="text"
              value={systemSettings.maxUploadSize}
              onChange={(e) => handleSettingChange("maxUploadSize", e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">API Rate Limit</label>
            <input
              type="text"
              value={systemSettings.apiRateLimit}
              onChange={(e) => handleSettingChange("apiRateLimit", e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Notifications</label>
            <select
              value={systemSettings.notificationSettings.emailNotifications.toString()}
              onChange={(e) =>
                handleSettingChange("notificationSettings", {
                  ...systemSettings.notificationSettings,
                  emailNotifications: e.target.value === "true",
                })
              }
              className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            >
              <option value="false">Disabled</option>
              <option value="true">Enabled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">SMS Notifications</label>
            <select
              value={systemSettings.notificationSettings.smsNotifications.toString()}
              onChange={(e) =>
                handleSettingChange("notificationSettings", {
                  ...systemSettings.notificationSettings,
                  smsNotifications: e.target.value === "true",
                })
              }
              className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            >
              <option value="false">Disabled</option>
              <option value="true">Enabled</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

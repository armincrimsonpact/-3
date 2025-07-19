"use client"

import { BarChart, LineChart, PieChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function AdminAnalyticsPage() {
  const userData = [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1350 },
    { month: "Mar", users: 1500 },
    { month: "Apr", users: 1650 },
    { month: "May", users: 1800 },
    { month: "Jun", users: 2000 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 25000 },
    { month: "Feb", revenue: 28000 },
    { month: "Mar", revenue: 32000 },
    { month: "Apr", revenue: 35000 },
    { month: "May", revenue: 38000 },
    { month: "Jun", revenue: 42000 },
  ]

  const platformData = [
    { category: "Artists", percentage: 45 },
    { category: "Studios", percentage: 30 },
    { category: "Clients", percentage: 25 },
  ]

  return (
    <div>
      <DashboardHeader title="Platform Analytics" description="Track key metrics and platform performance" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* User Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              {/* Placeholder for Line Chart */}
              <LineChart className="w-full h-full text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              {/* Placeholder for Bar Chart */}
              <BarChart className="w-full h-full text-green-400" />
            </div>
          </CardContent>
        </Card>

        {/* Platform Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Platform Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              {/* Placeholder for Pie Chart */}
              <PieChart className="w-32 h-32 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">User Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Month
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Users
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((item) => (
                    <tr key={item.month} className="bg-gray-800 border-b border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-white whitespace-nowrap">
                        {item.month}
                      </th>
                      <td className="py-4 px-6">{item.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Month
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.map((item) => (
                    <tr key={item.month} className="bg-gray-800 border-b border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-white whitespace-nowrap">
                        {item.month}
                      </th>
                      <td className="py-4 px-6">{item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { BarChart, LineChart, PieChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function StudioAnalyticsPage() {
  const revenueData = [
    { month: "Jan", revenue: 2500 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 4100 },
    { month: "Apr", revenue: 3800 },
    { month: "May", revenue: 4500 },
    { month: "Jun", revenue: 5200 },
  ]

  const bookingData = [
    { day: "Mon", bookings: 15 },
    { day: "Tue", bookings: 18 },
    { day: "Wed", bookings: 22 },
    { day: "Thu", bookings: 20 },
    { day: "Fri", bookings: 25 },
    { day: "Sat", bookings: 30 },
    { day: "Sun", bookings: 28 },
  ]

  const serviceData = [
    { service: "Traditional", percentage: 35 },
    { service: "Realism", percentage: 28 },
    { service: "Watercolor", percentage: 22 },
    { service: "Geometric", percentage: 15 },
  ]

  return (
    <div>
      <DashboardHeader title="Studio Analytics" description="Track your studio performance and business metrics" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              {/* Placeholder for Line Chart */}
              <LineChart className="w-full h-full text-teal-400" />
            </div>
          </CardContent>
        </Card>

        {/* Booking Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Bookings per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              {/* Placeholder for Bar Chart */}
              <BarChart className="w-full h-full text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Service Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Popular Services</CardTitle>
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

        {/* Booking Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Booking Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Day
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Bookings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData.map((item) => (
                    <tr key={item.day} className="bg-gray-800 border-b border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-white whitespace-nowrap">
                        {item.day}
                      </th>
                      <td className="py-4 px-6">{item.bookings}</td>
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

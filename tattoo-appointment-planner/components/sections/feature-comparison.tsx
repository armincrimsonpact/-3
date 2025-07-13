"use client"

import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

export function FeatureComparison() {
  const features = [
    { name: "Client Management", free: "Limited", base: true, pro: true },
    { name: "Appointment Scheduling", free: "Basic", base: "Advanced", pro: "Complete" },
    { name: "Digital Portfolio", free: "5 images", base: "Unlimited", pro: "Unlimited" },
    { name: "Payment Processing", free: false, base: true, pro: true },
    { name: "Client Messaging", free: false, base: true, pro: true },
    { name: "Custom Booking Page", free: false, base: true, pro: true },
    { name: "Multiple Artists", free: false, base: false, pro: true },
    { name: "Staff Scheduling", free: false, base: false, pro: true },
    { name: "Inventory Management", free: false, base: false, pro: true },
    { name: "Advanced Analytics", free: false, base: false, pro: true },
    { name: "Custom Branding", free: false, base: false, pro: true },
    { name: "Priority Support", free: false, base: true, pro: true },
  ]

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-transparent rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-transparent rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16 relative z-10">InkCircle vs. Traditional Booking</h2>
        
        <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden relative z-10">
          <div className="p-6 border-b border-primary/20">
            <h3 className="text-xl font-bold text-textSecondary">All Features Compared</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left p-4 text-textSecondary">Feature</th>
                  <th className="text-center p-4 text-textSecondary">Starter</th>
                  <th className="text-center p-4 text-textSecondary">For Artist</th>
                  <th className="text-center p-4 text-textSecondary">For Studios</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-primary/10">
                    <td className="p-4 text-textPrimary">{feature.name}</td>
                    <td className="p-4 text-center">
                      {feature.free === true ? (
                        <Check className="h-5 w-5 text-gray-500 mx-auto" />
                      ) : feature.free === false ? (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      ) : (
                        <span className="text-gray-500 text-sm">{feature.free}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {feature.base === true ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : feature.base === false ? (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      ) : (
                        <span className="text-primary text-sm">{feature.base}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {feature.pro === true ? (
                        <Check className="h-5 w-5 text-ultra mx-auto" />
                      ) : feature.pro === false ? (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      ) : (
                        <span className="text-ultra text-sm">{feature.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

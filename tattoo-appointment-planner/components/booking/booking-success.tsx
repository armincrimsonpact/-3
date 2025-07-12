"use client"

import { motion } from "framer-motion"
import { CheckCircle, Calendar, Mail, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function BookingSuccess() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex justify-center"
      >
        <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-teal-500" />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-white mb-3">Booking Request Submitted!</h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Thank you for your booking request. We've received your information and will contact you within 24-48 hours.
        </p>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50 max-w-lg mx-auto"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
          <Calendar className="w-5 h-5 mr-2 text-teal-500" />
          What happens next?
        </h3>
        <ul className="text-gray-300 text-sm space-y-3 text-left">
          <li className="flex items-start">
            <span className="text-teal-500 mr-2">1.</span>
            Our team will review your booking request and check artist availability
          </li>
          <li className="flex items-start">
            <span className="text-teal-500 mr-2">2.</span>
            You'll receive a confirmation email with appointment details
          </li>
          <li className="flex items-start">
            <span className="text-teal-500 mr-2">3.</span>
            We may contact you if we need any additional information
          </li>
          <li className="flex items-start">
            <span className="text-teal-500 mr-2">4.</span>
            A deposit may be required to secure your appointment slot
          </li>
        </ul>
      </motion.div>

      {/* Email Reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center text-gray-400 text-sm"
      >
        <Mail className="w-4 h-4 mr-2" />
        <span>Check your email for booking confirmation</span>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-teal-500 text-black rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center font-medium"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Footer } from "@/components/layout/footer"
import { MainNav } from "@/components/layout/main-nav"
import { StepFiveForm } from "@/components/booking/step-five-form"
import { BookingSuccess } from "@/components/booking/booking-success"

export default function TestBookingStep5Page() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
      <MainNav />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center pt-24 pb-12 px-4"
      >
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight text-center">
          Test: Step 5 - <span className="text-teal-400">Checkbox Fix Demo</span>
        </h1>
        
        <p className="text-gray-400 mb-10 text-center max-w-xl">
          This is a test page to demonstrate the checkbox clickability fix and submit button functionality.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative w-full max-w-4xl mx-auto mt-8 mb-8"
        >
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full shadow-lg relative">
            {isSubmitted ? (
              <BookingSuccess />
            ) : (
              <StepFiveForm onSubmit={handleSubmit} />
            )}
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

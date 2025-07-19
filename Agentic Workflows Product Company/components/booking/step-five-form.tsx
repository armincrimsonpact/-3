"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, CheckCircle, AlertCircle, User, Mail, Palette } from "lucide-react"
import { SecureStorage } from "@/lib/secure-storage"

interface StepFiveData {
  specialRequests: string
  communicationPreferences: string
  agreedToTerms: boolean
  agreedToPrivacy: boolean
}

interface StepFiveFormProps {
  onSubmit: () => void
  onBack?: () => void
}

export function StepFiveForm({ onSubmit, onBack }: StepFiveFormProps) {
  const [specialRequests, setSpecialRequests] = useState("")
  const [communicationPreferences, setCommunicationPreferences] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)

  // Load saved data on mount
  useEffect(() => {
    const data = SecureStorage.getItem<StepFiveData>("booking-step-five")
    if (data) {
      setSpecialRequests(data.specialRequests || "")
      setCommunicationPreferences(data.communicationPreferences || "")
      setAgreedToTerms(data.agreedToTerms || false)
      setAgreedToPrivacy(data.agreedToPrivacy || false)
    }
  }, [])

  // Save data whenever form values change
  useEffect(() => {
    const dataToSave: StepFiveData = {
      specialRequests,
      communicationPreferences,
      agreedToTerms,
      agreedToPrivacy,
    }
    SecureStorage.setItem("booking-step-five", dataToSave)
  }, [specialRequests, communicationPreferences, agreedToTerms, agreedToPrivacy])

  // Get saved data from previous steps for summary
  const stepOneData = SecureStorage.getItem<any>(`booking-step-one`) || {}
  const stepTwoData = SecureStorage.getItem<any>(`booking-step-two`) || {}
  const stepThreeData = SecureStorage.getItem<any>(`booking-step-three`) || {}

  // Form validation
  const isFormValid = agreedToTerms && agreedToPrivacy

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Final Details & Confirmation</h2>
        <p className="text-gray-400 text-sm">
          Review your information and schedule your appointment. We'll contact you to confirm the details.
        </p>
      </div>

      {/* Booking Summary */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Booking Summary</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-3">
              <h4 className="text-teal-400 font-medium flex items-center mb-3">
                <User className="w-4 h-4 mr-2" />
                Personal Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">
                    {stepTwoData.firstName} {stepTwoData.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{stepTwoData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white">{stepTwoData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact Method:</span>
                  <span className="text-white">{stepTwoData.contactMethod}</span>
                </div>
              </div>
            </div>

            {/* Tattoo Details */}
            <div className="space-y-3">
              <h4 className="text-teal-400 font-medium flex items-center mb-3">
                <Palette className="w-4 h-4 mr-2" />
                Tattoo Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Style:</span>
                  <span className="text-white capitalize">{stepThreeData.tattooStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white capitalize">{stepThreeData.tattooSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Placement:</span>
                  <span className="text-white capitalize">{stepThreeData.placement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget:</span>
                  <span className="text-white">{stepThreeData.budget}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Type */}
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Appointment Type:</span>
              <span className="text-white font-medium">{stepOneData.appointmentType}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Information */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Final Details</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-teal-500" />
              Special Requests or Requirements
            </label>
            <textarea
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-4 rounded-md min-h-[100px] focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Any special requests, accessibility needs, or other requirements..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal-500" />
              Communication Preferences
            </label>
            <textarea
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-4 rounded-md min-h-[80px] focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="How would you prefer to receive updates about your appointment? Any specific communication preferences..."
              value={communicationPreferences}
              onChange={(e) => setCommunicationPreferences(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      {/* Terms and Conditions */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Terms & Conditions</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-teal-500 bg-[#0d1520] border-gray-700 rounded focus:ring-teal-500 focus:ring-2 cursor-pointer"
              required
            />
            <span className="text-white text-sm select-none">
              I agree to the{" "}
              <a href="/terms" className="text-teal-400 hover:text-teal-300 underline" onClick={(e) => e.stopPropagation()}>
                Terms and Conditions
              </a>{" "}
              and understand the booking policies. <span className="text-red-500">*</span>
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              id="privacy"
              checked={agreedToPrivacy}
              onChange={(e) => setAgreedToPrivacy(e.target.checked)}
              className="mt-1 w-5 h-5 text-teal-500 bg-[#0d1520] border-gray-700 rounded focus:ring-teal-500 focus:ring-2 cursor-pointer"
              required
            />
            <span className="text-white text-sm select-none">
              I agree to the{" "}
              <a href="/privacy" className="text-teal-400 hover:text-teal-300 underline" onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>{" "}
              and consent to the processing of my personal data. <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </motion.div>

      {/* Important Notice */}
      <motion.div variants={itemVariants}>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
          <h4 className="text-amber-400 font-medium mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Important Notice
          </h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• This is a booking request, not a confirmed appointment</li>
            <li>• We will contact you within 24-48 hours to confirm availability</li>
            <li>• A deposit may be required to secure your appointment</li>
            <li>• Please arrive 15 minutes early for your appointment</li>
            <li>• Cancellations must be made at least 24 hours in advance</li>
          </ul>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div variants={itemVariants} className="flex justify-between pt-6 border-t border-gray-700/50">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`px-6 py-3 rounded-md transition-colors flex items-center ${
            isFormValid ? "bg-teal-500 text-black hover:bg-teal-600" : "bg-gray-600 text-gray-400 cursor-not-allowed"
          } ${!onBack ? "ml-auto" : ""}`}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Submit Booking Request
        </button>
      </motion.div>
    </motion.div>
  )
}

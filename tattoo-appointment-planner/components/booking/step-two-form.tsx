"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Check, ChevronDown, Mail, Phone, User } from "lucide-react"
import { format } from "date-fns"
import { DateBirthCalendar } from "@/components/ui/date-birth-calendar"

interface StepTwoData {
  firstName: string
  lastName: string
  pronouns: string
  dateOfBirth: string | null
  phone: string
  email: string
  confirmEmail: string
  contactMethod: string | null
  instagramAccount: string
  accessibilityNotes: string
}

interface StepTwoFormProps {
  onNext: () => void
  onBack?: () => void
}

export function StepTwoForm({ onNext, onBack }: StepTwoFormProps) {
  // Personal information
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [pronouns, setPronouns] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [contactMethod, setContactMethod] = useState<string | null>(null)
  const [instagramAccount, setInstagramAccount] = useState("")
  const [accessibilityNotes, setAccessibilityNotes] = useState("")

  // Age verification
  const [ageError, setAgeError] = useState<string | null>(null)
  const [isValidAge, setIsValidAge] = useState(false)

  // Modal and dropdown states
  const [contactMethodOpen, setContactMethodOpen] = useState(false)
  const [pronounsOpen, setPronounsOpen] = useState(false)
  const [customPronouns, setCustomPronouns] = useState("")

  // Function to calculate age
  const calculateAge = (birthDate: Date): number => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  // Use useEffect to verify age when dateOfBirth changes
  useEffect(() => {
    if (dateOfBirth) {
      const age = calculateAge(dateOfBirth)
      if (age < 18) {
        setAgeError("Looks like you're under 18—please double-check your birth year.")
        setIsValidAge(false)
      } else {
        setAgeError(null)
        setIsValidAge(true)
      }
    } else {
      setAgeError(null)
      setIsValidAge(false)
    }
  }, [dateOfBirth])

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("booking-step-two")
    if (savedData) {
      try {
        const data: StepTwoData = JSON.parse(savedData)
        setFirstName(data.firstName || "")
        setLastName(data.lastName || "")
        setPronouns(data.pronouns || "")
        setDateOfBirth(data.dateOfBirth ? new Date(data.dateOfBirth) : null)
        setPhone(data.phone || "")
        setEmail(data.email || "")
        setConfirmEmail(data.confirmEmail || "")
        setContactMethod(data.contactMethod || null)
        setInstagramAccount(data.instagramAccount || "")
        setAccessibilityNotes(data.accessibilityNotes || "")
      } catch (error) {
        console.error("Error loading saved step two data:", error)
      }
    }
  }, [])

  // Save data whenever form values change
  useEffect(() => {
    const dataToSave: StepTwoData = {
      firstName,
      lastName,
      pronouns,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
      phone,
      email,
      confirmEmail,
      contactMethod,
      instagramAccount,
      accessibilityNotes,
    }
    localStorage.setItem("booking-step-two", JSON.stringify(dataToSave))
  }, [
    firstName,
    lastName,
    pronouns,
    dateOfBirth,
    phone,
    email,
    confirmEmail,
    contactMethod,
    instagramAccount,
    accessibilityNotes,
  ])

  // Email validation
  const emailsMatch = email === confirmEmail
  const emailError = email && confirmEmail && !emailsMatch ? "Email addresses do not match" : ""

  // Form validation
  const isFormValid =
    firstName && lastName && email && confirmEmail && emailsMatch && phone && dateOfBirth && isValidAge && contactMethod

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

  // Dropdown options
  const contactMethodOptions = ["Email", "Phone", "Text Message"]
  const pronounsOptions = ["He/Him", "She/Her", "They/Them", "Other"]

  const handleCustomPronouns = (value: string) => {
    setCustomPronouns(value)
    setPronouns(value)
  }

  const handleNextClick = () => {
    if (isFormValid) {
      onNext()
    }
  }

  const handleBackClick = () => {
    if (onBack) {
      onBack()
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-gray-400 text-sm">Please provide your personal details for the appointment booking.</p>
      </div>

      {/* Personal Information Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Contact Details</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Legal Name */}
          <motion.div variants={itemVariants}>
            <label className="block text-white font-medium mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-teal-500" />
              Legal First Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your legal first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-white font-medium mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-teal-500" />
              Legal Last Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your legal last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </motion.div>

          {/* Pronouns */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-white font-medium mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-teal-500" />
              Pronouns
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPronounsOpen(!pronounsOpen)}
                className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all flex justify-between items-center"
              >
                <span className={pronouns ? "text-white" : "text-gray-500"}>{pronouns || "Select your pronouns"}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${pronounsOpen ? "transform rotate-180" : ""}`} />
              </button>
              {pronounsOpen && (
                <div className="absolute z-50 mt-1 w-full bg-[#0d1520] border border-gray-700 rounded-md shadow-lg">
                  <ul className="py-1">
                    {pronounsOptions.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          className={`w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center ${
                            pronouns === option ? "text-teal-500" : "text-white"
                          }`}
                          onClick={() => {
                            if (option === "Other") {
                              setPronouns(customPronouns || "Other")
                            } else {
                              setPronouns(option)
                              setPronounsOpen(false)
                            }
                          }}
                        >
                          {pronouns === option && <Check className="w-4 h-4 mr-2" />}
                          {option}
                        </button>
                      </li>
                    ))}
                    <li className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Enter custom pronouns"
                        className="w-full bg-[#0d1520] border border-gray-700 text-white p-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={customPronouns}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleCustomPronouns(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && customPronouns) {
                            setPronounsOpen(false)
                          }
                        }}
                      />
                    </li>
                    {customPronouns && (
                      <li className="px-4 py-2 flex justify-end">
                        <button
                          type="button"
                          className="px-3 py-1 bg-teal-500 text-black rounded-md text-sm"
                          onClick={() => {
                            setPronouns(customPronouns)
                            setPronounsOpen(false)
                          }}
                        >
                          Confirm
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Date of Birth */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-teal-500" />
                <label className="text-white font-medium">
                  Date of Birth <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
              {ageError && <p className="text-sm text-red-500 font-medium">{ageError}</p>}

              <DateBirthCalendar selectedDate={dateOfBirth} onSelectDate={setDateOfBirth} />

              {dateOfBirth && (
                <div className="mt-4 p-3 bg-gray-700/50 rounded-md">
                  <div className="text-teal-500 text-sm font-medium">
                    Selected: {format(dateOfBirth, "EEEE, MMMM d, yyyy")}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <label className="block text-white font-medium mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2 text-teal-500" />
              Primary Phone <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-white font-medium mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal-500" />
              Email Address <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-white font-medium mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal-500" />
              Confirm Email Address <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              className={`w-full bg-[#0d1520] border ${
                emailError ? "border-red-500" : "border-gray-700"
              } text-white p-3 rounded-md focus:ring-2 ${
                emailError ? "focus:ring-red-500" : "focus:ring-teal-500"
              } focus:border-transparent transition-all`}
              placeholder="Confirm your email address"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
            {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
          </motion.div>

          {/* Preferred Contact Method */}
          <motion.div variants={itemVariants} className="relative">
            <label className="block text-white font-medium mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2 text-teal-500" />
              Preferred Contact Method <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setContactMethodOpen(!contactMethodOpen)}
                className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all flex justify-between items-center"
              >
                <span className={contactMethod ? "text-white" : "text-gray-500"}>
                  {contactMethod || "Select preferred contact method"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${contactMethodOpen ? "transform rotate-180" : ""}`}
                />
              </button>
              {contactMethodOpen && (
                <div className="absolute z-50 mt-1 w-full bg-[#0d1520] border border-gray-700 rounded-md shadow-lg">
                  <ul className="py-1">
                    {contactMethodOptions.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          className={`w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center ${
                            contactMethod === option ? "text-teal-500" : "text-white"
                          }`}
                          onClick={() => {
                            setContactMethod(option)
                            setContactMethodOpen(false)
                          }}
                        >
                          {contactMethod === option && <Check className="w-4 h-4 mr-2" />}
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Social Media Accounts */}
          <motion.div variants={itemVariants}>
            <label className="block text-white font-medium mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-teal-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram Account (Optional)
            </label>
            <input
              type="text"
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="@yourusername"
              value={instagramAccount}
              onChange={(e) => setInstagramAccount(e.target.value)}
            />
          </motion.div>

          {/* Accessibility Notes */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <label className="block text-white font-medium mb-2">Accessibility Notes (Optional)</label>
            <textarea
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
              placeholder="Please let us know if you have any accessibility needs or requirements..."
              rows={3}
              value={accessibilityNotes}
              onChange={(e) => setAccessibilityNotes(e.target.value)}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div variants={itemVariants} className="flex justify-between pt-6 border-t border-gray-700/50">
        {onBack && (
          <button
            type="button"
            onClick={handleBackClick}
            className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleNextClick}
          disabled={!isFormValid}
          className={`px-6 py-3 rounded-md transition-colors ${
            isFormValid ? "bg-teal-500 text-black hover:bg-teal-600" : "bg-gray-600 text-gray-400 cursor-not-allowed"
          } ${!onBack ? "ml-auto" : ""}`}
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { ArtistDropdown } from "@/components/ui/artist-dropdown"
import { LocationDropdown } from "@/components/ui/location-dropdown"
import { InlineCalendar } from "@/components/ui/inline-calendar"

interface StepOneFormProps {
  onNext: () => void
}

interface StepOneData {
  selectedArtist: string
  selectedLocation: string
  selectedDate: string | null
  selectedTime: string
}

export function StepOneForm({ onNext }: StepOneFormProps) {
  const [selectedArtist, setSelectedArtist] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("booking-step-one")
    if (savedData) {
      try {
        const data: StepOneData = JSON.parse(savedData)
        setSelectedArtist(data.selectedArtist || "")
        setSelectedLocation(data.selectedLocation || "")
        setSelectedDate(data.selectedDate ? new Date(data.selectedDate) : null)
        setSelectedTime(data.selectedTime || "")
      } catch (error) {
        console.error("Error loading saved step one data:", error)
      }
    }
  }, [])

  // Save data whenever form values change
  useEffect(() => {
    const dataToSave: StepOneData = {
      selectedArtist,
      selectedLocation,
      selectedDate: selectedDate ? selectedDate.toISOString() : null,
      selectedTime,
    }
    localStorage.setItem("booking-step-one", JSON.stringify(dataToSave))
  }, [selectedArtist, selectedLocation, selectedDate, selectedTime])

  const handleDateTimeSelect = (date: Date | null, time?: string) => {
    setSelectedDate(date)
    if (time) {
      setSelectedTime(time)
    }
  }

  const isFormValid = selectedArtist && selectedLocation && selectedDate && selectedTime

  const artists = [
    { value: "alex-morgan", label: "Alex Morgan" },
    { value: "jamie-chen", label: "Jamie Chen" },
    { value: "luna-diaz", label: "Luna Diaz" },
    { value: "thomas-berg", label: "Thomas Berg" },
  ]

  const locations = [
    { value: "berlin", label: "Berlin" },
    { value: "hamburg", label: "Hamburg" },
    { value: "munich", label: "Munich" },
  ]

  const handleNextClick = () => {
    if (isFormValid) {
      onNext()
    }
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-gray-400 text-sm">
          Let's start with selecting your artist, location, and preferred appointment time.
        </p>
      </div>

      <div className="space-y-4">
        <ArtistDropdown
          options={artists}
          value={selectedArtist}
          onChange={setSelectedArtist}
          placeholder="Select an artist"
        />

        <LocationDropdown
          options={locations}
          value={selectedLocation}
          onChange={setSelectedLocation}
          placeholder="Select a location"
        />

        <div className="space-y-3">
          <div className="flex items-center mb-3">
            <Calendar className="mr-2 h-5 w-5 text-teal-500" />
            <label className="text-white font-medium">Date and Time</label>
          </div>
          <InlineCalendar selectedDate={selectedDate} onSelectDate={handleDateTimeSelect} selectedTime={selectedTime} />
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-gray-700/50">
        <motion.button
          whileHover={{ scale: isFormValid ? 1.02 : 1 }}
          whileTap={{ scale: isFormValid ? 0.98 : 1 }}
          type="button"
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isFormValid
              ? "bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleNextClick}
          disabled={!isFormValid}
        >
          Next Step
        </motion.button>
      </div>
    </motion.div>
  )
}

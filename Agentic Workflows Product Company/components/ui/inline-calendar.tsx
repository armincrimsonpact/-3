"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface InlineCalendarProps {
  selectedDate: Date | null
  onSelectDate: (date: Date | null, time?: string) => void
  selectedTime?: string
}

export function InlineCalendar({ selectedDate, onSelectDate, selectedTime = "" }: InlineCalendarProps) {
  // Initialize with current date properly
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  // Generate mock available times
  useEffect(() => {
    if (selectedDate) {
      // Mock data - in a real app, this would come from an API
      const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]
      setAvailableTimes(times)
    } else {
      setAvailableTimes([])
    }
  }, [selectedDate])

  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()
    // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    const daysInMonth = lastDay.getDate()

    // Create array with empty slots for days before the first day of the month
    const days: Array<Date | null> = Array(adjustedFirstDayOfWeek).fill(null)

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    setCalendarDays(days)
  }, [currentMonth])

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    onSelectDate(date)
  }

  const handleTimeClick = (time: string) => {
    if (selectedDate) {
      onSelectDate(selectedDate, time)
    }
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "long" })
  }

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goToPreviousMonth}
          className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-white font-medium">
          {formatMonth(currentMonth)} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={goToNextMonth}
          className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs text-gray-400 py-1">
            {day}
          </div>
        ))}

        {calendarDays.map((date, index) => (
          <div key={index} className="aspect-square">
            {date ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(date)}
                className={`w-full h-full flex items-center justify-center rounded-full text-sm ${
                  isDateSelected(date) ? "bg-teal-600 text-white" : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {date.getDate()}
              </motion.button>
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>Available Times</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTimeClick(time)}
                className={`py-1 px-2 text-xs rounded ${
                  selectedTime === time ? "bg-teal-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

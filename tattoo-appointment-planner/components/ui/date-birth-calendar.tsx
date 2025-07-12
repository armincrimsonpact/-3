"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

interface DateBirthCalendarProps {
  selectedDate: Date | null
  onSelectDate: (date: Date | null) => void
}

export function DateBirthCalendar({ selectedDate, onSelectDate }: DateBirthCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState<"calendar" | "decades" | "years">("calendar")
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null)
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Generate years for dropdown (100 years back from current year)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  // Generate decades for decade view (12 decades back from current decade)
  const currentDecade = Math.floor(currentYear / 10) * 10
  const decades = Array.from({ length: 12 }, (_, i) => currentDecade - i * 10)

  // Get years for the selected decade
  const getDecadeYears = (decade: number) => {
    return Array.from({ length: 10 }, (_, i) => decade + i).filter((year) => year <= currentYear)
  }

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected =
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()

      const isToday =
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()

      const isFuture = date > new Date()

      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: isFuture ? 1 : 1.1 }}
          whileTap={{ scale: isFuture ? 1 : 0.9 }}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
            isFuture
              ? "text-gray-600 cursor-not-allowed"
              : isSelected
                ? "bg-teal-500 text-black"
                : isToday
                  ? "border border-teal-500/50 text-teal-400 hover:bg-gray-700"
                  : "hover:bg-gray-700 text-white"
          }`}
          onClick={() => !isFuture && onSelectDate(date)}
          disabled={isFuture}
        >
          {day}
        </motion.button>,
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const setMonth = (monthIndex: number) => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(monthIndex)
    setCurrentMonth(newDate)
    setMonthDropdownOpen(false)
  }

  const setYear = (year: number) => {
    const newDate = new Date(currentMonth)
    newDate.setFullYear(year)
    setCurrentMonth(newDate)

    // If a date is already selected, update it with the new year
    if (selectedDate) {
      const updatedDate = new Date(selectedDate)
      updatedDate.setFullYear(year)
      onSelectDate(updatedDate)
    }

    setYearDropdownOpen(false)
    setViewMode("calendar")
  }

  const selectDecade = (decade: number) => {
    setSelectedDecade(decade)
    setViewMode("years")
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      {viewMode === "calendar" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-full hover:bg-gray-700"
              onClick={prevMonth}
            >
              <ChevronLeft className="h-5 w-5 text-teal-500" />
            </motion.button>

            <div className="flex space-x-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setMonthDropdownOpen(!monthDropdownOpen)
                    setYearDropdownOpen(false)
                  }}
                  className="px-3 py-1 rounded bg-[#252a37] text-white flex items-center hover:bg-gray-600"
                >
                  {monthNames[currentMonth.getMonth()]}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {monthDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-40 bg-[#252a37] border border-gray-700 rounded shadow-lg max-h-60 overflow-y-auto">
                    <ul className="py-1">
                      {monthNames.map((month, index) => (
                        <li key={month}>
                          <button
                            type="button"
                            className={`w-full text-left px-3 py-1 hover:bg-gray-700 ${
                              currentMonth.getMonth() === index ? "text-teal-400" : "text-white"
                            }`}
                            onClick={() => setMonth(index)}
                          >
                            {month}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("decades")
                    setYearDropdownOpen(false)
                    setMonthDropdownOpen(false)
                  }}
                  className="px-3 py-1 rounded bg-[#252a37] text-white flex items-center hover:bg-gray-600"
                >
                  {currentMonth.getFullYear()}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-full hover:bg-gray-700"
              onClick={nextMonth}
            >
              <ChevronRight className="h-5 w-5 text-teal-500" />
            </motion.button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="h-8 flex items-center justify-center text-gray-400 text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
        </>
      )}

      {viewMode === "decades" && (
        <div className="flex-1">
          <div className="text-center mb-4">
            <h4 className="text-lg font-medium text-white">Select Decade</h4>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {decades.map((decade) => (
              <motion.button
                key={decade}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => selectDecade(decade)}
                className="p-3 rounded-md hover:bg-gray-700 text-white hover:text-teal-400 transition-colors border border-gray-600"
              >
                {decade}s
              </motion.button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className="text-teal-500 hover:text-teal-400 transition-colors"
            >
              Back to Calendar
            </button>
          </div>
        </div>
      )}

      {viewMode === "years" && selectedDecade !== null && (
        <div className="flex-1">
          <div className="text-center mb-4">
            <h4 className="text-lg font-medium text-white">Select Year from {selectedDecade}s</h4>
          </div>

          <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto pr-2">
            {getDecadeYears(selectedDecade).map((year) => (
              <motion.button
                key={year}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setYear(year)}
                className={`p-2 rounded-md hover:bg-gray-700 transition-colors border border-gray-600 ${
                  currentMonth.getFullYear() === year ? "bg-teal-500/20 text-teal-400" : "text-white"
                }`}
              >
                {year}
              </motion.button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setViewMode("decades")}
              className="text-teal-500 hover:text-teal-400 transition-colors"
            >
              Back to Decades
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

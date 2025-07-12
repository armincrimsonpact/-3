"use client"

import { useState, useRef, useEffect } from "react"
import { User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ArtistOption {
  value: string
  label: string
}

interface ArtistDropdownProps {
  options: ArtistOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function ArtistDropdown({ options, value, onChange, placeholder = "Select an artist" }: ArtistDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="flex items-center mb-2">
        <User className="mr-2 h-5 w-5 text-teal-500" />
        <label className="text-white font-medium">Select an Artist</label>
      </div>

      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#0d1520] border ${
          value ? "border-teal-500/50" : "border-gray-700"
        } text-left text-white py-2.5 px-4 rounded-md transition-all flex items-center justify-between hover:border-teal-500 hover:shadow-[0_0_8px_rgba(0,194,176,0.3)]`}
        whileTap={{ scale: 0.98 }}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-teal-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 mt-1 w-full bg-[#0d1520] border border-gray-700 rounded-md shadow-lg overflow-hidden"
          >
            {options
              .filter((option) => option.value)
              .map((option) => (
                <motion.div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`px-4 py-2.5 cursor-pointer transition-colors ${
                    option.value === value ? "bg-teal-500/20 text-teal-400" : "text-white hover:bg-gray-800"
                  }`}
                  whileHover={{ backgroundColor: option.value === value ? "" : "rgba(45, 55, 72, 1)" }}
                >
                  {option.label}
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

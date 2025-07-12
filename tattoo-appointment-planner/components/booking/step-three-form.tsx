"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Palette,
  Ruler,
  MapPin,
  Euro,
  AlertTriangle,
  ChevronDown,
  Check,
  FileText,
  HelpCircle,
  MessageSquare,
} from "lucide-react"

interface StepThreeData {
  tattooStyle: string
  tattooSize: string
  placement: string
  hasScars: string | null
  scarDetails: string
  budget: string
  inspiration: string
  description: string
  previousTattoo: string | null
  additionalInfo: string
}

interface StepThreeFormProps {
  onNext: () => void
  onBack?: () => void
}

interface DropdownOption {
  value: string
  label: string
}

export function StepThreeForm({ onNext, onBack }: StepThreeFormProps) {
  // Tattoo style and details
  const [tattooStyle, setTattooStyle] = useState("")
  const [tattooSize, setTattooSize] = useState("")
  const [placement, setPlacement] = useState("")
  const [hasScars, setHasScars] = useState<string | null>(null)
  const [scarDetails, setScarDetails] = useState("")
  const [budget, setBudget] = useState("")

  // Tattoo information (moved from StepTwoForm)
  const [inspiration, setInspiration] = useState("")
  const [tattooIdea, setTattooIdea] = useState("")
  const [description, setDescription] = useState("")
  const [referenceImages, setReferenceImages] = useState<File[]>([])
  const [previousTattoo, setPreviousTattoo] = useState<string | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState("")

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("booking-step-three")
    if (savedData) {
      try {
        const data: StepThreeData = JSON.parse(savedData)
        setTattooStyle(data.tattooStyle || "")
        setTattooSize(data.tattooSize || "")
        setPlacement(data.placement || "")
        setHasScars(data.hasScars || null)
        setScarDetails(data.scarDetails || "")
        setBudget(data.budget || "")
        setInspiration(data.inspiration || "")
        setDescription(data.description || "")
        setPreviousTattoo(data.previousTattoo || null)
        setAdditionalInfo(data.additionalInfo || "")
      } catch (error) {
        console.error("Error loading saved step three data:", error)
      }
    }
  }, [])

  // Save data whenever form values change
  useEffect(() => {
    const dataToSave: StepThreeData = {
      tattooStyle,
      tattooSize,
      placement,
      hasScars,
      scarDetails,
      budget,
      inspiration,
      description,
      previousTattoo,
      additionalInfo,
    }
    localStorage.setItem("booking-step-three", JSON.stringify(dataToSave))
  }, [
    tattooStyle,
    tattooSize,
    placement,
    hasScars,
    scarDetails,
    budget,
    inspiration,
    description,
    previousTattoo,
    additionalInfo,
  ])

  // UI state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Refs for detecting outside clicks
  const styleDropdownRef = useRef<HTMLDivElement>(null)
  const sizeDropdownRef = useRef<HTMLDivElement>(null)
  const placementDropdownRef = useRef<HTMLDivElement>(null)
  const budgetDropdownRef = useRef<HTMLDivElement>(null)

  // Form validation
  const isFormValid = tattooStyle && tattooSize && placement && hasScars !== null && budget && previousTattoo !== null

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openDropdown === "style" &&
        styleDropdownRef.current &&
        !styleDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      } else if (
        openDropdown === "size" &&
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      } else if (
        openDropdown === "placement" &&
        placementDropdownRef.current &&
        !placementDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      } else if (
        openDropdown === "budget" &&
        budgetDropdownRef.current &&
        !budgetDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openDropdown])

  // Options data
  const tattooStyleOptions: DropdownOption[] = [
    { value: "traditional", label: "Traditional" },
    { value: "realism", label: "Realism" },
    { value: "watercolor", label: "Watercolor" },
    { value: "tribal", label: "Tribal" },
    { value: "japanese", label: "Japanese" },
    { value: "blackwork", label: "Blackwork" },
    { value: "other", label: "Other (please specify)" },
  ]

  const tattooSizeOptions: DropdownOption[] = [
    { value: "small", label: "Small (2-3 inches)" },
    { value: "medium", label: "Medium (4-6 inches)" },
    { value: "large", label: "Large (7-10 inches)" },
    { value: "xlarge", label: "Extra Large (11+ inches)" },
    { value: "sleeve", label: "Half/Full Sleeve" },
    { value: "backpiece", label: "Back Piece" },
  ]

  const placementOptions: DropdownOption[] = [
    { value: "arm", label: "Arm" },
    { value: "forearm", label: "Forearm" },
    { value: "upperarm", label: "Upper Arm" },
    { value: "shoulder", label: "Shoulder" },
    { value: "chest", label: "Chest" },
    { value: "back", label: "Back" },
    { value: "leg", label: "Leg" },
    { value: "thigh", label: "Thigh" },
    { value: "calf", label: "Calf" },
    { value: "ankle", label: "Ankle" },
    { value: "foot", label: "Foot" },
    { value: "hand", label: "Hand" },
    { value: "neck", label: "Neck" },
    { value: "other", label: "Other (please specify)" },
  ]

  const budgetOptions: DropdownOption[] = [
    { value: "100-300", label: "€100 - €300" },
    { value: "300-500", label: "€300 - €500" },
    { value: "500-800", label: "€500 - €800" },
    { value: "800-1200", label: "€800 - €1,200" },
    { value: "1200-2000", label: "€1,200 - €2,000" },
    { value: "2000+", label: "€2,000+" },
  ]

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReferenceImages(Array.from(e.target.files))
    }
  }

  // Custom dropdown component
  const Dropdown = ({
    options,
    value,
    onChange,
    placeholder,
    label,
    icon,
    dropdownId,
    dropdownRef,
  }: {
    options: DropdownOption[]
    value: string
    onChange: (value: string) => void
    placeholder: string
    label: string
    icon: React.ReactNode
    dropdownId: string
    dropdownRef: React.RefObject<HTMLDivElement>
  }) => {
    const selectedOption = options.find((option) => option.value === value)
    const isOpen = openDropdown === dropdownId

    return (
      <div className="mb-6 w-full" ref={dropdownRef}>
        <div className="flex items-center mb-2">
          <span className="mr-2 text-teal-500">{icon}</span>
          <label className="text-white font-medium">{label}</label>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpenDropdown(isOpen ? null : dropdownId)
            }}
            className={`w-full bg-[#0d1520] border ${
              isOpen ? "border-teal-500 shadow-[0_0_10px_rgba(0,194,176,0.3)]" : "border-gray-700"
            } text-left text-white py-2.5 px-4 rounded-md transition-all flex items-center justify-between hover:border-teal-500`}
          >
            <span className={value ? "text-white" : "text-gray-500"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-teal-500">
              <ChevronDown size={18} />
            </motion.div>
          </button>

          {isOpen && (
            <div
              className="absolute z-50 mt-1 w-full bg-[#0d1520] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-teal-800 py-2 px-4 text-white border-b border-gray-700 font-medium text-sm">
                {placeholder}
              </div>
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onChange(option.value)
                    setOpenDropdown(null)
                  }}
                  className={`py-2 px-4 cursor-pointer transition-colors ${
                    option.value === value ? "bg-teal-900 text-white" : "text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center">
                    {option.value === value && <Check size={16} className="mr-2 text-teal-400" />}
                    <span>{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tattoo Details</h2>
        <p className="text-gray-400 text-sm">
          Tell us about your tattoo idea and provide specific details about the design.
        </p>
      </div>

      {/* Tattoo Information Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Your Tattoo Concept</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-2">
              <FileText className="mr-2 h-5 w-5 text-teal-500" />
              <label className="text-white font-medium">Source of Inspiration</label>
            </div>
            <textarea
              placeholder="Describe what inspired this tattoo idea. Is it meaningful to you? Does it represent something specific?"
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-4 rounded-md min-h-[120px] focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              value={inspiration}
              onChange={(e) => setInspiration(e.target.value)}
            ></textarea>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-2">
              <FileText className="mr-2 h-5 w-5 text-teal-500" />
              <label className="text-white font-medium">Detailed Tattoo Description</label>
            </div>
            <textarea
              placeholder="Please describe your tattoo idea in detail, including elements, style, colors, and any specific requirements"
              className="w-full bg-[#0d1520] border border-gray-700 text-white p-4 rounded-md min-h-[120px] focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </motion.div>
        </div>
      </motion.div>

      {/* Tattoo Specifications Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Tattoo Specifications</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <Dropdown
              options={tattooStyleOptions}
              value={tattooStyle}
              onChange={setTattooStyle}
              placeholder="Select tattoo style"
              label="Tattoo Style"
              icon={<Palette size={18} />}
              dropdownId="style"
              dropdownRef={styleDropdownRef}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Dropdown
              options={tattooSizeOptions}
              value={tattooSize}
              onChange={setTattooSize}
              placeholder="Select tattoo size"
              label="Tattoo Size"
              icon={<Ruler size={18} />}
              dropdownId="size"
              dropdownRef={sizeDropdownRef}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Dropdown
              options={placementOptions}
              value={placement}
              onChange={setPlacement}
              placeholder="Select placement"
              label="Placement on Body"
              icon={<MapPin size={18} />}
              dropdownId="placement"
              dropdownRef={placementDropdownRef}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Dropdown
              options={budgetOptions}
              value={budget}
              onChange={setBudget}
              placeholder="Select budget range"
              label="Budget Range"
              icon={<Euro size={18} />}
              dropdownId="budget"
              dropdownRef={budgetDropdownRef}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Medical Information Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Medical Information</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <AlertTriangle className="mr-2 h-5 w-5 text-teal-500" />
              <label className="text-white font-medium">
                Do you have any specific characteristics (like mole, scars etc.) in the tattoo area?
              </label>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setHasScars("yes")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  hasScars === "yes" ? "bg-teal-500 text-black" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setHasScars("no")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  hasScars === "no" ? "bg-teal-500 text-black" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                No
              </button>
            </div>
          </motion.div>

          {hasScars === "yes" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              variants={itemVariants}
            >
              <div className="flex items-center mb-2">
                <AlertTriangle className="mr-2 h-5 w-5 text-teal-500" />
                <label className="text-white font-medium">Please describe the characteristics</label>
              </div>
              <textarea
                className="w-full bg-[#0d1520] border border-gray-700 text-white p-4 rounded-md min-h-[100px] focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Please describe the location, size, and type of characteristics in the tattoo area..."
                value={scarDetails}
                onChange={(e) => setScarDetails(e.target.value)}
              ></textarea>

              {/* Add photo upload section */}
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <FileText className="mr-2 h-5 w-5 text-teal-500" />
                  <label className="text-white font-medium">Attach photo of the skin area</label>
                </div>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-teal-500/50 transition-colors duration-300 bg-[#0d1520]/50">
                  <input
                    type="file"
                    id="scar-photo-upload"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        // Handle scar photo upload - you can add state for this if needed
                        console.log("Scar photos uploaded:", Array.from(e.target.files))
                      }
                    }}
                  />
                  <label
                    htmlFor="scar-photo-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3"
                      whileHover={{ scale: 1.1, backgroundColor: "#134e4a" }}
                    >
                      <svg
                        className="w-6 h-6 text-teal-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </motion.div>
                    <span className="text-gray-300 mb-1 font-medium text-sm">
                      Click to upload photos of the skin area
                    </span>
                    <span className="text-gray-500 text-xs">(PNG, JPG up to 10MB)</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <HelpCircle className="mr-2 h-5 w-5 text-teal-500" />
              <label className="text-white font-medium">Have you had tattoos before?</label>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPreviousTattoo("yes")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  previousTattoo === "yes" ? "bg-teal-500 text-black" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setPreviousTattoo("no")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  previousTattoo === "no" ? "bg-teal-500 text-black" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                No
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Additional Information Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Additional Information</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <MessageSquare className="mr-2 h-5 w-5 text-teal-500" />
            <label className="text-white font-medium">Additional Notes</label>
          </div>
          <textarea
            className="w-full bg-[#0d1520] border border-gray-700 text-white p-4 rounded-md min-h-[100px] focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="Any additional information you'd like to share with your artist..."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          ></textarea>
        </motion.div>
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
          onClick={onNext}
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

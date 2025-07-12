"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, X, ImageIcon, FileText, AlertCircle } from "lucide-react"

interface StepFourData {
  referenceImages: string[]
  imageDescriptions: { [key: string]: string }
  additionalNotes: string
}

interface StepFourFormProps {
  onNext: () => void
  onBack?: () => void
}

export function StepFourForm({ onNext, onBack }: StepFourFormProps) {
  const [referenceImages, setReferenceImages] = useState<File[]>([])
  const [imageDescriptions, setImageDescriptions] = useState<{ [key: string]: string }>({})
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("booking-step-four")
    if (savedData) {
      try {
        const data: StepFourData = JSON.parse(savedData)
        setImageDescriptions(data.imageDescriptions || {})
        setAdditionalNotes(data.additionalNotes || "")
        // Note: We can't restore File objects from localStorage
      } catch (error) {
        console.error("Error loading saved step four data:", error)
      }
    }
  }, [])

  // Save data whenever form values change
  useEffect(() => {
    const dataToSave: StepFourData = {
      referenceImages: referenceImages.map((file) => file.name), // Store file names only
      imageDescriptions,
      additionalNotes,
    }
    localStorage.setItem("booking-step-four", JSON.stringify(dataToSave))
  }, [referenceImages, imageDescriptions, additionalNotes])

  // File validation
  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]

    if (!allowedTypes.includes(file.type)) {
      return "Please upload only image files (JPEG, PNG, GIF, WebP)"
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB"
    }

    return null
  }

  // Handle file selection
  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles: File[] = []
    const errors: string[] = []

    Array.from(files).forEach((file) => {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
      } else {
        newFiles.push(file)
      }
    })

    if (errors.length > 0) {
      setUploadError(errors.join(", "))
    } else {
      setUploadError(null)
    }

    if (newFiles.length > 0) {
      setReferenceImages((prev) => [...prev, ...newFiles])
    }
  }

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    const imageToRemove = referenceImages[index]
    setReferenceImages((prev) => prev.filter((_, i) => i !== index))

    // Remove description for this image
    const newDescriptions = { ...imageDescriptions }
    delete newDescriptions[imageToRemove.name]
    setImageDescriptions(newDescriptions)
  }

  // Update image description
  const updateImageDescription = (fileName: string, description: string) => {
    setImageDescriptions((prev) => ({
      ...prev,
      [fileName]: description,
    }))
  }

  // Create preview URL for image
  const createPreviewUrl = (file: File) => {
    return URL.createObjectURL(file)
  }

  // Form validation - this step is optional, so always valid
  const isFormValid = true

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
        <h2 className="text-2xl font-bold text-white mb-2">Visual References</h2>
        <p className="text-gray-400 text-sm">
          Upload reference images to help your artist understand your vision. This step is optional but highly
          recommended.
        </p>
      </div>

      {/* Upload Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Reference Images</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive
              ? "border-teal-500 bg-teal-500/10"
              : "border-gray-600 hover:border-teal-500/50 hover:bg-teal-500/5"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-teal-500" />
            </div>

            <div>
              <p className="text-white font-medium mb-2">Drop your images here, or click to browse</p>
              <p className="text-gray-400 text-sm">Supported formats: JPEG, PNG, GIF, WebP (max 10MB each)</p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-teal-500 text-black rounded-md hover:bg-teal-600 transition-colors"
            >
              Choose Files
            </button>
          </div>
        </div>

        {/* Upload Error */}
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md flex items-start"
          >
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Upload Error</p>
              <p className="text-red-300 text-sm mt-1">{uploadError}</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Uploaded Images */}
      {referenceImages.length > 0 && (
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-center mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
            <h3 className="text-white font-medium text-lg px-4">Uploaded Images ({referenceImages.length})</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {referenceImages.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
              >
                <div className="relative mb-4">
                  <img
                    src={createPreviewUrl(file) || "/placeholder.svg"}
                    alt={`Reference ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300 text-sm">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    <span className="truncate">{file.name}</span>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Description (Optional)</label>
                    <textarea
                      className="w-full bg-[#0d1520] border border-gray-700 text-white p-3 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      placeholder="Describe what you like about this image..."
                      rows={3}
                      value={imageDescriptions[file.name] || ""}
                      onChange={(e) => updateImageDescription(file.name, e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Additional Notes */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <h3 className="text-white font-medium text-lg px-4">Additional Notes</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <FileText className="mr-2 h-5 w-5 text-teal-500" />
            <label className="text-white font-medium">Additional Visual References or Notes</label>
          </div>
          <textarea
            className="w-full bg-[#0d1520] border border-gray-700 text-white p-4 rounded-md min-h-[120px] focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="Any additional notes about your visual references, specific details you want to highlight, or links to online references..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div variants={itemVariants}>
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-6">
          <h4 className="text-teal-400 font-medium mb-3 flex items-center">
            <ImageIcon className="w-5 h-5 mr-2" />
            Tips for Better Reference Images
          </h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• Upload high-quality images that clearly show the details you want</li>
            <li>• Include multiple angles or variations if you have them</li>
            <li>• Add descriptions to explain what specifically you like about each image</li>
            <li>• Consider including both overall composition and detail shots</li>
            <li>• If you have color preferences, include examples of the color palette</li>
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

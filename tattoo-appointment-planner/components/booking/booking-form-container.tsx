"use client"

import { useState, createContext } from "react"
import { motion } from "framer-motion"
import { StepOneForm } from "./step-one-form"
import { StepTwoForm } from "./step-two-form"
import { StepThreeForm } from "./step-three-form"
import { StepFourForm } from "./step-four-form"
import { StepFiveForm } from "./step-five-form"
import { StepIndicator } from "./step-indicator"
import { BookingFooter } from "./booking-footer"

// Create a simple context for dropdown state management
export const DropdownContext = createContext({
  openDropdown: "",
  setOpenDropdown: (id: string) => {},
})

export function BookingFormContainer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [openDropdown, setOpenDropdown] = useState("")

  const steps = ["Basic Information", "Personal Details", "Tattoo Details", "Visual References", "Additional Info"]

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Only allow clicking on completed steps
  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  return (
    <DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} steps={steps} onStepClick={handleStepClick} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#111] border border-gray-800 rounded-lg p-6 mt-8 w-full mx-auto shadow-xl"
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" }}
        >
          {currentStep === 1 && <StepOneForm onNext={handleNext} />}
          {currentStep === 2 && <StepTwoForm onNext={handleNext} onBack={handlePrevious} />}
          {currentStep === 3 && <StepThreeForm onNext={handleNext} onBack={handlePrevious} />}
          {currentStep === 4 && <StepFourForm onNext={handleNext} onBack={handlePrevious} />}
          {currentStep === 5 && <StepFiveForm onSubmit={() => alert("Booking submitted!")} onBack={handlePrevious} />}
        </motion.div>

        <BookingFooter />
      </div>
    </DropdownContext.Provider>
  )
}

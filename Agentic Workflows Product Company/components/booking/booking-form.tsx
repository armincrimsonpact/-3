"use client"

import { useState } from "react"
import { StepOneForm } from "./step-one-form"
import { StepTwoForm } from "./step-two-form"
import { StepThreeForm } from "./step-three-form"
import { StepFourForm } from "./step-four-form"
import { StepFiveForm } from "./step-five-form"

interface BookingFormProps {
  currentStep: number
  onNext: () => void
  onPrevious: () => void
}

export function BookingForm({ currentStep, onNext, onPrevious }: BookingFormProps) {
  // Create a context for managing modal state
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // Close any open modal
  const closeAllModals = () => {
    setActiveModal(null)
  }

  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOneForm
            onNext={onNext}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            closeAllModals={closeAllModals}
          />
        )
      case 2:
        return <StepTwoForm onNext={onNext} onBack={onPrevious} />
      case 3:
        return <StepThreeForm onNext={onNext} onBack={onPrevious} />
      case 4:
        return <StepFourForm onNext={onNext} onBack={onPrevious} />
      case 5:
        return <StepFiveForm onSubmit={() => console.log("Booking submitted")} onBack={onPrevious} />
      default:
        return (
          <StepOneForm
            onNext={onNext}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            closeAllModals={closeAllModals}
          />
        )
    }
  }

  return <div className="relative z-10">{renderStep()}</div>
}

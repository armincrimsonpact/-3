"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Footer } from "@/components/layout/footer"
import { MainNav } from "@/components/layout/main-nav"
import { StepIndicator } from "@/components/booking/step-indicator"
import { StepOneForm } from "@/components/booking/step-one-form"
import { StepTwoForm } from "@/components/booking/step-two-form"
import { StepThreeForm } from "@/components/booking/step-three-form"
import { StepFourForm } from "@/components/booking/step-four-form"
import { StepFiveForm } from "@/components/booking/step-five-form"
import { BookingSuccess } from "@/components/booking/booking-success"
import { useRouter, useSearchParams } from "next/navigation"

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const totalSteps = 5
  const router = useRouter()
  const searchParams = useSearchParams()

  // Memoize the search params to prevent unnecessary re-renders
  const isNewBooking = useMemo(() => {
    return searchParams.get("new") === "true"
  }, [searchParams])

  // Initialize step only once
  useEffect(() => {
    let mounted = true

    const initializeStep = () => {
      if (!mounted) return

      if (isNewBooking) {
        // Clear any existing booking data for fresh start
        try {
          localStorage.removeItem("booking-current-step")
          localStorage.removeItem("booking-step-one")
          localStorage.removeItem("booking-step-two")
          localStorage.removeItem("booking-step-three")
          localStorage.removeItem("booking-step-four")
          localStorage.removeItem("booking-step-five")
        } catch (error) {
          console.warn("Could not clear localStorage:", error)
        }
        setStep(1)
      } else {
        // Load saved step only if not a new booking
        try {
          const savedStep = localStorage.getItem("booking-current-step")
          if (savedStep && Number.parseInt(savedStep, 10) > 1) {
            setStep(Number.parseInt(savedStep, 10))
          } else {
            setStep(1)
          }
        } catch (error) {
          console.warn("Could not read from localStorage:", error)
          setStep(1)
        }
      }

      setIsLoading(false)
    }

    initializeStep()

    return () => {
      mounted = false
    }
  }, [isNewBooking]) // Only depend on isNewBooking

  // Save current step to localStorage whenever it changes (but not during initial load)
  useEffect(() => {
    if (!isLoading && step > 0) {
      try {
        localStorage.setItem("booking-current-step", step.toString())
      } catch (error) {
        console.warn("Could not save to localStorage:", error)
      }
    }
  }, [step, isLoading])

  const goToNextStep = useCallback(() => {
    if (step < totalSteps) {
      setDirection(1)
      setStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [step, totalSteps])

  const goToPreviousStep = useCallback(() => {
    if (step > 1) {
      setDirection(-1)
      setStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [step])

  const handleBookingComplete = useCallback(async () => {
    // Here you would normally submit the booking data to your API
    // For now, we'll simulate a successful submission
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Clear all saved booking data when booking is completed
      localStorage.removeItem("booking-current-step")
      localStorage.removeItem("booking-step-one")
      localStorage.removeItem("booking-step-two")
      localStorage.removeItem("booking-step-three")
      localStorage.removeItem("booking-step-four")
      localStorage.removeItem("booking-step-five")
      
      // Show success screen
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting booking:", error)
      // You could show an error message here
    }
  }, [])

  const handleBackToDashboard = useCallback(() => {
    router.push("/dashboard")
  }, [router])

  const variants = useMemo(
    () => ({
      enter: (direction: number) => ({
        x: direction > 0 ? 200 : -200,
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        x: direction < 0 ? 200 : -200,
        opacity: 0,
      }),
    }),
    [],
  )

  const renderStepContent = useCallback(() => {
    switch (step) {
      case 1:
        return <StepOneForm onNext={goToNextStep} />
      case 2:
        return <StepTwoForm onNext={goToNextStep} onBack={goToPreviousStep} />
      case 3:
        return <StepThreeForm onNext={goToNextStep} onBack={goToPreviousStep} />
      case 4:
        return <StepFourForm onNext={goToNextStep} onBack={goToPreviousStep} />
      case 5:
        return <StepFiveForm onSubmit={handleBookingComplete} onBack={goToPreviousStep} />
      default:
        return <StepOneForm onNext={goToNextStep} />
    }
  }, [step, goToNextStep, goToPreviousStep, handleBookingComplete])

  // Show loading state while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-lg">Loading booking form...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
      {/* Navigation Bar */}
      <MainNav />

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center pt-24 pb-12 px-4"
      >
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-white mb-3 tracking-tight text-center"
        >
          Book Your <span className="text-teal-400">Tattoo Session</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-400 mb-10 text-center max-w-xl"
        >
          Complete the steps below to schedule your consultation or tattoo appointment with one of our artists.
        </motion.p>

        {/* Progress Steps - Hide when showing success */}
        {!isSubmitted && (
          <div className="w-full max-w-4xl px-4 mb-8">
            <StepIndicator
              currentStep={step}
              steps={["Basic Information", "Personal Details", "Tattoo Details", "Visual References", "Additional Info"]}
            />
          </div>
        )}

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative w-full max-w-4xl mx-auto mt-8 mb-8"
        >
          {/* Decorative Elements - Grüne Striche */}
          <div className="absolute -top-8 -left-8 w-24 h-24 border-l-2 border-t-2 border-teal-500/30 rounded-tl-lg pointer-events-none"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 border-r-2 border-b-2 border-teal-500/30 rounded-br-lg pointer-events-none"></div>

          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full shadow-lg relative">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/5 to-transparent pointer-events-none"></div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={isSubmitted ? "success" : step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="relative z-10"
              >
                {isSubmitted ? <BookingSuccess /> : renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Additional Info - Hide when showing success */}
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center text-gray-500 text-sm max-w-lg"
          >
            <p>
              Your privacy is important to us. All information provided will be kept confidential and used only for your
              tattoo consultation.
            </p>
            <p className="mt-2 text-xs text-gray-600">
              Your progress is automatically saved. You can return anytime to continue where you left off.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

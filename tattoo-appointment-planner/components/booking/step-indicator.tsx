"use client"

import { motion } from "framer-motion"

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
  onStepClick?: (step: number) => void
}

export function StepIndicator({ currentStep, steps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isClickable = stepNumber <= currentStep && onStepClick

          return (
            <div key={step} className="flex flex-col items-center relative">
              {/* Step circle */}
              <motion.button
                type="button"
                onClick={() => isClickable && onStepClick?.(stepNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                } ${
                  isActive
                    ? "bg-teal-500 text-black"
                    : isCompleted
                      ? "bg-teal-500 text-black"
                      : "bg-gray-800 text-gray-400"
                }`}
                whileHover={isClickable ? { scale: 1.1 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </motion.button>

              {/* Step label */}
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  isActive || isCompleted ? "text-white" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

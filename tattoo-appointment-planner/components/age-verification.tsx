"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already verified age
    const ageVerified = localStorage.getItem("age-verified")
    if (!ageVerified) {
      setIsVisible(true)
    }
  }, [])

  const verifyAge = () => {
    localStorage.setItem("age-verified", "true")
    setIsVisible(false)
  }

  const rejectAge = () => {
    // Redirect to home page if user is not of legal age
    window.location.href = "/home"
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-teal-500/30 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Altersverifikation</h2>
          <button onClick={() => (window.location.href = "/home")} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          Diese Seite enthält Inhalte, die nur für Personen ab 18 Jahren geeignet sind. Bitte bestätigen Sie, dass Sie
          mindestens 18 Jahre alt sind, um fortzufahren.
        </p>

        <div className="flex gap-4">
          <button onClick={rejectAge} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
            Ich bin unter 18
          </button>
          <button onClick={verifyAge} className="flex-1 bg-teal-500 hover:bg-teal-400 text-black py-2 rounded">
            Ich bin über 18
          </button>
        </div>
      </div>
    </div>
  )
}

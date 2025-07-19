"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { RippleButton } from "@/components/ui/ripple-button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      // Slight delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem("cookie-consent", "accepted")
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  const declineCookies = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem("cookie-consent", "declined")
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-cardBg backdrop-blur-sm border-t border-primary/30 py-6 px-5 z-50 transition-all duration-500 ${
        isClosing ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <p className="text-textPrimary text-sm md:text-base leading-relaxed">
            We use cookies to provide you with the best experience on our website. By continuing to use our site, you
            consent to our use of cookies. For more information, please see our{" "}
            <a
              href="/privacy"
              className="text-primary hover:text-primary/80 animated-underline transition-colors duration-300"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {/* "Search Artists" style button with ripple effect */}
          <RippleButton
            onClick={declineCookies}
            className="min-w-[80px] py-2 px-4 rounded-md text-sm font-medium bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors"
            rippleColor="rgba(255, 255, 255, 0.5)"
          >
            Decline
          </RippleButton>
          {/* "Book a Session" style button with ripple effect */}
          <RippleButton
            onClick={acceptCookies}
            className="min-w-[80px] py-2 px-4 rounded-md text-sm font-medium bg-teal-500 text-black border border-teal-500 hover:bg-teal-600 hover:border-teal-600"
            rippleColor="rgba(0, 0, 0, 0.2)"
          >
            Accept
          </RippleButton>
          <button
            onClick={handleClose}
            className="text-textPrimary hover:text-primary transition-colors duration-300 transform hover:rotate-90 ml-1"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}

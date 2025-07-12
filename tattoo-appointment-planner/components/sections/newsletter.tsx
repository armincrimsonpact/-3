"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedLink } from "@/components/ui/animated-link"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/20 to-transparent"
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-teal-500/10 to-transparent rounded-full filter blur-3xl"
          animate={{
            opacity: [0.3, 0.2, 0.3],
            scale: [1, 1.1, 1],
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="bg-black border border-teal-500/20 rounded-lg p-8 transition-colors duration-300 hover:border-teal-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            boxShadow: "0 0 30px rgba(20, 184, 166, 0.2)",
            borderColor: "rgba(20, 184, 166, 0.4)",
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AnimatedText text="Stay Updated" className="text-2xl font-bold text-white mb-4" once={false} />
          </motion.div>

          <motion.p
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Get exclusive updates, tips for tattoo artists, and be the first to know about new features.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div className="flex-1 relative">
              <motion.input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-black border border-teal-500/30 rounded text-white focus:outline-none focus:border-teal-500 transition-all duration-300"
                whileFocus={{
                  boxShadow: "0 0 10px rgba(0,194,176,0.3)",
                  borderColor: "rgba(0,194,176,0.8)",
                }}
              />

              {/* Animated focus border */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-300"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-black hover:border-teal-500"
              animation="ripple"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : isSubmitted ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Subscribed!
                </>
              ) : (
                <>Subscribe</>
              )}
            </Button>
          </motion.form>

          <motion.p
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Don't have an account yet?{" "}
            <AnimatedLink
              href="/signup"
              underlineStyle="slide"
              underlineColor="bg-teal-500"
              textHoverColor="hover:text-teal-400"
              className="text-teal-500"
            >
              Start for free now
            </AnimatedLink>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export function InteractiveHero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    // Check if scrolling is possible
    const checkScrollable = () => {
      const documentHeight = document.body.scrollHeight
      const windowHeight = window.innerHeight
      setShowScrollIndicator(documentHeight > windowHeight)
    }

    checkScrollable()
    window.addEventListener("resize", checkScrollable)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", checkScrollable)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.section ref={heroRef} className="relative bg-black pt-24 pb-20 overflow-hidden" style={{ opacity }}>
      {/* Background elements that follow mouse precisely */}

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
        <motion.div
          className="w-full md:w-3/5 md:pr-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ink Your Story With
            <br />
            <motion.span
              className="text-teal-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Precision & Passion
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg mt-6 mb-10 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            At InkCircle, we transform your ideas into stunning body art. Our team of skilled artists specializes in
            creating custom designs that tell your unique story.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              asChild
              className="text-lg px-8 py-3 bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-black hover:border-teal-500"
              animation="ripple"
            >
              <a href="/booking">Book a Session</a>
            </Button>

            <Button
              asChild
              className="text-lg px-8 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black hover:border-white"
              animation="ripple"
            >
              <a href="/artists">Search Artists</a>
            </Button>

            <Button
              asChild
              className="text-lg px-8 py-3 bg-teal-500 text-black border border-teal-500 hover:bg-teal-600 hover:border-teal-600"
              animation="ripple"
            >
              <a href="/login">Login</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 flex justify-end mt-12 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y }}
        >
          <div className="relative rounded-lg overflow-hidden w-11/12">
            {/* Animated glow effect */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 opacity-30 blur-xl animate-pulse-slow" />

            <motion.div
              className="relative rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/tattoo-artist-hero.jpg"
                alt="Professional tattoo artist with tattoos"
                className="w-full h-auto rounded"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p
            className="text-gray-400 text-sm mb-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            Scroll to explore
          </motion.p>
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <motion.div
              className="w-1 h-2 bg-teal-500 rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

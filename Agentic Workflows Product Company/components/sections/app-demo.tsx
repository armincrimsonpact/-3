"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedText } from "@/components/ui/animated-text"
import { Button } from "@/components/ui/button"

export function AppDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeThumb, setActiveThumb] = useState(0)

  const thumbnails = [
    { id: 1, title: "Appointment Booking" },
    { id: 2, title: "Client Management" },
    { id: 3, title: "Portfolio Gallery" },
    { id: 4, title: "Analytics Dashboard" },
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextThumb = () => {
    setActiveThumb((prev) => (prev + 1) % thumbnails.length)
  }

  const prevThumb = () => {
    setActiveThumb((prev) => (prev - 1 + thumbnails.length) % thumbnails.length)
  }

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-900/10 to-transparent"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatedText text="See the App in Action" className="text-4xl font-bold text-white text-center mb-4" />

          <motion.p
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discover how InkCircle simplifies your workflow and takes your business to the next level.
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.div
            className="relative bg-gray-900 rounded-lg w-full max-w-4xl aspect-video overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Video overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

            {/* Video placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeThumb}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-gray-800 flex items-center justify-center"
                >
                  <div className="text-white text-xl font-medium">{thumbnails[activeThumb].title}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Play button */}
            <Button
              className="absolute inset-0 m-auto z-20 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-black hover:border-teal-500"
              onClick={togglePlay}
              variant="outline"
              size="icon"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>

            {/* Navigation arrows */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
              <Button
                className="w-8 h-8 rounded-full flex items-center justify-center border-teal-500/50 text-teal-500/50 hover:bg-teal-500/50 hover:text-black hover:border-teal-500/50"
                onClick={prevThumb}
                variant="outline"
                size="icon"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                className="w-8 h-8 rounded-full flex items-center justify-center border-teal-500/50 text-teal-500/50 hover:bg-teal-500/50 hover:text-black hover:border-teal-500/50"
                onClick={nextThumb}
                variant="outline"
                size="icon"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <div className="flex justify-center mt-6 space-x-3">
            {thumbnails.map((thumb, index) => (
              <Button
                key={thumb.id}
                className={`w-16 h-16 rounded-md overflow-hidden relative ${index === activeThumb ? "ring-2 ring-teal-500" : "opacity-70"} border-gray-600 text-white hover:bg-gray-600 hover:text-white hover:border-gray-600`}
                onClick={() => setActiveThumb(index)}
                variant="outline"
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center ${index === activeThumb ? "bg-gray-600" : ""}`}
                >
                  <span className="text-xs text-center px-1">{index + 1}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

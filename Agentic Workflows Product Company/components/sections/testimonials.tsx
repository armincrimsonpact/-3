"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { AnimatedText } from "@/components/ui/animated-text"

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Tattoo Artist, Berlin",
      avatar: "/tattoo-artist-portrait.png",
      content:
        "InkCircle has completely changed how I run my business. The appointment system is intuitive and the client management saves me countless hours.",
    },
    {
      name: "Jamie Chen",
      role: "Client",
      avatar: "/ceo-headshot.png",
      content:
        "Finding the perfect artist for my sleeve was so easy with InkCircle. The portfolio feature helped me find exactly the style I was looking for.",
    },
    {
      name: "Black Lotus Studio",
      role: "Tattoo Studio, Hamburg",
      avatar: "/tattoo-artist-studio.png",
      content:
        "Managing our artist team and tracking studio performance has never been easier. The analytics dashboard gives us valuable insights to grow our business.",
    },
  ]

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const nextTestimonial = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setAutoplay(false)
    setActiveIndex(index)
  }

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatedText text="What Our Users Say" className="text-4xl font-bold text-white text-center mb-4" />

          <motion.div
            className="w-20 h-1 bg-teal-500 mx-auto mb-16"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black border border-teal-500/20 rounded-lg p-8 text-center">
                <Quote className="w-8 h-8 text-teal-500 mx-auto mb-4" />
                <p className="text-gray-300 text-lg mb-8 italic max-w-2xl mx-auto">
                  "{testimonials[activeIndex].content}"
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-500/30"
                      onError={(e) => {
                        console.log('Testimonial image failed to load:', testimonials[activeIndex].avatar)
                        // Try fallback images in order
                        const fallbacks = ['/placeholder-user.jpg', '/tattoo-artist.jpg', '/placeholder.jpg']
                        const currentSrc = e.currentTarget.src
                        
                        for (let fallback of fallbacks) {
                          if (!currentSrc.includes(fallback)) {
                            e.currentTarget.src = fallback
                            break
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white text-lg">{testimonials[activeIndex].name}</p>
                    <p className="text-teal-400 text-sm">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none">
            <motion.button
              className="pointer-events-auto w-12 h-12 -ml-16 bg-black/70 rounded-full flex items-center justify-center text-white border border-teal-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 194, 176, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="pointer-events-auto w-12 h-12 -mr-16 bg-black/70 rounded-full flex items-center justify-center text-white border border-teal-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 194, 176, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-teal-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

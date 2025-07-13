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
      avatar: "/diverse-group.png",
      content:
        "InkCircle has completely changed how I run my business. The appointment system is intuitive and the client management saves me countless hours.",
    },
    {
      name: "Jamie Chen",
      role: "Client",
      avatar: "/diverse-group.png",
      content:
        "Finding the perfect artist for my sleeve was so easy with InkCircle. The portfolio feature helped me find exactly the style I was looking for.",
    },
    {
      name: "Black Lotus Studio",
      role: "Tattoo Studio, Hamburg",
      avatar: "/placeholder.svg?key=tnwdo",
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
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

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
          <div className="flex overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 w-full ${index === activeIndex ? "block" : "hidden"}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: index === activeIndex ? 1 : 0, x: index === activeIndex ? 0 : 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 text-center">
                  <p className="text-gray-300 text-lg mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none">
            <motion.button
              className="pointer-events-auto w-10 h-10 -ml-12 bg-black/50 rounded-full flex items-center justify-center text-white border border-teal-500/20"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 194, 176, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="pointer-events-auto w-10 h-10 -mr-12 bg-black/50 rounded-full flex items-center justify-center text-white border border-teal-500/20"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 194, 176, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
                              className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-teal-500" : "bg-gray-700"}`}
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

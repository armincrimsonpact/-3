"use client"

import { useState } from "react"
import { Calendar, ImageIcon, Users } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedText } from "@/components/ui/animated-text"

export function WhyInkCircle() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-black" />,
      title: "Appointment Management",
      description: "Manage your appointments easily and efficiently. Automatic reminders reduce no-shows by up to 60%.",
    },
    {
      icon: <ImageIcon className="h-6 w-6 text-black" />,
      title: "Digital Portfolio",
      description:
        "Present your work in a professional portfolio. Clients can book appointments directly through your gallery.",
    },
    {
      icon: <Users className="h-6 w-6 text-black" />,
      title: "Client Management",
      description:
        "Keep track of client details, preferences, and tattoo history. Personalized communication made easy.",
    },
  ]

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
        <motion.div
          className="absolute -bottom-32 -right-32 w-64 h-64 bg-black/10 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -top-32 -left-32 w-64 h-64 bg-black/5 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatedText text="Why Choose InkCircle?" className="text-4xl font-bold text-white text-center mb-4" />

          <motion.p
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discover what makes InkCircle the preferred choice for tattoo artists and clients worldwide.
          </motion.p>

          <motion.div
            className="w-20 h-1 bg-gray-600 mx-auto mb-16"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6 h-full bg-black border border-gray-600/20 rounded-lg hover:border-gray-500 transition-colors duration-300 flex flex-col items-center">
                <motion.div
                  className="bg-gray-600 p-4 rounded-full mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Animated background for icon */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700"
                    animate={{
                      background:
                        hoveredCard === index
                          ? [
                              "linear-gradient(to right, #6b7280, #4b5563)",
                              "linear-gradient(to right, #4b5563, #6b7280)",
                            ]
                          : "linear-gradient(to right, #6b7280, #4b5563)",
                    }}
                    transition={{ duration: 2, repeat: hoveredCard === index ? Number.POSITIVE_INFINITY : 0 }}
                  />

                  <div className="relative z-10">{feature.icon}</div>
                </motion.div>

                <h3 className="text-xl font-bold text-white text-center mb-2 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-300 text-center">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

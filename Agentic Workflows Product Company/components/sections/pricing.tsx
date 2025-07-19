"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // White color for Base plan
  const whiteColor = "#FFFFFF"

  // Completely redesigned plans with clean structure
  const plans = [
    {
      id: "base",
      name: "Base",
      price: 0,
      description: "Basic tools for beginners",
      features: [
        "Client management (up to 20 clients)",
        "Simple appointment scheduling",
        "Digital portfolio (5 images)",
        "Basic statistics",
        "Email support",
      ],
      cta: "Start for free",
      color: "white",
      badge: null,
    },
    {
      id: "pro",
      name: "Pro",
      price: isYearly ? 16 : 19, // Changed from 15 to 16 (15% discount instead of 20%)
      description: "Advanced features for growing artists",
      features: [
        "Everything in the Base plan",
        "Unlimited portfolio images",
        "Custom booking page",
        "Payment processing",
        "Priority support",
        "Client messaging",
      ],
      cta: "Try free for 14 days",
      color: "primary",
      badge: {
        text: "Popular",
        bgColor: "bg-primary",
        textColor: "text-black",
      },
    },
    {
      id: "studio",
      name: "Studio",
      price: isYearly ? 42 : 49, // Changed from 39 to 42 (15% discount instead of 20%)
      description: "Complete solution for studio management",
      features: [
        "Everything in the Pro plan",
        "Multiple artist management",
        "Staff scheduling",
        "Inventory management",
        "Advanced analytics",
        "Custom branding",
      ],
      cta: "Try free for 14 days",
      color: "ultra",
      badge: null,
    },
  ]

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-transparent rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
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
          <h2 className="text-4xl font-bold text-white text-center mb-4">Flexible Plans for Every Need</h2>

          <motion.p
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Choose the perfect plan that fits your needs - whether you're an independent artist or running a studio.
          </motion.p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-black border border-gray-600/20 inline-flex rounded-md p-1">
            <motion.div
              className="absolute top-1 bottom-1 bg-gray-600/10 rounded-md"
              initial={false}
              animate={{
                x: isYearly ? "calc(100% - 2px)" : "1px",
                width: "calc(50% - 2px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <motion.button
              className={`relative z-10 px-6 py-2 rounded text-sm font-medium transition-colors duration-300 ${!isYearly ? "text-teal-500" : "text-white"}`}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </motion.button>
            <motion.button
              className={`relative z-10 px-6 py-2 rounded text-sm font-medium transition-colors duration-300 ${isYearly ? "text-teal-500" : "text-white"}`}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsYearly(true)}
            >
              Yearly (-15%)
            </motion.button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={`${plan.id}-${isYearly ? "yearly" : "monthly"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="h-full"
            >
              <div
                className="relative p-[3px] rounded-xl h-full"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Completely rewritten border animation */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  {/* Static border that's always visible */}
                  <div
                    className="absolute inset-0 rounded-xl border-2"
                    style={{
                      borderColor:
                        plan.id === "base"
                          ? `rgba(255, 255, 255, 0.6)` // White with 0.6 opacity
                          : plan.id === "studio"
                            ? "rgba(139, 92, 246, 0.3)" // ultra/30
                            : "rgba(0, 194, 176, 0.3)", // primary/30
                    }}
                  />

                  {/* Animated border on hover */}
                  {hoveredCard === index && (
                    <div className="absolute inset-0">
                      {/* Top border */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{
                          backgroundColor:
                            plan.id === "base"
                              ? whiteColor
                              : plan.id === "studio"
                                ? "rgb(139, 92, 246)" // ultra
                                : "rgb(0, 194, 176)", // primary
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                      />

                      {/* Right border */}
                      <motion.div
                        className="absolute top-0 right-0 bottom-0 w-[2px]"
                        style={{
                          backgroundColor:
                            plan.id === "base"
                              ? whiteColor
                              : plan.id === "studio"
                                ? "rgb(139, 92, 246)" // ultra
                                : "rgb(0, 194, 176)", // primary
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      />

                      {/* Bottom border */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{
                          backgroundColor:
                            plan.id === "base"
                              ? whiteColor
                              : plan.id === "studio"
                                ? "rgb(139, 92, 246)" // ultra
                                : "rgb(0, 194, 176)", // primary
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                      />

                      {/* Left border */}
                      <motion.div
                        className="absolute top-0 left-0 bottom-0 w-[2px]"
                        style={{
                          backgroundColor:
                            plan.id === "base"
                              ? whiteColor
                              : plan.id === "studio"
                                ? "rgb(139, 92, 246)" // ultra
                                : "rgb(0, 194, 176)", // primary
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                      />

                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        initial={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                        animate={{
                          boxShadow:
                            plan.id === "base"
                              ? `0 0 15px rgba(255, 255, 255, 0.6)` // White with 0.6 opacity
                              : plan.id === "studio"
                                ? "0 0 15px rgba(139, 92, 246, 0.5)" // ultra
                                : "0 0 15px rgba(0, 194, 176, 0.5)", // primary
                        }}
                        exit={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="bg-cardBg rounded-xl overflow-hidden flex flex-col h-full relative">
                  {/* Badge */}
                  {plan.badge && (
                    <div
                      className={`absolute top-[3px] right-[3px] ${plan.badge.bgColor} ${plan.badge.textColor} text-xs font-bold px-3 py-1 rounded-tr-none rounded-bl-xl rounded-br-md rounded-tl-md z-20`}
                    >
                      {plan.badge.text}
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-textSecondary mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span
                        className="text-5xl font-bold"
                        style={{
                          color:
                            plan.id === "base"
                              ? whiteColor
                              : plan.id === "studio"
                                ? "rgb(139, 92, 246)" // ultra
                                : "rgb(0, 194, 176)", // primary
                        }}
                      >
                        €{plan.price}
                      </span>
                      <span className="text-textTertiary ml-2">/month</span>
                    </div>
                    <p className="text-textTertiary mb-6">{plan.description}</p>

                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check
                            className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                            style={{
                              color:
                                plan.id === "base"
                                  ? whiteColor
                                  : plan.id === "studio"
                                    ? "rgb(139, 92, 246)" // ultra
                                    : "rgb(0, 194, 176)", // primary
                            }}
                          />
                          <span className="text-textTertiary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-8 pb-8 mt-auto">
                    {/* Button with hover effect */}
                    {plan.id === "base" ? (
                      <Link href="/register" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full py-2 px-4 rounded text-center text-xs font-medium border-white text-white hover:bg-white hover:text-black hover:border-white"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    ) : plan.id === "studio" ? (
                      <Link href="/register" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full py-2 px-4 rounded text-center text-xs font-medium border-ultra text-ultra hover:bg-ultra hover:text-white hover:border-ultra"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/register" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full py-2 px-4 rounded text-center text-xs font-medium border-primary text-primary hover:bg-primary hover:text-black hover:border-primary"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

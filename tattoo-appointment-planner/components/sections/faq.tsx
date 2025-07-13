"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedText } from "@/components/ui/animated-text"

export function FAQ() {
  const faqs = [
    {
      question: "What's the difference between the free plan and Artist Pro?",
      answer:
        "The free plan offers basic functionality for individual artists just getting started, with limitations on clients and portfolio images. Artist Pro includes advanced features like multiple artist management, inventory tracking, and custom branding, making it ideal for established artists and studios.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can change your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the change will take effect at the end of your current billing cycle.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a 14-day free trial for our Artist Base and Artist Pro plans. No credit card required to start your trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and SEPA direct debit for European customers.",
    },
    {
      question: "How many artists can I manage with the Studio plan?",
      answer:
        "The Artist Pro plan allows you to manage up to 5 artists. For larger studios, please contact our sales team for a custom solution.",
    },
    {
      question: "What happens to my data if I cancel my subscription?",
      answer:
        "Your data will be stored for 30 days after cancellation, giving you time to download any information you need. After 30 days, all personal data will be permanently deleted.",
    },
    {
      question: "Do you offer discounts for annual subscriptions?",
      answer: "Yes, you save 20% when choosing annual billing for any of our paid plans.",
    },
    {
      question: "Can I integrate InkCircle with my existing tools?",
      answer:
        "InkCircle offers integrations with popular calendar apps, payment processors, and accounting software. Check our integrations page for a full list.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-900/10 to-transparent"></div>
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-black/10 rounded-full filter blur-3xl"
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
          <AnimatedText text="Frequently Asked Questions" className="text-4xl font-bold text-white text-center mb-4" />

          <motion.p
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Find answers to common questions about our platform and services.
          </motion.p>

          <motion.div
            className="w-20 h-1 bg-teal-500 mx-auto mb-16"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 mb-4 transition-colors duration-300 hover:border-teal-500">
                <motion.button
                  className="w-full text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-textSecondary font-medium">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-5 w-5 text-primary" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-textTertiary border-t border-primary/10">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

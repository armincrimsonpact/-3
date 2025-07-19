"use client"
import { Instagram, Facebook, Twitter, ArrowUp, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedLink } from "@/components/ui/animated-link"
import { useState, useEffect } from "react"

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerSections = [
    {
      title: "Product",
      links: [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/integrations", label: "Integrations" },
        { href: "/api", label: "API" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
        { href: "/press", label: "Press" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/blog", label: "Blog" },
        { href: "/help", label: "Help Center" },
        { href: "/support", label: "Support" },
        { href: "/community", label: "Community" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms of Service" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/cookies", label: "Cookie Policy" },
        { href: "/security", label: "Security" },
      ],
    },
  ]

  const socialLinks = [
    { href: "https://twitter.com", icon: <Twitter size={20} />, label: "Twitter" },
    { href: "https://linkedin.com", icon: <Linkedin size={20} />, label: "LinkedIn" },
    { href: "https://facebook.com", icon: <Facebook size={20} />, label: "Facebook" },
    { href: "https://instagram.com", icon: <Instagram size={20} />, label: "Instagram" },
  ]

  return (
    <footer className="bg-aubergine-800 border-t border-aubergine-700 relative">
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 bg-gold-600 text-warm-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, backgroundColor: "#b8863a" }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-warm-50 font-bold text-lg mb-4 relative inline-block">
              Agentic Workflows
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gold-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h3>
            <p className="text-warm-100 mb-4">
              Transform your business processes with intelligent AI workflows that adapt, learn, and optimize your operations automatically.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-100 hover:text-gold-600 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
              viewport={{ once: true }}
            >
              <h3 className="text-warm-50 font-bold text-lg mb-4 relative inline-block">
                {section.title}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gold-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <AnimatedLink
                      href={link.href}
                      underlineStyle="slide"
                      underlineColor="bg-gold-600"
                      className="text-warm-100 hover:text-gold-600 transition-colors duration-300"
                    >
                      {link.label}
                    </AnimatedLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-aubergine-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-warm-100 text-center">
            &copy; {new Date().getFullYear()} Agentic Workflows. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

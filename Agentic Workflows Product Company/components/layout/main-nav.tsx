"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedLink } from "@/components/ui/animated-link"
import { HoverFillButton } from "@/components/ui/hover-fill-button"

export function MainNav() {
  const pathname = usePathname()
  const [showAboutDropdown, setShowAboutDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-warm-50/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-4"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-aubergine-700 text-2xl font-bold flex items-center">
          <motion.span
            className="text-gold-600 mr-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            ●
          </motion.span>
          Agentic Workflows
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 items-center">
          <AnimatedLink
            href="/"
            underlineStyle="slide"
            className={
              pathname === "/" ? "text-aubergine-700 font-medium text-base" : "text-charcoal-500 hover:text-aubergine-700 text-base"
            }
          >
            Home
          </AnimatedLink>

          <AnimatedLink
            href="/features"
            underlineStyle="slide"
            className={
              pathname === "/features"
                ? "text-aubergine-700 font-medium text-base"
                : "text-charcoal-500 hover:text-aubergine-700 text-base"
            }
          >
            Features
          </AnimatedLink>

          <AnimatedLink
            href="/pricing"
            underlineStyle="slide"
            className={
              pathname === "/pricing"
                ? "text-aubergine-700 font-medium text-base"
                : "text-charcoal-500 hover:text-aubergine-700 text-base"
            }
          >
            Pricing
          </AnimatedLink>

          <AnimatedLink
            href="/contact"
            underlineStyle="slide"
            className={
              pathname === "/contact"
                ? "text-aubergine-700 font-medium text-base"
                : "text-charcoal-500 hover:text-aubergine-700 text-base"
            }
          >
            Contact
          </AnimatedLink>

          <AnimatedLink href="/login" underlineStyle="slide" className="text-charcoal-500 hover:text-aubergine-700 text-base">
            Login
          </AnimatedLink>

          <HoverFillButton
            href="/register"
            variant="primary"
            size="sm"
            fillDirection="vertical"
            className="text-center"
            initiallyFilled={false}
          >
            Start Free Trial
          </HoverFillButton>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-aubergine-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-warm-50 border-t border-warm-200 absolute w-full left-0 right-0 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact" },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-2 ${pathname === item.href ? "text-aubergine-700 font-medium" : "text-charcoal-500 hover:text-aubergine-700"}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Link
                  href="/login"
                  className="block py-2 text-charcoal-500 hover:text-aubergine-700"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Link
                  href="/register"
                  className="block py-2 bg-gold-600 text-warm-50 rounded-lg text-center hover:bg-gold-700 transition-colors"
                >
                  Start Free Trial
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

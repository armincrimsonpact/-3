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
        scrolled ? "bg-black shadow-md py-3" : "bg-black py-4"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold flex items-center">
          <motion.span
            className="text-teal-500 mr-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            ●
          </motion.span>
          Your Brand
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 items-center">
          <AnimatedLink
            href="/"
            underlineStyle="slide"
            className={
              pathname === "/" ? "text-teal-500 font-medium text-base" : "text-white/80 hover:text-teal-500 text-base"
            }
          >
            Home
          </AnimatedLink>

          <AnimatedLink
            href="/about"
            underlineStyle="slide"
            className={
              pathname === "/about"
                ? "text-teal-500 font-medium text-base"
                : "text-white/80 hover:text-teal-500 text-base"
            }
          >
            About
          </AnimatedLink>

          <AnimatedLink
            href="/services"
            underlineStyle="slide"
            className={
              pathname === "/services"
                ? "text-teal-500 font-medium text-base"
                : "text-white/80 hover:text-teal-500 text-base"
            }
          >
            Services
          </AnimatedLink>

          <AnimatedLink
            href="/contact"
            underlineStyle="slide"
            className={
              pathname === "/contact"
                ? "text-teal-500 font-medium text-base"
                : "text-white/80 hover:text-teal-500 text-base"
            }
          >
            Contact
          </AnimatedLink>

          <AnimatedLink href="/login" underlineStyle="slide" className="text-white/80 hover:text-teal-500 text-base">
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
            Get Started
          </HoverFillButton>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white"
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
            className="md:hidden bg-black border-t border-gray-800 absolute w-full left-0 right-0 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
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
                    className={`block py-2 ${pathname === item.href ? "text-teal-500 font-medium" : "text-white/80 hover:text-teal-500"}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Link
                  href="/login"
                  className="block py-2 text-white/80 hover:text-teal-500"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Link
                  href="/register"
                  className="block py-2 bg-teal-500 text-white rounded-lg text-center hover:bg-teal-600 transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

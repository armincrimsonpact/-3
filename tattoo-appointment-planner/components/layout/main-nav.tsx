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
        <Link href="/home" className="text-white text-2xl font-bold flex items-center">
          <motion.span
            className="text-primary mr-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            ●
          </motion.span>
          InkCircle
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 items-center">
          <AnimatedLink
            href="/home"
            underlineStyle="slide"
            className={
              pathname === "/home" ? "text-primary font-medium text-base" : "text-white/80 hover:text-primary text-base"
            }
          >
            Home
          </AnimatedLink>

          {/* Temporarily hidden
          <AnimatedLink
            href="/artists"
            underlineStyle="slide"
            className={
              pathname === "/artists"
                ? "text-primary font-medium text-base"
                : "text-white/80 hover:text-primary text-base"
            }
          >
            Artists
          </AnimatedLink>

          <AnimatedLink
            href="/community"
            underlineStyle="slide"
            className={
              pathname === "/community"
                ? "text-primary font-medium text-base"
                : "text-white/80 hover:text-primary text-base"
            }
          >
            Community
          </AnimatedLink>
          */}

          <AnimatedLink
            href="/booking"
            underlineStyle="slide"
            className={
              pathname === "/booking"
                ? "text-primary font-medium text-base"
                : "text-white/80 hover:text-primary text-base"
            }
          >
            Booking
          </AnimatedLink>

          <div className="relative">
            <motion.button
              className="text-white/80 hover:text-primary flex items-center transition-colors duration-300 text-base"
              onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Us
              <motion.div animate={{ rotate: showAboutDropdown ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="ml-1 h-4 w-4" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {showAboutDropdown && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg py-1 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {[
                    { href: "/about-us", label: "About InkCircle" },
                    { href: "/about-us/our-mission", label: "Our Mission" },
                    { href: "/about-us/events", label: "Events" },
                    { href: "/about-us/careers", label: "Careers" },
                    { href: "/about-us/contact", label: "Contact" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm text-white/80 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        onClick={() => setShowAboutDropdown(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatedLink href="/login" underlineStyle="slide" className="text-white/80 hover:text-primary text-base">
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
            Register
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
                { href: "/home", label: "Home" },
                // { href: "/artists", label: "Artists" }, // Temporarily hidden
                // { href: "/community", label: "Community" }, // Temporarily hidden
                { href: "/booking", label: "Booking" },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-2 ${pathname === item.href ? "text-primary font-medium" : "text-white/80 hover:text-primary"}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <button
                  className="flex items-center justify-between w-full py-2 text-white/80 hover:text-primary"
                  onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${showAboutDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showAboutDropdown && (
                    <motion.div
                      className="pl-4 space-y-2 mt-2 border-l border-gray-800"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {[
                        { href: "/about-us", label: "About InkCircle" },
                        { href: "/about-us/our-mission", label: "Our Mission" },
                        { href: "/about-us/events", label: "Events" },
                        { href: "/about-us/careers", label: "Careers" },
                        { href: "/about-us/contact", label: "Contact" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link href={item.href} className="block py-2 text-sm text-white/80 hover:text-primary">
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                className="pt-4 flex flex-col space-y-3 border-t border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/login" className="block py-2 text-white/80 hover:text-primary">
                  Login
                </Link>

                <HoverFillButton
                  href="/register"
                  variant="primary"
                  size="sm"
                  fillDirection="vertical"
                  className="text-center py-2"
                  initiallyFilled={false}
                >
                  Register
                </HoverFillButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface HoverButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost" | "ultra"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export function HoverButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
}: HoverButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-black border border-primary hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,194,176,0.5)]"
      case "secondary":
        return "bg-cardBg text-textPrimary border border-textTertiary hover:bg-textTertiary/20 hover:border-textTertiary hover:shadow-[0_0_15px_rgba(170,181,175,0.3)]"
      case "outline":
        return "bg-transparent border border-primary text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_rgba(0,194,176,0.3)]"
      case "ghost":
        return "bg-transparent text-textPrimary hover:bg-cardBg hover:text-primary"
      case "ultra":
        return "bg-ultra text-white border border-ultra hover:bg-ultra/90 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
      default:
        return "bg-primary text-black border border-primary hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,194,176,0.5)]"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm px-3 py-1.5 rounded"
      case "md":
        return "px-4 py-2 rounded-md"
      case "lg":
        return "text-lg px-6 py-3 rounded-md"
      default:
        return "px-4 py-2 rounded-md"
    }
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden transition-all duration-200 ${getVariantClasses()} ${getSizeClasses()} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.span className="relative z-10 flex items-center justify-center">{children}</motion.span>
    </motion.button>
  )
}

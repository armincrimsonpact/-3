"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface HoverFillButtonProps {
  children: React.ReactNode
  variant?: "primary" | "ultra" | "outline" | "secondary"
  className?: string
  initiallyFilled?: boolean
  onClick?: () => void
  href?: string
  size?: "sm" | "md" | "lg"
  fillDirection?: "vertical" | "horizontal" | "diagonal"
}

export function HoverFillButton({
  children,
  variant = "primary",
  className,
  initiallyFilled = false,
  onClick,
  href,
  size = "md",
  fillDirection = "vertical",
}: HoverFillButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Determine if the button should appear filled based on hover state and initial state
  const shouldFill = isHovered !== initiallyFilled

  // Define the base styles for the button
  const baseStyles = "relative overflow-hidden font-medium rounded-md transition-all duration-200"

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-2.5 text-lg",
  }

  // Define variant-specific styles
  const variantStyles = {
    primary: "border border-primary text-primary hover:text-black",
    ultra: "border border-ultra text-ultra hover:text-white",
    outline: "border border-textPrimary text-textPrimary hover:text-black",
    secondary: "border border-textTertiary text-textTertiary hover:text-black",
  }

  // Define the fill animation styles based on direction
  const getFillStyles = () => {
    const baseTransform = shouldFill ? "scale-100" : "scale-0"

    switch (fillDirection) {
      case "horizontal":
        return `origin-left ${baseTransform === "scale-100" ? "scale-x-100" : "scale-x-0"}`
      case "diagonal":
        return `origin-bottom-left ${baseTransform}`
      case "vertical":
      default:
        return `origin-bottom ${baseTransform === "scale-100" ? "scale-y-100" : "scale-y-0"}`
    }
  }

  const fillColorStyles = {
    primary: "bg-primary",
    ultra: "bg-ultra",
    outline: "bg-textPrimary",
    secondary: "bg-textTertiary",
  }

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className={cn("absolute inset-0 transition-transform duration-300", fillColorStyles[variant], getFillStyles())}
      />
    </>
  )

  const buttonClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    "hover:translate-y-[-2px] active:translate-y-[1px] hover:shadow-[0_0_15px_rgba(0,194,176,0.3)]",
    className,
  )

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  )
}

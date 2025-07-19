"use client"

import type React from "react"
import { useState, useRef, type ReactNode } from "react"

interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost" | "ultra"
  rippleColor?: string
  disabled?: boolean
  size?: "sm" | "md" | "lg"
}

export function RippleButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  rippleColor,
  disabled = false,
  size = "md",
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const nextId = useRef(0)

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-black border border-primary hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,194,176,0.5)]"
      case "secondary":
        return "bg-cardBg text-textPrimary border border-textTertiary hover:bg-textTertiary/20 hover:border-textTertiary"
      case "outline":
        return "bg-transparent border border-primary text-primary hover:bg-primary/10 hover:border-primary"
      case "ghost":
        return "bg-transparent text-textPrimary hover:bg-cardBg hover:text-primary"
      case "ultra":
        return "bg-ultra text-white border border-ultra hover:bg-ultra/90 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
      default:
        return "bg-primary text-black border border-primary hover:bg-primary/90"
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

  const getDefaultRippleColor = () => {
    switch (variant) {
      case "primary":
        return "rgba(0, 194, 176, 0.3)"
      case "ultra":
        return "rgba(139, 92, 246, 0.3)"
      default:
        return "rgba(255, 255, 255, 0.3)"
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const size = Math.max(rect.width, rect.height) * 2

    // Add new ripple
    const id = nextId.current
    nextId.current += 1

    setRipples([...ripples, { x, y, size, id }])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((ripples) => ripples.filter((ripple) => ripple.id !== id))
    }, 1000)

    // Call onClick handler
    onClick?.()
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden transition-all duration-200 hover:translate-y-[-2px] active:translate-y-[1px] ${getVariantClasses()} ${getSizeClasses()} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            backgroundColor: rippleColor || getDefaultRippleColor(),
            transform: "scale(0)",
            animation: "ripple 1s linear",
          }}
        />
      ))}
      {children}
    </button>
  )
}

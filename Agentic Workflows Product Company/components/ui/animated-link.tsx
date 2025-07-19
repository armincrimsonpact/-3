"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type UnderlineStyle = "slide" | "grow" | "fade" | "elastic" | "none"

interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
  underlineStyle?: UnderlineStyle
  underlineHeight?: number
  underlineColor?: string
  duration?: number
  textHoverColor?: string
  onClick?: () => void
}

export function AnimatedLink({
  href,
  children,
  className,
  underlineStyle = "slide",
  underlineHeight = 2,
  underlineColor,
  duration = 0.3,
  textHoverColor,
  onClick,
}: AnimatedLinkProps) {
  // Config for different underline styles
  const underlineVariants = {
    slide: {
      initial: { width: "0%" },
      hover: { width: "100%" },
    },
    grow: {
      initial: { width: "40%", left: "30%", opacity: 0 },
      hover: { width: "100%", left: "0%", opacity: 1 },
    },
    fade: {
      initial: { opacity: 0, width: "100%" },
      hover: { opacity: 1, width: "100%" },
    },
    elastic: {
      initial: { scaleX: 0, originX: 0 },
      hover: { scaleX: 1, originX: 0 },
    },
    none: {
      initial: {},
      hover: {},
    },
  }

  // Set default underline color
  const finalUnderlineColor = underlineColor || "currentColor"

  return (
    <Link href={href} className={cn("relative inline-block group", className)} onClick={onClick}>
      <span
        className={cn(
          "relative inline-block transition-colors",
          textHoverColor ? `group-hover:text-[${textHoverColor}]` : "",
        )}
      >
        {children}

        {underlineStyle !== "none" && (
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] bg-current"
            initial="initial"
            whileHover="hover"
            animate="initial"
            variants={underlineVariants[underlineStyle]}
            transition={{ duration }}
            style={{
              height: underlineHeight,
              backgroundColor: finalUnderlineColor,
            }}
          />
        )}
      </span>
    </Link>
  )
}

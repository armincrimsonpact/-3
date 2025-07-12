"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"

type AnimationDirection = "up" | "down" | "left" | "right" | "none"
type AnimationType = "fade" | "slide" | "scale" | "rotate" | "flip" | "none"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  animation?: AnimationType
  direction?: AnimationDirection
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  animation = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getAnimationVariants = () => {
    const variants: any = {
      hidden: {},
      visible: {},
    }

    // Base opacity for fade
    if (animation === "fade" || animation === "slide") {
      variants.hidden.opacity = 0
      variants.visible.opacity = 1
    }

    // Direction based animations
    if (animation === "slide") {
      switch (direction) {
        case "up":
          variants.hidden.y = 50
          variants.visible.y = 0
          break
        case "down":
          variants.hidden.y = -50
          variants.visible.y = 0
          break
        case "left":
          variants.hidden.x = 50
          variants.visible.x = 0
          break
        case "right":
          variants.hidden.x = -50
          variants.visible.x = 0
          break
      }
    }

    // Scale animation
    if (animation === "scale") {
      variants.hidden.scale = 0.8
      variants.visible.scale = 1
    }

    // Rotate animation
    if (animation === "rotate") {
      variants.hidden.rotate = direction === "left" ? -10 : 10
      variants.visible.rotate = 0
    }

    // Flip animation
    if (animation === "flip") {
      if (direction === "up" || direction === "down") {
        variants.hidden.rotateX = direction === "down" ? 90 : -90
        variants.visible.rotateX = 0
      } else {
        variants.hidden.rotateY = direction === "right" ? -90 : 90
        variants.visible.rotateY = 0
      }
    }

    return variants
  }

  return (
    <motion.div
      ref={ref}
      className={cn("", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

"use client"

import { useEffect, useRef } from "react"

export function MousePattern() {
  // Use ref to track if the component is mounted
  const isMountedRef = useRef(false)

  useEffect(() => {
    // Prevent duplicate initialization
    if (isMountedRef.current) return
    isMountedRef.current = true

    // Check if the follower already exists (to prevent duplicates)
    const existingFollower = document.querySelector(".mouse-follower")
    if (existingFollower) return

    // Create the mouse follower element
    const follower = document.createElement("div")
    follower.className = "mouse-follower"
    follower.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      background: radial-gradient(circle, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0.03) 60%, transparent 100%);
      filter: blur(40px);
      transform: translate(-50%, -50%);
      will-change: transform;
      top: 0;
      left: 0;
    `
    document.body.appendChild(follower)

    // Function to update position
    const updatePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      })
    }

    // Add event listener
    document.addEventListener("mousemove", updatePosition)

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", updatePosition)
      if (document.body.contains(follower)) {
        document.body.removeChild(follower)
      }
      isMountedRef.current = false
    }
  }, [])

  // Return null since we're manipulating the DOM directly
  return null
}

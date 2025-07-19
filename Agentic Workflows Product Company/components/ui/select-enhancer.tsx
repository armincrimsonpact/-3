"use client"

import { useEffect } from "react"

export function SelectEnhancer() {
  useEffect(() => {
    const handleSelectMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName !== "SELECT") return

      document.body.classList.add("select-open")

      const styleTag = document.createElement("style")
      styleTag.id = "select-styles"
      styleTag.textContent = `
        option:hover {
          background-color: #134e4a !important;
          color: white !important;
        }
        
        select option {
          background-color: #1f2937;
          color: white;
          padding: 8px;
        }
        
        select option:hover {
          background-color: #134e4a !important;
          color: white !important;
        }
      `
      document.head.appendChild(styleTag)

      const cleanup = () => {
        document.body.classList.remove("select-open")
        const existingStyleTag = document.getElementById("select-styles")
        if (existingStyleTag) existingStyleTag.remove()
        window.removeEventListener("mouseup", cleanup)
      }

      window.addEventListener("mouseup", cleanup)
    }

    document.addEventListener("mousedown", handleSelectMouseDown)

    return () => {
      document.removeEventListener("mousedown", handleSelectMouseDown)
    }
  }, [])

  return null
}

"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type DropdownType = "artist" | "date" | "location" | "time" | null

interface DropdownContextType {
  openDropdown: DropdownType
  setOpenDropdown: (dropdown: DropdownType) => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

export function DropdownProvider({ children }: { children: ReactNode }) {
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null)

  return <DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>{children}</DropdownContext.Provider>
}

export function useDropdown() {
  const context = useContext(DropdownContext)
  if (context === undefined) {
    throw new Error("useDropdown must be used within a DropdownProvider")
  }
  return context
}

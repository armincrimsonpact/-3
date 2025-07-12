"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface AccountContextType {
  accountType: string
  accountTitle: string
  setAccountType: (type: string) => void
}

const AccountContext = createContext<AccountContextType>({
  accountType: "client",
  accountTitle: "Client Dashboard",
  setAccountType: () => {},
})

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountType, setAccountType] = useState("client")
  const [accountTitle, setAccountTitle] = useState("Client Dashboard")
  const pathname = usePathname()

  useEffect(() => {
    // Determine account type from URL path
    if (pathname.startsWith("/dashboard/client")) {
      setAccountType("client")
      setAccountTitle("Client Portal")
    } else if (pathname.startsWith("/dashboard/artist")) {
      setAccountType("artist")
      setAccountTitle("Artist Studio")
    } else if (pathname.startsWith("/dashboard/studio")) {
      setAccountType("studio")
      setAccountTitle("Studio Management")
    } else if (pathname.startsWith("/dashboard/admin")) {
      setAccountType("admin")
      setAccountTitle("Platform Administration")
    } else if (pathname === "/dashboard") {
      setAccountType("selection")
      setAccountTitle("Account Selection")
    } else {
      // Default fallback
      setAccountType("client")
      setAccountTitle("Client Portal")
    }
  }, [pathname])

  return (
    <AccountContext.Provider value={{ accountType, accountTitle, setAccountType }}>{children}</AccountContext.Provider>
  )
}

export const useAccount = () => useContext(AccountContext)

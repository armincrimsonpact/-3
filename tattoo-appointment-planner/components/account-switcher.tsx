"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

export function AccountSwitcher() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const accountTypes = [
    { id: "artist", name: "Artist Account" },
    { id: "client", name: "Client Account" },
    { id: "studio", name: "Studio Account" },
    { id: "admin", name: "Admin Account" },
  ]

  const handleAccountChange = (accountType: string) => {
    router.push(`/dashboard/${accountType}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-black hover:text-black/70">
        <span>Switch Account</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-teal-500/20 rounded-md shadow-lg z-10">
          <div className="py-1">
            {accountTypes.map((account) => (
              <button
                key={account.id}
                onClick={() => handleAccountChange(account.id)}
                className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-teal-500/10 hover:text-teal-500"
              >
                {account.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

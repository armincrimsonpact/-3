import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MousePattern } from "@/components/ui/mouse-pattern"
import { BackgroundPatterns } from "@/components/ui/background-patterns"
import { CookieConsent } from "@/components/cookie-consent"
import { SelectEnhancer } from "@/components/ui/select-enhancer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InkCircle - Tattoo Artist Platform",
  description: "Connect with tattoo artists, book appointments, and showcase your work",
  keywords: "tattoo, artist, booking, appointment, ink, studio",
  authors: [{ name: "InkCircle Team" }],
  robots: "index, follow",
  openGraph: {
    title: "InkCircle - Tattoo Artist Platform",
    description: "Connect with tattoo artists, book appointments, and showcase your work",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <MousePattern />
        <CookieConsent />
        <BackgroundPatterns />
        <SelectEnhancer />
        <div>{children}</div>
      </body>
    </html>
  )
}

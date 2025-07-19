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
  title: "Agentic Workflows - AI-Powered Workflow Automation",
  description: "Transform your business processes with intelligent AI workflows that adapt, learn, and optimize your operations automatically.",
  keywords: "AI workflows, automation, business process, intelligent automation, agentic AI, workflow optimization",
  authors: [{ name: "Agentic Workflows Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Agentic Workflows - AI-Powered Workflow Automation",
    description: "Transform your business processes with intelligent AI workflows that adapt, learn, and optimize your operations automatically.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-warm-300">
      <body className={`${inter.className} bg-warm-300 text-charcoal-500 min-h-screen`}>
        <MousePattern />
        <CookieConsent />
        <BackgroundPatterns />
        <SelectEnhancer />
        <div>{children}</div>
      </body>
    </html>
  )
}

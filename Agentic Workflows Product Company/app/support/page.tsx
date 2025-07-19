import Link from "next/link"
import { Search, Mail, MessageCircle, BookOpen, FileText, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="bg-teal-500 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/home" className="text-2xl font-bold text-black hover:text-black/80 transition-colors">
            InkCircle
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">How Can We Help You?</h1>
            <p className="text-xl text-gray-400">Find answers, get assistance, and contact our support team</p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full bg-[#111] border border-gray-800 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Get Support</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Email Support */}
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 text-center flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black border border-teal-500/30 text-teal-500 mb-4 mx-auto">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                <p className="text-gray-400 mb-4 flex-grow">Get a response within 24 hours to your support requests</p>
                <Button
                  className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black"
                  animation="ripple"
                >
                  Contact Support
                </Button>
              </div>

              {/* Live Chat */}
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 text-center flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black border border-teal-500/30 text-teal-500 mb-4 mx-auto">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                <p className="text-gray-400 mb-4 flex-grow">Chat with our support team during business hours</p>
                <Button
                  className="w-full bg-teal-500 text-black border border-teal-500 hover:bg-teal-600 hover:border-teal-600"
                  animation="ripple"
                >
                  Start Chat
                </Button>
              </div>

              {/* Phone Support */}
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 text-center flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black border border-teal-500/30 text-teal-500 mb-4 mx-auto">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone Support</h3>
                <p className="text-gray-400 mb-4 flex-grow">Available for premium and studio plans</p>
                <Button
                  className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black"
                  animation="ripple"
                >
                  +1 (800) INK-HELP
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Help Resources</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Documentation */}
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-teal-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Documentation</h3>
                </div>
                <p className="text-gray-400 mb-4">Comprehensive guides on using all InkCircle features</p>
                <ul className="space-y-2 mb-4 flex-grow">
                  <li className="text-teal-500 hover:text-teal-400">
                    <Link href="#" className="inline-flex items-center animated-underline">
                      Getting Started Guide
                    </Link>
                  </li>
                  <li className="text-teal-500 hover:text-teal-400">
                    <Link href="#" className="inline-flex items-center animated-underline">
                      Artist Features
                    </Link>
                  </li>
                  <li className="text-teal-500 hover:text-teal-400">
                    <Link href="#" className="inline-flex items-center animated-underline">
                      Studio Management
                    </Link>
                  </li>
                </ul>
                <Button variant="ghost" className="w-full hover:text-teal-500 mt-auto" animation="ripple">
                  View All Documentation
                </Button>
              </div>

              {/* FAQs */}
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-teal-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                <p className="text-gray-400 mb-4">Quick answers to common questions</p>
                <ul className="space-y-2 mb-4 flex-grow">
                  <li className="text-teal-500 hover:text-teal-400">
                    <Link href="#" className="inline-flex items-center animated-underline">
                      Account & Billing
                    </Link>
                  </li>
                  <li className="text-teal-500 hover:text-teal-400">
                    <Link href="#" className="inline-flex items-center animated-underline">
                      Booking Process
                    </Link>
                  </li>
                  <li className="text-teal-500 hover:text-teal-400">
                    <Link href="#" className="inline-flex items-center animated-underline">
                      Portfolio Management
                    </Link>
                  </li>
                </ul>
                <Button variant="ghost" className="w-full hover:text-teal-500 mt-auto" animation="ripple">
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 border-t border-gray-800">
        <p>© {new Date().getFullYear()} InkCircle. All rights reserved.</p>
      </footer>
    </div>
  )
}

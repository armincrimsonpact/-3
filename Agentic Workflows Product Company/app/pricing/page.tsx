import Link from "next/link"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PricingPage() {
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
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Choose Your Perfect Plan</h1>
            <p className="text-xl text-gray-400">
              Select the plan that fits your needs, whether you're an artist, studio, or client.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,176,0.2)] hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <div className="text-teal-500 text-4xl font-bold mb-4">$0</div>
              <p className="text-gray-400 mb-6">Perfect for clients looking to book appointments</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Book appointments</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Browse artist portfolios</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Community access</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <X className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Advanced booking features</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <X className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Button
                className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black"
                animation="ripple"
              >
                Get Started
              </Button>
            </div>

            {/* For Artist Plan */}
            <div className="bg-[#111] border border-teal-500/30 rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,176,0.3)] hover:-translate-y-1 relative">
              <div className="absolute top-0 right-0 bg-teal-500 text-black font-medium py-1 px-4 rounded-tr-xl rounded-bl-xl">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">For Artist</h3>
              <div className="text-teal-500 text-4xl font-bold mb-4">$29</div>
              <p className="text-gray-400 mb-6">For tattoo artists wanting to grow their business</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Portfolio showcase</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Booking management</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Client messaging</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Calendar integration</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Button
                className="w-full bg-teal-500 text-black border border-teal-500 hover:bg-teal-600 hover:border-teal-600"
                animation="ripple"
              >
                Start Free Trial
              </Button>
            </div>

            {/* For Studios Plan */}
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,176,0.2)] hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-2">For Studios</h3>
              <div className="text-teal-500 text-4xl font-bold mb-4">$99</div>
              <p className="text-gray-400 mb-6">Complete solution for tattoo studios and teams</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>All Artist features</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Multiple artist management</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Resource scheduling</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-teal-500 mr-2" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>

              <Button
                className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black"
                animation="ripple"
              >
                Contact Sales
              </Button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6 text-left">
              <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">Can I change plans later?</h3>
                <p className="text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </div>

              <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">Is there a contract or commitment?</h3>
                <p className="text-gray-400">
                  No long-term contracts. All paid plans are billed monthly and you can cancel anytime.
                </p>
              </div>

              <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">Do you offer custom enterprise plans?</h3>
                <p className="text-gray-400">
                  Yes, for larger studios or special requirements, please contact our sales team for a customized
                  solution.
                </p>
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

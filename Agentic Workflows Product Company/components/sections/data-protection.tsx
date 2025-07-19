import { Check, Shield } from "lucide-react"
import Link from "next/link"

export function DataProtection() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-black border border-teal-500/20 rounded-lg p-8 transition-colors duration-300 hover:border-teal-500">
          <h2 className="text-4xl font-bold text-white text-center mb-8">Your Data, Your Privacy</h2>
          <p className="text-gray-400 text-center mb-12 max-w-4xl mx-auto">
            At InkCircle, we take your privacy seriously. Our platform is built with security and data protection at
            its core, ensuring your personal information is always safe and secure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span className="text-gray-400">Encrypted data transmission</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span className="text-gray-400">Data storage in the EU</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span className="text-gray-400">Right to data access</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span className="text-gray-400">Right to data deletion</span>
            </div>
          </div>

          <p className="text-gray-400 mb-4">
            Our app also meets the special requirements for tattoo studios in Germany, including the documentation
            obligations according to the hygiene regulations of the federal states.
          </p>

          <Link href="/privacy" className="text-teal-500 hover:underline flex items-center">
            More about our privacy policy →
          </Link>
        </div>
      </div>
    </section>
  )
}

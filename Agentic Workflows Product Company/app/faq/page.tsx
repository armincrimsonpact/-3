import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { FAQ as FAQSection } from "@/components/sections/faq"

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">Frequently Asked Questions</h1>

          <p className="text-white text-lg mb-12 max-w-3xl">
            Find answers to common questions about InkCircle, our plans, and how our platform works. If you can't find
            what you're looking for, please don't hesitate to contact our support team.
          </p>

          <div className="mb-16">
            <FAQSection />
          </div>

          <div className="bg-black border border-teal-500/20 rounded-lg p-8 text-center transition-colors duration-300 hover:border-teal-500">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Contact us and we'll get back to you as soon as possible.
            </p>
            <a
              href="/about-us/contact"
              className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors inline-block"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

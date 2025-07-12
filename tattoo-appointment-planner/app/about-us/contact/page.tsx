"use client"

import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <MainNav />

      <main className="flex-1 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,176,0.08)_0,rgba(0,0,0,0)_70%)]" />

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          {/* Decorative corner elements */}
          <div className="absolute -top-8 -left-8 w-24 h-24 border-l-2 border-t-2 border-teal-500/30" />
          <div className="absolute -bottom-8 -right-8 w-24 h-24 border-r-2 border-b-2 border-teal-500/30" />

          <motion.h1
            className="text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>

          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-teal-500 to-teal-500/50 mb-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500/40 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center mr-3 group-hover:bg-teal-500/20 transition-all duration-300">
                  <Mail className="text-teal-500 w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Email</h2>
              </div>
              <p className="text-gray-400 mb-2">contact@inkcircle.com</p>
              <p className="text-gray-400">We typically respond within 24 hours.</p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500/40 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center mr-3 group-hover:bg-teal-500/20 transition-all duration-300">
                  <Phone className="text-teal-500 w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Phone</h2>
              </div>
              <p className="text-gray-400 mb-2">+49 30 1234567</p>
              <p className="text-gray-400">Available Monday-Friday, 9am-5pm CET</p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500/40 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center mr-3 group-hover:bg-teal-500/20 transition-all duration-300">
                  <MapPin className="text-teal-500 w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Office</h2>
              </div>
              <p className="text-gray-400 mb-2">Kreuzbergstraße 123</p>
              <p className="text-gray-400">10965 Berlin, Germany</p>
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Contact Departments
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(0,194,176,0.15)] hover:border-teal-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Sales</h3>
              <p className="text-gray-400 mb-4">
                Interested in our premium plans or need a custom solution for your studio? Our sales team is ready to
                help.
              </p>
              <div className="space-y-2">
                <p className="text-white flex items-center">
                  <Mail className="text-teal-500 w-4 h-4 mr-2" />
                  <span>sales@inkcircle.com</span>
                </p>
                <p className="text-white flex items-center">
                  <Phone className="text-teal-500 w-4 h-4 mr-2" />
                  <span>+49 30 1234567 (ext. 1)</span>
                </p>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(0,194,176,0.15)] hover:border-teal-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Customer Support</h3>
              <p className="text-gray-400 mb-4">
                Have questions about InkCircle or need general assistance? Our support team is here to help.
              </p>
              <div className="space-y-2">
                <p className="text-white flex items-center">
                  <Mail className="text-teal-500 w-4 h-4 mr-2" />
                  <span>info@inkcircle.com</span>
                </p>
                <p className="text-white flex items-center">
                  <Phone className="text-teal-500 w-4 h-4 mr-2" />
                  <span>+49 30 1234567 (ext. 2)</span>
                </p>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(0,194,176,0.15)] hover:border-teal-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-teal-500 mb-4">PR</h3>
              <p className="text-gray-400 mb-4">
                For media inquiries, press releases, or partnership opportunities, please reach out to our PR team.
              </p>
              <div className="space-y-2">
                <p className="text-white flex items-center">
                  <Mail className="text-teal-500 w-4 h-4 mr-2" />
                  <span>press@inkcircle.com</span>
                </p>
                <p className="text-white flex items-center">
                  <Phone className="text-teal-500 w-4 h-4 mr-2" />
                  <span>+49 30 1234567 (ext. 3)</span>
                </p>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(0,194,176,0.15)] hover:border-teal-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-teal-500 mb-4">HR</h3>
              <p className="text-gray-400 mb-4">
                Interested in joining our team? Contact our HR department for career opportunities.
              </p>
              <div className="space-y-2">
                <p className="text-white flex items-center">
                  <Mail className="text-teal-500 w-4 h-4 mr-2" />
                  <span>careers@inkcircle.com</span>
                </p>
                <p className="text-white flex items-center">
                  <Phone className="text-teal-500 w-4 h-4 mr-2" />
                  <span>+49 30 1234567 (ext. 4)</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-black border border-teal-500/20 rounded-lg p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Decorative corner elements for the form */}
            <div className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-teal-500/30" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-teal-500/30" />

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">
                Send Us a Message
              </span>
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-teal-500 transition-all duration-300 group-hover:border-gray-600"
                    placeholder="Your Name"
                  />
                  <div
                    className="absolute inset-0 rounded-md -z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "0 0 0 1px rgba(0, 194, 176, 0.3)" }}
                  />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-teal-500 transition-all duration-300 group-hover:border-gray-600"
                    placeholder="Email Address"
                  />
                  <div
                    className="absolute inset-0 rounded-md -z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "0 0 0 1px rgba(0, 194, 176, 0.3)" }}
                  />
                </div>
              </div>

              <div className="relative group">
                <select className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-teal-500 transition-all duration-300 group-hover:border-gray-600 appearance-none">
                  <option value="">Select a department</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="press">Press/Media</option>
                  <option value="careers">Careers</option>
                </select>
                <div
                  className="absolute inset-0 rounded-md -z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 0 1px rgba(0, 194, 176, 0.3)" }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  rows={5}
                  className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-teal-500 transition-all duration-300 group-hover:border-gray-600"
                  placeholder="Your Message"
                ></textarea>
                <div
                  className="absolute inset-0 rounded-md -z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 0 1px rgba(0, 194, 176, 0.3)" }}
                />
              </div>

              <div className="flex items-center">
                <Button
                  type="submit"
                  className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors flex items-center group"
                >
                  <span>Send Message</span>
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <div className="ml-4 text-gray-400 text-sm">We'll get back to you within 24 hours</div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

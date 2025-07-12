"use client"

import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">InkCircle Community</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-white text-lg mb-6">
                Welcome to the InkCircle community - a place where tattoo artists and enthusiasts come together to share
                ideas, showcase work, and connect with like-minded individuals.
              </p>
              <p className="text-white text-lg mb-6">
                Explore forums, resources, and events designed to help you grow as an artist or find the perfect design
                for your next tattoo.
              </p>
            </div>
            <div className="bg-black p-4 rounded-lg">
              <img src="/placeholder.svg?key=bjo0o" alt="InkCircle Community" className="w-full h-auto rounded" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Community Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Forums</h3>
              <p className="text-gray-400 mb-6">
                Join discussions on techniques, equipment, aftercare, and more. Get advice from experienced artists and
                share your knowledge.
              </p>
              <a href="/community/forums" className="text-teal-500 hover:underline">
                Explore Forums →
              </a>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Resources</h3>
              <p className="text-gray-400 mb-6">
                Access guides, tutorials, and articles on tattoo styles, techniques, and business practices.
              </p>
              <a href="/community/resources" className="text-teal-500 hover:underline">
                Browse Resources →
              </a>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Events</h3>
              <p className="text-gray-400 mb-6">
                Discover upcoming tattoo conventions, workshops, and meetups in your area or online.
              </p>
              <a href="/community/events" className="text-teal-500 hover:underline">
                Find Events →
              </a>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Featured Discussions</h2>

          <div className="bg-black overflow-hidden mb-16">
            <div className="border-b border-teal-500/20 p-6">
              <h3 className="text-2xl font-bold text-white">Latest from the Community</h3>
            </div>

            <div className="border-b border-teal-500/10 p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Tips for First-Time Clients</h4>
                  <p className="text-gray-400 mb-2">Started by Alex Morgan • 2 days ago • 24 replies</p>
                  <p className="text-gray-300">What advice do you give to clients getting their first tattoo?</p>
                </div>
                <a
                  href="/community/forums/first-time-tips"
                  className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                >
                  Join Discussion
                </a>
              </div>
            </div>

            <div className="border-b border-teal-500/10 p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Needle Recommendations for Fine Line Work</h4>
                  <p className="text-gray-400 mb-2">Started by Sophia Chen • 5 days ago • 18 replies</p>
                  <p className="text-gray-300">
                    Looking for recommendations on the best needles for detailed fine line work.
                  </p>
                </div>
                <a
                  href="/community/forums/needle-recommendations"
                  className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                >
                  Join Discussion
                </a>
              </div>
            </div>

            <div className="p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Berlin Tattoo Convention 2025 - Who's Going?</h4>
                  <p className="text-gray-400 mb-2">Started by Marcus Wolf • 1 week ago • 42 replies</p>
                  <p className="text-gray-300">Planning to attend the Berlin convention in June. Anyone else going?</p>
                </div>
                <a
                  href="/community/forums/berlin-convention"
                  className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                >
                  Join Discussion
                </a>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-500/5 rounded-lg" />

            <motion.div
              className="relative bg-black/80 backdrop-blur-sm border border-teal-500/30 rounded-lg p-12 text-center"
              whileHover={{
                boxShadow: "0 0 30px rgba(20, 184, 166, 0.3)",
                borderColor: "rgba(20, 184, 166, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Join the Conversation
              </motion.h3>

              <motion.p
                className="text-gray-300 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Connect with thousands of tattoo artists and enthusiasts. Share your work, get feedback, and be part of
                a supportive community that helps you grow as an artist or find your perfect tattoo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a
                  href="/register"
                  className="bg-teal-500 text-black px-8 py-4 rounded-md hover:bg-teal-400 transition-colors inline-block font-medium text-lg"
                >
                  Create an Account
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Search, MessageSquare, Eye, Clock } from "lucide-react"

export default function ForumsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">Community Forums</h1>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-3/4">
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 mb-8 transition-colors duration-300 hover:border-teal-500">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search forums..."
                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded focus:border-teal-500 focus:outline-none"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="bg-teal-500 text-black px-4 py-2 rounded">All Topics</button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Techniques
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Equipment
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Aftercare
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Business
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    General
                  </button>
                </div>
              </div>

              {/* Forum Categories */}
              <div className="space-y-8">
                {/* Techniques & Styles */}
                <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
                  <div className="bg-gray-900 p-4 border-b border-teal-500/20">
                    <h2 className="text-xl font-bold text-white">Techniques & Styles</h2>
                  </div>

                  <div className="divide-y divide-gray-800">
                    <div className="p-4 hover:bg-black/50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href="/community/forums/thread/1"
                            className="text-white font-medium hover:text-teal-500 transition-colors"
                          >
                            Tips for Fine Line Work
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">Started by Sophia Chen • 2 days ago</p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>24</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>142</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 hover:bg-black/50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href="/community/forums/thread/2"
                            className="text-white font-medium hover:text-teal-500 transition-colors"
                          >
                            Watercolor Techniques for Beginners
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">Started by Marcus Wolf • 5 days ago</p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>18</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>97</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 hover:bg-black/50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href="/community/forums/thread/3"
                            className="text-white font-medium hover:text-teal-500 transition-colors"
                          >
                            Japanese Style: Traditional vs Modern
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">Started by Alex Morgan • 1 week ago</p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>32</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>215</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipment & Supplies */}
                <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
                  <div className="bg-gray-900 p-4 border-b border-teal-500/20">
                    <h2 className="text-xl font-bold text-white">Equipment & Supplies</h2>
                  </div>

                  <div className="divide-y divide-gray-800">
                    <div className="p-4 hover:bg-black/50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href="/community/forums/thread/4"
                            className="text-white font-medium hover:text-teal-500 transition-colors"
                          >
                            Best Machines for Beginners
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">Started by Emma Roberts • 3 days ago</p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>42</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>278</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 hover:bg-black/50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href="/community/forums/thread/5"
                            className="text-white font-medium hover:text-teal-500 transition-colors"
                          >
                            Ink Recommendations for Vibrant Colors
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">Started by David Kim • 1 week ago</p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>29</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>183</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business & Marketing */}
                <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
                  <div className="bg-gray-900 p-4 border-b border-teal-500/20">
                    <h2 className="text-xl font-bold text-white">Business & Marketing</h2>
                  </div>

                  <div className="divide-y divide-gray-800">
                    <div className="p-4 hover:bg-black/50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href="/community/forums/thread/6"
                            className="text-white font-medium hover:text-teal-500 transition-colors"
                          >
                            Social Media Strategies for Tattoo Artists
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">Started by Luna Diaz • 4 days ago</p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>37</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>246</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 hover:bg-black/50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href="/community/forums/thread/7"
                            className="text-white font-medium hover:text-teal-500 transition-colors"
                          >
                            Pricing Your Work: A Discussion
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">Started by Thomas Berg • 2 weeks ago</p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>56</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>412</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/4">
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 mb-6 transition-colors duration-300 hover:border-teal-500">
                <h3 className="text-xl font-bold text-white mb-4">Forum Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Topics:</span>
                    <span className="text-white">1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Posts:</span>
                    <span className="text-white">8,732</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Members:</span>
                    <span className="text-white">3,567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Online Now:</span>
                    <span className="text-white">42</span>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-teal-500/20 rounded-lg p-6 mb-6 transition-colors duration-300 hover:border-teal-500">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div>
                    <Link
                      href="/community/forums/thread/8"
                      className="text-white font-medium hover:text-teal-500 transition-colors"
                    >
                      Aftercare Tips for Color Work
                    </Link>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/community/forums/thread/9"
                      className="text-white font-medium hover:text-teal-500 transition-colors"
                    >
                      Berlin Tattoo Convention 2025
                    </Link>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>45 minutes ago</span>
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/community/forums/thread/10"
                      className="text-white font-medium hover:text-teal-500 transition-colors"
                    >
                      Dealing with Difficult Clients
                    </Link>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
                <h3 className="text-xl font-bold text-white mb-4">Top Contributors</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img src="/placeholder.svg?key=2y1w8" alt="Alex Morgan" className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <p className="text-white font-medium">Alex Morgan</p>
                      <p className="text-gray-400 text-xs">324 posts</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src="/placeholder.svg?key=i5yu9" alt="Sophia Chen" className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <p className="text-white font-medium">Sophia Chen</p>
                      <p className="text-gray-400 text-xs">287 posts</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src="/placeholder.svg?key=pfw6b" alt="Marcus Wolf" className="w-8 h-8 rounded-full mr-3" />
                    <div>
                      <p className="text-white font-medium">Marcus Wolf</p>
                      <p className="text-gray-400 text-xs">253 posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Search, BookOpen, FileText, Video, Download } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">Resources</h1>

          <p className="text-white text-lg mb-12 max-w-3xl">
            Explore our collection of guides, tutorials, and articles to help you grow as a tattoo artist or learn more
            about the tattoo process as a client.
          </p>

          <div className="bg-black border border-teal-500/20 rounded-lg p-6 mb-12 transition-colors duration-300 hover:border-teal-500">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded focus:border-teal-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="bg-teal-500 text-black px-4 py-2 rounded">All Resources</button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                For Artists
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                For Clients
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Guides
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Videos
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Templates
              </button>
            </div>
          </div>

          {/* Featured Resources */}
          <h2 className="text-3xl font-bold text-white mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="relative">
                <img
                  src="/placeholder.svg?key=r6blz"
                  alt="Complete Tattoo Aftercare Guide"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-teal-500 text-black px-3 py-1 rounded text-sm font-bold">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <BookOpen className="h-5 w-5 text-teal-500 mr-2" />
                  <span className="text-gray-400 text-sm">Guide</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Complete Tattoo Aftercare Guide</h3>
                <p className="text-gray-400 mb-4">
                  Everything you need to know about caring for your new tattoo, from the first day to complete healing.
                </p>
                <Link
                  href="/community/resources/complete-tattoo-aftercare-guide"
                  className="text-teal-500 hover:underline flex items-center"
                >
                  Read Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="relative">
                <img
                  src="/placeholder.svg?key=fsxm5"
                  alt="Understanding Tattoo Styles"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <FileText className="h-5 w-5 text-teal-500 mr-2" />
                  <span className="text-gray-400 text-sm">Article</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Understanding Tattoo Styles</h3>
                <p className="text-gray-400 mb-4">
                  A comprehensive guide to different tattoo styles, their characteristics, and history.
                </p>
                <Link
                  href="/community/resources/understanding-tattoo-styles"
                  className="text-teal-500 hover:underline flex items-center"
                >
                  Read Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="relative">
                <img
                  src="/placeholder.svg?key=783h1"
                  alt="Pain Management During Sessions"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Video className="h-5 w-5 text-teal-500 mr-2" />
                  <span className="text-gray-400 text-sm">Video</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pain Management During Sessions</h3>
                <p className="text-gray-400 mb-4">
                  Tips and techniques for managing pain during tattoo sessions for both artists and clients.
                </p>
                <Link
                  href="/community/resources/pain-management-during-sessions"
                  className="text-teal-500 hover:underline flex items-center"
                >
                  Watch Video
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* For Artists */}
          <h2 className="text-3xl font-bold text-white mb-8">For Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Article</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Building Your Portfolio</h3>
              <p className="text-gray-400 mb-4">
                How to create a compelling portfolio that showcases your skills and attracts clients.
              </p>
              <Link
                href="/community/resources/building-your-portfolio"
                className="text-teal-500 hover:underline flex items-center"
              >
                Read Article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <Video className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Video</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Color Theory for Tattoo Artists</h3>
              <p className="text-gray-400 mb-4">
                Understanding color theory and how to apply it to create vibrant, long-lasting tattoos.
              </p>
              <Link
                href="/community/resources/color-theory-for-tattoo-artists"
                className="text-teal-500 hover:underline flex items-center"
              >
                Watch Video
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Guide</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Client Consultation Best Practices</h3>
              <p className="text-gray-400 mb-4">
                How to conduct effective consultations that lead to satisfied clients and successful tattoos.
              </p>
              <Link
                href="/community/resources/client-consultation-best-practices"
                className="text-teal-500 hover:underline flex items-center"
              >
                Read Guide
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <Download className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Template</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Client Release Form Template</h3>
              <p className="text-gray-400 mb-4">
                A customizable release form template that covers all legal aspects of tattooing.
              </p>
              <Link
                href="/community/resources/client-release-form-template"
                className="text-teal-500 hover:underline flex items-center"
              >
                Download Template
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* For Clients */}
          <h2 className="text-3xl font-bold text-white mb-8">For Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Guide</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">First Tattoo: What to Expect</h3>
              <p className="text-gray-400 mb-4">
                A comprehensive guide for first-time tattoo clients, covering everything from preparation to aftercare.
              </p>
              <Link
                href="/community/resources/first-tattoo-what-to-expect"
                className="text-teal-500 hover:underline flex items-center"
              >
                Read Guide
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Article</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">How to Choose the Right Artist</h3>
              <p className="text-gray-400 mb-4">
                Tips for finding an artist whose style and expertise match your vision.
              </p>
              <Link
                href="/community/resources/how-to-choose-the-right-artist"
                className="text-teal-500 hover:underline flex items-center"
              >
                Read Article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <Video className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Video</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tattoo Placement Considerations</h3>
              <p className="text-gray-400 mb-4">
                How to choose the right placement for your tattoo based on design, pain level, and lifestyle.
              </p>
              <Link
                href="/community/resources/tattoo-placement-considerations"
                className="text-teal-500 hover:underline flex items-center"
              >
                Watch Video
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-gray-400 text-sm">Article</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tattoo Budgeting: What to Expect</h3>
              <p className="text-gray-400 mb-4">
                Understanding tattoo pricing, tipping etiquette, and how to budget for your tattoo project.
              </p>
              <Link
                href="/community/resources/tattoo-budgeting-what-to-expect"
                className="text-teal-500 hover:underline flex items-center"
              >
                Read Article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

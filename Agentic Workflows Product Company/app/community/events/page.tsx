import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users, Filter } from "lucide-react"

export default function CommunityEventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">Community Events</h1>

          <p className="text-white text-lg mb-12 max-w-3xl">
            Discover tattoo conventions, workshops, meetups, and online events. Connect with fellow artists and
            enthusiasts, learn new techniques, and stay up-to-date with the latest trends.
          </p>

          <div className="bg-black border border-teal-500/20 rounded-lg p-6 mb-12 transition-colors duration-300 hover:border-teal-500">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-4 flex-1">
                <select className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:border-teal-500 focus:outline-none flex-1">
                  <option value="">All Event Types</option>
                  <option value="convention">Conventions</option>
                  <option value="workshop">Workshops</option>
                  <option value="meetup">Meetups</option>
                  <option value="online">Online Events</option>
                </select>
                <select className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:border-teal-500 focus:outline-none flex-1">
                  <option value="">All Locations</option>
                  <option value="berlin">Berlin</option>
                  <option value="hamburg">Hamburg</option>
                  <option value="munich">Munich</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <button className="flex items-center gap-2 bg-teal-500 text-black px-4 py-3 rounded hover:bg-teal-600 transition-colors">
                <Filter size={18} />
                <span>Filter Events</span>
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          <h2 className="text-3xl font-bold text-white mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Event 1 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=f2k9w"
                  alt="Berlin Tattoo Convention"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-teal-500 text-black px-3 py-1 rounded font-bold">Featured</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Berlin Tattoo Convention</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>June 15-17, 2025</span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Arena Berlin, Germany</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Join Europe's largest tattoo convention featuring over 300 artists from around the world, live
                  competitions, workshops, and entertainment.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>1,200+ attending</span>
                  </div>
                  <Link
                    href="/community/events/berlin-tattoo-convention"
                    className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=lq1my"
                  alt="Digital Marketing Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Digital Marketing for Tattoo Artists</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>July 8, 2025</span>
                </div>
                <div className="flex items-center text-gray-400 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>InkCircle HQ, Berlin & Online</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Learn how to grow your tattoo business online with our comprehensive workshop. Topics include
                  portfolio optimization, social media strategies, and using InkCircle to attract new clients.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>85 attending</span>
                  </div>
                  <Link
                    href="/community/events/digital-marketing-workshop"
                    className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=9lkpp"
                  alt="Future of Tattooing Panel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">The Future of Tattooing: Industry Panel</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>August 22, 2025</span>
                </div>
                <div className="flex items-center text-gray-400 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>7:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Virtual Event</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Join our CEO Sarah Müller and a panel of industry experts for a discussion on emerging trends,
                  technologies, and challenges in the tattoo industry.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>210 attending</span>
                  </div>
                  <Link
                    href="/community/events/future-of-tattooing-panel"
                    className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 4 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=zaddj"
                  alt="InkCircle Community Meetup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">InkCircle Community Meetup: Hamburg</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>September 5, 2025</span>
                </div>
                <div className="flex items-center text-gray-400 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>6:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Black Lotus Studio, Hamburg</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Network with fellow tattoo artists and the InkCircle team in a relaxed setting. Share experiences, get
                  personalized advice, and enjoy refreshments on us!
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>45 attending</span>
                  </div>
                  <Link
                    href="/community/events/hamburg-meetup"
                    className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Past Events */}
          <h2 className="text-3xl font-bold text-white mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-white mb-2">InkCircle Launch Party</h3>
              <div className="flex items-center text-gray-400 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>March 15, 2023</span>
              </div>
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Berlin, Germany</span>
              </div>
              <Link href="/community/events/launch-party" className="text-teal-500 hover:underline flex items-center">
                View Photos
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
              <h3 className="text-xl font-bold text-white mb-2">Paris Tattoo Convention</h3>
              <div className="flex items-center text-gray-400 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>September 22-24, 2024</span>
              </div>
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Paris, France</span>
              </div>
              <Link
                href="/community/events/paris-convention"
                className="text-teal-500 hover:underline flex items-center"
              >
                View Photos
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
              <h3 className="text-xl font-bold text-white mb-2">Tattoo Business Workshop</h3>
              <div className="flex items-center text-gray-400 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>November 10, 2024</span>
              </div>
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Online</span>
              </div>
              <Link
                href="/community/events/business-workshop"
                className="text-teal-500 hover:underline flex items-center"
              >
                Watch Recording
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

          {/* Submit Your Event */}
          <div className="bg-black border border-teal-500/20 rounded-lg p-8 text-center transition-colors duration-300 hover:border-teal-500">
            <h3 className="text-2xl font-bold text-white mb-4">Hosting an Event?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Submit your tattoo convention, workshop, or meetup to our community calendar and reach thousands of
              artists and enthusiasts.
            </p>
            <Link
              href="/community/events/submit"
              className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors inline-block"
            >
              Submit Your Event
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

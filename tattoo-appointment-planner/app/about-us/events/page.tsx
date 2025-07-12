import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">Events</h1>

          <p className="text-white text-lg mb-12 max-w-3xl">
            Connect with the InkCircle team at tattoo conventions, workshops, and industry events around the world. We
            love meeting artists and enthusiasts face-to-face and sharing our passion for the tattoo community.
          </p>

          <h2 className="text-3xl font-bold text-white mb-8">Upcoming Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=cy42b"
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
                  Join us at Europe's largest tattoo convention! The InkCircle team will be showcasing our latest
                  features and offering exclusive convention discounts. Stop by our booth for live demos and meet our
                  team of experts.
                </p>
                <Link
                  href="#"
                  className="inline-block bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=dt606"
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
                <Link
                  href="#"
                  className="inline-block bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                >
                  Register Now
                </Link>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=mjz6f"
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
                <Link
                  href="#"
                  className="inline-block bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                >
                  Register Now
                </Link>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="h-48 bg-[#4a6964] relative">
                <img
                  src="/placeholder.svg?key=iqx3p"
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
                <Link
                  href="#"
                  className="inline-block bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                >
                  RSVP
                </Link>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Past Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Link href="#" className="text-teal-500 hover:underline">
                View Photos
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
              <Link href="#" className="text-teal-500 hover:underline">
                View Photos
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
              <Link href="#" className="text-teal-500 hover:underline">
                Watch Recording
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

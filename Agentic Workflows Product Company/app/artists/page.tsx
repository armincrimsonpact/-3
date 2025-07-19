import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Filter, Search } from "lucide-react"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">Our Artists</h1>
              <p className="text-gray-400 max-w-2xl">
                Explore our talented artists and their unique styles. Find the perfect artist for your next tattoo and
                book a consultation directly through their profile.
              </p>
            </div>
            <Link
              href="/booking"
              className="mt-6 md:mt-0 bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
            >
              Book an Appointment
            </Link>
          </div>

          {/* Search and Filter - Border removed */}
          <div className="bg-black p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by artist name or style..."
                  className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded hover:bg-gray-700 transition-colors">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
                <select className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:border-teal-500 focus:outline-none">
                  <option value="">All Styles</option>
                  <option value="traditional">Traditional</option>
                  <option value="realism">Realism</option>
                  <option value="blackwork">Blackwork</option>
                  <option value="japanese">Japanese</option>
                  <option value="watercolor">Watercolor</option>
                  <option value="geometric">Geometric</option>
                </select>
              </div>
            </div>
          </div>

          {/* Featured Artists */}
          <h2 className="text-3xl font-bold text-white mb-8">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Artist 1 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <div className="relative">
                <img src="/placeholder.svg?key=d2occ" alt="Alex Morgan" className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 bg-teal-500 text-black px-3 py-1 rounded text-sm font-bold">
                  Featured
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Alex Morgan</h3>
                    <p className="text-teal-500 mb-4">Realism & Portrait Specialist</p>
                  </div>
                  <div className="bg-gray-800 rounded-full h-12 w-12 flex items-center justify-center">
                    <span className="text-white font-bold">AM</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">
                  With over 10 years of experience, Alex specializes in hyper-realistic portraits and nature scenes.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Realism</span>
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Portraits</span>
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Black & Grey</span>
                </div>
                <div className="flex gap-4 mt-auto">
                  <Link
                    href="/artists/alex-morgan"
                    className="flex-1 text-center border border-white text-white py-2 rounded hover:bg-white hover:text-black transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/booking?artist=alex-morgan"
                    className="flex-1 text-center bg-teal-500 text-black border border-teal-500 py-2 rounded hover:bg-teal-600 hover:border-teal-600 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Artist 2 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <div className="relative">
                <img src="/placeholder.svg?key=anvtn" alt="Sophia Chen" className="w-full h-64 object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Sophia Chen</h3>
                    <p className="text-teal-500 mb-4">Watercolor & Abstract</p>
                  </div>
                  <div className="bg-gray-800 rounded-full h-12 w-12 flex items-center justify-center">
                    <span className="text-white font-bold">SC</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">
                  Sophia creates stunning watercolor pieces that blend vibrant colors with abstract elements.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Watercolor</span>
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Abstract</span>
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Colorful</span>
                </div>
                <div className="flex gap-4 mt-auto">
                  <Link
                    href="/artists/sophia-chen"
                    className="flex-1 text-center border border-white text-white py-2 rounded hover:bg-white hover:text-black transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/booking?artist=sophia-chen"
                    className="flex-1 text-center bg-teal-500 text-black border border-teal-500 py-2 rounded hover:bg-teal-600 hover:border-teal-600 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Artist 3 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <div className="relative">
                <img src="/placeholder.svg?key=mjmpv" alt="Marcus Wolf" className="w-full h-64 object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Marcus Wolf</h3>
                    <p className="text-teal-500 mb-4">Traditional & Neo-Traditional</p>
                  </div>
                  <div className="bg-gray-800 rounded-full h-12 w-12 flex items-center justify-center">
                    <span className="text-white font-bold">MW</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">
                  Marcus specializes in bold, colorful traditional tattoos with a modern twist.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Traditional</span>
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Neo-Traditional</span>
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Bold</span>
                </div>
                <div className="flex gap-4 mt-auto">
                  <Link
                    href="/artists/marcus-wolf"
                    className="flex-1 text-center border border-white text-white py-2 rounded hover:bg-white hover:text-black transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/booking?artist=marcus-wolf"
                    className="flex-1 text-center bg-teal-500 text-black border border-teal-500 py-2 rounded hover:bg-teal-600 hover:border-teal-600 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* All Artists */}
          <h2 className="text-3xl font-bold text-white mb-8">All Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Artist Card 1 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/placeholder.svg?key=wki0k" alt="Emma Roberts" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">Emma Roberts</h3>
                <p className="text-teal-500 text-sm mb-2">Blackwork & Dotwork</p>
                <Link
                  href="/artists/emma-roberts"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Artist Card 2 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/placeholder.svg?key=hgla3" alt="David Kim" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">David Kim</h3>
                <p className="text-teal-500 text-sm mb-2">Japanese & Oriental</p>
                <Link
                  href="/artists/david-kim"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Artist Card 3 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/colorful-hair-tattoo-artist.png" alt="Luna Diaz" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">Luna Diaz</h3>
                <p className="text-teal-500 text-sm mb-2">New School & Illustrative</p>
                <Link
                  href="/artists/luna-diaz"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Artist Card 4 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/placeholder.svg?key=ubr0x" alt="Thomas Berg" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">Thomas Berg</h3>
                <p className="text-teal-500 text-sm mb-2">Geometric & Minimalist</p>
                <Link
                  href="/artists/thomas-berg"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Artist Card 5 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/placeholder.svg?key=3z6bf" alt="Olivia Santos" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">Olivia Santos</h3>
                <p className="text-teal-500 text-sm mb-2">Fine Line & Delicate</p>
                <Link
                  href="/artists/olivia-santos"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Artist Card 6 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/placeholder.svg?key=rnc5y" alt="Jack Miller" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">Jack Miller</h3>
                <p className="text-teal-500 text-sm mb-2">American Traditional</p>
                <Link
                  href="/artists/jack-miller"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Artist Card 7 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/placeholder.svg?key=yc8rv" alt="Nina Patel" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">Nina Patel</h3>
                <p className="text-teal-500 text-sm mb-2">Ornamental & Mandala</p>
                <Link
                  href="/artists/nina-patel"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Artist Card 8 */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-teal-500">
              <img src="/placeholder.svg?key=nnm98" alt="Leo Schmidt" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">Leo Schmidt</h3>
                <p className="text-teal-500 text-sm mb-2">Surrealism & Dark Art</p>
                <Link
                  href="/artists/leo-schmidt"
                  className="text-white text-sm hover:text-teal-500 transition-colors mt-auto"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <button className="bg-gray-800 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                &lt;
              </button>
              <button className="bg-teal-500 text-black w-10 h-10 rounded flex items-center justify-center">1</button>
              <button className="bg-gray-800 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                2
              </button>
              <button className="bg-gray-800 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                3
              </button>
              <button className="bg-gray-800 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

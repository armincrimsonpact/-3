import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">About InkCircle</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-white text-lg mb-6">
                Founded in 2020, InkCircle has quickly grown to become the leading platform for tattoo artists and
                studios across Europe. What started as a simple booking tool has evolved into a comprehensive management
                system that helps tattoo professionals streamline their business and focus on their art.
              </p>
              <p className="text-white text-lg mb-6">
                Our mission is to elevate the tattoo industry by providing professional tools that help artists focus on
                their craft while growing their business.
              </p>
              <p className="text-white text-lg">
                Based in Berlin, our team combines expertise in technology, design, and the tattoo industry to create
                solutions that address the unique needs of tattoo professionals and enthusiasts alike.
              </p>
            </div>
            <div className="bg-[#4a6964] p-4 rounded-lg">
              <img
                src="/modern-team-office.png"
                alt="InkCircle headquarters in Berlin"
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Our Leadership Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="bg-[#4a6964] p-3">
                <img src="/ceo-headshot.png" alt="Sarah Müller, CEO" className="w-full h-auto rounded" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">Sarah Müller</h3>
                <p className="text-teal-500 mb-4">CEO & Co-Founder</p>
                <p className="text-gray-400">
                  Former tattoo artist with 15 years of experience who recognized the need for better business tools in
                  the industry.
                </p>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="bg-[#4a6964] p-3">
                <img src="/cto-headshot.png" alt="Markus Weber, CTO" className="w-full h-auto rounded" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">Markus Weber</h3>
                <p className="text-teal-500 mb-4">CTO & Co-Founder</p>
                <p className="text-gray-400">
                  Tech visionary with a background in developing booking systems for the hospitality industry.
                </p>
              </div>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="bg-[#4a6964] p-3">
                <img src="/coo-headshot.png" alt="Lisa Schmidt, COO" className="w-full h-auto rounded" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">Lisa Chen</h3>
                <p className="text-teal-500 mb-4">COO</p>
                <p className="text-gray-400">
                  Operations expert who previously managed a chain of successful tattoo studios across Germany.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 text-center h-full flex flex-col">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Artistic Integrity</h3>
              <p className="text-gray-400">
                We believe in empowering artists to express their creativity while maintaining the highest standards of
                professionalism. Our platform is designed to enhance the artistic process, not replace it.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 text-center h-full flex flex-col">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Innovation</h3>
              <p className="text-gray-400">
                We're constantly exploring new technologies and approaches to improve the tattoo experience for both
                artists and clients. We embrace change and adapt quickly to the evolving needs of the industry.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 text-center h-full flex flex-col">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Community</h3>
              <p className="text-gray-400">
                We're building more than just a platform – we're creating a community where artists can connect, share
                knowledge, and support each other's growth. We believe in the power of collaboration.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500 text-center h-full flex flex-col">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Inclusivity</h3>
              <p className="text-gray-400">
                We're committed to creating a welcoming environment for artists and clients from all backgrounds. We
                celebrate diversity and strive to make the tattoo industry more accessible to everyone.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Explore More About Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/about-us/our-mission" className="block">
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500 transition-colors text-center h-full flex flex-col">
                <h3 className="text-xl font-bold text-teal-500 mb-2">Our Mission</h3>
                <p className="text-gray-400">Discover our vision for the future of the tattoo industry.</p>
              </div>
            </Link>

            <Link href="/about-us/events" className="block">
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500 transition-colors text-center h-full flex flex-col">
                <h3 className="text-xl font-bold text-teal-500 mb-2">Events</h3>
                <p className="text-gray-400">Find out about upcoming tattoo conventions and InkCircle workshops.</p>
              </div>
            </Link>

            <Link href="/about-us/careers" className="block">
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500 transition-colors text-center h-full flex flex-col">
                <h3 className="text-xl font-bold text-teal-500 mb-2">Careers</h3>
                <p className="text-gray-400">Join our team and help shape the future of tattoo management.</p>
              </div>
            </Link>

            <Link href="/about-us/contact" className="block">
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500 transition-colors text-center h-full flex flex-col">
                <h3 className="text-xl font-bold text-teal-500 mb-2">Contact</h3>
                <p className="text-gray-400">Get in touch with our team for sales, support, or press inquiries.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

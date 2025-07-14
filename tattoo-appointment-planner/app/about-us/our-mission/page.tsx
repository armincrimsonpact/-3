import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"

export default function OurMissionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">Our Mission</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-white text-lg mb-6">
                At InkCircle, our mission is to elevate the tattoo industry by providing professional tools that help
                artists focus on their craft while growing their business.
              </p>
              <p className="text-white text-lg mb-6">
                We believe that tattoo artists deserve the same level of professional tools and support as any other
                creative industry. By streamlining the business side of tattooing, we enable artists to dedicate more
                time to what they do best: creating art.
              </p>
              <p className="text-white text-lg">
                Our platform is designed to bridge the gap between artists and clients, making it easier for people to
                find the perfect artist for their vision and for artists to connect with clients who appreciate their
                unique style.
              </p>
            </div>
            <div className="bg-black border border-teal-500/20 rounded-lg p-4 transition-colors duration-300 hover:border-teal-500">
              <img
                src="/tattoo-artist.jpg"
                alt="Tattoo artist focused on their work"
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Our Vision for the Future</h2>

          <div className="bg-black border border-teal-500/20 rounded-lg p-8 mb-16 transition-colors duration-300 hover:border-teal-500">
            <p className="text-white text-lg mb-6">We envision a future where:</p>
            <ul className="space-y-4 text-white text-lg mb-6">
              <li className="flex">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  Every tattoo artist has access to professional tools that help them manage their business efficiently.
                </span>
              </li>
              <li className="flex">
                <span className="text-teal-500 mr-2">•</span>
                <span>Clients can easily find artists whose style matches their vision, regardless of location.</span>
              </li>
              <li className="flex">
                <span className="text-teal-500 mr-2">•</span>
                <span>The tattoo industry is recognized and respected as a professional creative field.</span>
              </li>
              <li className="flex">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  Technology enhances the tattoo experience without replacing the human connection that makes it
                  special.
                </span>
              </li>
              <li className="flex">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  Tattoo studios of all sizes can thrive by focusing on their art rather than administrative tasks.
                </span>
              </li>
            </ul>
            <p className="text-white text-lg">
              We're working every day to make this vision a reality, and we're grateful to the thousands of artists and
              clients who have joined us on this journey.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Our Commitments</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">To Artists</h3>
              <p className="text-gray-400">
                We commit to providing tools that respect your creative process and help you build a sustainable
                business. We'll never compromise on quality or try to standardize what makes your work unique.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">To Clients</h3>
              <p className="text-gray-400">
                We commit to creating a platform that helps you find the perfect artist for your vision, with
                transparent information and a seamless booking process that respects both your time and the artist's.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">To the Industry</h3>
              <p className="text-gray-400">
                We commit to elevating the tattoo industry as a whole, advocating for professional standards and
                recognition while preserving the unique culture and artistic integrity that makes tattooing special.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-white mb-8">Careers at InkCircle</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-white text-lg mb-6">
                Join our team and help shape the future of the tattoo industry. At InkCircle, we're building innovative
                solutions that empower tattoo artists and studios to focus on their craft while growing their business.
              </p>
              <p className="text-white text-lg mb-6">
                We're a diverse team of developers, designers, and tattoo industry experts who are passionate about
                creating technology that makes a real difference in people's lives and businesses.
              </p>
              <p className="text-white text-lg">
                If you're excited about the intersection of technology and art, and want to be part of a fast-growing
                startup with a mission you can believe in, we'd love to hear from you.
              </p>
            </div>
            <div className="bg-black border border-teal-500/20 rounded-lg p-4 transition-colors duration-300 hover:border-teal-500">
              <img
                src="/diverse-team-office.png"
                alt="The InkCircle team at work"
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Why Work With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Meaningful Work</h3>
              <p className="text-gray-400">
                Your work will directly impact thousands of tattoo artists and studios, helping them build sustainable
                businesses and focus on their creative passion.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Growth & Development</h3>
              <p className="text-gray-400">
                We invest in our team's professional growth with learning budgets, mentorship opportunities, and clear
                career progression paths.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Work-Life Balance</h3>
              <p className="text-gray-400">
                We believe in sustainable work practices with flexible hours, remote work options, and generous vacation
                policies that encourage rest and creativity.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Inclusive Culture</h3>
              <p className="text-gray-400">
                We're building a diverse team where everyone feels welcome and valued. We celebrate different
                perspectives and believe they make our product and company stronger.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Competitive Benefits</h3>
              <p className="text-gray-400">
                We offer competitive salaries, equity options, health insurance, retirement plans, and other benefits to
                ensure our team is well-supported.
              </p>
            </div>

            <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
              <h3 className="text-xl font-bold text-teal-500 mb-4">Creative Environment</h3>
              <p className="text-gray-400">
                Our Berlin office is designed to inspire creativity, with art-filled spaces, collaborative areas, and
                quiet zones for focused work.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>

          <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden mb-16 transition-colors duration-300 hover:border-teal-500">
            <div className="border-b border-teal-500/20 p-6">
              <h3 className="text-2xl font-bold text-white">Engineering</h3>
            </div>

            <div className="border-b border-teal-500/10 p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Senior Frontend Developer</h4>
                  <p className="text-gray-400 mb-2">Berlin, Germany (Hybrid)</p>
                  <div className="flex space-x-2">
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">TypeScript</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Next.js</span>
                  </div>
                </div>
                <Link href="#" className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                  Apply
                </Link>
              </div>
            </div>

            <div className="border-b border-teal-500/10 p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Backend Developer</h4>
                  <p className="text-gray-400 mb-2">Remote (EU)</p>
                  <div className="flex space-x-2">
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Node.js</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">PostgreSQL</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">AWS</span>
                  </div>
                </div>
                <Link href="#" className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                  Apply
                </Link>
              </div>
            </div>

            <div className="p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Mobile Developer (iOS/Android)</h4>
                  <p className="text-gray-400 mb-2">Berlin, Germany (On-site)</p>
                  <div className="flex space-x-2">
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">React Native</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Swift</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Kotlin</span>
                  </div>
                </div>
                <Link href="#" className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                  Apply
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden mb-16 transition-colors duration-300 hover:border-teal-500">
            <div className="border-b border-teal-500/20 p-6">
              <h3 className="text-2xl font-bold text-white">Design</h3>
            </div>

            <div className="border-b border-teal-500/10 p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">UI/UX Designer</h4>
                  <p className="text-gray-400 mb-2">Berlin, Germany (Hybrid)</p>
                  <div className="flex space-x-2">
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Figma</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">User Research</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Design Systems</span>
                  </div>
                </div>
                <Link href="#" className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                  Apply
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden mb-16 transition-colors duration-300 hover:border-teal-500">
            <div className="border-b border-teal-500/20 p-6">
              <h3 className="text-2xl font-bold text-white">Marketing & Sales</h3>
            </div>

            <div className="border-b border-teal-500/10 p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Content Marketing Manager</h4>
                  <p className="text-gray-400 mb-2">Remote (EU)</p>
                  <div className="flex space-x-2">
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Content Strategy</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">SEO</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">Social Media</span>
                  </div>
                </div>
                <Link href="#" className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                  Apply
                </Link>
              </div>
            </div>

            <div className="p-6 hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Sales Representative</h4>
                  <p className="text-gray-400 mb-2">Berlin, Germany (Hybrid)</p>
                  <div className="flex space-x-2">
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">B2B Sales</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">CRM</span>
                    <span className="bg-teal-500/20 text-teal-500 px-2 py-1 rounded text-xs">German Speaker</span>
                  </div>
                </div>
                <Link href="#" className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                  Apply
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black border border-teal-500/20 rounded-lg p-8 text-center transition-colors duration-300 hover:border-teal-500">
            <h3 className="text-2xl font-bold text-white mb-4">Don't see the right position?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and tell us why you'd
              be a great fit for InkCircle.
            </p>
            <Link
              href="/about-us/contact"
              className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

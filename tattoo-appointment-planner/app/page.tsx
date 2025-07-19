import { Footer } from "@/components/layout/footer"
import { MainNav } from "@/components/layout/main-nav"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <MainNav />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal animation="fade" direction="up">
            <h1 className="text-6xl font-bold mb-6">
              Welcome to Your
              <span className="text-teal-500"> Next.js</span> Template
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              A modern, responsive web application built with Next.js, TypeScript, and Tailwind CSS.
              Start building your next great project with this clean, professional template.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Started
              </button>
              <button className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade" direction="up">
            <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500 transition-colors">
                <h3 className="text-xl font-bold text-teal-500 mb-4">Modern Stack</h3>
                <p className="text-gray-400">
                  Built with Next.js 15, React 19, TypeScript, and Tailwind CSS for a modern development experience.
                </p>
              </div>
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500 transition-colors">
                <h3 className="text-xl font-bold text-teal-500 mb-4">Responsive Design</h3>
                <p className="text-gray-400">
                  Fully responsive design that looks great on all devices, from mobile to desktop.
                </p>
              </div>
              <div className="bg-black border border-teal-500/20 rounded-lg p-6 hover:border-teal-500 transition-colors">
                <h3 className="text-xl font-bold text-teal-500 mb-4">Performance Optimized</h3>
                <p className="text-gray-400">
                  Optimized for speed and performance with modern web technologies and best practices.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade" direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">About This Template</h2>
                <p className="text-gray-400 text-lg mb-6">
                  This template provides a solid foundation for building modern web applications. 
                  It includes all the essential components and configurations you need to get started quickly.
                </p>
                <p className="text-gray-400 text-lg">
                  Customize the design, add your content, and build something amazing. 
                  The modular structure makes it easy to extend and maintain.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-teal-500 mb-4">What's Included</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Next.js 15 with App Router</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Framer Motion for animations</li>
                  <li>• Responsive navigation</li>
                  <li>• SEO optimized</li>
                  <li>• Performance optimized</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

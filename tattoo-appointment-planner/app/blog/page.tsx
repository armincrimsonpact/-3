import Link from "next/link"
import Image from "next/image"
import { CalendarDays, User, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Evolution of Tattoo Art in the Digital Age",
    excerpt: "How technology is changing the way tattoo artists work and connect with clients.",
    image: "/placeholder.svg?key=c3jn9",
    category: "Industry Trends",
    author: "Alex Morgan",
    date: "May 10, 2023",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Best Practices for Tattoo Aftercare",
    excerpt: "Expert advice on taking care of your new tattoo to ensure the best possible healing.",
    image: "/placeholder.svg?key=hol5l",
    category: "Client Tips",
    author: "Sam Rivera",
    date: "April 22, 2023",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "How to Grow Your Tattoo Business on Social Media",
    excerpt: "Marketing strategies for tattoo artists looking to expand their reach online.",
    image: "/placeholder.svg?key=qf68x",
    category: "Business",
    author: "Jamie Chen",
    date: "April 15, 2023",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Innovations in Tattoo Machines and Technology",
    excerpt: "A look at the latest advancements in tattoo equipment and how they impact artistry.",
    image: "/placeholder.svg?key=kkygs",
    category: "Technology",
    author: "Jordan Taylor",
    date: "March 30, 2023",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "From Concept to Skin: The Tattoo Design Process",
    excerpt: "A behind-the-scenes look at how tattoo artists create custom designs for clients.",
    image: "/placeholder.svg?key=0jli1",
    category: "Creative Process",
    author: "Riley Johnson",
    date: "March 18, 2023",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "The Business Side of Running a Tattoo Studio",
    excerpt: "Essential tips for managing the financial and operational aspects of a tattoo business.",
    image: "/placeholder.svg?key=m6r0j",
    category: "Studio Management",
    author: "Casey Williams",
    date: "March 5, 2023",
    readTime: "9 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="bg-teal-500 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/home" className="text-2xl font-bold text-black hover:text-black/80 transition-colors">
            InkCircle
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">InkCircle Blog</h1>
            <p className="text-xl text-gray-400">Insights, tips, and inspiration for tattoo artists and enthusiasts</p>
          </div>

          <div className="mb-16">
            {/* Featured Post */}
            <div className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto">
                  <Image
                    src="/placeholder.svg?key=sf01r"
                    alt="Featured tattoo artist working in studio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-xs font-medium text-teal-500 mb-2">FEATURED POST</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    The Future of Tattooing: Trends to Watch in 2023
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Explore the emerging trends that are shaping the tattoo industry, from innovative techniques to
                    changing client preferences and technological advancements.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Taylor Kim</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>June 1, 2023</span>
                    </div>
                    <div className="ml-4">12 min read</div>
                  </div>
                  <Button
                    asChild
                    className="self-start bg-teal-500 text-black border border-teal-500 hover:bg-teal-600 hover:border-teal-600"
                    animation="ripple"
                  >
                    <Link href="/blog/future-of-tattooing" className="flex items-center">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-black border border-teal-500/20 rounded-lg overflow-hidden transition-colors duration-300 hover:border-teal-500 flex flex-col h-full"
              >
                <div className="relative aspect-video">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-medium text-teal-500 mb-2">{post.category.toUpperCase()}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    <Link href={`/blog/${post.id}`} className="hover:text-teal-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="ml-4">{post.readTime}</div>
                  </div>
                  <Button asChild variant="ghost" className="px-0 mt-auto" animation="ripple">
                    <Link href={`/blog/${post.id}`} className="flex items-center text-teal-500 hover:text-teal-400">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="max-w-4xl mx-auto bg-black border border-teal-500/20 rounded-lg p-8 transition-colors duration-300 hover:border-teal-500">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-gray-400">
                Get the latest tattoo industry news, tips, and updates delivered to your inbox
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-black border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                required
              />
              <Button
                type="submit"
                className="bg-teal-500 text-black border border-teal-500 hover:bg-teal-600 hover:border-teal-600"
                animation="ripple"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 border-t border-gray-800">
        <p>© {new Date().getFullYear()} InkCircle. All rights reserved.</p>
      </footer>
    </div>
  )
}

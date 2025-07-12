import Link from "next/link"
import Image from "next/image"
import { CalendarDays, User, ArrowLeft, Clock, Tag, Share2, Bookmark, Heart, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  // This would normally fetch data based on the blog post ID
  const { id } = await params
  const postId = id

  // Mock blog post data
  const post = {
    id: postId,
    title: "The Evolution of Tattoo Art in the Digital Age",
    content: `
      <p class="mb-6">The tattoo industry has undergone a significant transformation in recent years, driven by technological advancements and changing cultural attitudes. From traditional hand-poked techniques to digital design tools and online portfolios, the way tattoo artists work and connect with clients has evolved dramatically.</p>

      <h2 class="text-2xl font-bold text-white mb-4">Digital Design Revolution</h2>
      
      <p class="mb-6">One of the most notable changes in recent years has been the adoption of digital design tools. Many artists now use tablets and specialized software to create and refine designs before they ever touch skin. This allows for more precise planning, easier revisions, and better communication with clients about the final product.</p>
      
      <p class="mb-6">The ability to visualize a design on the body using augmented reality apps has also revolutionized the client experience. These tools help bridge the gap between concept and execution, giving clients more confidence in their decisions and reducing the likelihood of regret.</p>

      <h2 class="text-2xl font-bold text-white mb-4">Social Media and Artist Visibility</h2>
      
      <p class="mb-6">Instagram and other social platforms have become essential tools for tattoo artists. A strong online portfolio can attract clients from around the world, not just those who happen to walk by a studio. This has led to more tattoo tourism, with people traveling specifically to get work done by artists they discovered online.</p>
      
      <p class="mb-6">Social media has also democratized the industry in many ways. Artists no longer need to work in established studios to build a clientele, and unique styles can find their audience regardless of location or traditional connections.</p>

      <h2 class="text-2xl font-bold text-white mb-4">Booking and Business Management</h2>
      
      <p class="mb-6">Online booking systems, client management software, and platforms like InkCircle have streamlined the administrative side of tattoo businesses. Artists can spend less time on paperwork and phone calls and more time creating art.</p>
      
      <p class="mb-6">These digital tools also provide better analytics and insights into business performance, helping artists and studio owners make data-driven decisions about pricing, scheduling, and marketing.</p>

      <h2 class="text-2xl font-bold text-white mb-4">The Future of Tattooing</h2>
      
      <p class="mb-6">As we look toward the future, we can expect to see even more integration of technology in the tattoo industry. 3D printing for practice skins, machine learning for style analysis, and even robotics for certain applications may become more common.</p>
      
      <p class="mb-6">However, the core of tattooing remains a deeply human experience—a collaboration between artist and client to create permanent art. The most successful artists will be those who embrace technological tools while maintaining the connection and craftsmanship that makes tattooing special.</p>

      <p>The digital age hasn't replaced the traditional skills of tattooing, but it has expanded possibilities and opened the art form to new audiences. By embracing these changes, the tattoo community continues to evolve while honoring its rich history and cultural significance.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200&query=tattoo%20artist%20digital%20design",
    category: "Industry Trends",
    author: "Alex Morgan",
    authorImage: "/placeholder.svg?height=100&width=100&query=tattoo%20artist%20portrait",
    authorBio:
      "Alex Morgan is a tattoo artist and industry analyst with over 15 years of experience in the field. They specialize in merging traditional tattoo techniques with modern technology.",
    date: "May 10, 2023",
    readTime: "8 min read",
    tags: ["Digital Tattooing", "Industry Trends", "Technology", "Social Media", "Tattoo Business"],
    relatedPosts: [
      {
        id: 2,
        title: "Best Practices for Tattoo Aftercare",
        image: "/placeholder.svg?key=m2h7c",
        category: "Client Tips",
      },
      {
        id: 3,
        title: "How to Grow Your Tattoo Business on Social Media",
        image: "/placeholder.svg?key=v07mg",
        category: "Business",
      },
      {
        id: 4,
        title: "Innovations in Tattoo Machines and Technology",
        image: "/placeholder.svg?key=0p4xz",
        category: "Technology",
      },
    ],
  }

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
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-8 -ml-3">
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="text-sm font-medium text-teal-500 mb-3">{post.category.toUpperCase()}</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center text-sm text-gray-400 mb-8">
              <div className="flex items-center mr-6 mb-2">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg prose-invert max-w-none mb-12">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Tags */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-[#111] hover:bg-[#222] text-gray-300 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      <span className="flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Article Actions */}
              <div className="flex justify-between items-center border-t border-b border-gray-800 py-4 mb-8">
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-teal-500 transition-colors flex items-center">
                    <Heart className="h-5 w-5 mr-1" />
                    <span>Like</span>
                  </button>
                  <button className="text-gray-400 hover:text-teal-500 transition-colors flex items-center">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    <span>Comment</span>
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-teal-500 transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-teal-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-12 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,176,0.2)]">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{post.author}</h3>
                    <p className="text-gray-400">{post.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Comments Section Placeholder */}
              <div className="bg-[#111] border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,176,0.2)]">
                <h3 className="text-xl font-bold text-white mb-6">Comments</h3>
                <div className="mb-6">
                  <textarea
                    placeholder="Share your thoughts..."
                    className="w-full bg-black border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none h-32 transition-all"
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <Button animation="ripple">Post Comment</Button>
                  </div>
                </div>
                <div className="text-center text-gray-400">
                  <p>Be the first to comment on this article</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Sidebar */}
              <div className="sticky top-8">
                {/* Related Posts */}
                <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,176,0.2)]">
                  <h3 className="text-xl font-bold text-white mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {post.relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group block">
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-teal-500 mb-1">
                              {relatedPost.category.toUpperCase()}
                            </div>
                            <h4 className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-[#111] border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,176,0.2)]">
                  <h3 className="text-xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-400 mb-4">Get the latest tattoo industry insights delivered to your inbox</p>
                  <form>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-3 transition-all"
                      required
                    />
                    <Button type="submit" className="w-full" animation="ripple">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
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

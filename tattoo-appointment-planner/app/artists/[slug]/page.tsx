import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Calendar, Instagram, Mail, MapPin, Star } from "lucide-react"

export default async function ArtistPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  // This would normally fetch data based on the slug
  const { slug } = await params
  const artistSlug = slug

  // Mock data for demonstration
  const artist = {
    name: "Alex Morgan",
    slug: "alex-morgan",
    title: "Realism & Portrait Specialist",
    bio: "With over 10 years of experience, Alex specializes in hyper-realistic portraits and nature scenes. Based in Berlin, his work has been featured in international tattoo magazines and conventions across Europe.",
    location: "Berlin, Germany",
    experience: "10+ years",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Realism", "Portraits", "Black & Grey", "Nature", "Wildlife"],
    social: {
      instagram: "@alexmorgantattoo",
      email: "alex@inkcircle.com",
    },
    gallery: [
      {
        id: 1,
        title: "Wolf Portrait",
        description: "Realistic wolf portrait with forest background",
        image: "/placeholder.svg?height=500&width=500",
        style: "Realism",
      },
      {
        id: 2,
        title: "Lion King",
        description: "Detailed lion portrait with crown",
        image: "/placeholder.svg?height=500&width=500",
        style: "Realism",
      },
      {
        id: 3,
        title: "Mountain Landscape",
        description: "Arm sleeve with mountain landscape",
        image: "/placeholder.svg?height=500&width=500",
        style: "Black & Grey",
      },
      {
        id: 4,
        title: "Portrait Study",
        description: "Hyper-realistic portrait of elderly man",
        image: "/placeholder.svg?height=500&width=500",
        style: "Realism",
      },
      {
        id: 5,
        title: "Eagle in Flight",
        description: "Detailed eagle with spread wings",
        image: "/placeholder.svg?height=500&width=500",
        style: "Realism",
      },
      {
        id: 6,
        title: "Forest Scene",
        description: "Detailed forest scene with wildlife",
        image: "/placeholder.svg?height=500&width=500",
        style: "Black & Grey",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Sarah K.",
        date: "March 15, 2025",
        rating: 5,
        comment:
          "Alex created an amazing portrait of my grandfather. The detail is incredible, and he captured the essence perfectly. The whole experience was professional and comfortable.",
      },
      {
        id: 2,
        name: "Michael T.",
        date: "February 28, 2025",
        rating: 5,
        comment:
          "I got a wolf portrait from Alex and couldn't be happier. His attention to detail is unmatched, and he took the time to understand exactly what I wanted.",
      },
      {
        id: 3,
        name: "Emma R.",
        date: "January 10, 2025",
        rating: 4,
        comment:
          "Great experience overall. Alex is professional and talented. The only reason for 4 stars instead of 5 is that the session ran longer than expected, but the result was worth it.",
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Artist Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3">
              <div className="bg-[#4a6964] p-4 rounded-lg">
                <img src="/placeholder.svg?height=400&width=400" alt={artist.name} className="w-full h-auto rounded" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-5xl font-bold text-white mb-2">{artist.name}</h1>
              <p className="text-teal-500 text-xl mb-6">{artist.title}</p>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-white font-bold">{artist.rating}</span>
                  <span className="text-gray-400 ml-1">({artist.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-teal-500 mr-1" />
                  <span className="text-gray-400">{artist.location}</span>
                </div>
              </div>

              <p className="text-white text-lg mb-6">{artist.bio}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {artist.specialties.map((specialty, index) => (
                  <span key={index} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/booking?artist=${slug}`}
                  className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors text-center"
                >
                  Book an Appointment
                </Link>
                <button className="border border-teal-500 text-white px-6 py-3 rounded hover:bg-teal-500/10 transition-colors">
                  Contact Artist
                </button>
              </div>
            </div>
          </div>

          {/* Social and Contact */}
          <div className="bg-black border border-teal-500/20 rounded-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                <div>
                  <p className="text-white font-bold">Experience</p>
                  <p className="text-gray-400">{artist.experience}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Instagram className="h-5 w-5 text-teal-500 mr-3" />
                <div>
                  <p className="text-white font-bold">Instagram</p>
                  <a href="#" className="text-gray-400 hover:text-teal-500">
                    {artist.social.instagram}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-3" />
                <div>
                  <p className="text-white font-bold">Email</p>
                  <a href={`mailto:${artist.social.email}`} className="text-gray-400 hover:text-teal-500">
                    {artist.social.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Gallery */}
          <h2 className="text-3xl font-bold text-white mb-8">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {artist.gallery.map((item) => (
              <div key={item.id} className="bg-black border border-teal-500/20 rounded-lg overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 mb-2">{item.description}</p>
                  <span className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    {item.style}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <h2 className="text-3xl font-bold text-white mb-8">Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {artist.reviews.map((review) => (
              <div key={review.id} className="bg-black border border-teal-500/20 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{review.name}</h3>
                    <p className="text-gray-400 text-sm">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-500" : "text-gray-600"}`}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-white">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Booking CTA */}
          <div className="bg-black border border-teal-500/20 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to get tattooed by {artist.name}?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Book a consultation to discuss your ideas and start your tattoo journey with one of our most talented
              artists.
            </p>
            <Link
              href={`/booking?artist=${slug}`}
              className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors inline-block"
            >
              Book Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

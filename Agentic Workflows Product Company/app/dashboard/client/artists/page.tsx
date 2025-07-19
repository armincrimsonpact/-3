"use client"

import { useState, useEffect } from "react"
import { Star, MapPin, Clock, Heart, MessageSquare, Calendar, Filter, Search } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

type Artist = {
  id: string
  userId: string
  bio: string | null
  specialties: string[]
  experience: number | null
  hourlyRate: number | null
  portfolioImages: string[]
  studioId: string | null
  isActive: boolean
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
  studio?: {
    id: string
    name: string
    address: string
    city: string
    state: string
  }
  reviews: Array<{ rating: number }>
  _count: {
    reviews: number
  }
  avgRating?: number
}

export default function FindArtists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [styleFilter, setStyleFilter] = useState("")
  const [priceFilter, setPriceFilter] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [favorites, setFavorites] = useState<string[]>([])

  const supabase = createClient()

  useEffect(() => {
    loadArtists()
    loadFavorites()
  }, [])

  const loadArtists = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('Artist')
        .select(`
          *,
          user:UserProfile!Artist_userId_fkey (
            id,
            name,
            email,
            image
          ),
          studio:Studio!Artist_studioId_fkey (
            id,
            name,
            address,
            city,
            state
          ),
          reviews:Review!Review_artistId_fkey (
            rating
          )
        `)
        .eq('isActive', true)
        .order('createdAt', { ascending: false })

      if (error) {
        console.error('Error loading artists:', error)
        alert('Failed to load artists')
        return
      }

      // Calculate average rating for each artist
      const artistsWithRatings = (data || []).map(artist => ({
        ...artist,
        avgRating: artist.reviews.length > 0 
          ? artist.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / artist.reviews.length
          : 0,
        _count: {
          reviews: artist.reviews.length
        }
      }))

      setArtists(artistsWithRatings)
    } catch (error) {
      console.error("Failed to load artists:", error)
      alert('Failed to load artists')
    } finally {
      setLoading(false)
    }
  }

  const loadFavorites = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: userProfile } = await supabase
        .from('UserProfile')
        .select('id')
        .eq('authId', user.id)
        .single()

      if (!userProfile) return

      const { data: clientData } = await supabase
        .from('Client')
        .select('id')
        .eq('userId', userProfile.id)
        .single()

      if (!clientData) return

      const { data: favoriteData } = await supabase
        .from('Favorite')
        .select('artistId')
        .eq('clientId', clientData.id)

      if (favoriteData) {
        setFavorites(favoriteData.map(fav => fav.artistId))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }

  const toggleFavorite = async (artistId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please log in to save favorites')
        return
      }

      const { data: userProfile } = await supabase
        .from('UserProfile')
        .select('id')
        .eq('authId', user.id)
        .single()

      if (!userProfile) return

      const { data: clientData } = await supabase
        .from('Client')
        .select('id')
        .eq('userId', userProfile.id)
        .single()

      if (!clientData) return

      const isFavorite = favorites.includes(artistId)

      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('Favorite')
          .delete()
          .eq('clientId', clientData.id)
          .eq('artistId', artistId)

        if (error) throw error

        setFavorites(prev => prev.filter(id => id !== artistId))
        alert('Artist removed from favorites')
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('Favorite')
          .insert({
            clientId: clientData.id,
            artistId: artistId
          })

        if (error) throw error

        setFavorites(prev => [...prev, artistId])
        alert('Artist added to favorites')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      alert('Failed to update favorites')
    }
  }

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = 
      artist.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      artist.studio?.name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !locationFilter || 
      artist.studio?.city?.toLowerCase().includes(locationFilter.toLowerCase()) ||
      artist.studio?.state?.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesStyle = !styleFilter || 
      artist.specialties.some(specialty => 
        specialty.toLowerCase().includes(styleFilter.toLowerCase())
      )

    const matchesPrice = !priceFilter || 
      (priceFilter === "budget" && artist.hourlyRate && artist.hourlyRate < 150) ||
      (priceFilter === "mid" && artist.hourlyRate && artist.hourlyRate >= 150 && artist.hourlyRate < 250) ||
      (priceFilter === "premium" && artist.hourlyRate && artist.hourlyRate >= 250)

    return matchesSearch && matchesLocation && matchesStyle && matchesPrice
  })

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.avgRating || 0) - (a.avgRating || 0)
      case "price-low":
        return (a.hourlyRate || 0) - (b.hourlyRate || 0)
      case "price-high":
        return (b.hourlyRate || 0) - (a.hourlyRate || 0)
      case "name":
        return (a.user.name || "").localeCompare(b.user.name || "")
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Find Artists</h1>
            <p className="text-gray-400">Discover talented tattoo artists in your area</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-cardBg border-gray-800">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Find Artists</h1>
          <p className="text-gray-400">Discover talented tattoo artists in your area</p>
        </div>
        <Badge variant="secondary" className="bg-teal-500/20 text-teal-400">
          {filteredArtists.length} Artists Found
        </Badge>
      </div>

        {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search artists, styles, or studios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cardBg border-gray-700 text-white"
                />
              </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 bg-cardBg border border-gray-700 rounded-md text-white text-sm"
          >
            <option value="">All Locations</option>
            <option value="manhattan">Manhattan</option>
            <option value="brooklyn">Brooklyn</option>
            <option value="queens">Queens</option>
            <option value="bronx">Bronx</option>
          </select>
          <select
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            className="px-3 py-2 bg-cardBg border border-gray-700 rounded-md text-white text-sm"
          >
            <option value="">All Styles</option>
            <option value="traditional">Traditional</option>
            <option value="realism">Realism</option>
            <option value="watercolor">Watercolor</option>
            <option value="geometric">Geometric</option>
            <option value="japanese">Japanese</option>
          </select>
                    <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-3 py-2 bg-cardBg border border-gray-700 rounded-md text-white text-sm"
          >
            <option value="">All Prices</option>
            <option value="budget">Budget ($0-$150)</option>
            <option value="mid">Mid-range ($150-$250)</option>
            <option value="premium">Premium ($250+)</option>
                    </select>
                    <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-cardBg border border-gray-700 rounded-md text-white text-sm"
          >
            <option value="rating">Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
                    </select>
                  </div>
      </div>

      {/* Artists Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedArtists.map((artist) => (
          <ScrollReveal key={artist.id}>
            <Card className="bg-cardBg border-gray-800 hover:border-teal-500/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square rounded-t-lg bg-gray-700 flex items-center justify-center">
                    {artist.user.image ? (
                      <img 
                        src={artist.user.image} 
                        alt={artist.user.name || 'Artist'} 
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-t-lg flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {artist.user.name?.charAt(0) || 'A'}
                        </span>
                    </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(artist.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(artist.id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{artist.user.name}</h3>
                    {artist.avgRating && artist.avgRating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {artist.avgRating.toFixed(1)} ({artist._count.reviews})
                        </span>
              </div>
            )}
          </div>
                  {artist.studio && (
                    <div className="flex items-center gap-1 text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{artist.studio.name}</span>
          </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {artist.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                            ))}
                          </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {artist.experience ? `${artist.experience} years` : 'Experience varies'}
                          </span>
                        </div>
                    {artist.hourlyRate && (
                      <span className="text-lg font-semibold text-teal-400">
                        ${artist.hourlyRate}/hr
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-teal-500 hover:bg-teal-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

      {filteredArtists.length === 0 && (
            <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No artists found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
            </div>
        )}
    </div>
  )
}

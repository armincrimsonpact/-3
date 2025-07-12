"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Camera, Edit, MapPin, Instagram, Mail, LinkIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"

type UserProfile = {
  id: string
  name: string | null
  email: string
  role: string
  image: string | null
  artist?: {
    bio: string | null
    specialties: string[]
    experience: number | null
    portfolioImages: string[]
    studio?: {
      name: string
      city: string
      state: string
    }
  }
  client?: {
    phone: string | null
  }
  studio?: {
    name: string
    description: string | null
    address: string
    city: string
    state: string
    phone: string
    website: string | null
  }
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please log in to view your profile')
        return
      }

      const { data: userProfileData, error } = await supabase
        .from('UserProfile')
        .select(`
          *,
          artist:Artist!Artist_userId_fkey (
            bio,
            specialties,
            experience,
            portfolioImages,
            studio:Studio!Artist_studioId_fkey (
              name,
              city,
              state
            )
          ),
          client:Client!Client_userId_fkey (
            phone
          ),
          studio:Studio!Studio_userId_fkey (
            name,
            description,
            address,
            city,
            state,
            phone,
            website
          )
        `)
        .eq('authId', user.id)
        .single()

      if (error) {
        console.error('Error loading user profile:', error)
        alert('Failed to load profile')
        return
      }

      // Handle the data structure from Supabase
      const profile: UserProfile = {
        id: userProfileData.id,
        name: userProfileData.name,
        email: userProfileData.email,
        role: userProfileData.role,
        image: userProfileData.image,
        artist: Array.isArray(userProfileData.artist) ? userProfileData.artist[0] : userProfileData.artist,
        client: Array.isArray(userProfileData.client) ? userProfileData.client[0] : userProfileData.client,
        studio: Array.isArray(userProfileData.studio) ? userProfileData.studio[0] : userProfileData.studio,
      }

      setUserProfile(profile)
    } catch (error) {
      console.error("Failed to load user profile:", error)
      alert('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const getLocationString = () => {
    if (userProfile?.artist?.studio) {
      return `${userProfile.artist.studio.city}, ${userProfile.artist.studio.state}`
    }
    if (userProfile?.studio) {
      return `${userProfile.studio.city}, ${userProfile.studio.state}`
    }
    return "Location not specified"
  }

  const getBio = () => {
    if (userProfile?.artist?.bio) {
      return userProfile.artist.bio
    }
    if (userProfile?.studio?.description) {
      return userProfile.studio.description
    }
    return "No bio available. Update your profile to add more information."
  }

  const getPortfolioImages = () => {
    if (userProfile?.artist?.portfolioImages) {
      return userProfile.artist.portfolioImages.map((image, index) => ({
        id: index + 1,
        image: image,
        title: `Portfolio Item ${index + 1}`,
                  likes: 0
      }))
    }
    return []
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <MainNav />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-cardBg border-gray-800">
            <CardContent className="p-8">
              <div className="animate-pulse">
                <div className="h-32 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-black">
        <MainNav />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const portfolioImages = getPortfolioImages()

  return (
    <div className="min-h-screen bg-black">
      <MainNav />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-lg mb-4"></div>
          
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-16 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-black flex items-center justify-center">
                {userProfile.image ? (
                  <img 
                    src={userProfile.image} 
                    alt={userProfile.name || 'User'} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {userProfile.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-teal-500 rounded-full hover:bg-teal-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {userProfile.name || 'User Name'}
                </h1>
                <button className="p-1 hover:bg-gray-800 rounded">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-400 mb-2">@{userProfile.name?.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
              <p className="text-teal-400 font-medium mb-2">{userProfile.role}</p>
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{getLocationString()}</span>
              </div>
              <p className="text-gray-300 max-w-2xl">
                {getBio()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-cardBg border border-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {portfolioImages.length}
            </div>
            <div className="text-sm text-gray-400">Portfolio Items</div>
          </div>
          <div className="bg-cardBg border border-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {userProfile.artist?.experience || 0}
            </div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="bg-cardBg border border-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {userProfile.artist?.specialties?.length || 0}
            </div>
            <div className="text-sm text-gray-400">Specialties</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-cardBg border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-teal-400" />
              <span className="text-gray-300">{userProfile.email}</span>
            </div>
            {userProfile.client?.phone && (
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 text-teal-400">📞</span>
                <span className="text-gray-300">{userProfile.client.phone}</span>
              </div>
            )}
            {userProfile.studio?.website && (
              <div className="flex items-center gap-3">
                <LinkIcon className="w-5 h-5 text-teal-400" />
                <a 
                  href={userProfile.studio.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300"
                >
                  {userProfile.studio.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Specialties (for artists) */}
        {userProfile.artist?.specialties && userProfile.artist.specialties.length > 0 && (
          <div className="bg-cardBg border border-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.artist.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio (for artists) */}
        {portfolioImages.length > 0 && (
          <div className="bg-cardBg border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Portfolio</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolioImages.map((item) => (
                <div key={item.id} className="group relative aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-300">{item.likes} likes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state for portfolio */}
        {portfolioImages.length === 0 && userProfile.role === 'ARTIST' && (
          <div className="bg-cardBg border border-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Portfolio</h3>
            <p className="text-gray-400 mb-4">No portfolio items yet</p>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
              Add Portfolio Item
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

"use client"

import { useCallback } from 'react'
import { useIntelligentCache } from './useIntelligentCache'

interface Artist {
  id: string
  name: string
  specialties: string[]
  rating: number
  location: string
  portfolio: string[]
}

interface Studio {
  id: string
  name: string
  location: string
  artists: string[]
  rating: number
}

interface Appointment {
  id: string
  artistId: string
  clientId: string
  datetime: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  service: string
}

interface SearchResult<T> {
  results: T[]
  totalCount: number
  page: number
  hasMore: boolean
}

// API cache configurations for different data types
const CACHE_CONFIGS = {
  artists: { ttl: 10 * 60 * 1000 }, // 10 minutes
  studios: { ttl: 15 * 60 * 1000 }, // 15 minutes
  appointments: { ttl: 2 * 60 * 1000 }, // 2 minutes (more dynamic)
  search: { ttl: 5 * 60 * 1000 }, // 5 minutes
  profile: { ttl: 30 * 60 * 1000 }, // 30 minutes
}

export function useApiCache() {
  const artistsCache = useIntelligentCache<Artist[]>('artists', CACHE_CONFIGS.artists)
  const artistCache = useIntelligentCache<Artist>('artist', CACHE_CONFIGS.artists)
  const studiosCache = useIntelligentCache<Studio[]>('studios', CACHE_CONFIGS.studios)
  const appointmentCache = useIntelligentCache<Appointment[]>('appointments', CACHE_CONFIGS.appointments)
  const searchCache = useIntelligentCache<SearchResult<any>>('search', CACHE_CONFIGS.search)
  const profileCache = useIntelligentCache<any>('profile', CACHE_CONFIGS.profile)

  // Fetch artists with caching
  const fetchArtists = useCallback(async (filters?: Record<string, any>): Promise<Artist[]> => {
    const cacheKey = filters ? `artists-${JSON.stringify(filters)}` : 'artists-all'
    
    return artistsCache.fetchWithCache(cacheKey, async () => {
      const params = new URLSearchParams(filters || {})
      const response = await fetch(`/api/artists?${params}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch artists: ${response.statusText}`)
      }
      
      return response.json()
    })
  }, [artistsCache])

  // Fetch single artist
  const fetchArtist = useCallback(async (id: string): Promise<Artist> => {
    const cacheKey = `artist-${id}`
    
    return artistCache.fetchWithCache(cacheKey, async () => {
      const response = await fetch(`/api/artists/${id}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch artist ${id}: ${response.statusText}`)
      }
      
      return response.json()
    })
  }, [artistCache])

  // Fetch studios with caching
  const fetchStudios = useCallback(async (filters?: Record<string, any>): Promise<Studio[]> => {
    const cacheKey = filters ? `studios-${JSON.stringify(filters)}` : 'studios-all'
    
    return studiosCache.fetchWithCache(cacheKey, async () => {
      const params = new URLSearchParams(filters || {})
      const response = await fetch(`/api/studios?${params}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch studios: ${response.statusText}`)
      }
      
      return response.json()
    })
  }, [studiosCache])

  // Fetch appointments with caching
  const fetchAppointments = useCallback(async (userId: string, type: 'artist' | 'client'): Promise<Appointment[]> => {
    const cacheKey = `appointments-${type}-${userId}`
    
    return appointmentCache.fetchWithCache(cacheKey, async () => {
      const response = await fetch(`/api/appointments?userId=${userId}&type=${type}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`)
      }
      
      return response.json()
    })
  }, [appointmentCache])

  // Search with caching
  const search = useCallback(async <T>(
    query: string,
    type: 'artists' | 'studios' | 'all',
    page: number = 1
  ): Promise<SearchResult<T>> => {
    const cacheKey = `search-${type}-${query}-${page}`
    
    return searchCache.fetchWithCache(cacheKey, async () => {
      const params = new URLSearchParams({
        q: query,
        type,
        page: page.toString()
      })
      
      const response = await fetch(`/api/search?${params}`)
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }
      
      return response.json()
    })
  }, [searchCache])

  // Fetch user profile
  const fetchProfile = useCallback(async (userId: string): Promise<any> => {
    const cacheKey = `profile-${userId}`
    
    return profileCache.fetchWithCache(cacheKey, async () => {
      const response = await fetch(`/api/profile/${userId}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`)
      }
      
      return response.json()
    })
  }, [profileCache])

  // Prefetch related data
  const prefetchArtistData = useCallback(async (artistId: string) => {
    // Prefetch artist details and their appointments
    await Promise.allSettled([
      artistCache.prefetch(`artist-${artistId}`, () => fetchArtist(artistId)),
      appointmentCache.prefetch(`appointments-artist-${artistId}`, () => fetchAppointments(artistId, 'artist'))
    ])
  }, [artistCache, appointmentCache, fetchArtist, fetchAppointments])

  // Invalidate cache when data changes
  const invalidateArtist = useCallback((artistId: string) => {
    artistCache.del(`artist-${artistId}`)
    artistsCache.invalidatePattern('artists-') // Clear filtered lists
    appointmentCache.invalidatePattern(`appointments-artist-${artistId}`)
  }, [artistCache, artistsCache, appointmentCache])

  const invalidateAppointments = useCallback((userId: string, type?: 'artist' | 'client') => {
    if (type) {
      appointmentCache.del(`appointments-${type}-${userId}`)
    } else {
      appointmentCache.invalidatePattern(`appointments-.*-${userId}`)
    }
  }, [appointmentCache])

  const invalidateSearch = useCallback((query?: string) => {
    if (query) {
      searchCache.invalidatePattern(`search-.*-${query}`)
    } else {
      searchCache.clear()
    }
  }, [searchCache])

  // Cache statistics
  const getCacheStats = useCallback(() => {
    return {
      artists: artistsCache.stats,
      artist: artistCache.stats,
      studios: studiosCache.stats,
      appointments: appointmentCache.stats,
      search: searchCache.stats,
      profile: profileCache.stats,
    }
  }, [artistsCache, artistCache, studiosCache, appointmentCache, searchCache, profileCache])

  // Clear all caches
  const clearAllCaches = useCallback(() => {
    artistsCache.clear()
    artistCache.clear()
    studiosCache.clear()
    appointmentCache.clear()
    searchCache.clear()
    profileCache.clear()
  }, [artistsCache, artistCache, studiosCache, appointmentCache, searchCache, profileCache])

  return {
    // Data fetching methods
    fetchArtists,
    fetchArtist,
    fetchStudios,
    fetchAppointments,
    search,
    fetchProfile,
    
    // Prefetching
    prefetchArtistData,
    
    // Cache invalidation
    invalidateArtist,
    invalidateAppointments,
    invalidateSearch,
    
    // Cache management
    getCacheStats,
    clearAllCaches,
    
    // Direct cache access (for advanced use cases)
    caches: {
      artists: artistsCache,
      artist: artistCache,
      studios: studiosCache,
      appointments: appointmentCache,
      search: searchCache,
      profile: profileCache,
    }
  }
} 
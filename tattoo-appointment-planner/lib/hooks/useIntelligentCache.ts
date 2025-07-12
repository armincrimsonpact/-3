"use client"

import { useState, useCallback, useRef } from 'react'

interface CacheConfig {
  ttl?: number // Time to live in milliseconds
  maxSize?: number // Maximum number of cached items
  staleWhileRevalidate?: boolean // Return stale data while fetching fresh data
}

interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
  isStale?: boolean
}

interface CacheStats {
  hits: number
  misses: number
  size: number
  hitRate: number
}

const DEFAULT_CONFIG: Required<CacheConfig> = {
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 100,
  staleWhileRevalidate: true,
}

export function useIntelligentCache<T = any>(namespace: string = 'default', config: CacheConfig = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const [stats, setStats] = useState<CacheStats>({ hits: 0, misses: 0, size: 0, hitRate: 0 })
  const revalidationMap = useRef<Map<string, Promise<T>>>(new Map())

  // Generate cache key with namespace
  const getCacheKey = useCallback((key: string) => `cache_${namespace}_${key}`, [namespace])

  // Storage interface using sessionStorage for cache data
  const setValue = useCallback((key: string, value: CacheItem<T>) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Failed to set cache item ${key}:`, error)
    }
  }, [])

  const getValue = useCallback((key: string): CacheItem<T> | null => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.warn(`Failed to get cache item ${key}:`, error)
      return null
    }
  }, [])

  const clearValue = useCallback((key: string) => {
    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.warn(`Failed to clear cache item ${key}:`, error)
    }
  }, [])

  const hasValue = useCallback((key: string): boolean => {
    try {
      return sessionStorage.getItem(key) !== null
    } catch (error) {
      return false
    }
  }, [])

  // Update cache statistics
  const updateStats = useCallback((hit: boolean) => {
    setStats(prev => {
      const newHits = hit ? prev.hits + 1 : prev.hits
      const newMisses = hit ? prev.misses : prev.misses + 1
      const total = newHits + newMisses
      return {
        hits: newHits,
        misses: newMisses,
        size: prev.size,
        hitRate: total > 0 ? (newHits / total) * 100 : 0
      }
    })
  }, [])

  // Set item in cache
  const set = useCallback((key: string, data: T, customTtl?: number) => {
    const cacheKey = getCacheKey(key)
    const ttl = customTtl || finalConfig.ttl
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl
    }
    
    setValue(cacheKey, cacheItem)
    setStats(prev => ({ ...prev, size: prev.size + 1 }))
  }, [getCacheKey, setValue, finalConfig.ttl])

  // Get item from cache
  const get = useCallback((key: string): CacheItem<T> | null => {
    const cacheKey = getCacheKey(key)
    const cached = getValue(cacheKey)
    
    if (!cached) {
      updateStats(false)
      return null
    }

    const isExpired = Date.now() - cached.timestamp > cached.ttl
    
    if (isExpired && !finalConfig.staleWhileRevalidate) {
      clearValue(cacheKey)
      updateStats(false)
      return null
    }

    updateStats(true)
    
    // Mark as stale if expired but still returning due to staleWhileRevalidate
    if (isExpired) {
      cached.isStale = true
    }

    return cached
  }, [getCacheKey, getValue, clearValue, updateStats, finalConfig.staleWhileRevalidate])

  // Check if item exists and is fresh
  const has = useCallback((key: string): boolean => {
    const cached = get(key)
    return cached !== null && !cached.isStale
  }, [get])

  // Delete item from cache
  const del = useCallback((key: string) => {
    const cacheKey = getCacheKey(key)
    if (hasValue(cacheKey)) {
      clearValue(cacheKey)
      setStats(prev => ({ ...prev, size: Math.max(0, prev.size - 1) }))
    }
  }, [getCacheKey, hasValue, clearValue])

  // Clear all items in this namespace
  const clear = useCallback(() => {
    try {
      const keysToRemove: string[] = []
      const prefix = `cache_${namespace}_`
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => sessionStorage.removeItem(key))
      setStats({ hits: 0, misses: 0, size: 0, hitRate: 0 })
    } catch (error) {
      console.warn('Failed to clear cache:', error)
    }
  }, [namespace])

  // Fetch with cache - main caching method
  const fetchWithCache = useCallback(async (
    key: string, 
    fetchFn: () => Promise<T>,
    customConfig?: CacheConfig
  ): Promise<T> => {
    const cached = get(key)
    
    // Return fresh cached data
    if (cached && !cached.isStale) {
      return cached.data
    }

    // Check if revalidation is already in progress
    const revalidationKey = getCacheKey(key)
    if (revalidationMap.current.has(revalidationKey)) {
      return revalidationMap.current.get(revalidationKey)!
    }

    // Return stale data while revalidating
    if (cached && cached.isStale && finalConfig.staleWhileRevalidate) {
      const revalidatePromise = fetchFn().then(freshData => {
        set(key, freshData, customConfig?.ttl)
        revalidationMap.current.delete(revalidationKey)
        return freshData
      }).catch(error => {
        revalidationMap.current.delete(revalidationKey)
        throw error
      })
      
      revalidationMap.current.set(revalidationKey, revalidatePromise)
      
      // Return stale data immediately
      return cached.data
    }

    // Fetch fresh data
    try {
      const freshData = await fetchFn()
      set(key, freshData, customConfig?.ttl)
      return freshData
    } catch (error) {
      // If we have stale data and fetch fails, return stale data
      if (cached) {
        return cached.data
      }
      throw error
    }
  }, [get, set, getCacheKey, finalConfig.staleWhileRevalidate])

  // Invalidate cache entries by pattern
  const invalidatePattern = useCallback((pattern: string | RegExp) => {
    try {
      const keysToRemove: string[] = []
      const prefix = `cache_${namespace}_`
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key && key.startsWith(prefix)) {
          const cacheKey = key.substring(prefix.length)
          const shouldRemove = typeof pattern === 'string' 
            ? cacheKey.includes(pattern)
            : pattern.test(cacheKey)
          
          if (shouldRemove) {
            keysToRemove.push(key)
          }
        }
      }
      
      keysToRemove.forEach(key => {
        sessionStorage.removeItem(key)
        setStats(prev => ({ ...prev, size: Math.max(0, prev.size - 1) }))
      })
    } catch (error) {
      console.warn('Failed to invalidate cache pattern:', error)
    }
  }, [namespace])

  // Prefetch data
  const prefetch = useCallback(async (key: string, fetchFn: () => Promise<T>) => {
    if (!has(key)) {
      try {
        await fetchWithCache(key, fetchFn)
      } catch (error) {
        // Silently fail for prefetch
        console.warn('Prefetch failed for key:', key, error)
      }
    }
  }, [has, fetchWithCache])

  return {
    // Core cache operations
    set,
    get: (key: string) => get(key)?.data || null,
    has,
    del,
    clear,
    
    // Advanced operations
    fetchWithCache,
    invalidatePattern,
    prefetch,
    
    // Cache info
    stats,
    config: finalConfig,
  }
} 
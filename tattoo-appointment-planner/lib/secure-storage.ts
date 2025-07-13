/**
 * Secure storage utility for handling sensitive data
 * Uses sessionStorage instead of localStorage for better security
 * Implements data expiration and cleanup
 */

interface StorageItem<T> {
  value: T
  expiry: number
}

export class SecureStorage {
  private static readonly EXPIRY_TIME = 30 * 60 * 1000 // 30 minutes

  /**
   * Store data with expiration
   */
  static setItem<T>(key: string, value: T, expiryMinutes?: number): void {
    if (typeof window === 'undefined') return

    const expiry = expiryMinutes 
      ? Date.now() + (expiryMinutes * 60 * 1000)
      : Date.now() + this.EXPIRY_TIME

    const item: StorageItem<T> = {
      value,
      expiry
    }

    try {
      sessionStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
      console.error('Failed to store item:', error)
    }
  }

  /**
   * Retrieve data and check expiration
   */
  static getItem<T>(key: string): T | null {
    if (typeof window === 'undefined') return null

    try {
      const itemStr = sessionStorage.getItem(key)
      if (!itemStr) return null

      const item: StorageItem<T> = JSON.parse(itemStr)
      
      // Check if expired
      if (Date.now() > item.expiry) {
        sessionStorage.removeItem(key)
        return null
      }

      return item.value
    } catch (error) {
      console.error('Failed to retrieve item:', error)
      return null
    }
  }

  /**
   * Remove specific item
   */
  static removeItem(key: string): void {
    if (typeof window === 'undefined') return

    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  /**
   * Clear all expired items
   */
  static clearExpired(): void {
    if (typeof window === 'undefined') return

    try {
      const keys = Object.keys(sessionStorage)
      
      keys.forEach(key => {
        const itemStr = sessionStorage.getItem(key)
        if (!itemStr) return

        try {
          const item = JSON.parse(itemStr)
          if (item.expiry && Date.now() > item.expiry) {
            sessionStorage.removeItem(key)
          }
        } catch {
          // If parsing fails, remove the item
          sessionStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear expired items:', error)
    }
  }

  /**
   * Clear all storage
   */
  static clear(): void {
    if (typeof window === 'undefined') return

    try {
      sessionStorage.clear()
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  }

  /**
   * Get all keys
   */
  static getAllKeys(): string[] {
    if (typeof window === 'undefined') return []

    try {
      return Object.keys(sessionStorage)
    } catch (error) {
      console.error('Failed to get keys:', error)
      return []
    }
  }
}

// Auto-clear expired items on load
if (typeof window !== 'undefined') {
  SecureStorage.clearExpired()
  
  // Set up periodic cleanup
  setInterval(() => {
    SecureStorage.clearExpired()
  }, 5 * 60 * 1000) // Every 5 minutes
}

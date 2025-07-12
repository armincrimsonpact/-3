import { useState, useEffect, useCallback, useRef } from 'react';

interface MemoryItem<T> {
  value: T;
  expiry: number;
  lastAccessed: number;
}

interface MemoryStorageOptions {
  expiryMs?: number;
  clearOnWindowClose?: boolean;
  autoCleanup?: boolean;
}

/**
 * Memory storage hook with automatic expiration
 * Default expiry: 1 minute
 * Perfect for temporary form data that shouldn't persist long-term
 */
export const useMemoryStorage = <T>(
  key: string,
  initialValue?: T,
  options: MemoryStorageOptions = {}
) => {
  const {
    expiryMs = 60 * 1000, // 1 minute default
    clearOnWindowClose = true,
    autoCleanup = true
  } = options;

  const [value, setValue] = useState<T | null>(initialValue || null);
  const [isLoading, setIsLoading] = useState(true);
  const cleanupIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Storage operations
  const setItem = useCallback((newValue: T, customExpiryMs?: number) => {
    const expiry = Date.now() + (customExpiryMs || expiryMs);
    const item: MemoryItem<T> = {
      value: newValue,
      expiry,
      lastAccessed: Date.now()
    };

    try {
      const storage = clearOnWindowClose ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(item));
      setValue(newValue);
    } catch (error) {
      console.warn(`Failed to store memory item ${key}:`, error);
    }
  }, [key, expiryMs, clearOnWindowClose]);

  const getItem = useCallback((): T | null => {
    try {
      const storage = clearOnWindowClose ? sessionStorage : localStorage;
      const itemStr = storage.getItem(key);
      
      if (!itemStr) return null;

      const item: MemoryItem<T> = JSON.parse(itemStr);
      
      // Check if expired
      if (Date.now() > item.expiry) {
        storage.removeItem(key);
        setValue(null);
        return null;
      }

      // Update last accessed time
      item.lastAccessed = Date.now();
      storage.setItem(key, JSON.stringify(item));
      
      setValue(item.value);
      return item.value;
    } catch (error) {
      console.warn(`Failed to retrieve memory item ${key}:`, error);
      setValue(null);
      return null;
    }
  }, [key, clearOnWindowClose]);

  const removeItem = useCallback(() => {
    try {
      const storage = clearOnWindowClose ? sessionStorage : localStorage;
      storage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.warn(`Failed to remove memory item ${key}:`, error);
    }
  }, [key, clearOnWindowClose]);

  const isExpired = useCallback((): boolean => {
    try {
      const storage = clearOnWindowClose ? sessionStorage : localStorage;
      const itemStr = storage.getItem(key);
      
      if (!itemStr) return true;

      const item: MemoryItem<T> = JSON.parse(itemStr);
      return Date.now() > item.expiry;
    } catch (error) {
      return true;
    }
  }, [key, clearOnWindowClose]);

  const getTimeRemaining = useCallback((): number => {
    try {
      const storage = clearOnWindowClose ? sessionStorage : localStorage;
      const itemStr = storage.getItem(key);
      
      if (!itemStr) return 0;

      const item: MemoryItem<T> = JSON.parse(itemStr);
      const remaining = Math.max(0, item.expiry - Date.now());
      return remaining;
    } catch (error) {
      return 0;
    }
  }, [key, clearOnWindowClose]);

  const refreshExpiry = useCallback((customExpiryMs?: number) => {
    const currentValue = getItem();
    if (currentValue !== null) {
      setItem(currentValue, customExpiryMs);
    }
  }, [getItem, setItem]);

  // Cleanup expired items across all keys
  const cleanupExpired = useCallback(() => {
    try {
      const storage = clearOnWindowClose ? sessionStorage : localStorage;
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < storage.length; i++) {
        const storageKey = storage.key(i);
        if (!storageKey) continue;

        try {
          const itemStr = storage.getItem(storageKey);
          if (!itemStr) continue;

          const item = JSON.parse(itemStr);
          if (item.expiry && Date.now() > item.expiry) {
            keysToRemove.push(storageKey);
          }
        } catch {
          // If parsing fails, consider it expired
          keysToRemove.push(storageKey);
        }
      }

      keysToRemove.forEach(expiredKey => {
        storage.removeItem(expiredKey);
        if (expiredKey === key) {
          setValue(null);
        }
      });

      return keysToRemove.length;
    } catch (error) {
      console.warn('Failed to cleanup expired items:', error);
      return 0;
    }
  }, [key, clearOnWindowClose]);

  // Initialize value from storage
  useEffect(() => {
    const storedValue = getItem();
    setIsLoading(false);
  }, [getItem]);

  // Setup automatic cleanup
  useEffect(() => {
    if (autoCleanup) {
      // Initial cleanup
      cleanupExpired();

      // Setup periodic cleanup every 10 seconds
      cleanupIntervalRef.current = setInterval(() => {
        cleanupExpired();
      }, 10 * 1000);
    }

    return () => {
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current);
      }
    };
  }, [autoCleanup, cleanupExpired]);

  // Setup visibility change listener to clear on window close/tab close
  useEffect(() => {
    if (clearOnWindowClose) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          // User might be closing the tab/window
          // We don't clear immediately, but mark for cleanup
        }
      };

      const handleBeforeUnload = () => {
        // Clear specific sensitive data on window close
        removeItem();
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [clearOnWindowClose, removeItem]);

  return {
    value,
    isLoading,
    setItem,
    getItem,
    removeItem,
    isExpired,
    getTimeRemaining,
    refreshExpiry,
    cleanupExpired
  };
};

// Utility function for form data with 1-minute expiry
export const useBookingMemory = <T>(key: string, initialValue?: T) => {
  return useMemoryStorage<T>(key, initialValue, {
    expiryMs: 60 * 1000, // 1 minute
    clearOnWindowClose: true,
    autoCleanup: true
  });
};

// Global cleanup function
export const clearAllBookingMemory = () => {
  try {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('booking-')) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => {
      sessionStorage.removeItem(key);
    });

    return keysToRemove.length;
  } catch (error) {
    console.warn('Failed to clear booking memory:', error);
    return 0;
  }
};

export default useMemoryStorage; 
import { useState, useEffect } from 'react';

/**
 * Custom hook for state synchronized with browser localStorage.
 * Handles JSON serialization, deserialization, and fallback to initialValue safely.
 *
 * @param {string} key - localStorage key
 * @param {any} initialValue - Fallback initial value
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Retrieve initial state from localStorage or fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item);
        // Ensure array if initialValue is an array
        if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
          return initialValue;
        }
        return parsed;
      }
      // If item doesn't exist, seed with initialValue
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error accessing localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  // Keep localStorage updated when storedValue changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`[useLocalStorage] Error writing key "${key}" to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

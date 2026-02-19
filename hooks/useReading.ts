import { useState, useCallback } from 'react'
import { DrawnCard, ZodiacSign } from '@/lib/types'

interface UseReadingReturn {
  reading: string
  isLoading: boolean
  error: string | null
  getReading: (cards: DrawnCard[], question?: string, zodiacSign?: ZodiacSign) => Promise<void>
  reset: () => void
}

export function useReading(): UseReadingReturn {
  const [reading, setReading] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getReading = useCallback(async (cards: DrawnCard[], question?: string, zodiacSign?: ZodiacSign) => {
    setIsLoading(true)
    setError(null)
    setReading('')

    try {
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards, question, spreadType: 'three-card', zodiacSign })
      })

      if (!res.ok) throw new Error('Failed to get reading')
      if (!res.body) throw new Error('No response body')

      // Stream the response
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setReading((prev) => prev + decoder.decode(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setReading('')
    setError(null)
    setIsLoading(false)
  }, [])

  return { reading, isLoading, error, getReading, reset }
}

// ── Horoscope hook ────────────────────────────────────────────────────────────

interface UseHoroscopeReturn {
  horoscope: string
  isLoading: boolean
  error: string | null
  getHoroscope: (sign: ZodiacSign, period?: 'daily' | 'weekly' | 'monthly') => Promise<void>
  reset: () => void
}

export function useHoroscope(): UseHoroscopeReturn {
  const [horoscope, setHoroscope] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getHoroscope = useCallback(async (sign: ZodiacSign, period: 'daily' | 'weekly' | 'monthly' = 'daily') => {
    setIsLoading(true)
    setError(null)
    setHoroscope('')

    try {
      const res = await fetch('/api/horoscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sign, period }),
      })

      if (!res.ok) throw new Error('Failed to get horoscope')
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setHoroscope((prev) => prev + decoder.decode(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setHoroscope('')
    setError(null)
    setIsLoading(false)
  }, [])

  return { horoscope, isLoading, error, getHoroscope, reset }
}
